"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import trainImage from "@/assets/repquest-train.jpg";
import trackImage from "@/assets/repquest-track.jpg";
import rankImage from "@/assets/repquest-rank.jpg";
import nutritionImage from "@/assets/repquest-nutrition.jpg";
import competeImage from "@/assets/repquest-compete.jpg";

type Slide = { id: string; label: string; image: StaticImageData; alt: string; caption: string };

const slides: Slide[] = [
  { id: "plan", label: "Plan", image: trainImage, alt: "RepQuest suggested workout screen", caption: "Start with a suggested session, create a workout, or return to a saved plan." },
  { id: "track", label: "Track", image: trackImage, alt: "RepQuest workout logging screen", caption: "Log sets, reps, and notes while keeping past performance close at hand." },
  { id: "rank", label: "Rank", image: rankImage, alt: "RepQuest bodygraph and muscle group rankings screen", caption: "Turn training history into visible ranks and muscle-group progress." },
  { id: "nutrition", label: "Nutrition", image: nutritionImage, alt: "RepQuest nutrition tracking screen", caption: "Track meals, macros, and nutrition goals alongside workouts." },
  { id: "compete", label: "Compete", image: competeImage, alt: "RepQuest weekly league and leaderboard screen", caption: "Compare progress with others through leagues and leaderboards." },
];

export default function RepQuestShowcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % slides.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + slides.length) % slides.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = slides.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <article id="repquest" className="repquest-feature" aria-labelledby="repquest-title">
      <div className="container-shell repquest-grid">
        <div className="repquest-content reveal">
          <div className="project-kicker"><span>01 / Featured app</span><span>iPhone · Live on the App Store</span></div>
          <h2 id="repquest-title">RepQuest<span className="repquest-title-mark">.</span></h2>
          <p className="repquest-tagline">Your training, progress, and competition in one place.</p>
          <div className="repquest-metrics" aria-label="RepQuest reach and rating">
            <div><strong>15k+</strong><span>downloads</span></div>
            <div aria-label="4.8-star App Store rating"><strong>4.8<span className="metric-star" aria-hidden="true">★</span></strong><span>App Store rating</span></div>
          </div>
          <p className="repquest-summary">RepQuest is a fitness app for lifters who want more than a workout log. It combines training records, nutrition, ranks, streaks, and social competition to make progress easier to see and more rewarding to pursue.</p>
          <div className="repquest-role">
            <p className="eyebrow">My role / Founder & developer</p>
            <p>I built the React Native and Expo app experience and its Supabase backend, working across onboarding, workout and nutrition features, analytics, subscriptions, and product direction.</p>
          </div>
          <a className="store-link" href="https://apps.apple.com/us/app/repquest-ranked-gym/id6759474575" target="_blank" rel="noopener noreferrer">View on the App Store <span className="arrow" aria-hidden="true">↗</span></a>
          <details className="build-details">
            <summary>Behind the build <span aria-hidden="true">+</span></summary>
            <div className="build-details-content">
              <p><strong>The product:</strong> workout logging and personal records sit alongside ranks, XP, streaks, nutrition, and leaderboards. The aim is to make training progress easier to track and more engaging to return to.</p>
              <p><strong>The implementation:</strong> I worked in React Native and Expo for the app, with Supabase for backend systems. My work also covered onboarding and premium subscription flows.</p>
            </div>
          </details>
        </div>
        <div className="repquest-explorer reveal">
          <div className="explorer-header"><span>Inside the app</span><span>01 / 05</span></div>
          <div className="screenshot-stage" id="repquest-feature-panel" role="tabpanel" aria-labelledby={`repquest-tab-${slides[active].id}`} tabIndex={0}>
            {slides.map((slide, index) => (
              <div key={slide.id} className={`screenshot-layer ${active === index ? "is-active" : ""}`} aria-hidden={active !== index}>
                <Image src={slide.image} alt={active === index ? slide.alt : ""} fill unoptimized sizes="(max-width: 740px) 280px, 350px" priority={index === 0} />
              </div>
            ))}
          </div>
          <div className="screenshot-caption" aria-live="polite" key={slides[active].id}>
            <span>{String(active + 1).padStart(2, "0")}</span>
            <p>{slides[active].caption}</p>
          </div>
          <div className="feature-tabs" role="tablist" aria-label="Explore RepQuest features">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                ref={(element) => { tabRefs.current[index] = element; }}
                id={`repquest-tab-${slide.id}`}
                type="button"
                role="tab"
                aria-controls="repquest-feature-panel"
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                className={`feature-tab ${active === index ? "is-active" : ""}`}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {slide.label}
              </button>
            ))}
          </div>
          <p className="image-credit">Actual RepQuest screens from its App Store listing.</p>
        </div>
      </div>
      <div className="container-shell repquest-notes reveal">
        <div className="notes-heading"><p className="eyebrow">Field notes / RepQuest</p><h3>What sits behind the screens</h3></div>
        <div className="note"><span className="mono-label">01 / The idea</span><p>Bring workout records, nutrition, and competition together so lifters can see and stay with their progress.</p></div>
        <div className="note"><span className="mono-label">02 / A product decision</span><p>Put suggested sessions, saved plans, and past performance close to the workout itself, where they are useful.</p></div>
        <div className="note"><span className="mono-label">03 / The build</span><p>I built the mobile experience in React Native and Expo and the data systems behind it with Supabase.</p></div>
      </div>
    </article>
  );
}
