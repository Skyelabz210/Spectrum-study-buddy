import { createFileRoute, Link } from "@tanstack/react-router";
import { MODULES } from "@/data/curriculum";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/curriculum/")({
  component: CurriculumIndex,
  head: () => ({
    meta: [
      { title: "Curriculum · Tish-Sticks" },
      { name: "description", content: "All 8 phlebotomy modules in plain language." },
    ],
  }),
});

function CurriculumIndex() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Curriculum</h1>
      <p className="mt-2 text-muted-foreground">
        The whole phlebotomy corpus, broken into 8 modules. Tap any module to dive in. No rush — one bite at a time.
      </p>
      <div className="mt-8 space-y-3">
        {MODULES.map((m) => {
          const lessonCount = m.sections.reduce((n, s) => n + s.lessons.length, 0);
          return (
            <Link key={m.id} to="/curriculum/$moduleId" params={{ moduleId: m.id }}>
              <Card className="card-elevated flex items-start gap-4 border-border bg-card/70 p-5 transition hover:border-neon/40">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-secondary text-2xl">
                  {m.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-neon">
                      Module {m.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      · {m.tag} · {lessonCount} lessons
                    </span>
                  </div>
                  <div className="mt-0.5 text-lg font-semibold">{m.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{m.summary}</div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
