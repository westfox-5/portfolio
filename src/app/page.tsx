"use client"

import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown, Download, Github, Mail } from "lucide-react";
import Separator from "../components/Separator";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";

const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const About = dynamic(() => import("../components/sections/About"), { ssr: false });
const Skills = dynamic(() => import("../components/sections/Skills"), { ssr: false });
const Projects = dynamic(() => import("../components/sections/Projects"), { ssr: false });
const Experience = dynamic(() => import("../components/sections/Experience"), { ssr: false });
const Education = dynamic(() => import("../components/sections/Education"), { ssr: false });
const Contact = dynamic(() => import("../components/sections/Contact"), { ssr: false });

const Home = () => {

  return (
    <>
      <Navbar />
      <div className="relative w-full max-w-full">
        <section id="home" className="container-page pt-16 pb-16 md:pt-28 md:pb-20 flex flex-col items-center text-center scroll-mt-16">
          <Reveal>
            <h1 className="font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-foreground">
              Hi, I&apos;m <span className="gradient-text">Davide Volpe</span>
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground/90">
              Backend Engineer <span className="text-muted font-normal">·</span> Systems &amp; Infrastructure Enthusiast
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg lg:text-xl text-muted leading-relaxed">
              Building robust APIs, automating workflows, and loving the art of scalable, reliable systems.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#projects" className="btn-primary">
                View my work <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/files/cv_en.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Download className="w-4 h-4" /> Download CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a
                href="https://github.com/westfox-5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:volpe_davide@outlook.it"
                aria-label="Email"
                className="p-3 rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </Reveal>

          <a
            href="#about"
            aria-label="Scroll to About"
            className="hidden md:flex mt-16 text-muted hover:text-primary transition-colors animate-bounce"
          >
            <ChevronDown className="w-6 h-6" />
          </a>
        </section>

        <Separator />

        <About />
        <Separator />

        <Skills />
        <Separator />

        <Projects />
        <Separator />

        <Experience />
        <Separator />

        <Education />
        <Separator />

        <Contact />

        <Footer />
      </div></>
  );
};

export default Home;
