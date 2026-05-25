type SkillGroup = {
  title: string;
  items: string[];
};

type SkillsProps = {
  groups: SkillGroup[];
  principles: string[];
};

export default function Skills({ groups, principles }: SkillsProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
      <div className="card-premium p-6 sm:p-7">
        <h3 className="text-lg font-semibold text-white">Tools</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {groups.map((group) => (
            <article
              key={group.title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <h4 className="text-sm font-semibold text-white">{group.title}</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="card-premium p-6 sm:p-7">
        <h3 className="text-lg font-semibold text-white">Working Style</h3>
        <ol className="mt-4 space-y-3">
          {principles.map((principle, index) => (
            <li
              key={principle}
              className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-[var(--muted)]"
            >
              <span className="mr-2 font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              {principle}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
