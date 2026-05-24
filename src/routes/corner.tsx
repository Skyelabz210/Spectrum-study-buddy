import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Leaf, Sparkles } from "lucide-react";

export const Route = createFileRoute("/corner")({
  head: () => ({
    meta: [
      { title: "Developer's Corner — Acid @ HackFate" },
      {
        name: "description",
        content:
          "A note from Acid, founder of HackFate.us — plus an organic living-soil horticulture gallery with grower tips.",
      },
    ],
  }),
  component: Corner,
});

/**
 * GALLERY SLOTS — swap monthly.
 *   position 1 → hero (large)
 *   positions 2–6 → grid (smaller)
 */
const GALLERY: Array<{
  position: number;
  src: string;
  alt: string;
  caption?: string;
  tag?: string;
}> = [
  {
    position: 1,
    src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1600&q=80",
    alt: "Lush green canopy of leaves backlit by sun",
    tag: "soil first",
    caption:
      "Healthy canopy is downstream of healthy soil. Feed the microbes, the plant feeds itself.",
  },
  {
    position: 2,
    src: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=900&q=80",
    alt: "Young seedlings in dark organic soil",
    tag: "silica · agsil",
    caption:
      "Silica (Agsil/pro-tekt) every other watering = thicker cell walls, sturdier stems, drought + pest resistance.",
  },
  {
    position: 3,
    src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=900&q=80",
    alt: "Detailed leaf veins close-up",
    tag: "Ca deficiency",
    caption:
      "Spotting Ca def: interveinal yellowing + curled new growth + brown leaf tips. Don't wait for it — top-dress dolomite ~1 month before the flip. Calcium is SLOW to break down.",
  },
  {
    position: 4,
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    alt: "Forest floor with moss and ferns",
    tag: "seaweed extract",
    caption:
      "Kelp / seaweed extract = cytokinins, trace minerals, stress response. Foliar at lights-on, or in your weekly compost tea.",
  },
  {
    position: 5,
    src: "https://images.unsplash.com/photo-1502331538081-041522531548?auto=format&fit=crop&w=900&q=80",
    alt: "Indoor plant shelf with grow light",
    tag: "no cal-mag",
    caption:
      "I run zero CalMag. CalMag is a band-aid — it nudges, it doesn't fix. Build the soil right and the plant pulls exactly what it needs, exactly when it needs it.",
  },
  {
    position: 6,
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80",
    alt: "Wildflowers in morning light",
    tag: "intention",
    caption:
      "Care, forethought, intention. That's the whole recipe — for soil, for code, for people.",
  },
];

function Corner() {
  const sorted = [...GALLERY].sort((a, b) => a.position - b.position);
  const [hero, ...rest] = sorted;

  return (
    <div className="bg-hero">
      <section className="mx-auto max-w-3xl px-6 pt-12 pb-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Leaf className="h-3 w-3 text-neon" /> developer's corner
        </div>
        <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          Hi everyone — I go by{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Acidlabz
          </span>
          , but just call me Acid.
        </h1>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            I'm the founder of{" "}
            <a
              href="https://hackfate.us"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-neon underline-offset-4 hover:underline"
            >
              HackFate.us
            </a>{" "}
            and a tinker-extraordinaire — designing custom solutions for the
            ever-changing needs of friends, family, and collaborators. I
            leverage the bleeding edge of what's possible when we let this
            fast-moving technological landscape actually{" "}
            <span className="text-foreground">enrich our lives</span> —
            preserving privacy, reinforcing sovereignty, and delivering a
            future-rich custom application experience.
          </p>
          <p>
            The days of this kind of thing only being accessible to enterprise
            or developers themselves are{" "}
            <span className="text-foreground">officially at an end</span>.
            Welcome to the technological revolution — and it's made just for
            you, exactly how you want it.
          </p>
          <p>
            Reach out for anything you need and let's build something great
            together.
          </p>
          <p>
            The five images below? My little organic horticulture knowledge
            base — grower tips for raising beautiful, healthy, beneficial
            organic flora for the betterment of mind, body, and soul.
          </p>
          <p className="text-foreground">Talk soon,</p>
          <p className="font-semibold text-foreground">— Acid</p>
        </div>

        <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-neon/80">
          <Sparkles className="h-3 w-3" /> rotating gallery · slots 1–6
        </div>
      </section>

      {/* Hero image */}
      {hero && (
        <section className="mx-auto max-w-6xl px-6 pt-6 pb-4">
          <Figure item={hero} priority className="aspect-[16/9] sm:aspect-[21/9]" />
        </section>
      )}

      {/* Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <Figure key={item.position} item={item} className="aspect-[4/5]" />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Grown slow. Shared freely. 🌱
        </p>
      </section>
    </div>
  );
}

function Figure({
  item,
  className,
  priority,
}: {
  item: {
    position: number;
    src: string;
    alt: string;
    caption?: string;
    tag?: string;
  };
  className?: string;
  priority?: boolean;
}) {
  return (
    <Card className="card-elevated group overflow-hidden border-border bg-card/70 p-0 transition hover:border-neon/40">
      <div className={`relative w-full overflow-hidden ${className ?? ""}`}>
        <img
          src={item.src}
          alt={item.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full border border-border/60 bg-background/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neon backdrop-blur">
            {String(item.position).padStart(2, "0")}
          </span>
          {item.tag && (
            <span className="rounded-full border border-magenta/40 bg-background/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-magenta backdrop-blur">
              {item.tag}
            </span>
          )}
        </div>
        {item.caption && (
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <p className="text-sm font-medium leading-snug text-foreground/95 drop-shadow">
              {item.caption}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
