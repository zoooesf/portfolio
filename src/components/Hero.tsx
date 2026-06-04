export default function Hero() {
  return (
    <header
      id="top"
      style={{ padding: "200px 0 120px" }}
      className="hero-header"
    >
      <div
        style={{
          maxWidth: "var(--max-w-container)",
          margin: "0 auto",
          padding: "0 40px",
        }}
        className="container-pad"
      >
        <div className="reveal" style={{ marginBottom: 36 }}>
          <span className="eyebrow">Front-End Developer &amp; Designer</span>
        </div>

        <h1
          className="reveal"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            fontSize: "clamp(48px, 8vw, 104px)",
            lineHeight: 1.02,
            maxWidth: "13ch",
          }}
        >
          Building thoughtful interfaces with{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>care</em>{" "}
          and craft.
        </h1>

        <p
          className="reveal"
          style={{
            marginTop: 40,
            maxWidth: "56ch",
            fontSize: "clamp(18px, 2.1vw, 22px)",
            color: "var(--ink-soft)",
            lineHeight: 1.65,
          }}
        >
          I&apos;m Zoe, a front-end developer who designs. I build fast,
          accessible web experiences primarily in React, TypeScript and Next.js with a variety of CMS platforms, and I
          love the details that make an interface feel considered.
        </p>

        <div
          className="reveal"
          style={{
            marginTop: 52,
            display: "flex",
            flexWrap: "wrap",
            gap: "14px 40px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              border: "1px solid var(--line)",
              borderRadius: 100,
              padding: "9px 18px",
              fontSize: 14,
              color: "var(--ink-soft)",
              background: "var(--bg-2)",
            }}
          >
            <span
              className="dot-pulse"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
              }}
            />
            Available for freelance
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid var(--line)",
              borderRadius: 100,
              padding: "9px 18px",
              fontSize: 14,
              color: "var(--ink-soft)",
              background: "var(--bg-2)",
            }}
          >
            Based in Canada
          </span>
          <a
            href="#work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid var(--ink)",
              borderRadius: 100,
              padding: "9px 18px",
              fontSize: 14,
              color: "var(--ink-soft)",
              background: "var(--bg-2)",
            }}
          >
            Selected work ↓
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .hero-header { padding: 150px 0 80px !important; }
          .container-pad { padding: 0 24px !important; }
        }
      `}</style>
    </header>
  );
}
