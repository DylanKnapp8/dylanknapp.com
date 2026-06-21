"use client";

import { motion } from "framer-motion";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  subtitle: string;
  summary: string;
  bullets: string[];
  impact: string;
  stack: string[];
  links?: ProjectLink[];
  detailsButtonLabel?: string;
};

type ProjectCardProps = {
  project: Project;
  onOpenDetails?: () => void;
  featured?: boolean;
};

export default function ProjectCard({
  project,
  onOpenDetails,
  featured = false,
}: ProjectCardProps) {
  const projectLabel = featured
    ? "Featured App"
    : project.title === "RepQuest"
      ? "App"
    : project.title === "Sequoia Apps"
      ? "Company"
      : "Web Project";

  return (
    <motion.article
      className={`glass-panel relative flex h-full flex-col overflow-hidden p-6 pt-8 ${
        featured ? "project-featured sm:p-7 sm:pt-10" : ""
      }`}
    >
      <div className="project-card-header">
        <span className="project-card-pill">{projectLabel}</span>
      </div>

      <div className="mt-4 space-y-3">
        <h3 className={`${featured ? "text-2xl sm:text-[2rem]" : "text-xl"} font-semibold tracking-tight text-white`}>
          {project.title}
        </h3>
        <p className="text-sm text-white/72">{project.subtitle}</p>
        <p className={`${featured ? "max-w-2xl text-[0.98rem] leading-7" : "text-sm leading-7"} text-[var(--muted)]`}>
          {project.summary}
        </p>
        <ul className="space-y-2 text-sm text-[var(--muted)]">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-white/75"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {featured ? (
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/78">
          {project.impact}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {featured ? (
        <div className="project-insight-grid mt-6">
          <div className="project-insight-card">
            <p className="project-insight-value">6,000+</p>
            <p className="project-insight-label">users/downloads</p>
          </div>
          <div className="project-insight-card">
            <p className="project-insight-value">React Native</p>
            <p className="project-insight-label">Expo + Supabase</p>
          </div>
          <div className="project-insight-card">
            <p className="project-insight-value">Full Ownership</p>
            <p className="project-insight-label">Product to launch</p>
          </div>
        </div>
      ) : null}

      {(project.links?.length || project.detailsButtonLabel) && (
        <div className={`mt-6 flex flex-wrap gap-3 ${featured ? "mt-auto pt-6" : ""}`}>
          {project.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="btn-secondary px-4 py-2 text-sm"
            >
              {link.label}
            </a>
          ))}

          {project.detailsButtonLabel && onOpenDetails ? (
            <button
              type="button"
              onClick={onOpenDetails}
              className="btn-primary cursor-pointer px-4 py-2 text-sm"
            >
              {project.detailsButtonLabel}
            </button>
          ) : null}
        </div>
      )}
    </motion.article>
  );
}
