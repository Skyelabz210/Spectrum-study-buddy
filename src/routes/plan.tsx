import { createFileRoute } from "@tanstack/react-router";
import { MODULES } from "@/data/curriculum";
import { Card } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/plan")({
  component: Plan,
  head: () => ({
    meta: [
      { title: "Study Plan · CallFlow Lab" },
      { name: "description", content: "A weekly call-flow and sales training plan built from recordings." },
    ],
  }),
});

const PLAN = [
  {
    title: "Today",
    desc: "One usable call move.",
    items: [
      "Flip five cards from any category.",
      "Open one module and mark one lesson as learned.",
      "Write one A-R-M response in Scenario Trainer.",
    ],
  },
  {
    title: "This week",
    desc: "Stabilize the training spine.",
    items: [
      "Day one: Call Flow and Scope of Support.",
      "Day two: Integrity, SOP, and Authentication.",
      "Day three: Products and Systems navigation.",
      "Day four: Sales Traits and A-R-M.",
      "Day five: Scenario Trainer plus weekly ledger review.",
    ],
  },
  {
    title: "After each new Otter batch",
    desc: "Turn recordings into study assets.",
    items: [
      "Add a WeeklyTrainingUpdate entry.",
      "Extract new terms, scenarios, and unresolved questions.",
      "Update flashcards only after the policy or concept is stable.",
      "Keep unresolved SOP, payroll, benefits, and pricing details visible.",
    ],
  },
  {
    title: "Before production calls",
    desc: "Practice the moves that prevent avoidable errors.",
    items: [
      "Drill supervisor request, payment concern, new-customer pricing, and spouse objection.",
      "Review consent, privacy, and no-placeholder-order gates.",
      "Ask the coach to quiz only weak topics.",
    ],
  },
];

function Plan() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Your study plan</h1>
      <p className="mt-2 text-muted-foreground">
        No wasted motion. Convert weekly recordings into actions, then drill the actions until the call language is natural.
      </p>

      <div className="mt-8 space-y-4">
        {PLAN.map((p) => (
          <Card key={p.title} className="card-elevated border-border bg-card/70 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-neon">{p.title}</div>
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
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Jump to a module</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {MODULES.map((m) => (
            <Link key={m.id} to="/curriculum/$moduleId" params={{ moduleId: m.id }} className="rounded-lg border border-border bg-card/60 px-3 py-2 text-sm transition hover:border-neon/40">
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
