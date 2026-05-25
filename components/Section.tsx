"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  eyebrow?: string;
  className?: string;
  children: ReactNode;
};

export default function Section({
  id,
  title,
  eyebrow,
  className,
  children,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`section-gap scroll-mt-24 ${className ?? ""}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container-shell">
        {(eyebrow || title) && (
          <header className="section-heading mb-8 space-y-2">
            {eyebrow ? (
              <p className="section-eyebrow text-xs font-medium uppercase">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {title}
              </h2>
            ) : null}
          </header>
        )}
        {children}
      </div>
    </motion.section>
  );
}
