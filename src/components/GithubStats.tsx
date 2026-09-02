"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, Star, FolderGit2, Clock, Loader2, AlertTriangle, ArrowUpRight } from "lucide-react";

const GITHUB_USER = "westfox-5";
const CACHE_KEY = "gh-stats-v1";
const CACHE_TTL = 10 * 60 * 1000;

type GhRepo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  pushed_at: string;
};

type GhUser = {
  public_repos: number;
  followers: number;
  html_url: string;
};

type Cache = { user: GhUser; repos: GhRepo[] };

const LANGUAGE_COLORS: Record<string, string> = {
  Java: "#f89820",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#787CB5",
  Shell: "#89e051",
  C: "#555555",
  "C++": "#f34b7d",
  Dockerfile: "#384d54",
};

const timeAgo = (dateStr: string) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const day = Math.floor(diffMs / 86_400_000);
  if (day >= 365) return `${Math.floor(day / 365)}y ago`;
  if (day >= 30) return `${Math.floor(day / 30)}mo ago`;
  if (day >= 1) return `${day}d ago`;
  const hr = Math.floor(diffMs / 3_600_000);
  if (hr >= 1) return `${hr}h ago`;
  const min = Math.floor(diffMs / 60_000);
  return min >= 1 ? `${min}m ago` : "just now";
};

const GithubStats = () => {
  const [data, setData] = useState<Cache | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const cachedRaw = sessionStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as { ts: number; data: Cache };
          if (Date.now() - cached.ts < CACHE_TTL) {
            if (active) {
              setData(cached.data);
              setStatus("ready");
            }
            return;
          }
        }

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&direction=desc`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const user = (await userRes.json()) as GhUser;
        const repos = (await reposRes.json()) as GhRepo[];
        const result: Cache = { user, repos };

        if (active) {
          setData(result);
          setStatus("ready");
        }
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: result }));
      } catch {
        if (active) setStatus("error");
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    if (!data) return null;
    const nonForks = data.repos.filter((r) => !r.fork);
    const totalStars = nonForks.reduce((sum, r) => sum + r.stargazers_count, 0);

    const langCounts: Record<string, number> = {};
    nonForks.forEach((r) => {
      if (r.language) langCounts[r.language] = (langCounts[r.language] ?? 0) + 1;
    });
    const totalLangged = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const topLanguages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang, count]) => ({ lang, pct: Math.round((count / totalLangged) * 100) }));

    const recent = [...nonForks]
      .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
      .slice(0, 4);

    return {
      totalStars,
      topLanguages,
      recent,
      publicRepos: data.user.public_repos,
      followers: data.user.followers,
    };
  }, [data]);

  return (
    <div className="card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <span className="icon-tile w-10 h-10">
            <Github className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Live from GitHub</h3>
            <p className="text-xs text-muted">@{GITHUB_USER}</p>
          </div>
        </div>
        {status === "ready" && stats && (
          <div className="hidden sm:flex items-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1"><FolderGit2 className="w-3.5 h-3.5" />{stats.publicRepos} repos</span>
            <span className="inline-flex items-center gap-1"><Star className="w-3.5 h-3.5" />{stats.totalStars} stars</span>
          </div>
        )}
      </div>

      {status === "loading" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-10 text-muted">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm">Fetching live data&hellip;</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 py-10 text-center">
          <AlertTriangle className="w-6 h-6 text-muted" />
          <p className="text-sm text-muted">GitHub data is unavailable right now.</p>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary inline-flex items-center gap-1"
          >
            View profile on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {status === "ready" && stats && (
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Top languages</h4>
            <div className="space-y-2.5">
              {stats.topLanguages.map(({ lang, pct }) => (
                <div key={lang}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-foreground/90">{lang}</span>
                    <span className="text-muted">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: LANGUAGE_COLORS[lang] ?? "var(--primary)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Recent activity</h4>
            <ul className="space-y-3">
              {stats.recent.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="font-medium text-foreground/90 group-hover:text-primary transition-colors truncate">
                      {repo.name}
                    </span>
                    <span className="shrink-0 inline-flex items-center gap-1 text-muted text-xs">
                      <Clock className="w-3 h-3" />
                      {timeAgo(repo.pushed_at)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubStats;
