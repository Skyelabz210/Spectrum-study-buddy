import { createFileRoute, Link } from "@tanstack/react-router";
import { MODULES, FLASHCARDS } from "@/data/curriculum";
import { getCurrentWeek } from "@/data/weeklyTraining";
import { SCENARIOS } from "@/data/scenarios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Layers, BookOpen, ArrowRight, ClipboardCheck, History } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const week = getCurrentWeek();
  const lessonCount = MODULES.reduce((n, m) => n + m.sections.reduce((s, sec) => s + sec.lessons.length, 0), 0);

  return (
    <div className="bg-hero">
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-10 sm:pt-20 sm:pb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-neon" /> {week.appVersion} · {week.weekId}
        </div>
        <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Call-flow study, {" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            updated every week.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
          CallFlow Lab turns recorded classroom training into small study bites: SOP gates, product navigation, A-R-M objection drills, flashcards, weekly ledgers, and a coach that keeps the current training spine in view.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground glow hover:opacity-95">
            <Link to="/curriculum">
              Start curriculum <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/scenarios">
              <ClipboardCheck className="mr-1 h-4 w-4" /> Drill scenarios
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/tutor">
              <Sparkles className="mr-1 h-4 w-4" /> Ask the coach
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-10 sm:grid-cols-4">
        <Tile icon={<BookOpen className="h-5 w-5 text-neon" />} title={`${MODULES.length} modules`} subtitle={`${lessonCount} lessons`} href="/curriculum" />
        <Tile icon={<ClipboardCheck className="h-5 w-5 text-neon" />} title={`${SCENARIOS.length} scenarios`} subtitle="A-R-M + policy gates" href="/scenarios" />
        <Tile icon={<Layers className="h-5 w-5 text-neon" />} title={`${FLASHCARDS.length} flashcards`} subtitle="Flip mode + cheatsheet" href="/flashcards" />
        <Tile icon={<History className="h-5 w-5 text-neon" />} title="Weekly ledger" subtitle={week.dateRange} href="/corner" />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Training spine</h2>
          <Link to="/curriculum" className="text-sm text-neon hover:underline">
            See all →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODULES.map((m) => (
            <Link key={m.id} to="/curriculum/$moduleId" params={{ moduleId: m.id }}>
              <Card className="card-elevated group flex items-start gap-3 border-border bg-card/70 p-4 transition hover:border-neon/40 hover:bg-card">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-lg">
                  {m.emoji}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-neon">
                      Module {m.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      · {m.tag}
                    </span>
                  </div>
                  <div className="mt-0.5 font-semibold">{m.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{m.summary}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Tile({
  icon,
  title,
  subtitle,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: "/curriculum" | "/scenarios" | "/flashcards" | "/tutor" | "/corner";
}) {
  return (
    <Link to={href}>
      <Card className="card-elevated flex items-center gap-3 border-border bg-card/70 p-4 transition hover:border-neon/40 hover:bg-card">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-muted-foreground">{subtitle}</div>
        </div>
      </Card>
    </Link>
  );
}
