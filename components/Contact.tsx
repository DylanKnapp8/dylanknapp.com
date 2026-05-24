"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div
      className="card-premium p-8 text-center sm:p-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.35 }}
    >
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Let&apos;s build something useful.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
        If you want to talk about apps, websites, software projects, or startup
        ideas, email is the best way to reach me.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href="mailto:dylanknapp8888@gmail.com?subject=Website%20Inquiry"
          className="btn-primary px-5 py-3 text-sm"
        >
          Email me
        </a>
        <a href="/resume.pdf" download className="btn-secondary px-5 py-3 text-sm">
          Download Resume
        </a>
        <a
          href="https://www.linkedin.com/in/dylan-knapp-103603395/"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary px-5 py-3 text-sm"
        >
          LinkedIn
        </a>
      </div>
      <p className="mt-5 text-sm text-[var(--muted)]">
        Email is the best way to reach me, and LinkedIn is available if you
        prefer to connect there.
      </p>
    </motion.div>
  );
}
