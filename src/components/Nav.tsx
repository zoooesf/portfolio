"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: scrolled ? "14px 40px" : "22px 40px",
        background: scrolled ? "oklch(0.985 0.006 95 / 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 1px 0 var(--line)" : "none",
        transition: "background 0.4s, box-shadow 0.4s, padding 0.4s",
      }}
    >
      {/* Wordmark */}
      <a
        href="#top"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 21,
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        Zoe <span style={{ color: "var(--accent)" }}>Ferguson</span>
      </a>

      {/* Desktop links */}
      <div className="nav-links-desktop" style={{ display: "flex", gap: 36, alignItems: "center" }}>
        {["Work", "About", "Skills"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="nav-link"
            style={{
              fontSize: 14.5,
              color: "var(--ink-soft)",
              fontWeight: 500,
              position: "relative",
            }}
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          style={{
            fontSize: 14.5,
            fontWeight: 500,
            border: "1px solid var(--ink)",
            borderRadius: 100,
            padding: "9px 20px",
            color: "var(--ink)",
            transition: "background 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--ink)";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
          }}
        >
          Get in touch
        </a>
      </div>

      {/* Hamburger */}
      <button
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
        className="menu-btn"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "none",
          flexDirection: "column",
          gap: 5,
          zIndex: 60,
        }}
      >
        <span style={{ width: 24, height: 2, background: "var(--ink)", display: "block", transition: "0.3s" }} />
        <span style={{ width: 24, height: 2, background: "var(--ink)", display: "block", transition: "0.3s" }} />
        <span style={{ width: 24, height: 2, background: "var(--ink)", display: "block", transition: "0.3s" }} />
      </button>

      {/* Mobile drawer */}
      <div
        style={{
          position: "fixed",
          inset: "0 0 0 auto",
          width: "76%",
          maxWidth: 340,
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "100px 32px",
          gap: 26,
          transform: open ? "none" : "translateX(100%)",
          transition: "transform 0.4s",
          boxShadow: "-20px 0 60px -30px oklch(0 0 0 / 0.4)",
          zIndex: 55,
        }}
        className="mobile-drawer"
      >
        {["Work", "About", "Skills"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            onClick={close}
            style={{ fontSize: 18, color: "var(--ink-soft)", fontWeight: 500 }}
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={close}
          style={{
            fontSize: 18,
            fontWeight: 500,
            border: "1px solid var(--ink)",
            borderRadius: 100,
            padding: "9px 20px",
            color: "var(--ink)",
          }}
        >
          Get in touch
        </a>
      </div>

      <style>{`
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -5px;
          height: 1.5px;
          width: 0;
          background: var(--accent);
          transition: width 0.3s;
        }
        .nav-link:hover { color: var(--ink); }
        .nav-link:hover::after { width: 100%; }
        @media (max-width: 880px) {
          .nav-links-desktop { display: none !important; }
          .menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
