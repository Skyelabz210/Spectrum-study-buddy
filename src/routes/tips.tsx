import { createFileRoute } from "@tanstack/react-router";
import { STUDY_TIPS } from "@/data/curriculum";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/tips")({
  component: Tips,
  head: () => ({
    meta: [
      { title: "Study tips · CallFlow Lab" },
      { name: "description", content: "Practical study tactics for weekly sales training." },
    ],
  }),
});

function Tips() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Study tips</h1>
      <p className="mt-2 text-muted-foreground">
        Capture the rule, attach it to a scenario, and practice the line out loud.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {STUDY_TIPS.map((t) => (
          <Card key={t.title} className="card-elevated border-border bg-card/70 p-5">
            <div className="text-base font-semibold">{t.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
          </Card>
        ))}
      </div>

      <Card className="card-elevated mt-8 border-border bg-card/60 p-6">
        <h2 className="text-lg font-semibold">One clean drill</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-foreground/90">
          <li>Open Scenario Trainer.</li>
          <li>Pick one prompt.</li>
          <li>Write the acknowledgement line.</li>
          <li>Add the response line.</li>
          <li>Add the move-forward line.</li>
        </ol>
      </Card>

      <Card className="card-elevated mt-4 border-border bg-card/60 p-6">
        <h2 className="text-lg font-semibold">Verification rule</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          This app is a study shell. Use the current official system before live use.
        </p>
      </Card>
    </div>
  );
}
