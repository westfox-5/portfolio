"use client"

import { Briefcase, Building2 } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

const experience = [
  {
    role: "Software Engineer",
    company: "T.A.S. s.p.a",
    meta: "Remote",
    period: "2024 — Present",
    bullets: [
      "Senior Java EE developer in a SCRUM team, in a multi-team environment.",
      "Financial applications for Instant Payments bank transfers, along with shared common libraries maintenance.",
      "Spring Boot, Spring Batch, MQs, Apache Kafka, Docker, Kubernetes deployments, Helm, GitLab pipelines.",
    ],
  },
  {
    role: "Java Developer, Team Leader",
    company: "Technology Reply",
    period: "2022 — 2024",
    bullets: [
      "Technical team leader of a group of 4 people.",
      "Analysis and design of data models; meetings with the business, definition of testbooks and active participation in customer UATs.",
      "Application deployment and maintenance, management of ticketing system and ticket lifecycle.",
    ],
  },
  {
    role: "Analyst Java Developer",
    company: "Technology Reply",
    period: "2021 — 2022",
    bullets: [
      "Design of data models based on business requirements. Participation in both technical and functional meetings.",
      "Improved system stability, reducing incident tickets by 15%.",
    ],
  },
  {
    role: "Java Developer",
    company: "Technology Reply",
    period: "2019 — 2021",
    bullets: [
      "Development and maintenance of the P.L.M. (Product Lifecycle Management) software for a well-known Italian fashion company.",
    ],
  },
  {
    role: "University Internship",
    company: "Ca' Foscari University of Venice",
    period: "2019",
    bullets: [
      "Development of a web application that handles and visualizes graphs from open data in CSV format, using Angular, NodeJS and MongoDB.",
    ],
  },
];

const Experience = () => (
  <section id="experience" className="container-page section-pad">
    <SectionHeading icon={Briefcase} eyebrow="Experience" title="Where I've worked" />

    <div className="relative ml-2 border-l-2 border-border">
      {experience.map((item, i) => (
        <Reveal key={`${item.company}-${item.period}`} delay={i * 0.06} className="relative pl-8 pb-8 last:pb-0">
          <span className="absolute left-0 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background" />
          <div className="card card-hover p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{item.role}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Building2 className="w-3.5 h-3.5" />
                  {item.company}
                  {item.meta && <span className="text-primary">&middot; {item.meta}</span>}
                </div>
              </div>
              <span className="tag-chip !py-1 !text-xs shrink-0">{item.period}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {item.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground/85">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Experience;
