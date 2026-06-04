"use client";

import { projects } from "@/lib/data";

export default function Work() {
  return (
    <section id="work" style={{ padding: "110px 0" }} className="section-pad">
      <div
        style={{
          maxWidth: "var(--max-w-container)",
          margin: "0 auto",
          padding: "0 40px",
        }}
        className="container-pad"
      >
        <div
          className="reveal sec-head"
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
            <span className="eyebrow">Selected Work</span>
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
              Projects, shipped with intent.
            </h2>
          </div>
          <p
            style={{
              maxWidth: "34ch",
              color: "var(--ink-soft)",
              fontSize: 16,
            }}
          >
            A selection of builds spanning headless CMS sites, web apps and
            e-commerce.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="reveal project-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.05fr",
                gap: 56,
                alignItems: "center",
                padding: "56px 0",
                borderTop: "1px solid var(--line)",
                borderBottom: i === projects.length - 1 ? "1px solid var(--line)" : "none",
              }}
            >
              <div className="pj-text">
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    color: "var(--ink-faint)",
                    fontSize: 18,
                  }}
                >
                  (0{i + 1})
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(28px, 3.4vw, 40px)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    margin: "10px 0 16px",
                    lineHeight: 1.08,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    maxWidth: "44ch",
                    fontSize: 16.5,
                  }}
                >
                  {project.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 22,
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 12.5,
                        color: "var(--ink-soft)",
                        border: "1px solid var(--line)",
                        borderRadius: 100,
                        padding: "5px 13px",
                        background: "var(--bg)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link || "#"}
                  className="pj-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    marginTop: 26,
                    fontWeight: 600,
                    fontSize: 14.5,
                    color: "var(--ink)",
                  }}
                >
                  View project{" "}
                  <span className="arw" style={{ transition: "transform 0.3s" }}>
                    ↗
                  </span>
                </a>
              </div>

              <div
                className={`pj-media${i % 2 === 1 ? " pj-media-swap" : ""}`}
                style={{
                  aspectRatio: "4/3",
                  borderRadius: 14,
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid var(--line)",
                  background: "var(--bg-2)",
                  transition:
                    "transform 0.5s cubic-bezier(.2,.7,.2,1), box-shadow 0.5s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-6px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 30px 60px -30px oklch(0.4 0.03 80 / 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "none";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <a
                  href={project.link || "#"}
                >
                <img
                  src={typeof project.image === "string" ? project.image : project.image.src}
                  alt={project.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", display: "block"}}
                />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .pj-link:hover .arw { transform: translate(4px, -4px); }
        @media (max-width: 880px) {
          .section-pad { padding: 80px 0 !important; }
          .container-pad { padding: 0 24px !important; }
          .project-row { grid-template-columns: 1fr !important; gap: 28px !important; }
          .pj-media-swap { order: 0 !important; }
        }
      `}</style>
    </section>
  );
}
