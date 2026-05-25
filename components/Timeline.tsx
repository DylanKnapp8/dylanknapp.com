export type TimelineItem = {
  company: string;
  role: string;
  date: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={`${item.company}-${item.role}`}
          className="card-premium flex min-h-[124px] flex-col justify-between p-5"
        >
          <div>
            <p className="text-[0.66rem] font-semibold tracking-[0.18em] text-white/46 uppercase">
              {item.role}
            </p>
            <p className="mt-2 text-base font-semibold text-white">{item.company}</p>
          </div>
          <p className="mt-4 text-sm text-[var(--muted)]">{item.date}</p>
        </li>
      ))}
    </ol>
  );
}
