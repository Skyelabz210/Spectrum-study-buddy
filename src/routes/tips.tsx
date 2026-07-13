import { createFileRoute } from "@tanstack/react-router";
import { STUDY_TIPS } from "@/data/curriculum";
import { Card } from "@/components/ui/card";

const AUDIT_TIPS = [
  { title: "Separate fact from authority", body: "A transcript or card can teach the concept. The current article, biller, Agent OS, SOP or Benefit Connect controls the live action." },
  { title: "One technical correction", body: "When a customer mixes up modem, router, WiFi or Internet, correct one point gently and return to the practical need." },
  { title: "One repair per simulator rep", body: "Keep the strongest behavior and target the highest-value missing QA marker on the next call." },
  { title: "Abstract before AI", body: "Use household need and objection context. Remove names, addresses, account information, payment data, PINs and security codes before using AI tools." },
  { title: "Short live prompts", body: "Ask AI for a few discovery questions, one verified value bridge, likely objections and a consent-clean close—not a long technical monologue." },
  { title: "Use the right mode", body: "Quick Lookup retrieves. Curriculum teaches. Flashcards reinforce. Scenarios formulate. Across the Spectrum rehearses. Coach diagnoses and quizzes." },
  { title: "Audio plus text", body: "Use autoplay when reading load is high, but keep the visible lesson or card open and stop or slow speech whenever comprehension drops." },
  { title: "Metrics are diagnostic", body: "Improve AHT and other measures through fluency and clean process. Never skip discovery, verification, disclosure or consent to chase a number." },
];

export const Route = createFileRoute("/tips")({
  component: Tips,
  head: () => ({
    meta: [
      { title: "Study tips · CallFlow Lab" },
      { name: "description", content: "Practical study tactics for source-aware Spectrum sales training, QA, AI tools and call simulation." },
    ],
  }),
});

function Tips() {
  const tips = [...STUDY_TIPS, ...AUDIT_TIPS];
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Study tips</h1>
      <p className="mt-2 text-muted-foreground">
        Capture the rule, verify the source, attach it to a scenario and practice the call behavior out loud.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {tips.map((tip) => (
          <Card key={tip.title} className="card-elevated border-border bg-card/70 p-5">
            <div className="text-base font-semibold">{tip.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{tip.body}</p>
          </Card>
        ))}
      </div>

      <Card className="card-elevated mt-8 border-border bg-card/60 p-6">
        <h2 className="text-lg font-semibold">One clean practice loop</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-foreground/90">
          <li>Retrieve or review one fact.</li>
          <li>State the controlling-source or verification gate.</li>
          <li>Attach the fact to one customer need.</li>
          <li>Practice it in Scenario Trainer or Across the Spectrum.</li>
          <li>Keep one success and one repair for the next rep.</li>
        </ol>
      </Card>

      <Card className="card-elevated mt-4 border-border bg-card/60 p-6">
        <h2 className="text-lg font-semibold">Verification rule</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          This app is a private study shell. Current official procedure, product articles, biller, Agent OS, approved offers, HR and benefits systems control live decisions.
        </p>
      </Card>
    </div>
  );
}
