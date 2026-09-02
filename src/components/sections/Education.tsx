"use client"

import { GraduationCap, Landmark } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

const education = [
  {
    degree: "Master Degree in Computer Science",
    school: "Ca' Foscari University of Venice",
    period: "2020 — 2022",
    details: ["Thesis: A Ghidra plugin for native code metrics", "Final vote: 108/110"],
  },
  {
    degree: "Bachelor Degree in Computer Science",
    school: "Ca' Foscari University of Venice",
    period: "2016 — 2019",
    details: [
      "Thesis: Web Application for the Veneto Regional Council",
      "Final vote: 110/110 cum laude",
      "Activities: cyberchallenge.it (courses and CTF competitions)",
    ],
  },
];

const Education = () => (
  <section id="education" className="container-page section-pad">
    <SectionHeading icon={GraduationCap} eyebrow="Education" title="Academic background" />

    <div className="relative ml-2 border-l-2 border-border">
      {education.map((item, i) => (
        <Reveal key={item.degree} delay={i * 0.08} className="relative pl-8 pb-8 last:pb-0">
          <span className="absolute left-0 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background" />
          <div className="card card-hover p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{item.degree}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Landmark className="w-3.5 h-3.5" />
                  {item.school}
                </div>
              </div>
              <span className="tag-chip !py-1 !text-xs shrink-0">{item.period}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {item.details.map((d) => (
                <li key={d} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground/85">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Education;
