"use client";

import { useState } from "react";

type Errors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const validate = () => {
    const e: Errors = {};
    if (!name.trim()) e.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Please add a valid email.";
    if (message.trim().length < 2) e.message = "A short message, please.";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setSendError("Something went wrong — please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: "100%",
    background: "var(--bg-2)",
    border: `1px solid ${err ? "oklch(0.6 0.16 25)" : "var(--line)"}`,
    borderRadius: 10,
    padding: "14px 16px",
    fontFamily: "var(--font-sans)",
    fontSize: 16,
    color: "var(--ink)",
    transition: "border 0.25s, background 0.25s",
    outline: "none",
  });

  return (
    <section
      id="contact"
      style={{ padding: "110px 0 0" }}
      className="section-pad-contact"
    >
      <div
        style={{
          maxWidth: "var(--max-w-container)",
          margin: "0 auto",
          padding: "0 40px",
        }}
        className="container-pad"
      >
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div className="reveal">
            <span className="eyebrow">Contact</span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(40px, 6vw, 76px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginTop: 22,
              }}
            >
              Let&apos;s make{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                something
              </em>
              .
            </h2>
            <p
              style={{
                marginTop: 26,
                color: "var(--ink-soft)",
                maxWidth: "36ch",
              }}
            >
              Have a project in mind, or a role you think I&apos;d suit? I&apos;d love
              to hear from you.
            </p>

            <div style={{ marginTop: 36, display: "flex", flexDirection: "column" }}>
              {[
                { label: "Resume", href: "/resume.pdf" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/z-ferguson/",
                },
                { label: "GitHub", href: "https://github.com/zoooesf" },
              ].map((social, i, arr) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="social-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "17px 0",
                    borderTop: "1px solid var(--line)",
                    borderBottom:
                      i === arr.length - 1 ? "1px solid var(--line)" : "none",
                    fontSize: 16,
                    transition: "padding 0.3s",
                  }}
                >
                  <span>{social.label}</span>
                  <span
                    className="social-arw"
                    style={{ color: "var(--ink-faint)", transition: "transform 0.3s, color 0.3s" }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal">
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Name */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    color: "var(--ink-faint)",
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}
                >
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Appleseed"
                  style={inputStyle(errors.name)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "var(--bg)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.name
                      ? "oklch(0.6 0.16 25)"
                      : "var(--line)";
                    e.currentTarget.style.background = "var(--bg-2)";
                  }}
                />
                {errors.name && (
                  <p style={{ color: "oklch(0.55 0.16 25)", fontSize: 13, marginTop: 6 }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    color: "var(--ink-faint)",
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  style={inputStyle(errors.email)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "var(--bg)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.email
                      ? "oklch(0.6 0.16 25)"
                      : "var(--line)";
                    e.currentTarget.style.background = "var(--bg-2)";
                  }}
                />
                {errors.email && (
                  <p style={{ color: "oklch(0.55 0.16 25)", fontSize: 13, marginTop: 6 }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    color: "var(--ink-faint)",
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}
                >
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me a little about what you have in mind…"
                  rows={5}
                  style={{
                    ...inputStyle(errors.message),
                    resize: "vertical",
                    minHeight: 120,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "var(--bg)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.message
                      ? "oklch(0.6 0.16 25)"
                      : "var(--line)";
                    e.currentTarget.style.background = "var(--bg-2)";
                  }}
                />
                {errors.message && (
                  <p style={{ color: "oklch(0.55 0.16 25)", fontSize: 13, marginTop: 6 }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                style={{
                  background: "var(--ink)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: 100,
                  padding: "16px 28px",
                  fontFamily: "var(--font-sans)",
                  fontSize: 15.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  transition: "transform 0.2s, background 0.3s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "none";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--ink)";
                }}
                disabled={sending}
              >
                {sending ? "Sending…" : <>Send message <span>→</span></>}
              </button>

              {sendError && (
                <p style={{ color: "oklch(0.55 0.16 25)", fontSize: 14 }}>{sendError}</p>
              )}

              {submitted && (
                <div
                  style={{
                    background: "var(--accent-soft)",
                    border: "1px solid var(--accent)",
                    borderRadius: 10,
                    padding: 16,
                    fontSize: 15,
                    color: "var(--ink)",
                  }}
                >
                  Thanks — your message is on its way. I&apos;ll be in touch shortly. ✦
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ marginTop: 110, borderTop: "1px solid var(--line)", padding: "40px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              color: "var(--ink-faint)",
              fontSize: 14,
            }}
          >
            <span>© 2026 Zoe Ferguson</span>
          </div>
        </footer>
      </div>

      <style>{`
        .social-link:hover { padding-left: 10px; }
        .social-link:hover .social-arw { transform: translate(4px, -4px); color: var(--accent); }
        @media (max-width: 880px) {
          .section-pad-contact { padding: 80px 0 0 !important; }
          .container-pad { padding: 0 24px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
