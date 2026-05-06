import { createFileRoute, Link } from "@tanstack/react-router";
import { MODULES, FLASHCARDS } from "@/data/curriculum";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Layers, BookOpen, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="bg-hero">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-10 sm:pt-20 sm:pb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-neon" /> made for Tish · v1
        </div>
        <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Phlebotomy study,{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            in small, kind bites.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
          Tish-Sticks breaks the whole certification corpus into halves, thirds,
          quarters — and one-card wins. Lessons, flashcards, an AI tutor that
          re-explains anything in plain English, and a gentle plan that meets
          you wherever your brain is today.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground glow hover:opacity-95">
            <Link to="/curriculum">
              Start studying <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/tutor">
              <Sparkles className="mr-1 h-4 w-4" /> Ask the tutor
            </Link>
          </Button>
        </div>
      </section>

      {/* Quick tiles */}
      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-10 sm:grid-cols-3">
        <Tile
          icon={<BookOpen className="h-5 w-5 text-neon" />}
          title="8 modules"
          subtitle={`${MODULES.reduce((n, m) => n + m.sections.reduce((s, sec) => s + sec.lessons.length, 0), 0)} lessons, plain-language`}
          href="/curriculum"
        />
        <Tile
          icon={<Layers className="h-5 w-5 text-neon" />}
          title={`${FLASHCARDS.length} flashcards`}
          subtitle="Flip mode + cheatsheet view"
          href="/flashcards"
        />
        <Tile
          icon={<Sparkles className="h-5 w-5 text-neon" />}
          title="AI tutor"
          subtitle="Simplify · quiz · body-double"
          href="/tutor"
        />
      </section>

      {/* Modules preview */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight">The corpus, in 8 chunks</h2>
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
  href: "/curriculum" | "/flashcards" | "/tutor";
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
