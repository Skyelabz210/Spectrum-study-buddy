import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MODULES } from "@/data/curriculum";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/curriculum/$moduleId")({
  component: ModulePage,
  loader: ({ params }) => {
    const mod = MODULES.find((m) => m.id === params.moduleId);
    if (!mod) throw notFound();
    return { mod };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.mod.title} · Tish-Sticks` : "Module" },
    ],
  }),
});

function ModulePage() {
  const { mod } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        to="/curriculum"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All modules
      </Link>
      <div className="mt-4 flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-primary text-2xl glow">
          {mod.emoji}
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-neon">
            Module {mod.number} · {mod.tag}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{mod.title}</h1>
          <p className="mt-2 text-muted-foreground">{mod.summary}</p>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {mod.sections.map((sec) => (
          <section key={sec.id}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {sec.title}
            </h2>
            <div className="space-y-3">
              {sec.lessons.map((l) => (
                <Card key={l.id} className="card-elevated border-border bg-card/70 p-5">
                  <h3 className="text-lg font-semibold">{l.title}</h3>
                  <p className="mt-2 text-sm text-neon/90">
                    <span className="font-semibold">Why it matters:</span> {l.why}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">{l.body}</p>
                  {l.tips && l.tips.length > 0 && (
                    <ul className="mt-3 space-y-1 rounded-lg border border-border bg-secondary/50 p-3 text-sm">
                      {l.tips.map((t, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-neon">•</span>
                          <span className="text-muted-foreground">{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card/60 p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 text-neon" />
          <div>
            <div className="font-semibold">Stuck on something here?</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Open the tutor and paste any sentence — Tish-Sticks will simplify
              it, quiz you on it, or make a flashcard.
            </p>
            <Button asChild className="mt-3 bg-gradient-primary text-primary-foreground hover:opacity-95">
              <Link to="/tutor">Ask the tutor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
