import { createFileRoute } from "@tanstack/react-router";
import { MODULES } from "@/data/curriculum";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/plan")({
  component: Plan,
  head: () => ({
    meta: [
      { title: "Study Plan · Tish-Sticks" },
      { name: "description", content: "A gentle, low-pressure phlebotomy study plan in halves, thirds, and quarters." },
    ],
  }),
});

const PLAN = [
  {
    title: "Today (15 min)",
    desc: "One micro-win. That's it.",
    items: [
      "Flip 5 flashcards (any deck).",
      "Read ONE lesson from Module 1 or 2.",
      "Tell the tutor 'explain order of draw like I'm 10'.",
    ],
  },
  {
    title: "This week (≈45 min/day, 5 days)",
    desc: "First quarter of the corpus.",
    items: [
      "Mon: Module 1 — Communication & HIPAA.",
      "Tue: Module 2 — Infection control.",
      "Wed: Module 3 — Safety & sharps.",
      "Thu: Module 4 — Anatomy & blood.",
      "Fri: Cheatsheet review + tutor quiz mode.",
    ],
  },
  {
    title: "Next two weeks (the second half)",
    desc: "Tubes, technique, handling, special collections.",
    items: [
      "Week 2: Modules 5 & 6 — equipment + venipuncture technique.",
      "Week 3: Modules 7 & 8 — handling, QA, POCT, blood cultures.",
      "Mix in 10 flashcards/day.",
      "Use 'Simplify mode' for any textbook paragraph that fights you.",
    ],
  },
  {
    title: "Cert prep (final stretch)",
    desc: "Cycle, don't cram.",
    items: [
      "Daily: 1 cheatsheet pass + 10 quiz questions with the tutor.",
      "Weak topics → re-read the lesson, then re-quiz the next day.",
      "Final 3 days: full mixed quiz, then rest. Sleep beats one more hour.",
    ],
  },
];

function Plan() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Your study plan</h1>
      <p className="mt-2 text-muted-foreground">
        No streaks. No guilt. Just a path. Pick whichever bite fits today —
        even one card counts.
      </p>

      <div className="mt-8 space-y-4">
        {PLAN.map((p) => (
          <Card key={p.title} className="card-elevated border-border bg-card/70 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-neon">
              {p.title}
            </div>
            <div className="mt-1 text-lg font-semibold">{p.desc}</div>
            <ul className="mt-3 space-y-2 text-sm">
              {p.items.map((i, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                  <span className="text-foreground/90">{i}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Jump to a module
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {MODULES.map((m) => (
            <Link
              key={m.id}
              to="/curriculum/$moduleId"
              params={{ moduleId: m.id }}
              className="rounded-lg border border-border bg-card/60 px-3 py-2 text-sm transition hover:border-neon/40"
            >
              <span className="mr-2">{m.emoji}</span>
              <span className="font-medium">M{m.number}.</span>{" "}
              <span className="text-muted-foreground">{m.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
