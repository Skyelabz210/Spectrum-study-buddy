import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { FLASHCARDS, type Flashcard } from "@/data/curriculum";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw, Play, Pause } from "lucide-react";
import { trackFlashcard } from "@/lib/tutorMemory";
import { speak, stopSpeaking } from "@/lib/speak";

export const Route = createFileRoute("/flashcards")({
  component: Flashcards,
  head: () => ({
    meta: [
      { title: "Flashcards · Tish-Sticks" },
      { name: "description", content: "Quick-flip flashcards and a cheatsheet for phlebotomy." },
    ],
  }),
});

function Flashcards() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
      <p className="mt-2 text-muted-foreground">
        Flip cards one at a time, or open the cheatsheet for a fast scan before a
        quiz. One-card wins count.
      </p>

      <Tabs defaultValue="flip" className="mt-6">
        <TabsList>
          <TabsTrigger value="flip">Flip mode</TabsTrigger>
          <TabsTrigger value="cheat">Cheatsheet</TabsTrigger>
        </TabsList>
        <TabsContent value="flip" className="mt-6">
          <FlipDeck />
        </TabsContent>
        <TabsContent value="cheat" className="mt-6">
          <Cheatsheet />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FlipDeck() {
  const [order, setOrder] = useState<Flashcard[]>(FLASHCARDS);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [auto, setAuto] = useState(false);
  const [rate, setRate] = useState(1);
  const card = order[i];

  useEffect(() => {
    if (flipped && card) trackFlashcard(card.id);
  }, [flipped, card]);

  // Autoplay loop: speak front → flip → speak back → next card.
  useEffect(() => {
    if (!auto || !card) return;
    let cancelled = false;
    const pause = (ms: number) =>
      new Promise<void>((r) => setTimeout(() => !cancelled && r(), ms));

    const run = async () => {
      setFlipped(false);
      await new Promise<void>((resolve) => {
        speak(`Question. ${card.front}`, { rate, onend: () => resolve() });
      });
      if (cancelled) return;
      await pause(400);
      if (cancelled) return;
      setFlipped(true);
      await pause(300);
      await new Promise<void>((resolve) => {
        speak(`Answer. ${card.back}`, { rate, onend: () => resolve() });
      });
      if (cancelled) return;
      await pause(800);
      if (cancelled) return;
      setFlipped(false);
      setI((x) => (x + 1) % order.length);
    };
    run();
    return () => {
      cancelled = true;
      stopSpeaking();
    };
  }, [auto, i, card, order.length, rate]);

  // Stop voice if user leaves the page.
  useEffect(() => () => stopSpeaking(), []);


  const next = () => {
    setFlipped(false);
    setI((x) => (x + 1) % order.length);
  };
  const prev = () => {
    setFlipped(false);
    setI((x) => (x - 1 + order.length) % order.length);
  };
  const shuffle = () => {
    setOrder([...order].sort(() => Math.random() - 0.5));
    setI(0);
    setFlipped(false);
  };
  const reset = () => {
    setOrder(FLASHCARDS);
    setI(0);
    setFlipped(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Card {i + 1} of {order.length} · <span className="text-neon">{card.category}</span>
        </span>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={shuffle}>
            <Shuffle className="mr-1 h-3.5 w-3.5" /> Shuffle
          </Button>
          <Button size="sm" variant="ghost" onClick={reset}>
            <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reset
          </Button>
        </div>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="mt-3 block w-full"
        aria-label="Flip card"
      >
        <Card
          className={`card-elevated min-h-[260px] cursor-pointer border-border p-8 text-left transition ${
            flipped ? "bg-gradient-primary text-primary-foreground glow" : "bg-card/70"
          }`}
        >
          <div className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
            {flipped ? "Answer" : "Question"} · tap to flip
          </div>
          <div className="mt-4 text-xl font-medium leading-snug sm:text-2xl">
            {flipped ? card.back : card.front}
          </div>
        </Card>
      </button>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Button variant="outline" onClick={prev}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Prev
        </Button>
        <Button onClick={next} className="bg-gradient-primary text-primary-foreground hover:opacity-95">
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Cheatsheet() {
  const grouped = useMemo(() => {
    const map = new Map<string, Flashcard[]>();
    for (const fc of FLASHCARDS) {
      const arr = map.get(fc.category) ?? [];
      arr.push(fc);
      map.set(fc.category, arr);
    }
    return [...map.entries()];
  }, []);

  return (
    <div className="space-y-8">
      {grouped.map(([cat, cards]) => (
        <section key={cat}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neon">
            {cat}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {cards.map((c) => (
              <Card key={c.id} className="border-border bg-card/60 p-3">
                <div className="text-sm font-semibold">{c.front}</div>
                <div className="mt-1 text-sm text-muted-foreground">{c.back}</div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
