"use client";

import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "110px 0" }} className="section-pad">
      <div
        style={{
          maxWidth: "var(--max-w-container)",
          margin: "0 auto",
          padding: "0 40px",
        }}
        className="container-pad"
      >
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40,
            marginBottom: 64,
            flexWrap: "wrap",
          }}
        >
          <div>
            <span className="eyebrow">Capabilities</span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(32px, 5vw, 56px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginTop: 18,
              }}
            >
              What I work with.
            </h2>
          </div>
          <p style={{ maxWidth: "34ch", color: "var(--ink-soft)", fontSize: 16 }}>
            A modern front-end toolkit, with an eye for design systems and
            accessible, responsive UI.
          </p>
        </div>

        <div
          className="reveal skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--line)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="skill-cell"
              style={{
                background: "var(--bg)",
                padding: "30px 26px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "var(--accent-soft)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "var(--bg)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  color: "var(--ink-faint)",
                  fontSize: 14,
                }}
              >
                0{i + 1}
              </span>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  margin: "8px 0 6px",
                }}
              >
                {skill.name}
              </div>
              <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
                {skill.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .section-pad { padding: 80px 0 !important; }
          .container-pad { padding: 0 24px !important; }
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
