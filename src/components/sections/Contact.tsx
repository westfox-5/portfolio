"use client"

import { Mail, Download, MapPin, Github } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

const Contact = () => (
  <section id="contact" className="container-page section-pad">
    <SectionHeading icon={Mail} eyebrow="Contact" title="Let's build something great" />

    <Reveal delay={0.1} className="card relative overflow-hidden p-8 md:p-14 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{ background: "radial-gradient(80% 100% at 50% 0%, var(--primary-soft), transparent 70%)" }}
      />
      <div className="relative">
        <p className="text-lg lg:text-xl text-muted max-w-xl mx-auto">
          Open to collaborations and new opportunities. Feel free to reach out &mdash; I usually
          reply within a day.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:volpe_davide@outlook.it" className="btn-primary">
            <Mail className="w-4 h-4" />
            Email me
          </a>
          <a href="/files/cv_en.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            Zero Branco, TV, Italy
          </span>
          <a
            href="https://github.com/westfox-5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Github className="w-4 h-4" />
            github.com/westfox-5
          </a>
        </div>
      </div>
    </Reveal>
  </section>
);

export default Contact;
