"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import {
  alertStatuses,
  alertTypes,
  expenseCategories,
  expenseProjects,
  priorities,
  type AlertDraft,
  type Contact,
  type Expense,
  type ExpenseDraft,
  type FounderAlert,
  type MoneySnapshot,
} from "./types";

const today = () => { const date = new Date(); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; };
const monthNow = () => today().slice(0, 7);
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
const prettyDate = (value?: string | null) => value ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value.slice(0, 10)}T12:00:00`)) : "No due date";
const clean = (value: string) => value.trim() || null;

function Button({ children, kind = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { kind?: "primary" | "secondary" | "danger" }) {
  return <button className={`fd-button fd-button-${kind}`} {...props}>{children}</button>;
}

function Badge({ children, kind }: { children: ReactNode; kind?: string }) {
  return <span className={`fd-badge fd-badge-${(kind ?? String(children)).toLowerCase().replaceAll(" ", "-")}`}>{children}</span>;
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className="fd-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="fd-modal" role="dialog" aria-modal="true" aria-label={title}><header><div><span className="fd-kicker">Founder workspace</span><h2>{title}</h2></div><button className="fd-icon-button" onClick={onClose} aria-label="Close">×</button></header>{children}</section></div>;
}

function Empty({ children }: { children: ReactNode }) {
  return <div className="fd-empty"><span>◇</span><p>{children}</p></div>;
}

export function FounderAlerts({ alerts, contacts, userId, onRefresh, onFlash }: { alerts: FounderAlert[]; contacts: Contact[]; userId: string; onRefresh: () => Promise<void>; onFlash: (message: string) => void }) {
  const supabase = getSupabaseBrowserClient();
  const [editing, setEditing] = useState<FounderAlert | "new" | null>(null);
  const [statusFilter, setStatusFilter] = useState("Open");
  const [saving, setSaving] = useState(false);
  const followUps = contacts.filter((contact) => contact.next_follow_up_date && contact.next_follow_up_date <= today() && !["Won", "Not Interested"].includes(contact.status));
  const shown = alerts.filter((alert) => !statusFilter || alert.status === statusFilter).sort((a, b) => (a.due_date ?? "9999").localeCompare(b.due_date ?? "9999") || ({ High: 0, Medium: 1, Low: 2 }[a.priority] ?? 3) - ({ High: 0, Medium: 1, Low: 2 }[b.priority] ?? 3));

  const saveAlert = async (draft: AlertDraft) => {
    if (!supabase) return;
    setSaving(true);
    const payload = { ...draft, title: draft.title.trim(), user_id: userId };
    const result = editing === "new" ? await supabase.from("founder_alerts").insert(payload) : await supabase.from("founder_alerts").update(payload).eq("id", editing!.id);
    setSaving(false);
    if (result.error) onFlash(result.error.message);
    else { setEditing(null); await onRefresh(); onFlash("Alert saved."); }
  };
  const updateStatus = async (alert: FounderAlert, status: string) => {
    if (!supabase) return;
    const { error } = await supabase.from("founder_alerts").update({ status }).eq("id", alert.id);
    if (error) onFlash(error.message); else { await onRefresh(); onFlash(status === "Completed" ? "Alert completed." : "Alert updated."); }
  };
  const remove = async (alert: FounderAlert) => {
    if (!supabase || !window.confirm(`Delete “${alert.title}”?`)) return;
    const { error } = await supabase.from("founder_alerts").delete().eq("id", alert.id);
    if (error) onFlash(error.message); else { await onRefresh(); onFlash("Alert deleted."); }
  };

  return <div className="fd-stack">
    <section className="fd-page-heading"><div><span className="fd-kicker">Reminders and signals</span><h1>Founder Alerts</h1><p>{alerts.filter((alert) => alert.status === "Open").length} open · {followUps.length} CRM follow-up{followUps.length === 1 ? "" : "s"} due</p></div><Button onClick={() => setEditing("new")}>+ Add alert</Button></section>
    {followUps.length > 0 && <section className="fd-panel fd-alert-strip"><header><div><span className="fd-kicker">Live from your CRM</span><h2>Follow-ups needing attention</h2></div><Badge kind="overdue">{followUps.length} due</Badge></header><div className="fd-alert-grid">{followUps.map((contact) => <article key={contact.id}><div><Badge kind={contact.next_follow_up_date! < today() ? "overdue" : "due"}>{contact.next_follow_up_date! < today() ? "Overdue" : "Today"}</Badge><Badge>Follow-Up</Badge></div><h3>{contact.name}</h3><p>{contact.company ?? contact.email ?? "CRM contact"}</p><small>{prettyDate(contact.next_follow_up_date)}</small></article>)}</div></section>}
    <section className="fd-panel fd-alerts-panel"><div className="fd-toolbar fd-alert-toolbar"><select aria-label="Filter alerts by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">All statuses</option>{alertStatuses.map((value) => <option key={value}>{value}</option>)}</select></div>{shown.length ? <div className="fd-alert-list">{shown.map((alert) => { const overdue = alert.status === "Open" && Boolean(alert.due_date && alert.due_date < today()); const dueToday = alert.status === "Open" && alert.due_date === today(); return <article className={overdue ? "is-overdue" : dueToday ? "is-today" : ""} key={alert.id}><span className="fd-alert-check"><button aria-label="Mark completed" disabled={alert.status === "Completed"} onClick={() => void updateStatus(alert, "Completed")}>{alert.status === "Completed" ? "✓" : ""}</button></span><div className="fd-alert-copy"><div><Badge>{alert.type}</Badge><Badge kind={alert.priority}>{alert.priority}</Badge>{overdue && <Badge kind="overdue">Overdue</Badge>}{dueToday && <Badge kind="due">Today</Badge>}</div><h3>{alert.title}</h3>{alert.description && <p>{alert.description}</p>}<small>{prettyDate(alert.due_date)} · {alert.status}</small></div><div className="fd-row-actions"><button onClick={() => setEditing(alert)}>Edit</button>{alert.status === "Open" && <button onClick={() => void updateStatus(alert, "Dismissed")}>Dismiss</button>}<button className="danger" onClick={() => void remove(alert)}>Delete</button></div></article>; })}</div> : <Empty>No alerts match this status.</Empty>}</section>
    {editing && <AlertForm initial={editing === "new" ? { title: "", description: null, type: "Other", priority: "Medium", status: "Open", due_date: null } : { title: editing.title, description: editing.description, type: editing.type, priority: editing.priority, status: editing.status, due_date: editing.due_date }} saving={saving} onSave={saveAlert} onClose={() => setEditing(null)} />}
  </div>;
}

function AlertForm({ initial, saving, onSave, onClose }: { initial: AlertDraft; saving: boolean; onSave: (draft: AlertDraft) => void; onClose: () => void }) {
  const [draft, setDraft] = useState(initial);
  const set = (key: keyof AlertDraft, value: string | null) => setDraft((current) => ({ ...current, [key]: value }));
  return <Modal title={initial.title ? "Edit alert" : "Add alert"} onClose={onClose}><form className="fd-form" onSubmit={(event) => { event.preventDefault(); onSave(draft); }}><div className="fd-form-grid"><label className="fd-span-2">Title<input required value={draft.title} onChange={(event) => set("title", event.target.value)} /></label><label>Type<select value={draft.type} onChange={(event) => set("type", event.target.value)}>{alertTypes.map((value) => <option key={value}>{value}</option>)}</select></label><label>Priority<select value={draft.priority} onChange={(event) => set("priority", event.target.value)}>{priorities.map((value) => <option key={value}>{value}</option>)}</select></label><label>Status<select value={draft.status} onChange={(event) => set("status", event.target.value)}>{alertStatuses.map((value) => <option key={value}>{value}</option>)}</select></label><label>Due date<input type="date" value={draft.due_date ?? ""} onChange={(event) => set("due_date", clean(event.target.value))} /></label><label className="fd-span-2">Description<textarea rows={4} value={draft.description ?? ""} onChange={(event) => set("description", clean(event.target.value))} /></label></div><div className="fd-form-actions"><Button type="button" kind="secondary" onClick={onClose}>Cancel</Button><Button disabled={saving}>{saving ? "Saving…" : "Save alert"}</Button></div></form></Modal>;
}

export function MoneyDashboard({ snapshot, expenses, userId, onRefresh, onFlash }: { snapshot: MoneySnapshot | null; expenses: Expense[]; userId: string; onRefresh: () => Promise<void>; onFlash: (message: string) => void }) {
  const supabase = getSupabaseBrowserClient();
  const [snapshotOpen, setSnapshotOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | "new" | null>(null);
  const [project, setProject] = useState(""); const [category, setCategory] = useState(""); const [month, setMonth] = useState(monthNow());
  const filtered = useMemo(() => expenses.filter((expense) => (!project || expense.project === project) && (!category || expense.category === category) && (!month || expense.date.startsWith(month))).sort((a, b) => b.date.localeCompare(a.date)), [category, expenses, month, project]);
  const monthlyExpenses = filtered.reduce((total, expense) => total + Number(expense.amount), 0);
  const revenue = Number(snapshot?.business_app_revenue ?? 0);
  const profit = revenue - monthlyExpenses;
  const remove = async (expense: Expense) => { if (!supabase || !window.confirm(`Delete the ${money(Number(expense.amount))} ${expense.merchant} expense?`)) return; const { error } = await supabase.from("founder_expenses").delete().eq("id", expense.id); if (error) onFlash(error.message); else { await onRefresh(); onFlash("Expense deleted."); } };

  return <div className="fd-stack">
    <section className="fd-page-heading"><div><span className="fd-kicker">Manual tracking only</span><h1>Money Snapshot</h1><p>No bank connections, credentials, or account numbers.</p></div><div className="fd-heading-actions"><Button kind="secondary" onClick={() => setSnapshotOpen(true)}>Edit snapshot</Button><Button onClick={() => setEditingExpense("new")}>+ Add expense</Button></div></section>
    <section className="fd-money-grid"><article className="fd-money-primary"><span>Current net worth</span><strong>{money(Number(snapshot?.current_net_worth ?? 0))}</strong><small>Updated {snapshot ? prettyDate(snapshot.updated_at) : "when you save your snapshot"}</small></article>{[["Cash", snapshot?.cash ?? 0], ["Investments", snapshot?.investments ?? 0], ["Monthly revenue", revenue], ["Monthly expenses", monthlyExpenses], ["Monthly profit", profit]].map(([label, value]) => <article className="fd-stat" key={String(label)}><span>{label}</span><strong>{money(Number(value))}</strong><small>{label === "Monthly expenses" || label === "Monthly profit" ? month || "All time" : "Manual snapshot"}</small></article>)}</section>
    {snapshot?.notes && <section className="fd-panel fd-money-note"><span className="fd-kicker">Notes</span><p>{snapshot.notes}</p></section>}
    <section className="fd-panel fd-crm-panel"><header className="fd-expense-header"><div><h2>Expenses</h2><p>{money(monthlyExpenses)} across {filtered.length} item{filtered.length === 1 ? "" : "s"}</p></div><Badge>{expenses.filter((expense) => expense.recurring).length} recurring</Badge></header><div className="fd-toolbar fd-expense-toolbar"><input aria-label="Expense month" type="month" value={month} onChange={(event) => setMonth(event.target.value)} /><select aria-label="Filter expenses by project" value={project} onChange={(event) => setProject(event.target.value)}><option value="">All projects</option>{expenseProjects.map((value) => <option key={value}>{value}</option>)}</select><select aria-label="Filter expenses by category" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All categories</option>{expenseCategories.map((value) => <option key={value}>{value}</option>)}</select></div>{filtered.length ? <div className="fd-table-wrap"><table className="fd-table"><thead><tr><th>Date</th><th>Merchant</th><th>Project</th><th>Category</th><th>Recurring</th><th>Amount</th><th></th></tr></thead><tbody>{filtered.map((expense) => <tr key={expense.id}><td>{prettyDate(expense.date)}</td><td><strong>{expense.merchant}</strong>{expense.description && <small className="fd-cell-note">{expense.description}</small>}</td><td>{expense.project}</td><td><Badge>{expense.category}</Badge></td><td>{expense.recurring ? "Yes" : "No"}</td><td className="fd-expense-amount">{money(Number(expense.amount))}</td><td><div className="fd-row-actions"><button onClick={() => setEditingExpense(expense)}>Edit</button><button className="danger" onClick={() => void remove(expense)}>Delete</button></div></td></tr>)}</tbody></table></div> : <Empty>No expenses match these filters.</Empty>}</section>
    {snapshotOpen && <SnapshotForm snapshot={snapshot} userId={userId} monthlyExpenses={monthlyExpenses} onClose={() => setSnapshotOpen(false)} onSaved={async () => { setSnapshotOpen(false); await onRefresh(); onFlash("Money snapshot saved."); }} onFlash={onFlash} />}
    {editingExpense && <ExpenseForm initial={editingExpense} userId={userId} onClose={() => setEditingExpense(null)} onSaved={async () => { setEditingExpense(null); await onRefresh(); onFlash("Expense saved."); }} onFlash={onFlash} />}
  </div>;
}

function SnapshotForm({ snapshot, userId, monthlyExpenses, onClose, onSaved, onFlash }: { snapshot: MoneySnapshot | null; userId: string; monthlyExpenses: number; onClose: () => void; onSaved: () => void; onFlash: (message: string) => void }) {
  const supabase = getSupabaseBrowserClient();
  const [values, setValues] = useState({ current_net_worth: Number(snapshot?.current_net_worth ?? 0), cash: Number(snapshot?.cash ?? 0), investments: Number(snapshot?.investments ?? 0), business_app_revenue: Number(snapshot?.business_app_revenue ?? 0), notes: snapshot?.notes ?? "" });
  const [saving, setSaving] = useState(false);
  const setNumber = (key: keyof typeof values, value: string) => setValues((current) => ({ ...current, [key]: Number(value) || 0 }));
  const save = async (event: FormEvent) => { event.preventDefault(); if (!supabase) return; setSaving(true); const payload = { ...values, notes: clean(values.notes), user_id: userId, business_expenses: monthlyExpenses, monthly_profit: values.business_app_revenue - monthlyExpenses }; const { error } = await supabase.from("founder_money_snapshots").upsert(payload, { onConflict: "user_id" }); setSaving(false); if (error) onFlash(error.message); else onSaved(); };
  return <Modal title="Edit money snapshot" onClose={onClose}><form className="fd-form" onSubmit={save}><div className="fd-form-grid"><MoneyInput label="Current net worth" value={values.current_net_worth} onChange={(value) => setNumber("current_net_worth", value)} /><MoneyInput label="Cash" value={values.cash} onChange={(value) => setNumber("cash", value)} /><MoneyInput label="Investments" value={values.investments} onChange={(value) => setNumber("investments", value)} /><MoneyInput label="Monthly business/app revenue" value={values.business_app_revenue} onChange={(value) => setNumber("business_app_revenue", value)} /><label className="fd-span-2">Notes<textarea rows={4} value={values.notes} onChange={(event) => setValues((current) => ({ ...current, notes: event.target.value }))} /></label></div><div className="fd-form-actions"><Button type="button" kind="secondary" onClick={onClose}>Cancel</Button><Button disabled={saving}>{saving ? "Saving…" : "Save snapshot"}</Button></div></form></Modal>;
}

function MoneyInput({ label, value, onChange }: { label: string; value: number; onChange: (value: string) => void }) { return <label>{label}<span className="fd-money-input"><span>$</span><input type="number" step="0.01" value={value} onChange={(event) => onChange(event.target.value)} /></span></label>; }

function ExpenseForm({ initial, userId, onClose, onSaved, onFlash }: { initial: Expense | "new"; userId: string; onClose: () => void; onSaved: () => void; onFlash: (message: string) => void }) {
  const supabase = getSupabaseBrowserClient();
  const base: ExpenseDraft = initial === "new" ? { date: today(), merchant: "", category: "Other", amount: 0, description: null, project: "Other", recurring: false } : { date: initial.date, merchant: initial.merchant, category: initial.category, amount: Number(initial.amount), description: initial.description, project: initial.project, recurring: initial.recurring };
  const [draft, setDraft] = useState(base); const [saving, setSaving] = useState(false);
  const set = (key: keyof ExpenseDraft, value: string | number | boolean | null) => setDraft((current) => ({ ...current, [key]: value }));
  const save = async (event: FormEvent) => { event.preventDefault(); if (!supabase) return; setSaving(true); const payload = { ...draft, merchant: draft.merchant.trim(), user_id: userId }; const result = initial === "new" ? await supabase.from("founder_expenses").insert(payload) : await supabase.from("founder_expenses").update(payload).eq("id", initial.id); setSaving(false); if (result.error) onFlash(result.error.message); else onSaved(); };
  return <Modal title={initial === "new" ? "Add expense" : "Edit expense"} onClose={onClose}><form className="fd-form" onSubmit={save}><div className="fd-form-grid"><label>Date<input type="date" required value={draft.date} onChange={(event) => set("date", event.target.value)} /></label><label>Merchant<input required value={draft.merchant} onChange={(event) => set("merchant", event.target.value)} /></label><label>Category<select value={draft.category} onChange={(event) => set("category", event.target.value)}>{expenseCategories.map((value) => <option key={value}>{value}</option>)}</select></label><label>Project<select value={draft.project} onChange={(event) => set("project", event.target.value)}>{expenseProjects.map((value) => <option key={value}>{value}</option>)}</select></label><MoneyInput label="Amount" value={draft.amount} onChange={(value) => set("amount", Number(value) || 0)} /><label className="fd-checkbox-label"><input type="checkbox" checked={draft.recurring} onChange={(event) => set("recurring", event.target.checked)} />Recurring expense</label><label className="fd-span-2">Description<textarea rows={3} value={draft.description ?? ""} onChange={(event) => set("description", clean(event.target.value))} /></label></div><div className="fd-form-actions"><Button type="button" kind="secondary" onClick={onClose}>Cancel</Button><Button disabled={saving}>{saving ? "Saving…" : "Save expense"}</Button></div></form></Modal>;
}
