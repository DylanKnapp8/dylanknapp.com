export const contactTypes = ["Creator", "Business", "Gym", "Coach", "Local Business", "Other"] as const;
export const contactStatuses = ["Lead", "Contacted", "Replied", "Follow-Up", "Interested", "Won", "Not Interested"] as const;
export const priorities = ["Low", "Medium", "High"] as const;
export const platforms = ["TikTok", "Instagram", "YouTube", "Website", "Other"] as const;
export const interactionTypes = ["Email", "Call", "DM", "Meeting", "Follow-Up", "Other"] as const;
export const outreachGoals = ["Promote RepQuest", "Ask for a creator partnership", "Offer a website/app build", "Ask for feedback", "General networking"] as const;
export const outreachTones = ["Casual", "Professional", "Short", "Confident"] as const;
export const alertTypes = ["Follow-Up", "Business", "App", "Website", "Money", "Personal", "Other"] as const;
export const alertStatuses = ["Open", "Completed", "Dismissed"] as const;
export const expenseCategories = ["Ads", "Software", "App Store", "Domain", "Hosting", "Design", "Contractor", "Equipment", "Other"] as const;
export const expenseProjects = ["RepQuest", "Sequoia Apps", "Personal Website", "Other"] as const;

export type Contact = {
  id: string;
  user_id: string;
  name: string;
  company: string | null;
  type: string;
  email: string | null;
  phone: string | null;
  link: string | null;
  platform: string | null;
  follower_count: number | null;
  location: string | null;
  status: string;
  priority: string;
  notes: string | null;
  last_contacted_date: string | null;
  next_follow_up_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Interaction = {
  id: string;
  user_id: string;
  contact_id: string;
  date: string;
  type: string;
  summary: string | null;
  outcome: string | null;
  created_at: string;
};

export type GeneratedEmail = {
  id: string;
  user_id: string;
  contact_id: string;
  goal: string;
  tone: string;
  subject: string;
  body: string;
  follow_up: string | null;
  created_at: string;
};

export type FounderAlert = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  type: string;
  priority: string;
  status: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export type MoneySnapshot = {
  id: string;
  user_id: string;
  current_net_worth: number;
  cash: number;
  investments: number;
  business_app_revenue: number;
  business_expenses: number;
  monthly_profit: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Expense = {
  id: string;
  user_id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  description: string | null;
  project: string;
  recurring: boolean;
  created_at: string;
  updated_at: string;
};

export type AlertDraft = Omit<FounderAlert, "id" | "user_id" | "created_at" | "updated_at">;
export type ExpenseDraft = Omit<Expense, "id" | "user_id" | "created_at" | "updated_at">;

export type ContactDraft = Omit<Contact, "id" | "user_id" | "created_at" | "updated_at">;

export const emptyContact: ContactDraft = {
  name: "",
  company: null,
  type: "Other",
  email: null,
  phone: null,
  link: null,
  platform: null,
  follower_count: null,
  location: null,
  status: "Lead",
  priority: "Medium",
  notes: null,
  last_contacted_date: null,
  next_follow_up_date: null,
};
