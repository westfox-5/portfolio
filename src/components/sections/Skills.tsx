"use client"

import { BadgeCheck, Code2, Database, LayoutTemplate, Server, Award } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

const skillGroups = [
  {
    icon: Code2,
    title: "Backend & Languages",
    skills: ["Java (SE/EE, Spring Boot, Spring Batch)", "SQL (Transact-SQL, PL/SQL)", "TypeScript / JavaScript", "Python"],
  },
  {
    icon: Server,
    title: "DevOps & Infrastructure",
    skills: ["Docker", "Kubernetes", "Helm", "GitLab CI/CD", "Unix/Linux", "Networking"],
  },
  {
    icon: Database,
    title: "Messaging & Data",
    skills: ["Apache Kafka", "Message Queues", "Oracle", "MongoDB"],
  },
  {
    icon: LayoutTemplate,
    title: "Frontend & Architecture",
    skills: ["Angular", "React", "Next.js", "System architecture"],
  },
];

const softSkills = ["Problem solving", "Attention to detail", "Mentoring & knowledge sharing"];

const Skills = () => (
  <section id="skills" className="container-page section-pad">
    <SectionHeading icon={BadgeCheck} eyebrow="Skills" title="What I work with" />

    <div className="grid sm:grid-cols-2 gap-5">
      {skillGroups.map(({ icon: Icon, title, skills }, i) => (
        <Reveal key={title} delay={i * 0.06} className="card card-hover p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="icon-tile w-10 h-10">
              <Icon className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="tag-chip">
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal delay={0.28} className="mt-6 card p-6 flex flex-col md:flex-row md:items-center gap-6">
      <div className="flex-1">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">Soft skills</h3>
        <div className="flex flex-wrap gap-2">
          {softSkills.map((soft) => (
            <span key={soft} className="tag-chip">
              {soft}
            </span>
          ))}
        </div>
      </div>
      <div className="hidden md:block w-px h-12 bg-border" />
      <div className="flex items-center gap-3">
        <span className="icon-tile w-11 h-11 shrink-0">
          <Award className="w-5 h-5" />
        </span>
        <div>
          <div className="font-semibold text-foreground">Oracle Certified Professional</div>
          <div className="text-sm text-muted">1Z0-815, 1Z0-819 &middot; Java SE 11 Developer</div>
        </div>
      </div>
    </Reveal>
  </section>
);

export default Skills;
