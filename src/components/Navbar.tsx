"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon, Download } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const getSystemTheme = () => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || getSystemTheme();
    }
    return "dark";
  });

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", ...links.map((l) => l.href.slice(1))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-glass border-b border-border shadow-card" : "bg-transparent"
        }`}
      >
        <div className="container-page flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl text-white font-bold text-sm bg-gradient-to-br from-primary to-accent shadow-glow transition-transform duration-300 group-hover:scale-105">
              DV
            </span>
            <span className="text-xl font-semibold whitespace-nowrap text-foreground">
              Davide Volpe
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1 text-[15px] font-medium">
            <ul className="flex flex-row items-center gap-1 mr-2">
              {links.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`relative block px-3.5 py-2 rounded-full transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <button
              aria-label="Switch theme"
              className="p-2.5 rounded-full border border-border text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <a href="/files/cv_en.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary ml-3 !px-5 !py-2.5 text-sm">
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>

          <button
            aria-label="Open menu"
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      <div className="h-16" />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="w-72 max-w-[85vw] h-full bg-glass border-l border-border shadow-2xl p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between w-full mb-10">
                <button
                  aria-label="Switch theme"
                  className="p-2.5 rounded-full border border-border text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  aria-label="Close menu"
                  className="p-2 text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-7 h-7" />
                </button>
              </div>
              <ul className="flex flex-col gap-2 text-lg">
                {links.map((link) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={`block px-4 py-3 rounded-xl transition-colors ${
                          isActive ? "text-primary bg-primary/10" : "text-foreground/85 hover:bg-surface-hover"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                href="/files/cv_en.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-auto w-full"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
