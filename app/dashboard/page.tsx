import type { Metadata } from "next";
import FounderDashboard from "@/components/dashboard/FounderDashboard";

export const metadata: Metadata = {
  title: "Founder Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <FounderDashboard />;
}
