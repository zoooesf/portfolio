"use client";

import { useState, useEffect, useRef } from "react";

/* ─── helpers ─── */

function useScrolled(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useRevealAndBars() {
  useEffect(() => {
    const revealAll = () => {
      document.querySelectorAll<HTMLElement>(".ec-reveal:not(.in)").forEach((el) => el.classList.add("in"));
      document.querySelectorAll<HTMLElement>(".ec-bar-fill").forEach((b) => {
        if (!b.style.width) b.style.width = b.dataset.w ?? "0%";
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            (e.target as HTMLElement).querySelectorAll<HTMLElement>(".ec-bar-fill").forEach((b) => {
              b.style.width = b.dataset.w ?? "0%";
            });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll<HTMLElement>(".ec-reveal").forEach((el) => io.observe(el));

    window.addEventListener("load", () => setTimeout(revealAll, 500));
    const t = setTimeout(revealAll, 1600);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
}

/* ─── sub-components ─── */

function EcomNav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const links = [
    { label: "Checkout", href: "#checkout" },
    { label: "Mobile", href: "#mobile" },
    { label: "Trust", href: "#trust" },
    { label: "Discovery", href: "#discovery" },
  ];

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
      <a
        href="#top"
        style={{ fontFamily: "var(--font-serif)", fontSize: 21, fontWeight: 500, letterSpacing: "-0.01em" }}
      >
        Zoe <span style={{ color: "var(--accent)" }}>Ferguson</span>
      </a>

      <div className="ec-nav-desktop" style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="ec-nav-link"
            style={{ fontSize: 14, color: "var(--ink-soft)", fontWeight: 500, position: "relative" }}
          >
            {label}
          </a>
        ))}
        <a
          href="#cta"
          className="ec-nav-cta"
          style={{
            fontSize: 14,
            fontWeight: 500,
            border: "1px solid var(--ink)",
            borderRadius: 100,
            padding: "9px 20px",
            color: "var(--ink)",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          Build my store
        </a>
      </div>

      <button
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
        className="ec-menu-btn"
        style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, zIndex: 60 }}
      >
        <span style={{ width: 24, height: 2, background: "var(--ink)", display: "block" }} />
        <span style={{ width: 24, height: 2, background: "var(--ink)", display: "block" }} />
        <span style={{ width: 24, height: 2, background: "var(--ink)", display: "block" }} />
      </button>

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
          gap: 24,
          transform: open ? "none" : "translateX(100%)",
          transition: "transform 0.4s",
          boxShadow: "-20px 0 60px -30px oklch(0 0 0 / 0.4)",
          zIndex: 55,
        }}
      >
        {links.map(({ label, href }) => (
          <a key={label} href={href} onClick={close} style={{ fontSize: 18, color: "var(--ink-soft)", fontWeight: 500 }}>
            {label}
          </a>
        ))}
        <a href="#cta" onClick={close} style={{ fontSize: 18, fontWeight: 500, border: "1px solid var(--ink)", borderRadius: 100, padding: "9px 20px", color: "var(--ink)" }}>
          Build my store
        </a>
      </div>

      <style>{`
        .ec-nav-link::after { content:""; position:absolute; left:0; bottom:-5px; height:1.5px; width:0; background:var(--accent); transition:width 0.3s; }
        .ec-nav-link:hover { color:var(--ink); }
        .ec-nav-link:hover::after { width:100%; }
        .ec-nav-cta:hover { background:var(--ink); color:var(--bg) !important; }
        @media (max-width:880px) {
          .ec-nav-desktop { display:none !important; }
          .ec-menu-btn { display:flex !important; }
          nav { padding:18px 24px !important; }
        }
      `}</style>
    </nav>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

function StatCard({ figure, suffix, desc, src, variant }: { figure: string; suffix?: string; desc: string; src: string; variant?: "accent" | "lead" }) {
  const isAccent = variant === "accent";
  const isLead = variant === "lead";
  return (
    <div
      className="ec-stat"
      style={{
        background: isAccent ? "var(--accent-soft)" : isLead ? "var(--ink)" : "var(--bg)",
        border: `1px solid ${isAccent ? "oklch(0.84 0.05 145)" : isLead ? "var(--ink)" : "var(--line)"}`,
        borderRadius: 16,
        padding: "30px 28px",
        display: "flex",
        flexDirection: "column",
        minHeight: 220,
        transition: "transform 0.4s cubic-bezier(.2,.7,.2,1), box-shadow 0.4s, border-color 0.3s",
      }}
    >
      <div style={{
        fontFamily: "var(--font-serif)",
        fontWeight: 400,
        fontSize: "clamp(42px, 5vw, 60px)",
        lineHeight: 0.96,
        letterSpacing: "-0.02em",
        color: isAccent ? "oklch(0.5 0.08 145)" : isLead ? "var(--bg)" : "var(--ink)",
      }}>
        {figure}{suffix && <em style={{ fontStyle: "normal", color: isAccent ? "oklch(0.5 0.08 145)" : isLead ? "var(--bg)" : "var(--accent)" }}>{suffix}</em>}
      </div>
      <div style={{ marginTop: 14, fontSize: 15.5, lineHeight: 1.5, color: isLead ? "oklch(0.82 0.01 90)" : "var(--ink-soft)", flex: 1 }}>{desc}</div>
      <div style={{ marginTop: 16, fontFamily: "var(--font-mono, ui-monospace, 'SF Mono', monospace)", fontSize: 10.5, letterSpacing: "0.03em", color: isLead ? "oklch(0.66 0.01 90)" : "var(--ink-faint)" }}>{src}</div>
    </div>
  );
}

function BarChart({ caption, rows, src }: {
  caption: string;
  rows: { label: string; sublabel: string; w: string; hi: boolean; val: string }[];
  src: string;
}) {
  return (
    <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 16, padding: "34px 34px 30px" }}>
      <div style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 26 }}>{caption}</div>
      {rows.map((row) => (
        <div key={row.label} className="ec-bar-row" style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 20 }}>
          <div className="ec-bar-label" style={{ width: 130, flexShrink: 0, fontSize: 14, color: "var(--ink-soft)", textAlign: "right", lineHeight: 1.25 }}>
            <strong style={{ color: "var(--ink)", fontWeight: 600, display: "block" }}>{row.label}</strong>
            {row.sublabel}
          </div>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ height: 44, background: "var(--bg-2)", borderRadius: 8, overflow: "hidden" }}>
              <div
                className="ec-bar-fill"
                data-w={row.w}
                style={{
                  height: "100%",
                  borderRadius: 8,
                  width: 0,
                  transition: "width 1.1s cubic-bezier(.2,.7,.2,1)",
                  background: row.hi ? "linear-gradient(90deg, var(--accent), oklch(0.5 0.08 145))" : "oklch(0.9 0.02 120)",
                }}
              />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: row.hi ? "var(--accent-deep)" : "var(--ink-soft)", paddingLeft: 4 }}>{row.val}</div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 22, fontFamily: "var(--font-mono, ui-monospace)", fontSize: 10.5, letterSpacing: "0.03em", color: "var(--ink-faint)" }}>SOURCE — {src}</div>
    </div>
  );
}

/* ─── page ─── */

export default function EcommercePage() {
  useRevealAndBars();

  return (
    <>
      <EcomNav />

      {/* ── HERO ── */}
      <header id="top" style={{ padding: "168px 0 96px", position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="ec-reveal" style={{ marginBottom: 30 }}>
                <Eyebrow>The case for selling online</Eyebrow>
              </div>
              <h1
                className="ec-reveal"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "-0.02em", fontSize: "clamp(40px, 5.6vw, 76px)", lineHeight: 1.04 }}
              >
                Most of your customers are <em style={{ fontStyle: "italic", color: "var(--accent)" }}>already</em> ready to buy online.
              </h1>
              <p
                className="ec-reveal"
                style={{ marginTop: 30, maxWidth: "50ch", fontSize: "clamp(17px, 2vw, 20px)", color: "var(--ink-soft)", lineHeight: 1.6 }}
              >
                The question isn&apos;t whether people are shopping online — it&apos;s whether they can shop with <em>you</em>. Here&apos;s what the research says about ecommerce, conversion, trust, speed and discovery for small businesses in 2026.
              </p>
              <div className="ec-reveal" style={{ marginTop: 38, display: "flex", flexWrap: "wrap", gap: "12px 14px", alignItems: "center" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 9, border: "1px solid var(--line)", borderRadius: 100, padding: "9px 18px", fontSize: 14, color: "var(--ink-soft)", background: "var(--bg-2)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", animation: "ec-pulse 2s infinite", display: "inline-block" }} />
                  7 sections · 25+ data points
                </span>
                <a href="#cta" style={{ display: "inline-flex", alignItems: "center", gap: 9, border: "1px solid var(--ink)", borderRadius: 100, padding: "9px 18px", fontSize: 14, color: "var(--ink-soft)", background: "var(--bg-2)" }}>
                  See the ROI case ↓
                </a>
              </div>
            </div>

            {/* Hero stat card */}
            <div
              className="ec-reveal"
              style={{
                background: "var(--bg-2)",
                border: "1px solid var(--line)",
                borderRadius: 20,
                padding: "40px 38px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 40px 80px -50px oklch(0.4 0.03 80 / 0.5)",
              }}
            >
              {/* cart icon decoration */}
              <div style={{
                position: "absolute", top: -40, right: -34, width: 150, height: 150,
                borderRadius: "50%", border: "2px solid var(--accent-soft)",
                background: "radial-gradient(circle at 38% 34%, oklch(0.62 0.07 145 / 0.10), transparent 62%)",
              }}>
                <div style={{
                  position: "absolute", right: -26, bottom: -10, width: 50, height: 14,
                  borderRadius: 100, background: "var(--accent-soft)", transform: "rotate(45deg)",
                }} />
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(72px, 9vw, 108px)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "var(--accent)" }}>
                2.77<span style={{ fontSize: "0.45em", letterSpacing: 0, verticalAlign: "super", color: "var(--accent)" }}>%</span>
              </div>
              <div style={{ marginTop: 14, fontSize: 18, lineHeight: 1.45, maxWidth: "22ch" }}>
                average ecommerce conversion rate — meaning <em>97 in 100 visitors</em> leave without buying. There&apos;s enormous room to improve.
              </div>
              <div style={{ marginTop: 22, fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.04em", color: "var(--ink-faint)" }}>
                SOURCE — IRP COMMERCE / STATISTA
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 01 — THE CASE FOR ECOMMERCE ── */}
      <section id="invisible" style={{ padding: "92px 0", background: "var(--bg-2)", position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-reveal" style={{ maxWidth: "60ch", marginBottom: 56 }}>
            <Eyebrow>01 — The case for selling online</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, marginTop: 18 }}>
              If you can&apos;t sell online, you&apos;re not <em style={{ fontStyle: "italic", color: "var(--accent)" }}>competing</em>.
            </h2>
            <p style={{ marginTop: 22, fontSize: "clamp(18px, 2vw, 22px)", color: "var(--ink-soft)", fontFamily: "var(--font-serif)", lineHeight: 1.45, maxWidth: "52ch" }}>
              Online shopping isn&apos;t a niche channel — it&apos;s where most purchase journeys begin, even for things people end up buying in person.
            </p>
          </div>

          <div className="ec-reveal">
            {/* Comparison */}
            <div className="ec-compare" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div style={{ border: "1px solid var(--line)", borderRadius: 16, padding: "30px 30px 34px", background: "var(--bg)" }}>
                <div style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-deep)" }}>◆ With an online store</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 26, margin: "8px 0 20px", letterSpacing: "-0.01em" }}>Open 24/7. No overhead.</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {[
                    "Captures the 63% of shopping journeys that begin online",
                    "Serves customers outside your geography and store hours",
                    "Builds a data asset: email list, purchase history, retargeting",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.45 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700, background: "var(--accent-soft)", color: "oklch(0.5 0.08 145)" }}>✓</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ border: "1px solid var(--line)", borderRadius: 16, padding: "30px 30px 34px", background: "var(--bg-2)" }}>
                <div style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)" }}>○ Without one</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 26, margin: "8px 0 20px", letterSpacing: "-0.01em" }}>Invisible at the moment of purchase.</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                  {[
                    "Misses the 80% of consumers who research online before any purchase",
                    "Closed evenings, weekends, and every holiday",
                    "No way to re-engage customers who almost bought",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.45 }}>
                      <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700, background: "oklch(0.93 0.04 35)", color: "oklch(0.5 0.14 30)" }}>✕</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ec-g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              <StatCard figure="80" suffix="%" desc="of consumers research a product online before purchasing — even when they buy in-store." src="GOOGLE / THINK WITH GOOGLE" />
              <StatCard figure="63" suffix="%" desc="of shopping journeys now begin online, regardless of where the final purchase happens." src="GOOGLE CONSUMER INSIGHTS" />
              <StatCard figure="2.8×" desc="more likely to grow revenue — small businesses with an online store, per the Google/Deloitte study of 4,500+ firms." src="GOOGLE / DELOITTE" variant="accent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 — CHECKOUT ── */}
      <section id="checkout" style={{ padding: "92px 0", position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-reveal" style={{ maxWidth: "60ch", marginBottom: 56 }}>
            <Eyebrow>02 — The checkout moment is fragile</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, marginTop: 18 }}>
              Seven in ten shoppers leave before they <em style={{ fontStyle: "italic", color: "var(--accent)" }}>buy</em>.
            </h2>
            <p style={{ marginTop: 22, fontSize: "clamp(18px, 2vw, 22px)", color: "var(--ink-soft)", fontFamily: "var(--font-serif)", lineHeight: 1.45, maxWidth: "52ch" }}>
              Cart abandonment is the biggest leak in most ecommerce stores — and most of it is recoverable with better UX.
            </p>
          </div>

          <div className="ec-reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20, alignItems: "start" }} >
            <StatCard figure="70" suffix="%" desc="average cart abandonment rate across all industries. Most visitors who add something to cart never complete the purchase." src="BAYMARD INSTITUTE" variant="lead" />
            <StatCard figure="$260B" desc="worth of lost orders are recoverable annually with improved checkout UX — better forms, fewer steps, clearer trust signals." src="BAYMARD INSTITUTE" />
          </div>

          <div className="ec-reveal">
            <BarChart
              caption="▦ Top reasons shoppers abandon the checkout"
              rows={[
                { label: "Forced account", sublabel: "create account", w: "34%", hi: true, val: "34%" },
                { label: "Complex flow", sublabel: "too many steps", w: "26%", hi: true, val: "26%" },
                { label: "Hidden fees", sublabel: "shipping surprise", w: "48%", hi: false, val: "48% — #1 reason" },
              ]}
              src="BAYMARD INSTITUTE"
            />
          </div>
        </div>
      </section>

      {/* ── 03 — MOBILE ── */}
      <section id="mobile" style={{ padding: "92px 0", background: "var(--bg-2)", position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-reveal" style={{ maxWidth: "60ch", marginBottom: 56 }}>
            <Eyebrow>03 — Mobile is the storefront</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, marginTop: 18 }}>
              If your store is clunky on a phone, you lose the <em style={{ fontStyle: "italic", color: "var(--accent)" }}>sale</em>.
            </h2>
            <p style={{ marginTop: 22, fontSize: "clamp(18px, 2vw, 22px)", color: "var(--ink-soft)", fontFamily: "var(--font-serif)", lineHeight: 1.45, maxWidth: "52ch" }}>
              Over half of all ecommerce traffic is now on mobile — and mobile shoppers are the most impatient segment.
            </p>
          </div>

          <div className="ec-g2-center ec-reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center", marginBottom: 20 }}>
            {/* Phone mockup */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 280, border: "1px solid var(--line)", borderRadius: 34, background: "var(--bg)", padding: 12, boxShadow: "0 50px 90px -50px oklch(0.4 0.03 80 / 0.6)", position: "relative" }}>
                <div style={{ width: 110, height: 22, background: "var(--bg-2)", borderRadius: "0 0 14px 14px", margin: "0 auto 8px" }} />
                <div style={{ border: "1px solid var(--line)", borderRadius: 22, overflow: "hidden", background: "var(--bg-2)" }}>
                  {/* search bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ flex: 1, background: "var(--bg-2)", borderRadius: 100, padding: "6px 12px", fontSize: 11.5, color: "var(--ink-faint)", fontFamily: "var(--font-mono, ui-monospace)" }}>
                      handmade candles shop
                    </div>
                  </div>
                  {/* product cards */}
                  <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ background: "var(--accent-soft)", border: "1px solid var(--accent)", borderRadius: 12, padding: "13px 14px" }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>Your Store</div>
                      <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 3, fontFamily: "var(--font-mono, ui-monospace)" }}>★ 4.9 · Ships in 2 days · Free returns</div>
                    </div>
                    <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 12, padding: "13px 14px" }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>Competitor A</div>
                      <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 3, fontFamily: "var(--font-mono, ui-monospace)" }}>★ 4.1 · Ships in 5–7 days</div>
                    </div>
                    <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 12, padding: "13px 14px" }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>Competitor B</div>
                      <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 3, fontFamily: "var(--font-mono, ui-monospace)" }}>★ 3.7 · No returns</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats + checklist */}
            <div>
              <div className="ec-g2-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                {[
                  { fig: "60", suf: "%", desc: "of all ecommerce traffic worldwide comes from mobile devices.", src: "STATISTA / OBERLO" },
                  { fig: "3×", suf: "", desc: "higher cart abandonment on mobile compared to desktop when the experience is poor.", src: "BAYMARD INSTITUTE" },
                ].map((c) => (
                  <div key={c.fig} style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 16, padding: "22px 22px" }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 4vw, 48px)", lineHeight: 0.96, letterSpacing: "-0.02em" }}>
                      {c.fig}<em style={{ fontStyle: "normal", color: "var(--accent)" }}>{c.suf}</em>
                    </div>
                    <div style={{ marginTop: 10, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.45 }}>{c.desc}</div>
                    <div style={{ marginTop: 10, fontFamily: "var(--font-mono, ui-monospace)", fontSize: 10, letterSpacing: "0.03em", color: "var(--ink-faint)" }}>{c.src}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { t: "40% would switch to a competitor after a bad mobile experience", s: "Mobile experience directly drives brand loyalty. — Sweor" },
                  { t: "Mobile-optimised stores see 15% higher average order value", s: "Fast, thumb-friendly checkout pays off immediately. — Deloitte" },
                ].map((c) => (
                  <div key={c.t} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <span style={{ width: 22, height: 22, borderRadius: 6, background: "var(--accent-soft)", color: "oklch(0.5 0.08 145)", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <div>
                      <div style={{ fontSize: 16, color: "var(--ink)", fontWeight: 500 }}>{c.t}</div>
                      <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 2 }}>{c.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 — TRUST ── */}
      <section id="trust" style={{ padding: "92px 0", position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-reveal" style={{ maxWidth: "60ch", marginBottom: 56 }}>
            <Eyebrow>04 — Trust converts browsers into buyers</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, marginTop: 18 }}>
              Before they hand over their card, they need to trust <em style={{ fontStyle: "italic", color: "var(--accent)" }}>you</em>.
            </h2>
            <p style={{ marginTop: 22, fontSize: "clamp(18px, 2vw, 22px)", color: "var(--ink-soft)", fontFamily: "var(--font-serif)", lineHeight: 1.45, maxWidth: "52ch" }}>
              Reviews, clear policies, and professional design aren&apos;t optional polish — they&apos;re the difference between a sale and an abandoned tab.
            </p>
          </div>

          <div className="ec-reveal" style={{ marginBottom: 20 }}>
            <BarChart
              caption="▦ Conversion lift from trust signals"
              rows={[
                { label: "No reviews", sublabel: "baseline", w: "14%", hi: false, val: "baseline" },
                { label: "5–9 reviews", sublabel: "early social proof", w: "38%", hi: true, val: "+270% lift" },
                { label: "50+ reviews", sublabel: "strong signal", w: "80%", hi: true, val: "+380% lift" },
              ]}
              src="SPIEGEL RESEARCH CENTER / POWERREVIEWS"
            />
          </div>

          <div className="ec-g3 ec-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            <StatCard figure="93" suffix="%" desc="of consumers say online reviews influence their purchasing decision." src="PODIUM" />
            <StatCard figure="72" suffix="%" desc="won't take action until they've read reviews — even for low-cost items." src="MYLES AGENCY / BRIGHTLOCAL" />
            <StatCard figure="380" suffix="%" desc="more conversions for products with 50+ reviews vs. no reviews at all." src="SPIEGEL RESEARCH CENTER" variant="accent" />
          </div>
        </div>
      </section>

      {/* ── 05 — SPEED ── */}
      <section id="speed" style={{ padding: "92px 0", background: "var(--bg-2)", position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-reveal" style={{ maxWidth: "60ch", marginBottom: 56 }}>
            <Eyebrow>05 — Speed is a sales tool</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, marginTop: 18 }}>
              Every second of load time costs you <em style={{ fontStyle: "italic", color: "var(--accent)" }}>conversions</em>.
            </h2>
            <p style={{ marginTop: 22, fontSize: "clamp(18px, 2vw, 22px)", color: "var(--ink-soft)", fontFamily: "var(--font-serif)", lineHeight: 1.45, maxWidth: "52ch" }}>
              Performance isn&apos;t a developer obsession — it&apos;s directly measurable in revenue. Faster pages sell more.
            </p>
          </div>

          <div className="ec-g2-start ec-reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start", marginBottom: 20 }}>
            {/* Funnel-style speed steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { n: "01", title: "Under 2 seconds", sub: "Google's benchmark for fast", val: "optimal" },
                { n: "02", title: "3-second load", sub: "mobile tipping point", val: "53% leave" },
                { n: "03", title: "Each extra second", sub: "beyond 3s", val: "−7% conv." },
              ].map((step) => (
                <div key={step.n} style={{ display: "flex", alignItems: "center", gap: 18, border: "1px solid var(--line)", borderRadius: 14, background: "var(--bg)", padding: "22px 26px" }}>
                  <span style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 12, color: "var(--ink-faint)", width: 28, flexShrink: 0 }}>{step.n}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 21, letterSpacing: "-0.01em" }}>{step.title}</div>
                    <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{step.sub}</div>
                  </div>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(22px, 2.5vw, 32px)", color: "var(--accent)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>{step.val}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <StatCard figure="100" suffix="ms" desc="of improved load time produces a 1% increase in revenue — Deloitte study across retail, travel and luxury sites." src="DELOITTE" />
              <StatCard figure="21" suffix="%" desc="more conversions with a streamlined, single-page checkout vs. multi-step flows." src="BAYMARD INSTITUTE" variant="accent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 — DISCOVERY ── */}
      <section id="discovery" style={{ padding: "92px 0", position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-reveal" style={{ maxWidth: "60ch", marginBottom: 56 }}>
            <Eyebrow>06 — Discovery starts before your store</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, marginTop: 18 }}>
              Customers find you on Google and social — <em style={{ fontStyle: "italic", color: "var(--accent)" }}>before</em> they visit.
            </h2>
            <p style={{ marginTop: 22, fontSize: "clamp(18px, 2vw, 22px)", color: "var(--ink-soft)", fontFamily: "var(--font-serif)", lineHeight: 1.45, maxWidth: "52ch" }}>
              Organic discovery is the highest-converting channel in ecommerce — and it compounds over time.
            </p>
          </div>

          {/* Pathway */}
          <div className="ec-path ec-reveal" style={{ display: "flex", alignItems: "stretch", flexWrap: "wrap", marginBottom: 20 }}>
            {[
              { stage: "◆ Search", fig: "46%", ds: "of product searches begin on Google — not Amazon, not a brand site." },
              { stage: "◆ Social", fig: "54%", ds: "use social media to research products before making a purchase." },
              { stage: "◆ Convert", fig: "14.6%", ds: "close rate for SEO leads — vs. 1.7% for outbound marketing." },
            ].map((node, i) => (
              <>
                <div
                  key={node.stage}
                  style={{ flex: 1, minWidth: 180, border: "1px solid var(--line)", borderRadius: 16, background: "var(--bg)", padding: "26px 24px", position: "relative" }}
                >
                  <div style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.5 0.08 145)" }}>{node.stage}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 4vw, 48px)", letterSpacing: "-0.02em", margin: "10px 0 8px" }}>{node.fig}</div>
                  <div style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.45 }}>{node.ds}</div>
                </div>
                {i < 2 && (
                  <div className="ec-arrowcol" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, color: "var(--ink-faint)", fontSize: 22 }}>→</div>
                )}
              </>
            ))}
          </div>

          <div className="ec-g2 ec-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            <StatCard figure="23×" desc="more conversions from SEO traffic than from paid advertising — organic intent is unmatched." src="SEARCH ENGINE JOURNAL" variant="accent" />
            <StatCard figure="49" suffix="%" desc="of shoppers say they use Google to discover or find a new item they want — the funnel starts in search." src="THINK WITH GOOGLE" />
          </div>
        </div>
      </section>

      {/* ── 07 — ROI ── */}
      <section id="roi" style={{ padding: "92px 0", background: "var(--bg-2)", position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-reveal" style={{ maxWidth: "60ch", marginBottom: 56 }}>
            <Eyebrow>07 — The ROI case</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, marginTop: 18 }}>
              Your online store isn&apos;t a cost — it&apos;s where <em style={{ fontStyle: "italic", color: "var(--accent)" }}>growth</em> compounds.
            </h2>
            <p style={{ marginTop: 22, fontSize: "clamp(18px, 2vw, 22px)", color: "var(--ink-soft)", fontFamily: "var(--font-serif)", lineHeight: 1.45, maxWidth: "52ch" }}>
              Done well, ecommerce pays for itself quickly — and unlike ads, organic traffic keeps building.
            </p>
          </div>

          <div className="ec-roi ec-reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "stretch", marginBottom: 28 }}>
            {/* Growth chart */}
            <div style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--bg)", padding: 34, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)" }}>▦ Revenue trajectory after launching ecommerce</div>
              <div style={{ position: "relative", flex: 1, minHeight: 220, marginTop: 20, borderLeft: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                <div style={{
                  position: "absolute", left: 0, bottom: 0, width: "100%", height: "100%",
                  background: "linear-gradient(180deg, oklch(0.62 0.07 145 / 0.16), transparent 80%)",
                  clipPath: "polygon(0 100%, 0 80%, 20% 74%, 38% 64%, 56% 48%, 78% 28%, 100% 6%, 100% 100%)",
                }} />
                <div style={{ position: "absolute", width: 11, height: 11, borderRadius: "50%", background: "var(--accent)", border: "2px solid var(--bg)", right: -5, top: 4, boxShadow: "0 0 0 4px oklch(0.62 0.07 145 / 0.16)" }} />
                <div style={{ position: "absolute", right: 8, top: 18, fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, color: "oklch(0.5 0.08 145)" }}>growth</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, color: "var(--ink-faint)" }}>
                <span>launch</span><span>6 months</span><span>ongoing</span>
              </div>
            </div>

            {/* ROI stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { fig: "400%+", desc: "average ROI for small businesses that invest in ecommerce and organic search together.", src: "FINANCES ONLINE / HUBSPOT" },
                { fig: "6 mo", desc: "median time for a new online store to see measurable revenue growth after launch.", src: "SHOPIFY / RUDYS.AI" },
              ].map((s) => (
                <div key={s.fig} style={{ border: "1px solid var(--line)", borderRadius: 18, background: "var(--bg)", padding: "30px 32px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(44px, 5vw, 60px)", color: "var(--accent)", letterSpacing: "-0.02em", lineHeight: 0.96 }}>{s.fig}</div>
                  <div style={{ marginTop: 12, fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.5, maxWidth: "34ch" }}>
                    {s.desc}
                    <span style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, color: "var(--ink-faint)", display: "block", marginTop: 8, letterSpacing: "0.03em" }}>{s.src}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            id="cta"
            className="ec-cta ec-reveal"
            style={{
              background: "var(--ink)",
              borderRadius: 22,
              padding: "64px 56px",
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr",
              gap: 40,
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", right: -80, top: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, oklch(0.62 0.07 145 / 0.4), transparent 68%)" }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(32px, 4.4vw, 52px)", color: "var(--bg)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                Let&apos;s build a store that customers actually <em style={{ fontStyle: "italic", color: "var(--accent-soft)" }}>buy from</em>.
              </h2>
              <p style={{ marginTop: 16, color: "oklch(0.82 0.01 90)", fontSize: 17, maxWidth: "40ch", position: "relative" }}>
                Fast checkout, mobile-first design, trust signals baked in — and the SEO foundation to bring organic traffic from day one.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
              <a
                href="mailto:hello@zferguson.ca"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 14, borderRadius: 100, padding: "18px 26px", fontSize: 16, fontWeight: 600, background: "var(--accent)", color: "oklch(0.2 0.02 145)", transition: "transform 0.2s, background 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-soft)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)"; }}
              >
                Start the conversation <span>→</span>
              </a>
              <a
                href="https://www.zferguson.ca/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: 14, borderRadius: 100, padding: "18px 26px", fontSize: 16, fontWeight: 600, border: "1px solid oklch(0.5 0.01 90)", color: "var(--bg)", transition: "transform 0.2s, border-color 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--bg)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.5 0.01 90)"; }}
              >
                See my work <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "40px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, color: "var(--ink-faint)", fontSize: 14 }}>
          <span>© 2026 Zoe Ferguson · Front-End Developer &amp; Designer</span>
          <span style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11.5 }}>Figures are directionally accurate, illustrative marketing statistics (2025–26).</span>
        </div>
      </footer>

      <style>{`
        @keyframes ec-pulse {
          0%, 100% { box-shadow: 0 0 0 0 oklch(0.62 0.07 145 / 0.5); }
          50% { box-shadow: 0 0 0 6px oklch(0.62 0.07 145 / 0); }
        }
        .ec-reveal {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.8s cubic-bezier(.2,.7,.2,1), transform 0.8s cubic-bezier(.2,.7,.2,1);
        }
        .ec-reveal.in { opacity: 1; transform: none; }
        .ec-stat:hover { transform: translateY(-5px); box-shadow: 0 28px 56px -36px oklch(0.4 0.03 80 / 0.45); border-color: oklch(0.82 0.02 120) !important; }
        @media (max-width: 980px) {
          .ec-hero-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          .ec-roi { grid-template-columns: 1fr !important; }
          .ec-g3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 880px) {
          .ec-compare { grid-template-columns: 1fr !important; }
          .ec-g3 { grid-template-columns: 1fr !important; }
          .ec-g2-center { grid-template-columns: 1fr !important; }
          .ec-g2-start { grid-template-columns: 1fr !important; }
          .ec-g2 { grid-template-columns: 1fr !important; }
          .ec-g2-inner { grid-template-columns: 1fr !important; }
          .ec-path { flex-direction: column !important; }
          .ec-arrowcol { width: 100% !important; height: 30px !important; transform: rotate(90deg) !important; }
          .ec-cta { grid-template-columns: 1fr !important; padding: 44px 32px !important; }
          .ec-bar-row { flex-direction: column !important; align-items: stretch !important; gap: 8px !important; }
          .ec-bar-label { width: auto !important; text-align: left !important; font-size: 13px !important; }
        }
      `}</style>
    </>
  );
}
