"use client";

import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const revealAll = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
        el.classList.add("in");
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const observe = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => io.observe(el));
    };

    observe();

    window.addEventListener("load", () => setTimeout(revealAll, 400));
    const fallback = setTimeout(revealAll, 1400);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);
}
