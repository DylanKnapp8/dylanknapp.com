"use client";

import { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
      const line = window.scrollY + 130;
      let current = "";
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= line) current = item.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = "contact";
      }
      setActiveSection(current);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(mobileNavRef.current?.querySelectorAll("a") ?? []);
        const first = links[0];
        const last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          menuButtonRef.current?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          menuButtonRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function selectSection(id: string) {
    setActiveSection(id);
    setMenuOpen(false);
    window.requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  }

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container-shell header-inner">
        <a href="#top" className="site-name" onClick={() => { setMenuOpen(false); setActiveSection(""); }}>Dylan Knapp<span className="name-mark" aria-hidden="true">.</span></a>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {navItems.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={`nav-link ${activeSection === id ? "is-active" : ""}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setActiveSection(id)}>{label}</a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link nav-resume">Résumé <span aria-hidden="true">↗</span></a>
        </nav>
        <button ref={menuButtonRef} type="button" className="menu-button" aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <span className={`menu-icon ${menuOpen ? "is-open" : ""}`} aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      <nav id="mobile-navigation" ref={mobileNavRef} aria-label="Mobile navigation" aria-hidden={!menuOpen} inert={!menuOpen} className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
        <div className="container-shell mobile-nav-inner">
          {navItems.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={`mobile-nav-link ${activeSection === id ? "is-active" : ""}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => selectSection(id)}>{label} <span aria-hidden="true">↗</span></a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="mobile-nav-link mobile-nav-resume" onClick={() => setMenuOpen(false)}>Résumé <span aria-hidden="true">↗</span></a>
        </div>
      </nav>
    </header>
  );
}
