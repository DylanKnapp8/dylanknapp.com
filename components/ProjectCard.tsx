type ProjectCardProps = {
  number: string;
  category: string;
  title: string;
  description: string;
  contribution: string;
  details?: string[];
  featured?: boolean;
  href?: string;
  linkLabel?: string;
};

export default function ProjectCard({
  number, category, title, description, contribution, details, featured, href, linkLabel,
}: ProjectCardProps) {
  return (
    <article className={`project reveal ${featured ? "project-featured" : ""}`}>
      <div className="project-index" aria-hidden="true">{number}</div>
      <div className="project-main">
        <p className="eyebrow">{category}</p>
        <h3>{title}</h3>
        <p className="project-description">{description}</p>
        <p className="project-contribution">{contribution}</p>
        {href && linkLabel ? (
          <a className="project-link text-link" href={href} target="_blank" rel="noopener noreferrer">
            {linkLabel} <span className="arrow" aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
      {details ? (
        <div className="project-details">
          <p className="project-details-label">Project details</p>
          <ul>{details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        </div>
      ) : null}
    </article>
  );
}
