"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { FounderAlerts, MoneyDashboard } from "./DashboardExtras";
import { generateOutreach } from "./outreach";
import {
  contactStatuses,
  contactTypes,
  emptyContact,
  interactionTypes,
  outreachGoals,
  outreachTones,
  platforms,
  priorities,
  type Contact,
  type ContactDraft,
  type GeneratedEmail,
  type Interaction,
  type Expense,
  type FounderAlert,
  type MoneySnapshot,
} from "./types";

const FOUNDER_EMAIL = "dylanknapp1888@gmail.com";
const TABS = ["Overview", "CRM", "Alerts", "Money", "Data"] as const;
type Tab = (typeof TABS)[number];

const clean = (value: string) => value.trim() || null;
const today = () => { const date = new Date(); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; };
const prettyDate = (value?: string | null) => value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value.slice(0, 10)}T12:00:00`)) : "—";
const isDue = (contact: Contact) => Boolean(contact.next_follow_up_date && contact.next_follow_up_date <= today() && !["Won", "Not Interested"].includes(contact.status));

function Icon({ name }: { name: "grid" | "users" | "bell" | "wallet" | "data" | "plus" | "search" | "logout" | "close" | "arrow" }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    wallet: <><path d="M20 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v12H5a3 3 0 0 1-3-3V6"/><path d="M16 13h2"/></>,
    data: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    search: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></>,
    close: <><path d="M18 6 6 18M6 6l12 12"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Button({ children, kind = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { kind?: "primary" | "secondary" | "danger" }) {
  return <button className={`fd-button fd-button-${kind} ${className}`} {...props}>{children}</button>;
}

function Badge({ children, kind }: { children: ReactNode; kind?: string }) {
  return <span className={`fd-badge fd-badge-${(kind ?? String(children)).toLowerCase().replaceAll(" ", "-")}`}>{children}</span>;
}

function Modal({ title, children, onClose, wide = false }: { title: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  return <div className="fd-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className={`fd-modal ${wide ? "fd-modal-wide" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
      <header><div><span className="fd-kicker">Founder workspace</span><h2>{title}</h2></div><button className="fd-icon-button" onClick={onClose} aria-label="Close"><Icon name="close" /></button></header>
      {children}
    </section>
  </div>;
}

function Login({ onLogin, loading, error, configured }: { onLogin: (username: string, password: string) => void; loading: boolean; error: string; configured: boolean }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return <main className="fd-login-shell">
    <div className="fd-login-glow" />
    <section className="fd-login-card">
      <div className="fd-mark">DK<span>◆</span></div>
      <p className="fd-kicker">Private workspace</p>
      <h1>Founder Command Center</h1>
      <p className="fd-login-copy">Sign in to manage relationships, opportunities, and outreach.</p>
      {!configured && <div className="fd-alert">Supabase environment variables are not configured yet.</div>}
      <form onSubmit={(event) => { event.preventDefault(); onLogin(username, password); }}>
        <label>Username<input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required /></label>
        <label>Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="fd-form-error" role="alert">{error}</p>}
        <Button type="submit" disabled={loading || !configured}>{loading ? "Signing in…" : "Enter dashboard"}<Icon name="arrow" /></Button>
      </form>
      <p className="fd-login-foot">Protected by Supabase Auth + Row Level Security</p>
    </section>
  </main>;
}

function ContactForm({ initial, onSave, onCancel, saving }: { initial: ContactDraft; onSave: (draft: ContactDraft) => void; onCancel: () => void; saving: boolean }) {
  const [draft, setDraft] = useState(initial);
  const set = (key: keyof ContactDraft, value: string | number | null) => setDraft((current) => ({ ...current, [key]: value }));
  return <form className="fd-form" onSubmit={(event) => { event.preventDefault(); onSave(draft); }}>
    <div className="fd-form-grid">
      <label>Name *<input value={draft.name} onChange={(event) => set("name", event.target.value)} required /></label>
      <label>Company / brand<input value={draft.company ?? ""} onChange={(event) => set("company", clean(event.target.value))} /></label>
      <label>Type<select value={draft.type} onChange={(event) => set("type", event.target.value)}>{contactTypes.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Status<select value={draft.status} onChange={(event) => set("status", event.target.value)}>{contactStatuses.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Priority<select value={draft.priority} onChange={(event) => set("priority", event.target.value)}>{priorities.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Email<input type="email" value={draft.email ?? ""} onChange={(event) => set("email", clean(event.target.value))} /></label>
      <label>Phone<input value={draft.phone ?? ""} onChange={(event) => set("phone", clean(event.target.value))} /></label>
      <label>Website / social link<input type="url" placeholder="https://" value={draft.link ?? ""} onChange={(event) => set("link", clean(event.target.value))} /></label>
      <label>Platform<select value={draft.platform ?? ""} onChange={(event) => set("platform", clean(event.target.value))}><option value="">None</option>{platforms.map((value) => <option key={value}>{value}</option>)}</select></label>
      <label>Follower count<input type="number" min="0" value={draft.follower_count ?? ""} onChange={(event) => set("follower_count", event.target.value ? Number(event.target.value) : null)} /></label>
      <label>Location<input value={draft.location ?? ""} onChange={(event) => set("location", clean(event.target.value))} /></label>
      <label>Last contacted<input type="date" value={draft.last_contacted_date ?? ""} onChange={(event) => set("last_contacted_date", clean(event.target.value))} /></label>
      <label>Next follow-up<input type="date" value={draft.next_follow_up_date ?? ""} onChange={(event) => set("next_follow_up_date", clean(event.target.value))} /></label>
      <label className="fd-span-2">Notes<textarea rows={4} value={draft.notes ?? ""} onChange={(event) => set("notes", clean(event.target.value))} /></label>
    </div>
    <div className="fd-form-actions"><Button type="button" kind="secondary" onClick={onCancel}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save contact"}</Button></div>
  </form>;
}

function Overview({ contacts, interactions, alerts, onOpenContact, onShowCrm, onShowAlerts, onAdd }: { contacts: Contact[]; interactions: Interaction[]; alerts: FounderAlert[]; onOpenContact: (contact: Contact) => void; onShowCrm: () => void; onShowAlerts: () => void; onAdd: () => void }) {
  const start = new Date(); start.setDate(start.getDate() - 7);
  const stats = [
    ["Total contacts", contacts.length, "All relationships"],
    ["Contacted this week", contacts.filter((c) => c.last_contacted_date && new Date(`${c.last_contacted_date}T12:00:00`) >= start).length, "Last seven days"],
    ["Replies", contacts.filter((c) => c.status === "Replied").length, "Waiting on your move"],
    ["Follow-ups needed", contacts.filter(isDue).length, "Due or overdue"],
    ["Active opportunities", contacts.filter((c) => ["Replied", "Follow-Up", "Interested"].includes(c.status)).length, "In conversation"],
    ["High-priority leads", contacts.filter((c) => c.priority === "High" && !["Won", "Not Interested"].includes(c.status)).length, "Worth attention"],
  ];
  const recent = [...contacts].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5);
  const due = contacts.filter(isDue).sort((a, b) => (a.next_follow_up_date ?? "").localeCompare(b.next_follow_up_date ?? "")).slice(0, 5);
  const recentInteractions = [...interactions].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5);
  const priorityAlerts = alerts.filter((alert) => alert.status === "Open" && alert.priority === "High").sort((a, b) => (a.due_date ?? "9999").localeCompare(b.due_date ?? "9999")).slice(0, 5);
  const byId = new Map(contacts.map((contact) => [contact.id, contact]));
  return <div className="fd-stack">
    <section className="fd-welcome"><div><span className="fd-kicker">Founder field notes</span><h1>Good to see you, Dylan.</h1><p>Keep the right conversations moving. Everything important is one glance away.</p></div><Button onClick={onAdd}><Icon name="plus" />Add a contact</Button></section>
    <section className="fd-stat-grid">{stats.map(([label, value, note]) => <article className="fd-stat" key={String(label)}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>
    <div className="fd-overview-grid">
      <section className="fd-panel fd-panel-wide"><PanelHeader title="Follow-ups" note="Due and overdue" action="View CRM" onAction={onShowCrm} />
        {due.length ? <div className="fd-list">{due.map((contact) => <button onClick={() => onOpenContact(contact)} key={contact.id}><Avatar name={contact.name} /><span><strong>{contact.name}</strong><small>{contact.company ?? contact.type}</small></span><span className="fd-list-end"><Badge kind={contact.next_follow_up_date! < today() ? "overdue" : "due"}>{contact.next_follow_up_date! < today() ? "Overdue" : "Due today"}</Badge><small>{prettyDate(contact.next_follow_up_date)}</small></span></button>)}</div> : <Empty text="Nothing is due. Your future self says thanks." />}
      </section>
      <section className="fd-panel"><PanelHeader title="Recent contacts" note="Newest relationships" />{recent.length ? <div className="fd-list fd-list-compact">{recent.map((contact) => <button onClick={() => onOpenContact(contact)} key={contact.id}><Avatar name={contact.name} /><span><strong>{contact.name}</strong><small>{contact.company ?? contact.type}</small></span><Badge kind={contact.priority}>{contact.priority}</Badge></button>)}</div> : <Empty text="Your CRM is ready for its first contact." />}</section>
      <section className="fd-panel"><PanelHeader title="Recent activity" note="Latest touchpoints" />{recentInteractions.length ? <div className="fd-activity">{recentInteractions.map((item) => <div key={item.id}><span className="fd-dot"/><div><strong>{item.type} · {byId.get(item.contact_id)?.name ?? "Contact"}</strong><p>{item.summary || "No notes added"}</p><small>{prettyDate(item.date)}</small></div></div>)}</div> : <Empty text="Interactions will appear here." />}</section>
      <section className="fd-panel"><PanelHeader title="High-priority alerts" note="Open founder reminders" action="View alerts" onAction={onShowAlerts} />{priorityAlerts.length ? <div className="fd-list fd-list-compact">{priorityAlerts.map((alert) => <button onClick={onShowAlerts} key={alert.id}><span className="fd-alert-mini">!</span><span><strong>{alert.title}</strong><small>{alert.type} · {prettyDate(alert.due_date)}</small></span><Badge kind={alert.due_date && alert.due_date < today() ? "overdue" : "high"}>{alert.due_date && alert.due_date < today() ? "Overdue" : "High"}</Badge></button>)}</div> : <Empty text="No open high-priority alerts." />}</section>
    </div>
  </div>;
}

function PanelHeader({ title, note, action, onAction }: { title: string; note: string; action?: string; onAction?: () => void }) { return <header className="fd-panel-header"><div><h2>{title}</h2><p>{note}</p></div>{action && <button onClick={onAction}>{action}<Icon name="arrow" /></button>}</header>; }
function Empty({ text }: { text: string }) { return <div className="fd-empty"><span>◇</span><p>{text}</p></div>; }
function Avatar({ name }: { name: string }) { return <span className="fd-avatar">{name.split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toUpperCase()}</span>; }

function CRM({ contacts, onAdd, onOpen }: { contacts: Contact[]; onAdd: () => void; onOpen: (contact: Contact) => void }) {
  const [search, setSearch] = useState(""); const [type, setType] = useState(""); const [status, setStatus] = useState(""); const [priority, setPriority] = useState(""); const [sort, setSort] = useState("newest");
  const shown = useMemo(() => {
    const query = search.toLowerCase();
    return contacts.filter((contact) => [contact.name, contact.company, contact.email, contact.link, contact.notes].some((value) => value?.toLowerCase().includes(query)) && (!type || contact.type === type) && (!status || contact.status === status) && (!priority || contact.priority === priority)).sort((a, b) => {
      if (sort === "last") return (b.last_contacted_date ?? "").localeCompare(a.last_contacted_date ?? "");
      if (sort === "follow") return (a.next_follow_up_date ?? "9999").localeCompare(b.next_follow_up_date ?? "9999");
      if (sort === "priority") return ({ High: 0, Medium: 1, Low: 2 }[a.priority] ?? 3) - ({ High: 0, Medium: 1, Low: 2 }[b.priority] ?? 3);
      return b.created_at.localeCompare(a.created_at);
    });
  }, [contacts, priority, search, sort, status, type]);
  return <div className="fd-stack"><section className="fd-page-heading"><div><span className="fd-kicker">Relationship pipeline</span><h1>Personal CRM</h1><p>{contacts.length} contact{contacts.length === 1 ? "" : "s"} across your network</p></div><Button onClick={onAdd}><Icon name="plus" />New contact</Button></section>
    <section className="fd-panel fd-crm-panel"><div className="fd-toolbar"><label className="fd-search"><Icon name="search"/><input aria-label="Search contacts" placeholder="Search contacts…" value={search} onChange={(event) => setSearch(event.target.value)} /></label><select aria-label="Filter by type" value={type} onChange={(event) => setType(event.target.value)}><option value="">All types</option>{contactTypes.map((v) => <option key={v}>{v}</option>)}</select><select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All statuses</option>{contactStatuses.map((v) => <option key={v}>{v}</option>)}</select><select aria-label="Filter by priority" value={priority} onChange={(event) => setPriority(event.target.value)}><option value="">All priorities</option>{priorities.map((v) => <option key={v}>{v}</option>)}</select><select aria-label="Sort contacts" value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest</option><option value="last">Last contacted</option><option value="follow">Next follow-up</option><option value="priority">Priority</option></select></div>
      {shown.length ? <div className="fd-table-wrap"><table className="fd-table"><thead><tr><th>Contact</th><th>Type</th><th>Status</th><th>Priority</th><th>Last contacted</th><th>Next follow-up</th></tr></thead><tbody>{shown.map((contact) => <tr key={contact.id} onClick={() => onOpen(contact)}><td><div className="fd-person"><Avatar name={contact.name}/><span><strong>{contact.name}</strong><small>{contact.company ?? contact.email ?? "No company"}</small></span></div></td><td>{contact.type}</td><td><Badge>{contact.status}</Badge></td><td><Badge kind={contact.priority}>{contact.priority}</Badge></td><td>{prettyDate(contact.last_contacted_date)}</td><td className={isDue(contact) ? "fd-date-due" : ""}>{prettyDate(contact.next_follow_up_date)}{isDue(contact) && <small>{contact.next_follow_up_date! < today() ? "Overdue" : "Due today"}</small>}</td></tr>)}</tbody></table></div> : <Empty text={contacts.length ? "No contacts match these filters." : "Add your first contact to start building the pipeline."}/>}</section>
  </div>;
}

export default function FounderDashboard() {
  const supabase = getSupabaseBrowserClient();
  const [authLoading, setAuthLoading] = useState(Boolean(supabase)); const [loginLoading, setLoginLoading] = useState(false); const [authError, setAuthError] = useState(""); const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<Tab>("Overview"); const [contacts, setContacts] = useState<Contact[]>([]); const [interactions, setInteractions] = useState<Interaction[]>([]); const [emails, setEmails] = useState<GeneratedEmail[]>([]); const [alerts, setAlerts] = useState<FounderAlert[]>([]); const [snapshot, setSnapshot] = useState<MoneySnapshot | null>(null); const [expenses, setExpenses] = useState<Expense[]>([]); const [dataLoading, setDataLoading] = useState(false); const [notice, setNotice] = useState("");
  const [contactForm, setContactForm] = useState<Contact | "new" | null>(null); const [selected, setSelected] = useState<Contact | null>(null); const [interactionOpen, setInteractionOpen] = useState(false); const [outreachOpen, setOutreachOpen] = useState(false); const [confirmClear, setConfirmClear] = useState(false); const [saving, setSaving] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  const loadData = useCallback(async () => {
    if (!supabase) return;
    setDataLoading(true);
    const [contactResult, interactionResult, emailResult, alertResult, snapshotResult, expenseResult] = await Promise.all([
      supabase.from("founder_contacts").select("*").order("created_at", { ascending: false }),
      supabase.from("founder_interactions").select("*").order("date", { ascending: false }),
      supabase.from("founder_generated_emails").select("*").order("created_at", { ascending: false }),
      supabase.from("founder_alerts").select("*").order("due_date", { ascending: true }),
      supabase.from("founder_money_snapshots").select("*").maybeSingle(),
      supabase.from("founder_expenses").select("*").order("date", { ascending: false }),
    ]);
    const error = contactResult.error || interactionResult.error || emailResult.error || alertResult.error || snapshotResult.error || expenseResult.error;
    if (error) setNotice(error.message);
    else { setContacts(contactResult.data as Contact[]); setInteractions(interactionResult.data as Interaction[]); setEmails(emailResult.data as GeneratedEmail[]); setAlerts(alertResult.data as FounderAlert[]); setSnapshot(snapshotResult.data as MoneySnapshot | null); setExpenses(expenseResult.data as Expense[]); }
    setDataLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;
    const applyUser = async (nextUser: User | null) => {
      if (nextUser && nextUser.email?.toLowerCase() !== FOUNDER_EMAIL) { await supabase.auth.signOut(); setAuthError("Unauthorized."); setUser(null); }
      else { setUser(nextUser); if (nextUser) await loadData(); }
      setAuthLoading(false);
    };
    supabase.auth.getUser().then(({ data }) => applyUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => { void applyUser(session?.user ?? null); });
    return () => listener.subscription.unsubscribe();
  }, [loadData, supabase]);

  const login = async (username: string, password: string) => {
    setAuthError("");
    if (username.trim().toLowerCase() !== "dylan") { setAuthError("Invalid username or password"); return; }
    if (!supabase) return;
    setLoginLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: FOUNDER_EMAIL, password });
    if (error || !data.user) setAuthError("Invalid username or password");
    else if (data.user.email?.toLowerCase() !== FOUNDER_EMAIL) { await supabase.auth.signOut(); setAuthError("Unauthorized."); }
    setLoginLoading(false);
  };

  const flash = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 3500); };
  const saveContact = async (draft: ContactDraft) => {
    if (!supabase || !user) return; setSaving(true);
    const payload = { ...draft, name: draft.name.trim(), user_id: user.id };
    const result = contactForm === "new" ? await supabase.from("founder_contacts").insert(payload) : await supabase.from("founder_contacts").update(payload).eq("id", contactForm!.id);
    setSaving(false); if (result.error) { flash(result.error.message); return; } setContactForm(null); setSelected(null); await loadData(); flash("Contact saved.");
  };
  const deleteContact = async (contact: Contact) => { if (!supabase || !window.confirm(`Delete ${contact.name} and all related activity?`)) return; const { error } = await supabase.from("founder_contacts").delete().eq("id", contact.id); if (error) flash(error.message); else { setSelected(null); await loadData(); flash("Contact deleted."); } };
  const logout = async () => { await supabase?.auth.signOut(); setUser(null); setContacts([]); setInteractions([]); setEmails([]); setAlerts([]); setSnapshot(null); setExpenses([]); };

  if (authLoading) return <main className="fd-loading"><div className="fd-spinner"/><p>Securing workspace…</p></main>;
  if (!user) return <Login onLogin={login} loading={loginLoading} error={authError} configured={Boolean(supabase)} />;
  const client = supabase!;
  const liveSelected = selected ? contacts.find((contact) => contact.id === selected.id) ?? selected : null;
  const dashboardContent = dataLoading && !contacts.length ? <div className="fd-loading-inline"><div className="fd-spinner"/>Loading your workspace…</div>
    : tab === "Overview" ? <Overview contacts={contacts} interactions={interactions} alerts={alerts} onOpenContact={setSelected} onShowCrm={() => setTab("CRM")} onShowAlerts={() => setTab("Alerts")} onAdd={() => setContactForm("new")}/>
    : tab === "CRM" ? <CRM contacts={contacts} onAdd={() => setContactForm("new")} onOpen={setSelected}/>
    : tab === "Alerts" ? <FounderAlerts alerts={alerts} contacts={contacts} userId={user.id} onRefresh={loadData} onFlash={flash}/>
    : tab === "Money" ? <MoneyDashboard snapshot={snapshot} expenses={expenses} userId={user.id} onRefresh={loadData} onFlash={flash}/>
    : <DataTools contacts={contacts} interactions={interactions} emails={emails} alerts={alerts} expenses={expenses} snapshot={snapshot} onExport={() => exportData(contacts, interactions, emails, alerts, snapshot, expenses)} onImport={() => importRef.current?.click()} onClear={() => setConfirmClear(true)}/>;

  return <main className="fd-shell">
    <aside className="fd-sidebar"><div className="fd-brand"><div className="fd-mark">DK<span>◆</span></div><div><strong>Founder OS</strong><small>Private command center</small></div></div><nav>{TABS.map((item, index) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}><Icon name={(["grid", "users", "bell", "wallet", "data"] as const)[index]}/>{item}</button>)}</nav><div className="fd-sidebar-foot"><div className="fd-user"><Avatar name="Dylan Knapp"/><span><strong>Dylan Knapp</strong><small>Founder</small></span></div><button onClick={logout} aria-label="Log out"><Icon name="logout"/></button></div></aside>
    <div className="fd-main"><header className="fd-mobile-header"><div className="fd-brand"><div className="fd-mark">DK<span>◆</span></div><strong>Founder OS</strong></div><button onClick={logout}><Icon name="logout"/></button></header><nav className="fd-mobile-tabs">{TABS.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</nav><div className="fd-content">{dashboardContent}</div></div>
    {notice && <div className="fd-toast">{notice}</div>}
    <input ref={importRef} hidden type="file" accept="application/json" onChange={(event) => { const file = event.target.files?.[0]; if (file) void importData(file, client, user.id, loadData, flash); event.target.value = ""; }}/>
    {contactForm && <Modal title={contactForm === "new" ? "Add contact" : `Edit ${contactForm.name}`} onClose={() => setContactForm(null)} wide><ContactForm initial={contactForm === "new" ? emptyContact : toDraft(contactForm)} onSave={saveContact} onCancel={() => setContactForm(null)} saving={saving}/></Modal>}
    {liveSelected && <ContactDetail contact={liveSelected} interactions={interactions.filter((item) => item.contact_id === liveSelected.id)} emails={emails.filter((item) => item.contact_id === liveSelected.id)} onClose={() => setSelected(null)} onEdit={() => { setContactForm(liveSelected); setSelected(null); }} onDelete={() => void deleteContact(liveSelected)} onInteraction={() => setInteractionOpen(true)} onOutreach={() => setOutreachOpen(true)}/>} 
    {interactionOpen && liveSelected && <InteractionModal contact={liveSelected} userId={user.id} onClose={() => setInteractionOpen(false)} onSaved={async () => { setInteractionOpen(false); await loadData(); flash("Interaction added."); }}/>} 
    {outreachOpen && liveSelected && <OutreachModal contact={liveSelected} userId={user.id} onClose={() => setOutreachOpen(false)} onSaved={async () => { setOutreachOpen(false); await loadData(); flash("Outreach saved."); }}/>} 
    {confirmClear && <Modal title="Clear all CRM data?" onClose={() => setConfirmClear(false)}><div className="fd-confirm"><p>This permanently deletes every contact. Interactions and generated emails will be removed with them.</p><div><Button kind="secondary" onClick={() => setConfirmClear(false)}>Cancel</Button><Button kind="danger" onClick={async () => { const { error } = await client.from("founder_contacts").delete().eq("user_id", user.id); setConfirmClear(false); if (error) flash(error.message); else { await loadData(); flash("CRM data cleared."); } }}>Delete everything</Button></div></div></Modal>}
  </main>;
}

function toDraft(contact: Contact): ContactDraft { return { name: contact.name, company: contact.company, type: contact.type, email: contact.email, phone: contact.phone, link: contact.link, platform: contact.platform, follower_count: contact.follower_count, location: contact.location, status: contact.status, priority: contact.priority, notes: contact.notes, last_contacted_date: contact.last_contacted_date, next_follow_up_date: contact.next_follow_up_date }; }

function ContactDetail({ contact, interactions, emails, onClose, onEdit, onDelete, onInteraction, onOutreach }: { contact: Contact; interactions: Interaction[]; emails: GeneratedEmail[]; onClose: () => void; onEdit: () => void; onDelete: () => void; onInteraction: () => void; onOutreach: () => void }) {
  const copy = (value: string | null) => value && navigator.clipboard.writeText(value);
  return <Modal title={contact.name} onClose={onClose} wide><div className="fd-detail-head"><div className="fd-detail-person"><Avatar name={contact.name}/><div><div><Badge>{contact.status}</Badge><Badge kind={contact.priority}>{contact.priority} priority</Badge></div><p>{contact.company ?? contact.type}{contact.location ? ` · ${contact.location}` : ""}</p></div></div><div className="fd-detail-actions"><Button kind="secondary" onClick={onEdit}>Edit</Button><Button onClick={onOutreach}>Generate outreach</Button></div></div>
    <div className="fd-detail-grid"><section><h3>Contact information</h3><dl><Info label="Email" value={contact.email}/><Info label="Phone" value={contact.phone}/><Info label="Link" value={contact.link} link/><Info label="Platform" value={contact.platform}/><Info label="Followers" value={contact.follower_count?.toLocaleString()}/><Info label="Last contacted" value={prettyDate(contact.last_contacted_date)}/><Info label="Next follow-up" value={prettyDate(contact.next_follow_up_date)}/></dl><h3>Notes</h3><p className="fd-notes">{contact.notes || "No notes yet."}</p><Button kind="danger" onClick={onDelete}>Delete contact</Button></section>
      <section><div className="fd-subhead"><h3>Interaction history</h3><button onClick={onInteraction}>+ Add interaction</button></div>{interactions.length ? <div className="fd-timeline">{interactions.map((item) => <article key={item.id}><span/><div><header><strong>{item.type}</strong><small>{prettyDate(item.date)}</small></header><p>{item.summary || "No summary"}</p>{item.outcome && <small>Outcome: {item.outcome}</small>}</div></article>)}</div> : <Empty text="No interactions logged yet."/>}<div className="fd-subhead"><h3>Generated outreach</h3><span>{emails.length}</span></div>{emails.length ? <div className="fd-email-list">{emails.map((email) => <article key={email.id}><header><div><Badge>{email.tone}</Badge><small>{prettyDate(email.created_at)}</small></div><button onClick={() => copy(email.body)}>Copy email</button></header><strong>{email.subject}</strong><p>{email.body}</p></article>)}</div> : <Empty text="Generated emails will be saved here."/>}</section></div>
  </Modal>;
}
function Info({ label, value, link }: { label: string; value?: string | null; link?: boolean }) { return <div><dt>{label}</dt><dd>{link && value ? <a href={value} target="_blank" rel="noreferrer">{value}</a> : value || "—"}</dd></div>; }

function InteractionModal({ contact, userId, onClose, onSaved }: { contact: Contact; userId: string; onClose: () => void; onSaved: () => void }) {
  const supabase = getSupabaseBrowserClient(); const [date, setDate] = useState(today()); const [type, setType] = useState("Email"); const [summary, setSummary] = useState(""); const [outcome, setOutcome] = useState(""); const [saving, setSaving] = useState(false); const [error, setError] = useState("");
  const submit = async (event: FormEvent) => { event.preventDefault(); if (!supabase) return; setSaving(true); const { error: insertError } = await supabase.from("founder_interactions").insert({ user_id: userId, contact_id: contact.id, date, type, summary: clean(summary), outcome: clean(outcome) }); setSaving(false); if (insertError) setError(insertError.message); else onSaved(); };
  return <Modal title={`Log interaction with ${contact.name}`} onClose={onClose}><form className="fd-form" onSubmit={submit}><div className="fd-form-grid"><label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/></label><label>Type<select value={type} onChange={(e) => setType(e.target.value)}>{interactionTypes.map((v) => <option key={v}>{v}</option>)}</select></label><label className="fd-span-2">Summary<textarea rows={4} value={summary} onChange={(e) => setSummary(e.target.value)}/></label><label className="fd-span-2">Outcome<input value={outcome} onChange={(e) => setOutcome(e.target.value)}/></label></div>{error && <p className="fd-form-error">{error}</p>}<div className="fd-form-actions"><Button type="button" kind="secondary" onClick={onClose}>Cancel</Button><Button disabled={saving}>{saving ? "Saving…" : "Add interaction"}</Button></div></form></Modal>;
}

function OutreachModal({ contact, userId, onClose, onSaved }: { contact: Contact; userId: string; onClose: () => void; onSaved: () => void }) {
  const supabase = getSupabaseBrowserClient(); const [goal, setGoal] = useState(outreachGoals[0]); const [tone, setTone] = useState(outreachTones[0]); const generated = useMemo(() => generateOutreach(contact, goal, tone), [contact, goal, tone]); const [saving, setSaving] = useState(false); const [error, setError] = useState("");
  const copy = (value: string) => void navigator.clipboard.writeText(value);
  const save = async () => { if (!supabase) return; setSaving(true); const { error: insertError } = await supabase.from("founder_generated_emails").insert({ user_id: userId, contact_id: contact.id, goal, tone, subject: generated.subject, body: generated.body, follow_up: generated.followUp }); setSaving(false); if (insertError) setError(insertError.message); else onSaved(); };
  const mailto = `mailto:${encodeURIComponent(contact.email ?? "")}?subject=${encodeURIComponent(generated.subject)}&body=${encodeURIComponent(generated.body)}`;
  return <Modal title={`Outreach for ${contact.name}`} onClose={onClose} wide><div className="fd-generator"><div className="fd-generator-options"><label>Goal<select value={goal} onChange={(e) => setGoal(e.target.value as typeof goal)}>{outreachGoals.map((v) => <option key={v}>{v}</option>)}</select></label><label>Tone<select value={tone} onChange={(e) => setTone(e.target.value as typeof tone)}>{outreachTones.map((v) => <option key={v}>{v}</option>)}</select></label><p>Generated locally from your contact data. Nothing is sent automatically.</p></div><div className="fd-generated"><section><header><span>Subject</span><button onClick={() => copy(generated.subject)}>Copy</button></header><strong>{generated.subject}</strong></section><section><header><span>Email body</span><button onClick={() => copy(generated.body)}>Copy</button></header><p>{generated.body}</p></section><section><header><span>Follow-up</span><button onClick={() => copy(generated.followUp)}>Copy</button></header><p>{generated.followUp}</p></section></div></div>{error && <p className="fd-form-error">{error}</p>}<div className="fd-form-actions"><a className="fd-button fd-button-secondary" href={mailto}>Open mail app</a><Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save to contact"}</Button></div></Modal>;
}

function DataTools({ contacts, interactions, emails, alerts, expenses, snapshot, onExport, onImport, onClear }: { contacts: Contact[]; interactions: Interaction[]; emails: GeneratedEmail[]; alerts: FounderAlert[]; expenses: Expense[]; snapshot: MoneySnapshot | null; onExport: () => void; onImport: () => void; onClear: () => void }) {
  return <div className="fd-stack"><section className="fd-page-heading"><div><span className="fd-kicker">Workspace controls</span><h1>Data tools</h1><p>Own your data. Move it, back it up, or start fresh.</p></div></section><section className="fd-data-grid"><article className="fd-panel"><span className="fd-data-icon">⇩</span><h2>Export workspace</h2><p>Download CRM, alerts, money snapshot, expenses, interactions, and generated emails as one JSON backup.</p><strong>{contacts.length} contacts · {alerts.length} alerts · {expenses.length} expenses · {snapshot ? "1 snapshot" : "no snapshot"}</strong><Button onClick={onExport}>Export JSON</Button></article><article className="fd-panel"><span className="fd-data-icon">⇧</span><h2>Import workspace</h2><p>Restore a JSON backup from this dashboard. Existing records with the same IDs are skipped.</p><strong>{interactions.length} interactions · {emails.length} generated emails currently saved</strong><Button kind="secondary" onClick={onImport}>Choose JSON file</Button></article><article className="fd-panel fd-danger-panel"><span className="fd-data-icon">×</span><h2>Clear CRM</h2><p>Permanently delete all contacts and their related interactions and generated emails. Alerts and money data are preserved.</p><strong>This action cannot be undone</strong><Button kind="danger" onClick={onClear}>Clear CRM data</Button></article></section></div>;
}

function exportData(contacts: Contact[], interactions: Interaction[], emails: GeneratedEmail[], alerts: FounderAlert[], snapshot: MoneySnapshot | null, expenses: Expense[]) { const blob = new Blob([JSON.stringify({ version: 2, exported_at: new Date().toISOString(), contacts, interactions, generated_emails: emails, alerts, money_snapshot: snapshot, expenses }, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `founder-workspace-${today()}.json`; anchor.click(); URL.revokeObjectURL(url); }

async function importData(file: File, supabase: NonNullable<ReturnType<typeof getSupabaseBrowserClient>>, userId: string, reload: () => Promise<void>, flash: (message: string) => void) {
  try {
    const parsed = JSON.parse(await file.text()) as { contacts?: Contact[]; interactions?: Interaction[]; generated_emails?: GeneratedEmail[]; alerts?: FounderAlert[]; money_snapshot?: MoneySnapshot | null; expenses?: Expense[] };
    if (!Array.isArray(parsed.contacts)) throw new Error("This is not a valid dashboard backup.");
    const contacts = parsed.contacts.map((row) => ({ ...row, user_id: userId }));
    const interactions = (parsed.interactions ?? []).map((row) => ({ ...row, user_id: userId }));
    const emails = (parsed.generated_emails ?? []).map((row) => ({ ...row, user_id: userId }));
    const alerts = (parsed.alerts ?? []).map((row) => ({ ...row, user_id: userId }));
    const expenses = (parsed.expenses ?? []).map((row) => ({ ...row, user_id: userId }));
    const snapshot = parsed.money_snapshot ? { ...parsed.money_snapshot, user_id: userId } : null;
    const contactResult = contacts.length ? await supabase.from("founder_contacts").upsert(contacts, { onConflict: "id", ignoreDuplicates: true }) : { error: null };
    if (contactResult.error) throw contactResult.error;
    const interactionResult = interactions.length ? await supabase.from("founder_interactions").upsert(interactions, { onConflict: "id", ignoreDuplicates: true }) : { error: null };
    if (interactionResult.error) throw interactionResult.error;
    const emailResult = emails.length ? await supabase.from("founder_generated_emails").upsert(emails, { onConflict: "id", ignoreDuplicates: true }) : { error: null };
    if (emailResult.error) throw emailResult.error;
    const alertResult = alerts.length ? await supabase.from("founder_alerts").upsert(alerts, { onConflict: "id", ignoreDuplicates: true }) : { error: null };
    if (alertResult.error) throw alertResult.error;
    const expenseResult = expenses.length ? await supabase.from("founder_expenses").upsert(expenses, { onConflict: "id", ignoreDuplicates: true }) : { error: null };
    if (expenseResult.error) throw expenseResult.error;
    const snapshotResult = snapshot ? await supabase.from("founder_money_snapshots").upsert(snapshot, { onConflict: "user_id" }) : { error: null };
    if (snapshotResult.error) throw snapshotResult.error;
    await reload(); flash("Workspace backup imported.");
  } catch (error) { flash(error instanceof Error ? error.message : "Could not import that file."); }
}
