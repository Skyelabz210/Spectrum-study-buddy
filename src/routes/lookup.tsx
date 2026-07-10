import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  QUICK_LOOKUP_TERMS,
  searchKnowledgeCorpus,
  type KnowledgeRecord,
} from "@/data/knowledgeCorpus";
import { ArrowRight, CheckCircle2, Search, ShieldAlert, Sparkles } from "lucide-react";

export const Route = createFileRoute("/lookup")({
  component: QuickLookupPage,
  head: () => ({
    meta: [
      { title: "Quick Lookup · CallFlow Lab" },
      {
        name: "description",
        content: "Type one or two words and retrieve verified Spectrum plan, speed, service, requirement, note, and source data.",
      },
    ],
  }),
});

function QuickLookupPage() {
  const [query, setQuery] = useState("Advantage");
  const matches = useMemo(() => searchKnowledgeCorpus(query, 6), [query]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5 text-neon" /> Exact-source retrieval
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Quick Lookup</h1>
        <p className="mt-3 text-muted-foreground">
          Type a plan, service, acronym, speed, or feature. The local corpus returns the fastest exact answer; Quick Lookup mode in the Coach can turn the same records into a short conversational answer.
        </p>
      </section>

      <section className="mt-6">
        <Card className="card-elevated border-border bg-card/75 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try: advantage, 2 gig, unlimited plus, PBB, RRP…"
                className="h-12 bg-background pl-10 text-base"
              />
            </div>
            <Button asChild variant="outline" className="h-12">
              <Link to="/tutor" search={{ mode: "lookup", q: query }}>
                <Sparkles className="mr-2 h-4 w-4" /> Ask in AI mode
              </Link>
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_LOOKUP_TERMS.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs transition hover:border-neon/50 hover:text-neon"
              >
                {term}
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-6 space-y-4">
        {matches.length ? (
          matches.map((record, index) => <ResultCard key={record.id} record={record} primary={index === 0} />)
        ) : (
          <Card className="card-elevated border-border bg-card/75 p-6">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 text-neon" />
              <div>
                <h2 className="font-semibold">No exact corpus match</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add one identifying word—such as Internet, Mobile, WiFi, device, or protection. The lookup intentionally refuses to invent a product record.
                </p>
              </div>
            </div>
          </Card>
        )}
      </section>
    </main>
  );
}

function ResultCard({ record, primary }: { record: KnowledgeRecord; primary: boolean }) {
  return (
    <Card className={`card-elevated border-border bg-card/75 p-5 ${primary ? "ring-1 ring-neon/30" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{record.category}</Badge>
            <Badge variant="outline">{record.verification}</Badge>
            {record.businessDepth === "shallow-business" && <Badge variant="secondary">shallow business</Badge>}
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{record.title}</h2>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{record.summary}</p>
        </div>
        {primary && (
          <div className="flex items-center gap-1 text-xs text-neon">
            <CheckCircle2 className="h-4 w-4" /> best match
          </div>
        )}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field title="Plan" values={[record.plan ?? record.title]} />
        <Field title="Speed" values={[record.speed ?? "Not a speed-based product"]} />
        <Field title="Services / features" values={record.services} />
        <Field title="Requirements" values={record.requirements} />
      </div>

      <div className="mt-4 rounded-xl border border-border bg-background/50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Items of note</div>
        <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
          {record.notes.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-neon">•</span><span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <div>Source: <span className="text-foreground">{record.sourceIds.join(", ")}</span> · checked {record.lastVerified}</div>
        <Link to="/tutor" search={{ mode: "lookup", q: record.aliases[0] ?? record.title }} className="inline-flex items-center text-neon hover:underline">
          Open in AI lookup <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Link>
      </div>
    </Card>
  );
}

function Field({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-background/50 p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <ul className="mt-2 space-y-1.5 text-sm">
        {values.map((value) => (
          <li key={value} className="flex gap-2">
            <span className="text-neon">•</span><span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
