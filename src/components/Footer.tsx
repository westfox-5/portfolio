import { Github, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border">
    <div className="container-page py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted">
        © {new Date().getFullYear()} Davide Volpe. Built with Next.js &amp; Tailwind CSS.
      </p>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/westfox-5"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-2.5 rounded-full text-muted hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Github className="w-[18px] h-[18px]" />
        </a>
        <a
          href="mailto:volpe_davide@outlook.it"
          aria-label="Email"
          className="p-2.5 rounded-full text-muted hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Mail className="w-[18px] h-[18px]" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
