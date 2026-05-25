"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "capabilities", label: "Capabilities" },
  { id: "evidence", label: "Execution" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = navItems
      .map((item) => {
        const element = document.getElementById(item.id);

        if (!element) {
          return null;
        }

        return {
          id: item.id,
          element,
        };
      })
      .filter(
        (
          section,
        ): section is {
          id: string;
          element: HTMLElement;
        } => Boolean(section),
      )
      .sort(
        (left, right) => left.element.offsetTop - right.element.offsetTop,
      );

    let frameId: number | null = null;

    const updateActiveSection = () => {
      const navHeight = headerRef.current?.offsetHeight ?? 64;
      const activationLine = window.scrollY + navHeight + 120;
      const isAtPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (isAtPageBottom) {
        setActiveSection(navItems[navItems.length - 1].id);
        return;
      }

      const nextActiveSection =
        sections.reduce((current, section) => {
          if (section.element.offsetTop <= activationLine) {
            return section.id;
          }

          return current;
        }, sections[0]?.id ?? "hero") ?? "hero";

      setActiveSection((current) =>
        current === nextActiveSection ? current : nextActiveSection,
      );
    };

    if (sections.length === 0) {
      return;
    }

    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");

      if (navItems.some((item) => item.id === hash)) {
        setActiveSection(hash);
        return;
      }

      updateActiveSection();
    };

    const requestUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateActiveSection();
      });
    };

    syncFromHash();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  return (
    <header ref={headerRef} className="site-nav sticky top-0 z-50">
      <div className="container-shell flex h-16 items-center justify-between gap-6">
        <a
          href="#hero"
          className="flex flex-col leading-none"
        >
          <span className="text-[0.55rem] font-semibold tracking-[0.32em] text-white/45 uppercase">
            Personal Website
          </span>
          <span className="mt-1 text-sm font-semibold tracking-[0.2em] text-white uppercase">
            Dylan Knapp
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setActiveSection(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`nav-link ${isActive ? "is-active" : ""}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-action-group flex items-center gap-2">
          <a
            href="/resume.pdf"
            download
            className="btn-secondary nav-top-button nav-top-secondary px-4 py-2 text-sm"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="nav-top-button nav-top-primary nav-top-white px-4 py-2 text-sm whitespace-nowrap"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  );
}
