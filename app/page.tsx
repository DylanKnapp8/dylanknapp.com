import Script from "next/script";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectComposition from "@/components/ProjectComposition";
import QuoiaGallery from "@/components/QuoiaGallery";
import RepQuestShowcase from "@/components/RepQuestShowcase";
import ScrollReveals from "@/components/ScrollReveals";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dylan Knapp",
  url: "https://dylanknapp.com",
  email: "mailto:dylanknapp8888@gmail.com",
  jobTitle: "Founder of RepQuest; Co-founder of Quoia",
  worksFor: { "@type": "Organization", name: "Quoia", url: "https://sequoiaapps.com" },
  sameAs: ["https://www.linkedin.com/in/dylan-knapp-103603395/"],
  knowsAbout: ["App development", "React Native", "Expo", "Supabase", "Web development"],
};

export default function Home() {
  return (
    <>
      <Script id="person-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <ScrollReveals />
      <Navbar />
      <main>
        <Hero />
        <ProjectComposition />
        <RepQuestShowcase />
        <QuoiaGallery />
        <section id="about" tabIndex={-1} className="about-section" aria-labelledby="about-title">
          <div className="container-shell">
            <div className="about-grid reveal">
              <div className="about-heading">
                <p className="eyebrow">Beyond the projects / About</p>
                <h2 id="about-title">What drives me.</h2>
              </div>
              <div className="about-copy">
                <p className="about-lead">I like building things that solve a problem someone actually has.</p>
                <p>RepQuest has taught me to think beyond the first screen: a workout needs to be easy to start, progress needs to make sense over time, and the app has to work reliably behind the scenes. I enjoy the engineering questions that connect those pieces.</p>
                <p>At Quoia, I work with others to turn different organizations&apos; needs into useful websites and software. I&apos;m in the Wayne Hills High School class of 2027. Outside of software, I&apos;m a varsity lacrosse captain and vice president of the Computer Science Club.</p>
                <a className="text-link about-resume" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Read my Résumé <span className="arrow" aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="skill-overview reveal">
              <div className="skill-intro"><p className="eyebrow">How the work gets made</p><h3>From interface to infrastructure.</h3></div>
              <div className="skill-rows">
                <div><strong>Make it useful</strong><span>Mobile flows and responsive websites that make the next step clear. React Native, Expo, React, Next.js.</span></div>
                <div><strong>Make it work</strong><span>Accounts, data, and product systems behind the screen. Supabase, SQL, authentication.</span></div>
                <div><strong>Keep improving</strong><span>Product direction, analytics, and updates based on how people actually use the app.</span></div>
              </div>
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <footer className="site-footer"><div className="container-shell footer-inner"><span>Dylan Knapp</span><a href="#top" className="text-link">Back to top <span aria-hidden="true">↑</span></a></div></footer>
    </>
  );
}
