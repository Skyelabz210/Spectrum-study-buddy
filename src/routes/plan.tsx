import { createFileRoute, Link } from "@tanstack/react-router";
import { MODULES } from "@/data/fullCurriculum";
import { Card } from "@/components/ui/card";
import { SpectrumCalendarBrief } from "@/components/SpectrumCalendarBrief";

export const Route = createFileRoute("/plan")({
  component: Plan,
  head: () => ({
    meta: [
      { title: "Study Plan · Spectrum SAS" },
      {
        name: "description",
        content:
          "A weekly call-flow, product, AI, QA and sales-training plan built from approved sources and Otter sessions.",
      },
    ],
  }),
});

const PLAN = [
  {
    title: "Today",
    desc: "One usable call move.",
    items: [
      "Flip five due or weak-topic cards.",
      "Open one module and mark one lesson as learned.",
      "Run one written A-R-M response or one Across the Spectrum rep.",
      "Verify one product fact through Quick Lookup and its controlling source note.",
    ],
  },
  {
    title: "This week",
    desc: "Rotate knowledge, delivery and QA.",
    items: [
      "Day one: Call Flow, Scope, Integrity and Authentication.",
      "Day two: Internet, WiFi, TV, Mobile, Voice and technical vocabulary.",
      "Day three: Spectrum systems, Quick Lookup, Agent OS AI and Prompt Engineer.",
      "Day four: Sales traits, A-R-M, ethical bundling and order confirmation.",
      "Day five: Across the Spectrum, QA/metrics, benefits/support and Weekly Ledger review.",
    ],
  },
  {
    title: "After each new source batch",
    desc: "Turn recordings and messages into governed study assets.",
    items: [
      "Add or update the WeeklyTrainingUpdate entry with source IDs and retrieval status.",
      "Extract stable terms, scenarios, curriculum lessons, cards and unresolved questions.",
      "Preserve conflicts with dates and controlling-source instructions.",
      "Archive superseded facts instead of silently erasing provenance.",
      "Run audit, typecheck and production build before release.",
    ],
  },
  {
    title: "Before production calls",
    desc: "Practice the moves that prevent avoidable errors.",
    items: [
      "Drill supervisor request, payment concern, new-customer pricing, technical confusion and spouse objection.",
      "Review consent, privacy, disclosure, serviceability and no-placeholder-order gates.",
      "Practice one order-confirmation summary with the complete monthly estimate.",
      "Ask the coach to quiz only weak topics and verify current live-system wording.",
    ],
  },
];

function Plan() {
  return (
    <div className="page-frame mx-auto max-w-3xl py-6 sm:py-10">
      <h1 className="text-3xl font-bold tracking-tight">Your study plan</h1>
      <p className="mt-2 text-muted-foreground">
        No wasted motion. Rotate retrieval, product fluency, delivery, QA and
        source verification until the call language is natural and accurate.
      </p>

      <SpectrumCalendarBrief variant="plan" />

      <div className="mt-8 space-y-4">
        {PLAN.map((p) => (
          <Card
            key={p.title}
            className="card-elevated border-border bg-card/70 p-5"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-neon">
              {p.title}
            </div>
            <div className="mt-1 text-lg font-semibold">{p.desc}</div>
            <ul className="mt-3 space-y-2 text-sm">
              {p.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                  <span className="text-foreground/90">{item}</span>
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
