type EvidenceRow = {
  capability: string;
  evidence: string;
  stack: string[];
};

type SkillsEvidenceProps = {
  rows: EvidenceRow[];
};

export default function SkillsEvidence({ rows }: SkillsEvidenceProps) {
  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <article
          key={row.capability}
          className="card-premium grid gap-4 p-5 md:grid-cols-[0.95fr_1.7fr_1fr] md:items-start"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-white/65 uppercase">
              Focus
            </p>
            <h3 className="mt-1 text-sm font-semibold text-white">
              {row.capability}
            </h3>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-white/65 uppercase">
              Proof
            </p>
            <p className="mt-1 text-sm leading-7 text-[var(--muted)]">{row.evidence}</p>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.12em] text-white/65 uppercase">
              Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {row.stack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
