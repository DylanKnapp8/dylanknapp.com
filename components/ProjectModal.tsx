"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", onEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="repquest-title"
            className="w-full max-w-4xl rounded-2xl border border-white/15 bg-[rgba(10,10,11,0.97)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.58)] sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-3">
              <div>
                <h3
                  id="repquest-title"
                  className="text-2xl font-semibold tracking-tight text-white"
                >
                  RepQuest Details
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  Gamified fitness tracking app
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary cursor-pointer px-3 py-2 text-sm"
                aria-label="Close project details"
              >
                Close
              </button>
            </div>

            <div className="space-y-7">
              <section>
                <h4 className="text-sm font-semibold tracking-[0.12em] text-white/78 uppercase">
                  Overview
                </h4>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  RepQuest is a mobile app built to make training more engaging
                  through competition, progression systems, and clear workout
                  tracking.
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  The product combines gamification, fitness data, onboarding,
                  subscriptions, and analytics into a single app experience
                  designed for everyday gym users.
                </p>
              </section>

              <section>
                <h4 className="text-sm font-semibold tracking-[0.12em] text-white/78 uppercase">
                  Architecture
                </h4>
                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-center gap-2 text-white/45">
                    <div className="architecture-node">Expo Mobile App</div>
                    <span aria-hidden>-&gt;</span>
                    <div className="architecture-node">App Logic + Rankings</div>
                    <span aria-hidden>-&gt;</span>
                    <div className="architecture-node">Supabase Backend</div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-white/45">
                    <div className="architecture-node">Workout Logging</div>
                    <span aria-hidden>-&gt;</span>
                    <div className="architecture-node">XP + Streak Systems</div>
                    <span aria-hidden>-&gt;</span>
                    <div className="architecture-node">
                      Analytics + Subscriptions
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-sm font-semibold tracking-[0.12em] text-white/78 uppercase">
                  Product Highlights
                </h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    "4,000+ users and downloads",
                    "Ranks, XP, streaks, and progress tracking",
                    "Built with React Native, Expo, and Supabase",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex h-32 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-5 text-center text-sm text-white/75"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
