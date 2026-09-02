"use client";

const Separator = () => (
  <div className="w-full flex justify-center select-none pointer-events-none" aria-hidden="true">
    <div className="h-px w-40 bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
  </div>
);

export default Separator;
