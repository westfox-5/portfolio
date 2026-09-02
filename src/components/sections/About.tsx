"use client"

import { User, MapPin, Briefcase, Users } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

const stats = [
  { icon: Briefcase, label: "Years of experience", value: "6+" },
  { icon: User, label: "Technologies & tools", value: "20+" },
  { icon: Users, label: "Engineers led", value: "4" },
];

const About = () => (
  <section id="about" className="container-page section-pad">
    <SectionHeading icon={User} eyebrow="About me" title="Backend engineer at heart" />

    <div className="grid md:grid-cols-5 gap-10 items-start">
      <Reveal delay={0.08} className="md:col-span-3 space-y-5">
        <p className="text-lg lg:text-xl leading-relaxed text-foreground/90">
          Software Engineer with strong expertise in backend systems and team leadership.
          I&apos;ve spent the last years building distributed, Java-based applications for the
          financial sector, working with Spring Boot, Kafka, and cloud-native tooling on
          Docker and Kubernetes.
        </p>
        <p className="text-lg lg:text-xl leading-relaxed text-foreground/90">
          Beyond writing code, I care about mentoring, clean Agile workflows, and delivering
          solutions that stay robust and maintainable long after they ship &mdash; currently as a
          Software Engineer at <span className="font-semibold text-primary">T.A.S. s.p.a</span>.
        </p>
        <div className="flex items-center gap-2 text-muted pt-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Zero Branco, TV, Italy &middot; Full remote</span>
        </div>
      </Reveal>

      <Reveal delay={0.16} className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="card p-5 flex items-center gap-4">
            <span className="icon-tile w-11 h-11 shrink-0">
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <div className="text-2xl font-bold text-foreground">{value}</div>
              <div className="text-sm text-muted">{label}</div>
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  </section>
);

export default About;
