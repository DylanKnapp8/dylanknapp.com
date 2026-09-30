import Image from "next/image";
import headshot from "@/assets/headshot.webp";

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container-shell hero-grid">
        <div className="hero-content">
          <p className="eyebrow">Dylan Knapp / Builder, founder, student</p>
          <h1 id="hero-title">I turn ideas into <em>useful products.</em></h1>
          <p className="hero-intro">I&apos;m Dylan, founder of RepQuest and Co-founder of Quoia. I design and build apps and websites, from the first screen to the systems that make them work.</p>
          <p className="hero-proof">RepQuest: <strong>15k+ downloads</strong> <span aria-hidden="true">·</span> <strong>4.8★ App Store rating</strong></p>
          <div className="hero-actions">
            <a href="#work" className="button-primary">Explore the work <span className="arrow" aria-hidden="true">↗</span></a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-link">View my Résumé <span className="arrow" aria-hidden="true">↗</span></a>
          </div>
        </div>
        <figure className="portrait-wrap">
          <Image src={headshot} alt="Portrait of Dylan Knapp" priority unoptimized sizes="(max-width: 740px) 110px, 184px" className="portrait" />
          <figcaption>Dylan / behind the work</figcaption>
        </figure>
      </div>
    </section>
  );
}
