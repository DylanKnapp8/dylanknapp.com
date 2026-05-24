"use client";

import Script from "next/script";
import { useState } from "react";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import InteractionEffects from "@/components/InteractionEffects";
import Navbar from "@/components/Navbar";
import ProofChips, { type ProofItem } from "@/components/ProofChips";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import RecruiterFAQ from "@/components/RecruiterFAQ";
import Section from "@/components/Section";
import Skills from "@/components/Skills";
import SkillsEvidence from "@/components/SkillsEvidence";
import Timeline, { type TimelineItem } from "@/components/Timeline";

const proofChips: ProofItem[] = [
  {
    label: "Users",
    value: "4,000+",
    note: "RepQuest users and downloads from an app built and launched independently",
    icon: "product",
  },
  {
    label: "Founder",
    value: "2 ventures",
    note: "building RepQuest and co-founding Sequoia Apps LLC while still in high school",
    icon: "traffic",
  },
  {
    label: "Stack",
    value: "React Native + Supabase",
    note: "shipping across app development, backend systems, and product-focused UI work",
    icon: "ml",
    compact: true,
  },
  {
    label: "Leadership",
    value: "Captain + VP",
    note: "varsity lacrosse captain and vice president of the computer science club",
    icon: "stack",
    compact: true,
  },
];

const capabilities = [
  {
    title: "App Development",
    summary:
      "Building mobile app experiences with gamification, onboarding, analytics, and repeatable product systems.",
    tools: ["React Native", "Expo", "Supabase", "Product Design"],
  },
  {
    title: "Web Development",
    summary:
      "Designing and shipping polished websites for products, brands, and client-facing digital experiences.",
    tools: ["Next.js", "React", "Responsive UI", "Frontend Systems"],
  },
  {
    title: "Backend Integration",
    summary:
      "Connecting product interfaces to auth, databases, rankings, subscriptions, and operational workflows.",
    tools: ["Supabase", "APIs", "Auth", "Data Modeling"],
  },
  {
    title: "Entrepreneurial Execution",
    summary:
      "Moving from idea to launch with product strategy, outreach, growth experiments, and day-to-day iteration.",
    tools: ["Product Strategy", "Client Outreach", "Launches", "Iteration"],
  },
];

const projects: Project[] = [
  {
    title: "RepQuest",
    subtitle: "Gamified fitness tracking app",
    summary:
      "A fitness app built to make training more competitive and engaging through rankings, XP, streaks, workout logging, and performance tracking.",
    bullets: [
      "Built and launched the app to 4,000+ users and downloads",
      "Created rankings, nutrition, personal records, muscle analytics, and onboarding flows",
      "Developed premium subscriptions, growth assets, and backend systems with Supabase",
    ],
    impact:
      "RepQuest is the clearest example of full product ownership: concept, build, launch, iteration, analytics, and monetization.",
    stack: ["React Native", "Expo", "Supabase", "Subscriptions"],
    detailsButtonLabel: "Details",
  },
  {
    title: "Sequoia Apps",
    subtitle: "Software and web development company",
    summary:
      "A company focused on building websites, apps, and digital products for real clients and new ventures.",
    bullets: [
      "Co-founded Sequoia Apps LLC and developed sites including sequoiaapps.com and feedingthenrv.com",
      "Handled design, development, and client-facing communication across multiple projects",
      "Used the business as a platform to learn product delivery, sales outreach, and execution",
    ],
    impact:
      "Sequoia Apps shows the business side of the work: shipping for real users, communicating clearly, and turning technical skill into delivered products.",
    stack: ["Web Development", "UI Design", "Client Delivery", "Outreach"],
    links: [{ label: "Visit Site", href: "https://sequoiaapps.com" }],
  },
  {
    title: "feedingtheNRV.com",
    subtitle: "Website project delivered through Sequoia Apps",
    summary:
      "A live website project that reflects the kind of design and development work I build through Sequoia Apps.",
    bullets: [
      "Planned and built the site as part of a client-facing web delivery workflow",
      "Focused on clean layout, performance, and a professional presentation",
      "Used the project to strengthen repeatable website design and launch processes",
    ],
    impact:
      "This project highlights applied web delivery work rather than a classroom mockup: real scope, real constraints, and a shipped result.",
    stack: ["Web Development", "Responsive Design", "Launch Support"],
    links: [{ label: "Visit Site", href: "https://feedingthenrv.com" }],
  },
];

const evidenceRows = [
  {
    capability: "Product Build and Launch",
    evidence:
      "RepQuest: built a consumer app around workout rankings, XP, streaks, personal records, and progress tracking, then launched it to 4,000+ users.",
    stack: ["React Native", "Expo", "Supabase", "Subscriptions"],
  },
  {
    capability: "Backend and Data Work",
    evidence:
      "RepQuest and Sequoia Apps: set up backend infrastructure with Supabase for authentication, data storage, and product features.",
    stack: ["Supabase", "Backend Integration", "APIs"],
  },
  {
    capability: "Client-Facing Web Delivery",
    evidence:
      "Sequoia Apps: designed and delivered multiple websites, including sequoiaapps.com and feedingthenrv.com.",
    stack: ["Web Development", "UI Design", "Client Projects"],
  },
  {
    capability: "Founder Mindset",
    evidence:
      "Built products while balancing school, leadership, and outreach, with a focus on solving real problems instead of shipping portfolio filler.",
    stack: ["Execution", "Problem Solving", "Entrepreneurship"],
  },
];

const timelineItems: TimelineItem[] = [
  {
    company: "Wayne Hills High School",
    role: "Student",
    date: "Expected Graduation: June 2027 | GPA: 4.45/4",
  },
  {
    company: "Sequoia Apps LLC",
    role: "Co-founder",
    date: "June 2025 - Present",
  },
  {
    company: "RepQuest - Ranked Gym",
    role: "Founder & Developer",
    date: "2025 - Present",
  },
  {
    company: "Wayne Hills Varsity Lacrosse",
    role: "Captain",
    date: "Leadership and team development",
  },
  {
    company: "Computer Science Club",
    role: "Vice President",
    date: "Student leadership and technical community building",
  },
];

const skillGroups = [
  {
    title: "Languages",
    items: ["Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "App + Product",
    items: ["React Native", "Expo", "UI/UX Design", "Product Thinking"],
  },
  {
    title: "Backend + Integration",
    items: [
      "Supabase",
      "API Integration",
      "Backend Integration",
      "Technical Troubleshooting",
    ],
  },
  {
    title: "Delivery + Growth",
    items: [
      "Version Control",
      "Problem Solving",
      "Social Media Management",
      "Content Creation",
    ],
  },
];

const principles = [
  "Build real products with clear user value instead of one-off demos.",
  "Keep the product experience simple, competitive, and easy to understand.",
  "Treat backend, design, and growth as connected parts of the same product.",
  "Learn quickly, ship consistently, and improve through iteration.",
];

const recruiterFAQ = [
  {
    question: "What are you building right now?",
    answer:
      "Most of my current work centers on RepQuest, Sequoia Apps, and building digital products that combine good UX with strong backend foundations.",
  },
  {
    question: "What kinds of opportunities are the best fit?",
    answer:
      "I am especially interested in app development, software engineering, startup environments, and opportunities where I can keep learning by building real products.",
  },
  {
    question: "What is the fastest way to reach out?",
    answer:
      "Email dylanknapp8888@gmail.com with context about the project, role, or collaboration idea. LinkedIn is also available if you prefer to connect there.",
  },
  {
    question: "What makes your work different from a typical student portfolio?",
    answer:
      "I focus on products that are launched, used, and improved over time. The goal is not just to build projects, but to learn how to create software people actually want to keep using.",
  },
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dylan B. Knapp",
  url: "https://dylanknapp.com",
  jobTitle: "Founder of RepQuest | App Developer | Student Entrepreneur",
  email: "mailto:dylanknapp8888@gmail.com",
  sameAs: ["https://www.linkedin.com/in/dylan-knapp-103603395/"],
  knowsAbout: [
    "App Development",
    "Entrepreneurship",
    "Software Engineering",
    "Web Development",
    "Fitness Tech",
    "React Native",
    "Expo",
    "Supabase",
  ],
};

export default function Home() {
  const [isRepQuestOpen, setIsRepQuestOpen] = useState(false);

  return (
    <div className="mono-bg min-h-screen">
      <AmbientBackdrop />
      <InteractionEffects />
      <Script
        id="person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <Navbar />

      <main>
        <Hero />

        <Section id="about" title="About Dylan" eyebrow="About">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="card-premium p-6 sm:p-7">
              <p className="max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                I am a high school student at Wayne Hills High School with a
                strong interest in app development, entrepreneurship, and
                software engineering. I built and launched RepQuest, a gamified
                fitness tracking app with thousands of users, and I also
                co-founded Sequoia Apps LLC, where I work on websites, apps,
                and digital products. I enjoy building real products, learning
                new technologies, and solving problems through software.
              </p>
            </article>

            <article className="card-premium p-6 sm:p-7">
              <p className="text-xs font-medium tracking-[0.18em] text-white/65 uppercase">
                Education
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
                Wayne Hills High School
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Wayne, New Jersey
              </p>
              <div className="mt-5 space-y-2 text-sm text-[var(--muted)]">
                <p>Expected Graduation: June 2027</p>
                <p>GPA: 4.45/4</p>
              </div>
            </article>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <article className="card-premium p-6">
              <p className="text-xs font-medium tracking-[0.18em] text-white/65 uppercase">
                Honors
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                {[
                  "High Honor Roll",
                  "National Honor Society",
                  "Spanish National Honor Society",
                ].map((honor) => (
                  <li key={honor} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/70"
                    />
                    <span>{honor}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="card-premium p-6">
              <p className="text-xs font-medium tracking-[0.18em] text-white/65 uppercase">
                Activities and Leadership
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                {[
                  "Captain of the lacrosse team",
                  "Varsity lacrosse",
                  "Vice President of the Computer Science Club",
                  "National Honor Society",
                  "Spanish National Honor Society",
                  "Spanish Club",
                  "Engineering Club",
                  "Red Cross Club",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/70"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Section>

        <Section id="projects" title="Selected Work" eyebrow="Projects">
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpenDetails={
                  project.title === "RepQuest"
                    ? () => setIsRepQuestOpen(true)
                    : undefined
                }
              />
            ))}
          </div>
        </Section>

        <Section id="capabilities" title="What I Build" eyebrow="Work I Like">
          <Capabilities items={capabilities} />
        </Section>

        <Section id="proof" className="pt-2">
          <ProofChips chips={proofChips} />
        </Section>

        <Section
          id="evidence"
          title="What That Looks Like In Practice"
          eyebrow="Execution"
        >
          <SkillsEvidence rows={evidenceRows} />
        </Section>

        <Section
          id="experience"
          title="Where I&apos;ve Been Spending Time"
          eyebrow="Timeline"
        >
          <Timeline items={timelineItems} />
        </Section>

        <Section id="skills" title="Tools + Working Style" eyebrow="How I Operate">
          <Skills groups={skillGroups} principles={principles} />
        </Section>

        <Section id="faq" title="Questions People Usually Ask" eyebrow="FAQ">
          <RecruiterFAQ items={recruiterFAQ} />
        </Section>

        <Section id="contact" className="pt-3">
          <Contact />
        </Section>
      </main>

      <ProjectModal
        isOpen={isRepQuestOpen}
        onClose={() => setIsRepQuestOpen(false)}
      />
    </div>
  );
}
