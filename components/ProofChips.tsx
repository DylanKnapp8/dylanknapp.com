"use client";

import { motion } from "framer-motion";

export type ProofItem = {
  label: string;
  value: string;
  note: string;
  icon: "traffic" | "product" | "ml" | "stack";
  compact?: boolean;
};

type ProofChipsProps = {
  chips: ProofItem[];
};

function ProofIcon({ icon }: Pick<ProofItem, "icon">) {
  switch (icon) {
    case "traffic":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 18h16" />
          <path d="M7 14.5 10 11l3 2.5 4-5" />
          <path d="M17 8.5h2.5V11" />
        </svg>
      );
    case "product":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="5" width="16" height="14" rx="2.5" />
          <path d="M4 10h16" />
          <path d="M9 5v14" />
        </svg>
      );
    case "ml":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6.5" cy="16.5" r="1.5" />
          <circle cx="12" cy="8" r="1.5" />
          <circle cx="17.5" cy="13.5" r="1.5" />
          <path d="m7.8 15.5 3.1-5.1" />
          <path d="m13.4 8.9 2.7 3.6" />
        </svg>
      );
    case "stack":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 4 7 4-7 4-7-4 7-4Z" />
          <path d="m5 12 7 4 7-4" />
          <path d="m5 16 7 4 7-4" />
        </svg>
      );
  }
}

export default function ProofChips({ chips }: ProofChipsProps) {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.84fr_1.16fr]">
      <motion.div
        className="card-premium relative overflow-hidden p-6 sm:p-7"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.55 }}
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent"
        />

        <p className="text-[0.68rem] font-semibold tracking-[0.28em] text-white/48 uppercase">
          Quick Proof
        </p>
        <h3 className="mt-3 max-w-sm text-3xl leading-tight font-semibold tracking-tight text-white sm:text-[2.4rem] [font-family:var(--font-fraunces)]">
          Built around real work.
        </h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)] sm:text-base">
          A few fast indicators of the kind of work featured here: launched
          products, real users, active ventures, and technical range that
          already goes beyond classroom projects.
        </p>

        <div className="mt-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-white/35 to-transparent" />
          <span className="text-[0.68rem] font-semibold tracking-[0.24em] text-white/42 uppercase">
            Four snapshots
          </span>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {chips.map((chip, index) => (
          <motion.article
            key={`${chip.label}-${chip.value}`}
            className="card-premium relative overflow-hidden p-5 sm:p-6"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            viewport={{ once: true, amount: 0.65 }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#93adff]/0 via-[#dce5ff]/70 to-[#ffd8af]/0"
            />

            <div className="flex items-start justify-between gap-4">
              <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-white/46 uppercase">
                {chip.label}
              </p>
              <div className="rounded-full border border-white/10 bg-white/[0.06] p-2 text-white/75">
                <ProofIcon icon={chip.icon} />
              </div>
            </div>

            <p
              className={`mt-5 leading-tight font-semibold tracking-tight text-white ${
                chip.compact ? "text-xl sm:text-2xl" : "text-3xl sm:text-[2rem]"
              }`}
            >
              {chip.value}
            </p>
            <p className="mt-3 max-w-[26ch] text-sm leading-6 text-[var(--muted)]">
              {chip.note}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
