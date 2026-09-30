"use client";

import { useState } from "react";

const email = "dylanknapp8888@gmail.com";

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus(""), 2400);
    } catch {
      setCopyStatus("Couldn’t copy — use the email link");
    }
  }

  return (
    <section id="contact" tabIndex={-1} className="section contact-section" aria-labelledby="contact-title">
      <div className="container-shell contact-grid reveal">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Let’s talk about what you’re building.</h2>
        </div>
        <div className="contact-details">
          <p>I’m always interested in thoughtful app and web projects, good ideas, and meeting people who build things.</p>
          <div className="email-row">
            <a className="email-link text-link" href={`mailto:${email}`}>{email} <span className="arrow" aria-hidden="true">↗</span></a>
            <button type="button" onClick={copyEmail} className="copy-button">Copy email</button>
          </div>
          <span className="copy-status" role="status" aria-live="polite">{copyStatus}</span>
          <a className="text-link social-link" href="https://www.linkedin.com/in/dylan-knapp-103603395/" target="_blank" rel="noopener noreferrer">LinkedIn <span className="arrow" aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
