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
        Want to connect or build something?
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
        I&apos;m open to talking about app ideas, websites, projects, or what
        I&apos;m building.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href="mailto:dylanknapp8888@gmail.com?subject=Website%20Inquiry"
          className="btn-primary px-5 py-3 text-sm"
        >
          Email Dylan
        </a>
      </div>
      <p className="mt-5 text-sm text-[var(--muted)]">
        dylanknapp8888@gmail.com
      </p>
    </motion.div>
  );
}
