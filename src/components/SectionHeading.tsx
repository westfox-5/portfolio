"use client";

import { LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description?: string;
};

const SectionHeading = ({ icon: Icon, eyebrow, title, description }: SectionHeadingProps) => (
  <Reveal className="mb-12 md:mb-16">
    <div className="badge-eyebrow">
      <Icon className="w-4 h-4" />
      {eyebrow}
    </div>
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">{title}</h2>
    {description && (
      <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
    )}
  </Reveal>
);

export default SectionHeading;
