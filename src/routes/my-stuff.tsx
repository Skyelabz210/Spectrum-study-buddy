import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { COMPANY_BULLETIN, getBulletinItems } from "@/data/companyBulletin";
import { COMPANY_PEOPLE } from "@/data/companyPeople";
import { BellRing, CalendarDays, ChevronRight, History, KeyRound, Users } from "lucide-react";

export const Route = createFileRoute("/my-stuff")({
  component: MyStuff,
  head: () => ({ meta: [{ title: "My Stuff · Spectrum SAS" }] }),
});

const links = [
  { to: "/bulletin", title: "Bulletin Board", detail: `${getBulletinItems("priority").length} priority · ${COMPANY_BULLETIN.length} total`, icon: BellRing },
  { to: "/company-walkthrough", title: "Company Walkthrough", detail: `${COMPANY_PEOPLE.length} sourced people profiles`, icon: Users },
  { to: "/setup", title: "My Setup", detail: "Private local work shortcuts", icon: KeyRound },
  { to: "/plan", title: "Study Plan", detail: "Calendar and weekly focus", icon: CalendarDays },
  { to: "/corner", title: "Weekly Ledger", detail: "Release and ingestion history", icon: History },
] as const;

function MyStuff() {
  return <main className="page-frame mx-auto max-w-4xl py-5 sm:py-9"><div className="eyebrow text-neon">Personal workspace</div><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">My Stuff</h1><p className="mt-3 text-sm text-muted-foreground">Deadlines, people, setup and planning—one thumb-friendly level below the main workspaces.</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{links.map((item) => <Link key={item.to} to={item.to}><Card className="flex min-h-28 items-center gap-4 border-border bg-card/70 p-4 hover:border-neon/40"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-neon"><item.icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="font-semibold">{item.title}</div><div className="mt-1 text-xs text-muted-foreground">{item.detail}</div></div><ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" /></Card></Link>)}</div></main>;
}
