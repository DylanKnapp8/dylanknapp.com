"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const USER_COUNT_TARGET = 4000;
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

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -22]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 26]);

  useEffect(() => {
    let animationFrameId = 0;

    const animateCountIn = (startTime: number) => {
      const frame = (now: number) => {
        const progress = Math.min(
          1,
          (now - startTime) / LOAD_IN_DURATION_MS,
        );
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
      className="scroll-mt-24 pt-[4.5rem] pb-12 sm:pt-24 sm:pb-16"
    >
      <div className="container-shell grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div style={{ y: titleY }} className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#eef4ff] shadow-[0_0_18px_rgba(196,214,255,0.8)]" />
            <span className="text-[0.82rem] font-semibold tracking-[0.24em] text-white/65 uppercase">
              Dylan B. Knapp
            </span>
          </div>

          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">
              Founder of RepQuest | App Developer | Student Entrepreneur
            </p>

            <div className="headline-wrap">
              <span aria-hidden className="headline-glow" />
              <h1 className="max-w-3xl text-4xl leading-[0.98] font-semibold tracking-tight text-white sm:text-5xl lg:text-[4.35rem]">
                I build apps and digital products that people actually use.
              </h1>
            </div>

            <div className="max-w-xl space-y-3">
              <p className="text-sm leading-6 text-[var(--muted)]">
                High school student at Wayne Hills building fitness tech,
                software products, and client websites.
              </p>
              <p className="flex flex-wrap items-end gap-x-3 gap-y-1 text-white">
                <span className="text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">
                  {numberFormatter.format(featuredUsers)}+
                </span>
                <span className="pb-1 text-sm font-medium tracking-[0.04em] text-white/72 sm:text-base">
                  RepQuest users and downloads
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.aside
          style={{ y: cardY }}
          className="card-premium relative overflow-hidden p-6 sm:p-7"
        >
          <div
            aria-hidden
            className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />

          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-white/50 uppercase">
              Field Notes
            </p>
            <h2 className="mt-3 max-w-md text-3xl leading-tight font-semibold text-white sm:text-[2.2rem]">
              About me
            </h2>
          </div>

          <div className="mt-5 text-sm leading-7 text-[var(--muted)]">
            <div className="relative float-right mb-3 ml-5 flex h-32 w-32 items-center justify-center overflow-hidden rounded-[1.2rem] border border-white/12 bg-gradient-to-br from-white/[0.12] to-white/[0.03] shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:mb-4 sm:ml-6 sm:h-36 sm:w-36">
              <span className="text-4xl font-semibold tracking-[0.2em] text-white/90 sm:text-5xl">
                DK
              </span>
            </div>
            <p className="max-w-lg">
              I am a high school student at Wayne Hills High School with a
              strong interest in app development, entrepreneurship, and
              software engineering. I built and launched RepQuest, and I
              co-founded Sequoia Apps LLC to work on websites, apps, and
              digital products.
            </p>
            <div className="clear-both" />
          </div>

          <div className="mt-6 space-y-3">
            <article className="hero-note">
              <p className="text-[0.68rem] font-semibold tracking-[0.26em] text-white/50 uppercase">
                Current Stack
              </p>
              <p className="relative mt-3 text-sm leading-6 text-white/90">
                Java, React Native, Expo, Supabase, web development, UI/UX,
                and product-focused software engineering.
              </p>
            </article>

            <div className="grid gap-3">
              <article className="hero-note">
                <p className="text-[0.68rem] font-semibold tracking-[0.26em] text-white/50 uppercase">
                  Reach
                </p>
                <div className="relative mt-4 flex flex-wrap gap-3">
                  <IconLink
                    href="mailto:dylanknapp8888@gmail.com"
                    label="Email Dylan"
                  >
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

                  <IconLink
                    href="/resume.pdf"
                    label="Download resume"
                    download
                  >
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
              </article>
            </div>
          </div>

          <a
            href="/resume.pdf"
            download
            className="btn-primary mt-6 w-full justify-center px-5 py-3 text-sm"
          >
            Download Resume
          </a>
        </motion.aside>
      </div>
    </section>
  );
}
