"use client"

import { FolderGit2, Gamepad2, Bot, Cpu, ArrowUpRight, Github } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

const projects = [
  {
    icon: Gamepad2,
    title: "Battleship",
    subtitle: "Multiplayer",
    description: "Multiplayer version of the classic game, with real-time gameplay over a NodeJS backend.",
    tech: ["Angular", "Node.js", "MongoDB"],
    repo: "https://github.com/westfox-5/BattleShip",
  },
  {
    icon: Bot,
    title: "IO-Lego",
    subtitle: "Android",
    description: "Android app that controls a Lego EV3 robot by reading commands from colored cells.",
    tech: ["Java", "Android Studio"],
    repo: "https://github.com/westfox-5/Io-Lego",
  },
  {
    icon: Cpu,
    title: "GhidraMetrics",
    subtitle: "Reverse Engineering",
    description: "Ghidra plugin computing static code metrics directly on decompiled native code.",
    tech: ["Java", "Ghidra SDK"],
    repo: "https://github.com/westfox-5/GhidraMetrics",
  },
];

const Projects = () => (
  <section id="projects" className="container-page section-pad">
    <SectionHeading icon={FolderGit2} eyebrow="Projects" title="Things I've built" />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map(({ icon: Icon, title, subtitle, description, tech, repo }, i) => (
        <Reveal key={title} delay={i * 0.08} className="card card-hover p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="icon-tile w-11 h-11">
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-foreground leading-tight">{title}</h3>
              <span className="text-xs uppercase tracking-wider text-muted">{subtitle}</span>
            </div>
          </div>
          <p className="text-base text-muted leading-relaxed flex-1">{description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="tag-chip !py-1 !text-xs">
                {t}
              </span>
            ))}
          </div>
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
          >
            View repository <ArrowUpRight className="w-4 h-4" />
          </a>
        </Reveal>
      ))}
    </div>

    <Reveal delay={0.24} className="mt-8 flex justify-center">
      <a
        href="https://github.com/westfox-5"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary"
      >
        <Github className="w-4 h-4" />
        More on GitHub
      </a>
    </Reveal>
  </section>
);

export default Projects;
