import { createFileRoute } from "@tanstack/react-router";
import { STUDY_TIPS } from "@/data/curriculum";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/tips")({
  component: Tips,
  head: () => ({
    meta: [
      { title: "Study tips · Tish-Sticks" },
      { name: "description", content: "Tools and tricks for studying when your brain isn't always cooperative." },
    ],
  }),
});

function Tips() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Study tips</h1>
      <p className="mt-2 text-muted-foreground">
        Built for real brains on real days. No labels, no judgment — just things
        that work.
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
        <h2 className="text-lg font-semibold">When everything feels like too much</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-foreground/90">
          <li>Close every tab except this one.</li>
          <li>Open <span className="text-neon">Flashcards → Flip mode</span>. Flip ONE card.</li>
          <li>If that felt okay, flip one more. If not, you still won.</li>
          <li>Tomorrow, repeat. Consistency &gt; intensity.</li>
        </ol>
      </Card>

      <Card className="card-elevated mt-4 border-border bg-card/60 p-6">
        <h2 className="text-lg font-semibold">Helpful free resources</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            ["NHA CPT Test Plan (free PDF)", "https://www.nhanow.com"],
            ["CDC Hand Hygiene Guidelines", "https://www.cdc.gov/handhygiene/"],
            ["OSHA Bloodborne Pathogens Standard", "https://www.osha.gov/bloodborne-pathogens"],
            ["CLSI Order of Draw (overview articles)", "https://clsi.org/"],
            ["Khan Academy — Circulatory System", "https://www.khanacademy.org/science/health-and-medicine/circulatory-system"],
          ].map(([label, url]) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-neon hover:underline"
              >
                {label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          External sites — open in a new tab so you don't lose your spot.
        </p>
      </Card>
    </div>
  );
}
