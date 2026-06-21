"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const USER_COUNT_TARGET = 6000;
const LOAD_IN_COUNT_START = 2800;
const LOAD_IN_DURATION_MS = 1600;
const numberFormatter = new Intl.NumberFormat("en-US");

type IconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
  download?: boolean;
};

function IconLink({ href, label, children, download }: IconLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      download={download}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      aria-label={label}
      title={label}
      className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/78 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.09] hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const targetRef = useRef<HTMLElement | null>(null);
  const [featuredUsers, setFeaturedUsers] = useState(LOAD_IN_COUNT_START);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -14]);

  useEffect(() => {
    let animationFrameId = 0;

    const animateCountIn = (startTime: number) => {
      const frame = (now: number) => {
        const progress = Math.min(1, (now - startTime) / LOAD_IN_DURATION_MS);
        const easedProgress = 1 - (1 - progress) ** 3;
        const nextValue = Math.floor(
          LOAD_IN_COUNT_START +
            (USER_COUNT_TARGET - LOAD_IN_COUNT_START) * easedProgress,
        );

        setFeaturedUsers(nextValue);

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(frame);
          return;
        }

        setFeaturedUsers(USER_COUNT_TARGET);
      };

      animationFrameId = window.requestAnimationFrame(frame);
    };

    animationFrameId = window.requestAnimationFrame(animateCountIn);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={targetRef}
      className="scroll-mt-24 pt-[3.6rem] pb-10 sm:pt-16 sm:pb-14"
    >
      <div className="container-shell grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_26rem]">
        <motion.div style={{ y: titleY }} className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="h-2 w-2 rounded-full bg-[#eef4ff] shadow-[0_0_18px_rgba(196,214,255,0.8)]" />
              <span className="text-[0.82rem] font-semibold tracking-[0.24em] text-white/65 uppercase">
                Dylan Knapp
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/52 uppercase">
              Builder Profile
            </p>

            <div className="headline-wrap inline-block max-w-4xl">
              <span aria-hidden className="headline-glow" />
              <h1 className="max-w-4xl text-4xl leading-[0.96] font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[5.25rem]">
                I build apps and digital products that people actually use.
              </h1>
            </div>

            <div className="space-y-6">
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                High school student, founder of RepQuest, and co-founder of
                Sequoia Apps.
              </p>

              <div className="hero-metric-strip">
                <div className="hero-metric-main">
                  <p className="hero-metric-number">
                    {numberFormatter.format(featuredUsers)}+
                  </p>
                  <p className="hero-metric-label">app users/downloads</p>
                </div>
                <div className="hero-metric-divider" />
                <div className="hero-metric-notes">
                  <div className="hero-note-chip">
                    <span className="hero-note-chip-label">Founder</span>
                    <span className="hero-note-chip-value">RepQuest</span>
                  </div>
                  <div className="hero-note-chip">
                    <span className="hero-note-chip-label">Class</span>
                    <span className="hero-note-chip-value">2027</span>
                  </div>
                  <div className="hero-note-chip">
                    <span className="hero-note-chip-label">Stack</span>
                    <span className="hero-note-chip-value">
                      React Native / Expo / Supabase
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="hero-side-panel flex flex-col gap-5">
          <motion.aside className="glass-panel relative h-fit overflow-hidden p-5 sm:p-6">
            <div className="relative space-y-5">
              <div className="space-y-3">
                <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-white/50 uppercase">
                  Focus Board
                </p>
                <h2 className="text-[1.85rem] leading-tight font-semibold tracking-tight text-white">
                  Product traction, app execution, and founder-led delivery.
                </h2>
              </div>

              <div className="hero-side-copy">
                I&apos;m focused on building products with real traction,
                especially RepQuest, where I handle the app experience, product
                direction, and Supabase backend.
              </div>

              <div className="hero-side-section">
                <p className="hero-side-kicker">Proof of Work</p>
                <p className="mt-3 text-sm leading-7 text-white/86">
                  Launched a mobile app, built backend systems with Supabase, and
                  shipped real products used by thousands.
                </p>
              </div>

              <div className="hero-side-section">
                <p className="hero-side-kicker">Reach</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <IconLink href="mailto:dylanknapp8888@gmail.com" label="Email Dylan">
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 6.5h16v11H4z" />
                      <path d="m5 7 7 6 7-6" />
                    </svg>
                  </IconLink>

                  <IconLink
                    href="https://www.linkedin.com/in/dylan-knapp-103603395/"
                    label="LinkedIn profile"
                  >
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.03 2.03 0 0 0 3.2 5.03c0 1.12.9 2.03 2 2.03h.03a2.03 2.03 0 1 0 .02-4.06ZM20.8 12.79c0-3.47-1.85-5.08-4.31-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.73c.04.72 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.69.13-.93.27-.68.89-1.4 1.93-1.4 1.36 0 1.9 1.05 1.9 2.58V20h3.38v-7.21Z" />
                    </svg>
                  </IconLink>

                  <IconLink href="/resume.pdf" label="Download resume" download>
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 3.5h6l4 4V20a.5.5 0 0 1-.5.5h-9A2.5 2.5 0 0 1 6 18V6a2.5 2.5 0 0 1 2.5-2.5Z" />
                      <path d="M14 3.5V8h4" />
                      <path d="M12 11v6" />
                      <path d="m9.5 14.5 2.5 2.5 2.5-2.5" />
                    </svg>
                  </IconLink>
                </div>

                <a
                  href="/resume.pdf"
                  download
                  className="btn-secondary mt-5 w-full justify-center px-5 py-3 text-sm"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </motion.aside>

          <div className="flex flex-wrap gap-3 lg:justify-start lg:pl-16">
            <a href="#projects" className="btn-primary px-5 py-3 text-sm">
              View Projects
            </a>
            <a href="#contact" className="btn-secondary px-5 py-3 text-sm">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
