"use client";

import { useState, useEffect } from "react";

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
    { label: "Services", href: "#services" },
    { label: "Why it works", href: "#why" },
    { label: "Work together", href: "#engage" },
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
          href="mailto:zoe.ferguson@hotmail.com"
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
          Work with me
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
        <a href="mailto:zoe.ferguson@hotmail.com" onClick={close} style={{ fontSize: 18, fontWeight: 500, border: "1px solid var(--ink)", borderRadius: 100, padding: "9px 20px", color: "var(--ink)" }}>
          Work with me
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
        minHeight: 200,
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

/* ─── page ─── */

export default function EcommercePage() {
  useRevealAndBars();

  const platformServices = [
    {
      label: "Shopify",
      desc: "Full store setup, theme customisation, and app integrations for a polished, conversion-ready storefront.",
      icon: "🛍",
    },
    {
      label: "WordPress / WooCommerce",
      desc: "Flexible, content-forward stores with full ownership of your platform and data.",
      icon: "⚙",
    },
    {
      label: "Amazon Seller Central",
      desc: "Listing optimisation, catalogue setup, and account management to compete on Canada's largest marketplace.",
      icon: "📦",
    },
  ];

  const marketingServices = [
    {
      label: "SEO",
      desc: "On-page optimisation, keyword strategy, and technical audits so customers find you in search.",
      icon: "🔍",
    },
    {
      label: "Google Ads",
      desc: "Campaign setup, targeting, and ongoing optimisation to drive qualified traffic from day one.",
      icon: "📈",
    },
    {
      label: "Analytics & Reporting",
      desc: "GA4 setup, dashboards, and plain-English reports so you always know what's working.",
      icon: "📊",
    },
  ];

  const alacarte = [
    "Online store setup & theme",
    "SEO audit & keyword strategy",
    "Google Ads campaign setup",
    "Analytics & GA4 configuration",
    "Amazon listing optimisation",
    "Checkout & conversion review",
  ];

  const retainer = [
    "Monthly SEO maintenance & reporting",
    "Ongoing Google Ads management",
    "Store updates & product uploads",
    "Performance monitoring & insights",
  ];

  return (
    <>
      <EcomNav />

      {/* ── HERO ── */}
      <header id="top" style={{ padding: "168px 0 100px", position: "relative" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 64, alignItems: "center" }}>
            <div>
              <div className="ec-reveal" style={{ marginBottom: 22 }}>
                <Eyebrow>E-commerce &amp; digital marketing · Canada</Eyebrow>
              </div>
              <h1
                className="ec-reveal"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "-0.02em", fontSize: "clamp(40px, 5.6vw, 76px)", lineHeight: 1.04 }}
              >
                I help small Canadian businesses sell <em style={{ fontStyle: "italic", color: "var(--accent)" }}>more</em> online.
              </h1>
              <p
                className="ec-reveal"
                style={{ marginTop: 28, maxWidth: "48ch", fontSize: "clamp(17px, 2vw, 20px)", color: "var(--ink-soft)", lineHeight: 1.6 }}
              >
                From store builds to search visibility to paid ads, I offer hands-on support for every part of your online presence, with no agency overhead.
              </p>
              <div className="ec-reveal" style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: "12px 14px", alignItems: "center" }}>
                <a
                  href="mailto:zoe.ferguson@hotmail.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 9,
                    background: "var(--ink)", color: "var(--bg)",
                    borderRadius: 100, padding: "13px 26px", fontSize: 15, fontWeight: 600,
                    transition: "opacity 0.2s",
                  }}
                >
                  Get in touch →
                </a>
                <a
                  href="#services"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 9,
                    border: "1px solid var(--line)", borderRadius: 100, padding: "13px 26px",
                    fontSize: 15, color: "var(--ink-soft)", background: "var(--bg-2)",
                    transition: "border-color 0.2s",
                  }}
                >
                  See what I offer ↓
                </a>
              </div>
            </div>

            {/* Hero trust card */}
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
              <div style={{
                position: "absolute", top: -40, right: -34, width: 150, height: 150,
                borderRadius: "50%", border: "2px solid var(--accent-soft)",
                background: "radial-gradient(circle at 38% 34%, oklch(0.62 0.07 145 / 0.10), transparent 62%)",
              }} />
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(52px, 7vw, 80px)", lineHeight: 0.92, letterSpacing: "-0.03em", color: "var(--accent)" }}>
                2.8<em style={{ fontStyle: "normal", fontSize: "0.52em", verticalAlign: "super", color: "var(--accent)" }}>×</em>
              </div>
              <div style={{ marginTop: 16, fontSize: 17, lineHeight: 1.5, maxWidth: "24ch" }}>
                more likely to grow revenue — small businesses <em>with</em> an online store vs. those without.
              </div>
              <div style={{ marginTop: 20, fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.04em", color: "var(--ink-faint)" }}>
                SOURCE — GOOGLE / DELOITTE
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "92px 0", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-reveal" style={{ maxWidth: "58ch", marginBottom: 56 }}>
            <Eyebrow>What I do</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, marginTop: 18 }}>
              Platform expertise &amp; marketing, <em style={{ fontStyle: "italic", color: "var(--accent)" }}>together</em>.
            </h2>
            <p style={{ marginTop: 20, fontSize: "clamp(16px, 1.8vw, 19px)", color: "var(--ink-soft)", lineHeight: 1.55 }}>
              I work with Shopify, WordPress, and Amazon. Pairing every store with the SEO, ads, and analytics to actually drive traffic to it.
            </p>
          </div>

          {/* Platform */}
          <div className="ec-reveal" style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 20 }}>Platforms</div>
            <div className="ec-g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {platformServices.map((s) => (
                <div
                  key={s.label}
                  className="ec-stat"
                  style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 16, padding: "28px 26px" }}
                >
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{s.icon}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, letterSpacing: "-0.01em", marginBottom: 10 }}>{s.label}</div>
                  <div style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.55 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Marketing */}
          <div className="ec-reveal" style={{ marginTop: 32 }}>
            <div style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 20 }}>Marketing &amp; growth</div>
            <div className="ec-g3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {marketingServices.map((s) => (
                <div
                  key={s.label}
                  className="ec-stat"
                  style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 16, padding: "28px 26px" }}
                >
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{s.icon}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, letterSpacing: "-0.01em", marginBottom: 10 }}>{s.label}</div>
                  <div style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.55 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ── */}
      <section id="why" style={{ padding: "92px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-reveal" style={{ maxWidth: "58ch", marginBottom: 56 }}>
            <Eyebrow>Why it matters</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, marginTop: 18 }}>
              The numbers make the case for <em style={{ fontStyle: "italic", color: "var(--accent)" }}>you</em>.
            </h2>
            <p style={{ marginTop: 20, fontSize: "clamp(16px, 1.8vw, 19px)", color: "var(--ink-soft)", lineHeight: 1.55 }}>
              Your customers are already online. The question is whether they can find <em style={{ fontStyle: "italic", color: "var(--accent)" }}>and buy from</em> you.
            </p>
          </div>

          <div className="ec-g3 ec-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 20 }}>
            <StatCard
              figure="80" suffix="%"
              desc="of consumers research a product online before purchasing, even when they buy in-store."
              src="GOOGLE / THINK WITH GOOGLE"
            />
            <StatCard
              figure="70" suffix="%"
              desc="average cart abandonment rate. Most visitors who add to cart never complete the purchase, better UX recovers that revenue."
              src="BAYMARD INSTITUTE"
            />
            <StatCard
              figure="60" suffix="%"
              desc="of all ecommerce traffic worldwide comes from mobile. If your store isn't mobile-ready, you're losing more than half your visitors."
              src="STATISTA / OBERLO"
              variant="accent"
            />
          </div>

          <div className="ec-g2 ec-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            <StatCard
              figure="380" suffix="%"
              desc="more conversions for products with 50+ reviews vs. none. Trust signals turn browsers into buyers."
              src="SPIEGEL RESEARCH CENTER"
            />
            <StatCard
              figure="14.6" suffix="%"
              desc="close rate for SEO leads — vs. 1.7% for outbound. Organic search brings the highest-intent customers."
              src="SEARCH ENGINE JOURNAL"
              variant="accent"
            />
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT OPTIONS ── */}
      <section id="engage" style={{ padding: "92px 0", background: "var(--bg-2)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
          <div className="ec-reveal" style={{ maxWidth: "58ch", marginBottom: 56 }}>
            <Eyebrow>Work together</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "clamp(30px, 4.4vw, 50px)", letterSpacing: "-0.02em", lineHeight: 1.06, marginTop: 18 }}>
              Choose the model that fits your <em style={{ fontStyle: "italic", color: "var(--accent)" }}>business</em>.
            </h2>
            <p style={{ marginTop: 20, fontSize: "clamp(16px, 1.8vw, 19px)", color: "var(--ink-soft)", lineHeight: 1.55 }}>
              Whether you need a one-time project or an ongoing growth partner, I work in a way that suits you.
            </p>
          </div>

          <div className="ec-compare ec-reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* À la carte */}
            <div style={{ border: "1px solid var(--line)", borderRadius: 18, padding: "36px 34px 40px", background: "var(--bg)" }}>
              <div style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 14 }}>À la carte</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.01em", marginBottom: 8 }}>Pay per project.</h3>
              <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.55, marginBottom: 28 }}>
                Pick exactly what you need, when you need it. No long-term commitment required.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {alacarte.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.4 }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700, background: "var(--accent-soft)", color: "oklch(0.5 0.08 145)" }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:zoe.ferguson@hotmail.com"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 32, border: "1px solid var(--ink)", borderRadius: 100, padding: "11px 22px", fontSize: 14, fontWeight: 500, color: "var(--ink)", transition: "background 0.2s, color 0.2s" }}
              >
                Get a quote →
              </a>
            </div>

            {/* Retainer */}
            <div style={{ border: "1px solid oklch(0.84 0.05 145)", borderRadius: 18, padding: "36px 34px 40px", background: "var(--accent-soft)" }}>
              <div style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.5 0.08 145)", marginBottom: 14 }}>Retainer / Contract</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 28, letterSpacing: "-0.01em", marginBottom: 8, color: "var(--ink)" }}>Ongoing partnership.</h3>
              <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.55, marginBottom: 28 }}>
                For businesses that want consistent growth support without managing it themselves.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {retainer.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.4 }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700, background: "oklch(0.62 0.07 145 / 0.2)", color: "oklch(0.4 0.08 145)" }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:zoe.ferguson@hotmail.com"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 32, background: "var(--ink)", borderRadius: 100, padding: "11px 22px", fontSize: 14, fontWeight: 500, color: "var(--bg)", transition: "opacity 0.2s" }}
              >
                Let&apos;s talk →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "92px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
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
                Ready to grow your online presence?
              </h2>
              <p style={{ marginTop: 16, color: "oklch(0.82 0.01 90)", fontSize: 17, maxWidth: "40ch", position: "relative" }}>
                Whether you&apos;re starting from scratch or looking to improve what you have, I&apos;d love to hear about your business.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
              <a
                href="mailto:zoe.ferguson@hotmail.com"
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
                See my portfolio ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "40px 0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, color: "var(--ink-faint)", fontSize: 14 }}>
          <span>© 2026 Zoe Ferguson · E-commerce &amp; Digital Marketing</span>
          <span style={{ fontFamily: "var(--font-mono, ui-monospace)", fontSize: 11.5 }}>Statistics are directionally accurate, illustrative marketing figures (2025–26).</span>
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
          .ec-g3 { grid-template-columns: repeat(2, 1fr) !important; }
          .ec-g2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 880px) {
          .ec-compare { grid-template-columns: 1fr !important; }
          .ec-g3 { grid-template-columns: 1fr !important; }
          .ec-cta { grid-template-columns: 1fr !important; padding: 44px 32px !important; }
        }
      `}</style>
    </>
  );
}
