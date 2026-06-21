import type { Contact } from "./types";

export function generateOutreach(contact: Contact, goal: string, tone: string) {
  const firstName = contact.name.trim().split(/\s+/)[0] || "there";
  const organization = contact.company?.trim();
  const context = organization ? ` and what you're building at ${organization}` : " and your work";
  const platform = contact.platform ? ` on ${contact.platform}` : "";
  const local = contact.location ? ` I noticed you're based in ${contact.location}, too.` : "";
  const note = contact.notes?.trim();
  const observation = note ? ` One detail that caught my attention: ${note.slice(0, 140)}${note.length > 140 ? "…" : "."}` : "";

  const content: Record<string, { subject: string; pitch: string; ask: string }> = {
    "Promote RepQuest": {
      subject: `${firstName} x RepQuest`,
      pitch: "I built RepQuest, a fitness app used by thousands of lifters that turns training into ranks, XP, goals, social competition, and progress tracking.",
      ask: "I think it could click with your audience. Would you be open to taking a look and talking about a simple feature or collaboration?",
    },
    "Ask for a creator partnership": {
      subject: `Partnership idea for ${firstName}`,
      pitch: "I’m the founder of RepQuest, a fitness app used by thousands of lifters to make training more competitive and social.",
      ask: "Your content feels like a strong fit, and I’d love to explore a creator partnership that is useful for both sides. Open to a quick chat?",
    },
    "Offer a website/app build": {
      subject: organization ? `A digital idea for ${organization}` : `A quick build idea`,
      pitch: "I build polished websites and apps through Sequoia Apps, with a focus on simple products that help businesses grow.",
      ask: `I had a few ideas after seeing your work${platform}. Would you be open to a short conversation about what we could improve or build?`,
    },
    "Ask for feedback": {
      subject: `Quick RepQuest feedback?`,
      pitch: "I built RepQuest, a fitness app that turns lifting into ranks, XP, goals, social competition, and progress tracking.",
      ask: "You have a useful perspective on this space, and I’d genuinely value your honest feedback. Could I send you a quick look?",
    },
    "General networking": {
      subject: `Good to connect, ${firstName}`,
      pitch: "I’m Dylan Knapp. I built RepQuest, a fitness app with thousands of users, and I also build websites and apps through Sequoia Apps.",
      ask: "I’d enjoy hearing more about what you’re working on and staying in touch. Open to a quick conversation sometime?",
    },
  };

  const selected = content[goal] ?? content["General networking"];
  const opener = tone === "Professional"
    ? `Hi ${firstName},\n\nI’ve been following your work${context}${platform}.${local}${observation}`
    : `Hey ${firstName},\n\nI came across ${organization ? `${organization}${platform}` : `your work${platform}`} and wanted to reach out.${local}${observation}`;
  const closing = tone === "Professional" ? "Best,\nDylan Knapp" : tone === "Confident" ? "Let’s make something great.\nDylan" : "Thanks,\nDylan";
  const body = tone === "Short"
    ? `Hey ${firstName},\n\n${selected.pitch} ${selected.ask}\n\nDylan`
    : `${opener}\n\n${selected.pitch}\n\n${selected.ask}\n\n${closing}`;
  const followUp = `Hey ${firstName} — just following up on my note about ${goal.toLowerCase()}. No pressure at all; I’d still love to connect if the timing makes sense.\n\nDylan`;

  return { subject: selected.subject, body, followUp };
}
