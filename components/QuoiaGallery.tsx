import Image, { type StaticImageData } from "next/image";
import rentpadPreview from "@/assets/preview-rentpad.webp";
import arcadePreview from "@/assets/preview-knapp-arcade.webp";
import feedingPreview from "@/assets/preview-feeding-nrv.webp";

type Site = {
  id: string;
  number: string;
  name: string;
  description: string;
  detail: string;
  note: string;
  url: string;
  domain: string;
  image: StaticImageData;
  alt: string;
};

const sites: Site[] = [
  {
    id: "rentpad",
    number: "02",
    name: "RentPadAI",
    description: "A property-management platform bringing rent, maintenance, and communication together with AI-assisted tools.",
    detail: "The site calls out repair coordination as a practical task to solve.",
    note: "Work through Quoia.",
    url: "https://rentpadai.com",
    domain: "rentpadai.com",
    image: rentpadPreview,
    alt: "Screenshot of the live RentPadAI website and its property management introduction",
  },
  {
    id: "knapp-arcade",
    number: "03",
    name: "Knapp Arcade",
    description: "A pinball and arcade website featuring news, machine information, and community content for enthusiasts.",
    detail: "Featured posts bring recent pinball coverage to the front.",
    note: "Work through Quoia.",
    url: "https://knapparcade.com",
    domain: "knapparcade.com",
    image: arcadePreview,
    alt: "Screenshot of the live Knapp Arcade website showing pinball content",
  },
  {
    id: "feeding-nrv",
    number: "04",
    name: "Feeding the NRV",
    description: "A community-focused website helping people find food support, explore local resources, and get involved in Southwest Virginia.",
    detail: "A food directory and volunteer links give visitors clear next steps.",
    note: "Work through Quoia.",
    url: "https://www.feedingthenrv.com/",
    domain: "feedingthenrv.com",
    image: feedingPreview,
    alt: "Screenshot of the live Feeding the NRV website showing community imagery and food support links",
  },
];

function BrowserPreview({ site }: { site: Site }) {
  return (
    <a className="gallery-browser" href={site.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${site.name} website`}>
      <span className="browser-chrome"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>{site.domain}</span></span>
      <span className="browser-image"><Image src={site.image} alt={site.alt} fill unoptimized sizes="(max-width: 740px) 90vw, 540px" /></span>
    </a>
  );
}

export default function QuoiaGallery() {
  return (
    <section id="quoia" className="quoia-section" aria-labelledby="quoia-title">
      <div className="container-shell">
        <div className="quoia-intro reveal">
          <div>
            <p className="eyebrow">Through Quoia / Selected websites</p>
            <h2 id="quoia-title">Websites with distinct jobs to do.</h2>
          </div>
          <div>
            <p className="role-label">Co-founder of Quoia.</p>
            <p>Selected projects we&apos;ve worked on at Quoia. Each serves a different audience, from property owners to pinball enthusiasts to neighbors seeking food support.</p>
            <a className="text-link" href="https://sequoiaapps.com" target="_blank" rel="noopener noreferrer">Visit Quoia <span className="arrow" aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="quoia-gallery">
          {sites.map((site) => (
            <article id={site.id} key={site.id} className={`gallery-project gallery-project-${site.id} reveal`} aria-labelledby={`${site.id}-title`}>
              <BrowserPreview site={site} />
              <div className="gallery-project-text">
                <p className="eyebrow">{site.number} / Website</p>
                <h3 id={`${site.id}-title`}>{site.name}</h3>
                <p>{site.description}</p>
                <p className="gallery-detail">{site.detail}</p>
                <span className="gallery-note">{site.note}</span>
                <a className="text-link" href={site.url} target="_blank" rel="noopener noreferrer">Visit site <span className="arrow" aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
