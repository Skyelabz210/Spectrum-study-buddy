import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SCENARIOS } from "@/data/scenarios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/scenarios")({
  component: ScenariosPage,
  head: () => ({
    meta: [
      { title: "Scenario Trainer · CallFlow Lab" },
      { name: "description", content: "Practice customer objections using A-R-M, policy gates, and clean forward motion." },
    ],
  }),
});

function ScenariosPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showCoach, setShowCoach] = useState(false);
  const scenario = SCENARIOS[selectedIndex];

  const grouped = useMemo(() => {
    const map = new Map<string, typeof SCENARIOS>();
    for (const item of SCENARIOS) {
      const bucket = map.get(item.pattern) ?? [];
      bucket.push(item);
      map.set(item.pattern, bucket);
    }
    return [...map.entries()];
  }, []);

  const next = () => {
    setSelectedIndex((i) => (i + 1) % SCENARIOS.length);
    setAnswer("");
    setShowCoach(false);
  };

  const reset = () => {
    setAnswer("");
    setShowCoach(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scenario Trainer</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Practice the call move before the call hits. Write your version first, then compare it against the A-R-M or policy-gate model.
          </p>
        </div>
        <div className="rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
          {SCENARIOS.length} scenarios · weekly-updated
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          {grouped.map(([pattern, items]) => (
            <Card key={pattern} className="border-border bg-card/60 p-3">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neon">
                {pattern}
              </div>
              <div className="space-y-1">
                {items.map((item) => {
                  const idx = SCENARIOS.findIndex((s) => s.id === item.id);
                  const active = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedIndex(idx);
                        setAnswer("");
                        setShowCoach(false);
                      }}
                      className={`w-full rounded-md px-2 py-2 text-left text-sm transition ${
                        active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
        </aside>

        <section>
          <Card className="card-elevated border-border bg-card/70 p-6">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="text-neon">Module {scenario.module}</span>
              <span>· {scenario.pattern}</span>
              <span>· {scenario.weekId}</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{scenario.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{scenario.context}</p>

            <div className="mt-5 rounded-xl border border-border bg-background/60 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">Customer says</div>
              <p className="mt-2 text-lg font-medium leading-snug">“{scenario.customerStatement}”</p>
            </div>

            <div className="mt-5">
              <label className="text-sm font-semibold">Write your response</label>
              <p className="mt-1 text-xs text-muted-foreground">
                Include acknowledge, respond, and move-forward pieces. Keep it truthful, positive, and consent-clean.
              </p>
              <Textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                rows={7}
                className="mt-3 bg-card"
                placeholder="Example: I understand... Let me... The next step is..."
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => setShowCoach(true)} className="bg-gradient-primary text-primary-foreground hover:opacity-95">
                <CheckCircle2 className="mr-1 h-4 w-4" /> Compare to coach model
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="mr-1 h-4 w-4" /> Reset
              </Button>
              <Button variant="ghost" onClick={next}>Next scenario</Button>
            </div>
          </Card>

          {showCoach && (
            <Card className="card-elevated mt-5 border-border bg-card/70 p-6">
              <h3 className="text-lg font-semibold">Coach model</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <ModelBlock title="Acknowledge" body={scenario.acknowledge} />
                <ModelBlock title="Respond" body={scenario.respond} />
                <ModelBlock title="Move forward" body={scenario.moveForward} />
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">Coach notes</div>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {scenario.coachNotes.map((note) => (
                      <li key={note}>• {note}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">Risk flags</div>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {scenario.riskFlags.map((flag) => (
                      <li key={flag}>• {flag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}

function ModelBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{body}</p>
    </div>
  );
}
