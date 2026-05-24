import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Leaf, Sparkles } from "lucide-react";

export const Route = createFileRoute("/corner")({
  head: () => ({
    meta: [
      { title: "Developer's Corner — Tish-Sticks" },
      {
        name: "description",
        content:
          "A little gallery from the dev — organic living soil, horticulture, and things worth sharing.",
      },
    ],
  }),
  component: Corner,
});

/**
 * GALLERY SLOTS — swap these out monthly.
 *
 * To update: just replace the `src` for any position 1–6. Keep the alt text
 * descriptive. Image URLs can be Unsplash, your own hosted images, or any
 * direct image link. Captions are optional.
 *
 *   position 1 → hero (large)
 *   positions 2–6 → grid (smaller)
 */
const GALLERY: Array<{
  position: number;
  src: string;
  alt: string;
  caption?: string;
}> = [
  {
    position: 1,
    src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1600&q=80",
    alt: "Lush green canopy of leaves backlit by sun",
    caption: "Living soil → living light. The whole stack starts underground.",
  },
  {
    position: 2,
    src: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=900&q=80",
    alt: "Young seedlings in dark organic soil",
    caption: "Microbe colony, week two. Quiet work.",
  },
  {
    position: 3,
    src: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=900&q=80",
    alt: "Detailed leaf veins close-up",
    caption: "Trichomes, veins, geometry. Nature shows its math.",
  },
  {
    position: 4,
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    alt: "Forest floor with moss and ferns",
    caption: "OMRI-compliant compost mimics this exact biome.",
  },
  {
    position: 5,
    src: "https://images.unsplash.com/photo-1502331538081-041522531548?auto=format&fit=crop&w=900&q=80",
    alt: "Indoor plant shelf with grow light",
    caption: "Recursive, self-stabilizing biosphere in a 4x4.",
  },
  {
    position: 6,
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80",
    alt: "Wildflowers in morning light",
    caption: "Self-care isn't synthetic. It grows.",
  },
];

function Corner() {
  const sorted = [...GALLERY].sort((a, b) => a.position - b.position);
  const [hero, ...rest] = sorted;

  return (
    <div className="bg-hero">
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Leaf className="h-3 w-3 text-neon" /> developer's corner
        </div>
        <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          A little garden,{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            from the dev.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
          Outside of building tools like Tish-Sticks, I spend a lot of time on
          organic living soil — OMRI-compliant, sovereign, microbe-first
          horticulture. Caring for a tiny biosphere that returns the favor.
          Updated roughly once a month across all the apps I ship.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-neon/80">
          <Sparkles className="h-3 w-3" /> rotating gallery · slots 1–6
        </div>
      </section>

      {/* Hero image */}
      {hero && (
        <section className="mx-auto max-w-6xl px-6 pb-4">
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
  item: { position: number; src: string; alt: string; caption?: string };
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neon backdrop-blur">
          {String(item.position).padStart(2, "0")}
        </div>
        {item.caption && (
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-sm font-medium text-foreground/95 drop-shadow">
              {item.caption}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
