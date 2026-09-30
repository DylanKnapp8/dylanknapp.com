"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type KeyboardEvent } from "react";
import repquestImage from "@/assets/repquest-train.jpg";
import rentpadImage from "@/assets/preview-rentpad.webp";
import arcadeImage from "@/assets/preview-knapp-arcade.webp";
import feedingImage from "@/assets/preview-feeding-nrv.webp";

type Project = {
  id: string;
  name: string;
  type: string;
  note: string;
  image: StaticImageData;
  imageAlt: string;
  destination: string;
  domain?: string;
};

const projects: Project[] = [
  {
    id: "repquest",
    name: "RepQuest",
    type: "Founder & developer",
    note: "A ranked fitness app that makes workouts, nutrition, and progress part of one experience.",
    image: repquestImage,
    imageAlt: "RepQuest suggested workout screen from the App Store",
    destination: "#repquest",
  },
  {
    id: "rentpad",
    name: "RentPadAI",
    type: "Work through Quoia.",
    note: "A property-management platform bringing rent, maintenance, and communication together with AI-assisted tools.",
    image: rentpadImage,
    imageAlt: "Live RentPad website preview showing its property management introduction",
    destination: "#rentpad",
    domain: "rentpadai.com",
  },
  {
    id: "arcade",
    name: "Knapp Arcade",
    type: "Work through Quoia.",
    note: "A pinball and arcade site with news, machine information, and community content for enthusiasts.",
    image: arcadeImage,
    imageAlt: "Live Knapp Arcade website preview with pinball news and machines",
    destination: "#knapp-arcade",
    domain: "knapparcade.com",
  },
  {
    id: "feeding",
    name: "Feeding the NRV",
    type: "Work through Quoia.",
    note: "A community-focused site helping people find food support, local resources, and ways to get involved.",
    image: feedingImage,
    imageAlt: "Live Feeding the NRV website preview showing community photos and food support links",
    destination: "#feeding-nrv",
    domain: "feedingthenrv.com",
  },
];

export default function ProjectComposition() {
  const [committed, setCommitted] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const active = preview ?? committed;
  const selected = projects[active];

  function commitWithKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setCommitted(index);
    setPreview(null);
  }

  return (
    <section id="work" tabIndex={-1} className="work-index" aria-labelledby="work-index-title">
      <div className="container-shell">
        <div className="work-index-head">
          <div>
            <p className="eyebrow">Work / Interactive index</p>
            <h2 id="work-index-title">Selected work</h2>
          </div>
          <p className="index-hint">Select a project to see where it fits in the story.</p>
        </div>

        <div className="composition-selectors" role="group" aria-label="Select a project preview">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-pressed={committed === index}
              className={`composition-selector ${active === index ? "is-active" : ""}`}
              onClick={() => { setCommitted(index); setPreview(null); }}
              onMouseEnter={() => setPreview(index)}
              onMouseLeave={() => setPreview(null)}
              onFocus={() => setPreview(index)}
              onBlur={() => setPreview(null)}
              onKeyDown={(event) => commitWithKeyboard(event, index)}
            >
              <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
              {project.name}
            </button>
          ))}
        </div>

        <div className="composition-display">
        <div className={`composition-stage ${selected.domain ? "is-browser" : "is-phone"}`} data-active={selected.id}>
          <div className="stage-rule stage-rule-one" aria-hidden="true" />
          <div className="stage-rule stage-rule-two" aria-hidden="true" />
          <span className="stage-annotation mono-label">Fig. 01 / Selected work</span>
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`Select ${project.name} project preview, ${project.domain ? "work through Quoia" : "founded and developed by Dylan"}`}
              aria-pressed={committed === index}
              className={`composition-card composition-card-${project.id} ${active === index ? "is-selected" : ""}`}
              onMouseEnter={() => setPreview(index)}
              onMouseLeave={() => setPreview(null)}
              onFocus={() => setPreview(index)}
              onBlur={() => setPreview(null)}
              onKeyDown={(event) => commitWithKeyboard(event, index)}
              onClick={() => { setCommitted(index); setPreview(null); }}
            >
              <span className="composition-card-label"><span className="mono-label">{String(index + 1).padStart(2, "0")}</span> {project.name}</span>
              {project.domain ? (
                <span className="browser-preview">
                  <span className="browser-chrome"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>{project.domain}</span></span>
                  <span className="browser-image"><Image src={project.image} alt={project.imageAlt} fill unoptimized sizes="(max-width: 900px) 90vw, 460px" /></span>
                </span>
              ) : (
                <span className="composition-phone-image"><Image src={project.image} alt={project.imageAlt} fill unoptimized priority sizes="(max-width: 900px) 180px, 225px" /></span>
              )}
            </button>
          ))}
        </div>

        <div className="composition-description" aria-live="polite">
          <div className="description-title"><span className="mono-label">{String(active + 1).padStart(2, "0")} / {selected.type}</span><h3>{selected.name}</h3></div>
          <p>{selected.note}</p>
          <a href={selected.destination} className="text-link">Explore project <span className="arrow" aria-hidden="true">↗</span></a>
        </div>
        </div>
      </div>
    </section>
  );
}
