import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { WEEKLY_UPDATES } from "@/data/weeklyTraining";
import { History, CheckCircle2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/corner")({
  head: () => ({
    meta: [
      { title: "Weekly Ledger · Spectrum SAS" },
      { name: "description", content: "Weekly training ingestion ledger and version history." },
    ],
  }),
  component: WeeklyLedger,
});

function WeeklyLedger() {
  return (
    <div className="page-frame mx-auto max-w-5xl py-6 sm:py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
        <History className="h-3 w-3 text-neon" /> revision ledger
      </div>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">Weekly training ledger</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Each weekly update records the training source window, app version, modules touched, scenario seeds, action items, and unresolved questions. This keeps the study app reversible and auditable.
      </p>

      <div className="mt-8 space-y-5">
        {WEEKLY_UPDATES.map((week) => (
          <Card key={week.weekId} className="card-elevated border-border bg-card/70 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-neon">{week.weekId} · {week.appVersion}</div>
                <h2 className="mt-1 text-2xl font-semibold">{week.dateRange}</h2>
              </div>
              <div className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
                source: {week.source}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-foreground/90">{week.summary}</p>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <Section title="Recordings ingested">
                {week.recordings.filter((r) => r.status === "ingested").map((r) => (
                  <li key={r.id}>
                    <span className="font-medium text-foreground/90">{r.title}</span>
                    <span className="text-muted-foreground"> · {r.duration}</span>
                  </li>
                ))}
              </Section>
              <Section title="Modules touched">
                {week.modulesTouched.map((m) => <li key={m}>{m}</li>)}
              </Section>
              <Section title="New terms">
                {week.newTerms.map((t) => <li key={t}>{t}</li>)}
              </Section>
              <Section title="Scenario seeds">
                {week.scenarioSeeds.map((s) => <li key={s}>{s}</li>)}
              </Section>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <Box icon={<CheckCircle2 className="h-4 w-4 text-neon" />} title="Action items" items={week.actionItems} />
              <Box icon={<AlertTriangle className="h-4 w-4 text-neon" />} title="Unresolved questions" items={week.unresolvedQuestions} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neon">{title}</div>
      <ul className="space-y-1 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}

function Box({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon} {title}
      </div>
      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}
