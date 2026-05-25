"use client";

import { motion } from "framer-motion";

type Capability = {
  title: string;
  summary: string;
  tools: string[];
};

type CapabilitiesProps = {
  items: Capability[];
};

export default function Capabilities({ items }: CapabilitiesProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item, index) => (
        <motion.article
          key={item.title}
          className="card-premium p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <p className="text-[0.66rem] font-semibold tracking-[0.2em] text-white/46 uppercase">
            Capability
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tools.map((tool) => (
              <span key={tool} className="tag">
                {tool}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
