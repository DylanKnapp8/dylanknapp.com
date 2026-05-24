"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "faq", label: "FAQ" },
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
      );

    let frameId: number | null = null;

    const updateActiveSection = () => {
      const navHeight = headerRef.current?.offsetHeight ?? 64;
      const activationLine = navHeight + 24;
      const isAtPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (isAtPageBottom) {
        setActiveSection(navItems[navItems.length - 1].id);
        return;
      }

      const visibleSections = sections
        .map((section) => ({
          ...section,
          rect: section.element.getBoundingClientRect(),
        }))
        .filter(
          (section) =>
            section.rect.bottom > activationLine &&
            section.rect.top < window.innerHeight,
        );

      if (visibleSections.length > 0) {
        const nextActiveSection = visibleSections.reduce((closest, section) => {
          const closestDistance = Math.abs(closest.rect.top - activationLine);
          const sectionDistance = Math.abs(section.rect.top - activationLine);

          if (sectionDistance < closestDistance) {
            return section;
          }

          return closest;
        }).id;

        setActiveSection((current) =>
          current === nextActiveSection ? current : nextActiveSection,
        );
        return;
      }

      const fallbackSection = [...sections]
        .reverse()
        .find(
          (section) =>
            section.element.getBoundingClientRect().top <= activationLine,
        );
      const nextActiveSection = fallbackSection?.id ?? sections[0]?.id ?? "hero";

      setActiveSection((current) =>
        current === nextActiveSection ? current : nextActiveSection,
      );
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

    updateActiveSection();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(8,10,15,0.68)] backdrop-blur-xl"
    >
      <div className="container-shell flex h-16 items-center justify-between gap-6">
        <a
          href="#hero"
          className="flex flex-col leading-none"
        >
          <span className="text-[0.55rem] font-semibold tracking-[0.32em] text-white/45 uppercase">
            Personal Website
          </span>
          <span className="mt-1 text-sm font-semibold tracking-[0.2em] text-white uppercase">
            Dylan B. Knapp
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
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      isActive
                        ? "bg-white/12 text-white"
                        : "text-[var(--muted)] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="/resume.pdf" download className="btn-secondary px-4 py-2 text-sm">
            Resume
          </a>
          <a href="#contact" className="btn-primary px-4 py-2 text-sm">
            Say Hello
          </a>
        </div>
      </div>
    </header>
  );
}
