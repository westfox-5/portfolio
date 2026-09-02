"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={handleClick}
      className={`fixed bottom-6 left-6 z-50 p-3 rounded-full bg-glass border border-border shadow-card text-primary transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-95 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;
