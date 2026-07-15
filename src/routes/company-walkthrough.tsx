import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { COMPANY_PEOPLE } from "@/data/companyPeople";
import { ChevronLeft, ChevronRight, Mail, Network, UserRound } from "lucide-react";

export const Route = createFileRoute("/company-walkthrough")({
  component: CompanyWalkthrough,
  head: () => ({ meta: [{ title: "Company Walkthrough · Spectrum SAS" }] }),
});

function CompanyWalkthrough() {
  const [index, setIndex] = useState(0);
  const person = COMPANY_PEOPLE[index];
  return (
    <main className="page-frame mx-auto max-w-5xl py-5 sm:py-9">
      <section className="surface-panel-strong rounded-3xl p-5 sm:p-7">
        <div className="flex items-center gap-2 text-neon"><Network className="h-5 w-5" /><span className="eyebrow">My Stuff · living dossier</span></div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Company Walkthrough</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">A progressively sourced map of leadership, supervisors, support and colleagues. Unknown titles and reporting lines stay visibly unconfirmed.</p>
      </section>

      <div className="mt-5 flex items-center justify-between gap-3">
        <Button variant="outline" size="icon" className="h-11 w-11" onClick={() => setIndex((value) => (value - 1 + COMPANY_PEOPLE.length) % COMPANY_PEOPLE.length)} aria-label="Previous person"><ChevronLeft /></Button>
        <div className="text-center text-sm text-muted-foreground"><span className="font-semibold text-foreground">Person deck</span><br />{index + 1} of {COMPANY_PEOPLE.length}</div>
        <Button variant="outline" size="icon" className="h-11 w-11" onClick={() => setIndex((value) => (value + 1) % COMPANY_PEOPLE.length)} aria-label="Next person"><ChevronRight /></Button>
      </div>

      <Card className="mt-3 overflow-hidden border-neon/30 bg-card/80">
        <div className="border-b border-border bg-gradient-to-br from-primary/25 to-transparent p-5 sm:p-7">
          <div className="flex items-start gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/20 text-neon"><UserRound className="h-7 w-7" /></div><div><Badge variant="secondary">{person.tier}</Badge><h2 className="mt-2 text-2xl font-bold">{person.name}</h2><p className="mt-1 text-sm font-semibold text-neon">{person.title}</p></div></div>
        </div>
        <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-2">
          <section><h3 className="font-semibold">Why this person matters</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{person.context}</p><h3 className="mt-5 font-semibold">Corporate chain</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{person.hierarchy}</p></section>
          <section><h3 className="flex items-center gap-2 font-semibold"><Mail className="h-4 w-4 text-neon" />Correspondence channels</h3><ul className="mt-2 space-y-2 text-sm text-muted-foreground">{person.channels.map((item) => <li key={item}>• {item}</li>)}</ul><h3 className="mt-5 font-semibold">Source evidence</h3><ul className="mt-2 space-y-2 text-sm text-muted-foreground">{person.evidence.map((item) => <li key={item}>• {item}</li>)}</ul></section>
        </div>
        <div className="border-t border-amber-400/25 bg-amber-400/5 p-5 sm:px-7"><h3 className="text-sm font-semibold text-amber-200">Profile gaps for next ingestion</h3><ul className="mt-2 space-y-1 text-sm text-muted-foreground">{person.gaps.map((item) => <li key={item}>• {item}</li>)}</ul></div>
      </Card>

      <section className="mt-7"><div className="eyebrow">Known organization</div><h2 className="mt-1 text-2xl font-bold">All encountered people</h2><div className="mt-3 grid gap-3 sm:grid-cols-2">{COMPANY_PEOPLE.map((item, personIndex) => <button key={item.id} type="button" onClick={() => { setIndex(personIndex); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="min-h-20 rounded-2xl border border-border bg-card/60 p-4 text-left hover:border-neon/40"><span className="font-semibold">{item.name}</span><span className="mt-1 block text-xs text-muted-foreground">{item.title}</span></button>)}</div></section>
    </main>
  );
}
