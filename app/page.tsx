"use client";

import Script from "next/script";
import { useState } from "react";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import InteractionEffects from "@/components/InteractionEffects";
import Navbar from "@/components/Navbar";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import Section from "@/components/Section";
import Skills from "@/components/Skills";
import SkillsEvidence from "@/components/SkillsEvidence";
import Timeline, { type TimelineItem } from "@/components/Timeline";

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
      "Built and launched the app to 4,000+ users/downloads on the App Store",
      "Created rankings, nutrition, personal records, muscle analytics, and onboarding flows",
      "Developed premium subscriptions, growth assets, and backend systems with Supabase",
    ],
    impact:
      "RepQuest is the clearest example of full product ownership: concept, build, launch, iteration, analytics, and monetization.",
    stack: ["React Native", "Expo", "Supabase", "Subscriptions"],
    detailsButtonLabel: "View Details",
  },
  {
    title: "Sequoia Apps",
    subtitle: "Software and web development company",
    summary:
      "A company focused on building websites, apps, and digital products for real clients and new ventures.",
    bullets: [
      "Co-founded Sequoia Apps LLC and developed client websites and digital products",
      "Handled design, development, and client-facing communication across multiple projects",
      "Used the business as a platform to learn product delivery, sales outreach, and execution",
    ],
    impact:
      "Sequoia Apps shows the business side of the work: shipping for real users, communicating clearly, and turning technical skill into delivered products.",
    stack: ["Web Development", "UI Design", "Client Delivery", "Outreach"],
    links: [{ label: "Visit Site", href: "https://sequoiaapps.com" }],
  },
];

const evidenceRows = [
  {
    capability: "Product Build and Launch",
    evidence:
      "RepQuest: built a consumer app around workout rankings, XP, streaks, personal records, and progress tracking, then launched it to 4,000+ users/downloads on the App Store.",
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
      "Sequoia Apps: designed and delivered websites and digital products for real clients.",
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
    company: "RepQuest",
    role: "Founder & Developer",
    date: "Built with React Native, Expo, and Supabase",
  },
  {
    company: "Sequoia Apps",
    role: "Co-founder",
    date: "Websites, apps, and digital products",
  },
  {
    company: "Wayne Hills High School",
    role: "Class of 2027",
    date: "High Honor Roll | GPA 4.45/4",
  },
  {
    company: "Varsity Lacrosse",
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

        <Section id="projects" title="Featured Projects" eyebrow="Projects" className="section-rich">
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectCard
              project={projects[0]}
              onOpenDetails={() => setIsRepQuestOpen(true)}
            />
            <ProjectCard project={projects[1]} />
          </div>
        </Section>

        <Section id="capabilities" title="How I Build" eyebrow="Capabilities" className="section-soft">
          <Capabilities items={capabilities} />
        </Section>

        <Section
          id="evidence"
          title="Execution"
          eyebrow="Execution"
          className="section-soft"
        >
          <SkillsEvidence rows={evidenceRows} />
        </Section>

        <Section
          id="experience"
          title="Current Roles"
          eyebrow="Snapshot"
          className="section-soft"
        >
          <Timeline items={timelineItems} />
        </Section>

        <Section id="skills" title="Tools + Working Style" eyebrow="Skills" className="section-alt">
          <Skills groups={skillGroups} principles={principles} />
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
