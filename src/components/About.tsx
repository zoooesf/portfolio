import Image from "next/image";
import headshot from "@/assets/headshot.jpg";

export default function About() {
  return (
    <section
      id="about"
      style={{ padding: "110px 0", background: "var(--bg-2)" }}
      className="section-pad"
    >
      <div
        style={{
          maxWidth: "var(--max-w-container)",
          margin: "0 auto",
          padding: "0 40px",
        }}
        className="container-pad"
      >
        <div className="reveal" style={{ marginBottom: 48 }}>
          <span className="eyebrow">About</span>
        </div>

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 72,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div className="reveal">
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(24px, 3.2vw, 34px)",
                lineHeight: 1.32,
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              I love{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                creating.
              </em>{" "}
              Whether it&apos;s code at work or crafts in my own time. That
              maker&apos;s instinct is what pulls me toward the front end.
            </p>
            <div
              style={{
                marginTop: 28,
                color: "var(--ink-soft)",
                fontSize: 17,
                maxWidth: "52ch",
              }}
            >
              <p>
                I&apos;m a front-end developer focused on building interfaces
                that are fast, responsive and genuinely pleasant to use. My
                day-to-day lives in React, TypeScript, Next.js and Tailwind CSS,
                and I care as much about how something feels as how it works.
              </p>
              <p style={{ marginTop: 18 }}>
                I&apos;ve worked closely with clients and teams to ship
                e-commerce storefronts, content-driven sites and web apps, 
                translating real problems into clean, maintainable interfaces.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="reveal">
            <div
              style={{
                aspectRatio: "3/4",
                borderRadius: 14,
                border: "1px solid var(--line)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={headshot}
                alt="Portrait of Zoe Ferguson"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 880px) 100vw, 33vw"
              />
            </div>

            {/* Facts */}
            <div style={{ marginTop: 34, display: "flex", flexDirection: "column" }}>
              {[
                { k: "Focus", v: "Front-end development" },
                { k: "Core stack", v: "React · TypeScript · Next.js" },
                { k: "Off the clock", v: "Crafting & making" },
                { k: "Status", v: "Open to work" },
              ].map((fact, i, arr) => (
                <div
                  key={fact.k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 20,
                    padding: "15px 0",
                    borderTop: "1px solid var(--line)",
                    borderBottom:
                      i === arr.length - 1 ? "1px solid var(--line)" : "none",
                    fontSize: 15,
                  }}
                >
                  <span style={{ color: "var(--ink-faint)" }}>{fact.k}</span>
                  <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                    {fact.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .section-pad { padding: 80px 0 !important; }
          .container-pad { padding: 0 24px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
