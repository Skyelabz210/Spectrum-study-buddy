import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { type Flashcard } from "@/data/curriculum";
import { ALL_FLASHCARDS } from "@/data/flashcardDeck";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  Play,
  Pause,
  Volume2,
} from "lucide-react";
import { trackFlashcard } from "@/lib/tutorMemory";
import { speakAndWait, stopSpeaking } from "@/lib/speak";

export const Route = createFileRoute("/flashcards")({
  component: Flashcards,
  head: () => ({
    meta: [
      { title: "Flashcards · CallFlow Lab" },
      {
        name: "description",
        content:
          "Quick-flip flashcards and cheatsheets for call flow, SOP, tools, sales scenarios, Spectrum plans, competitor intel, and personal setup.",
      },
    ],
  }),
});

function Flashcards() {
  return (
    <div className="page-frame mx-auto max-w-4xl py-6 sm:py-10">
      <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
      <p className="mt-2 text-muted-foreground">
        Flip cards one at a time, or open the cheatsheet for a fast scan before
        a scenario drill. One-card wins count.
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

function integerShuffle(deck: Flashcard[], seedInput: number) {
  const copy = [...deck];
  let seed = seedInput | 0;
  if (seed === 0) seed = 1;
  for (let i = copy.length - 1; i > 0; i--) {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    const j = Math.abs(seed) % (i + 1);
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function FlipDeck() {
  const [order, setOrder] = useState<Flashcard[]>(ALL_FLASHCARDS);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [auto, setAuto] = useState(false);
  const [ratePercent, setRatePercent] = useState(100);
  const [audioMessage, setAudioMessage] = useState("");
  const card = order[i];

  useEffect(() => {
    if (flipped && card) trackFlashcard(card.id);
  }, [flipped, card]);

  useEffect(() => {
    if (!auto || !card) return;
    let cancelled = false;
    const pause = (ms: number) =>
      new Promise<void>((resolve) => window.setTimeout(resolve, ms));

    const run = async () => {
      setFlipped(false);
      setAudioMessage("Reading the question.");
      const questionResult = await speakAndWait(`Question. ${card.front}`, {
        ratePercent,
      });
      if (questionResult !== "ended") {
        if (!cancelled) {
          setAuto(false);
          setAudioMessage(
            "Audio could not start. Check browser text-to-speech permissions, then tap Read card.",
          );
        }
        return;
      }
      if (cancelled) return;
      await pause(400);
      if (cancelled) return;
      setFlipped(true);
      await pause(300);
      setAudioMessage("Reading the answer.");
      const answerResult = await speakAndWait(`Answer. ${card.back}`, {
        ratePercent,
      });
      if (answerResult !== "ended") {
        if (!cancelled) {
          setAuto(false);
          setAudioMessage(
            "Audio stopped before the answer finished. Tap Read card to retry.",
          );
        }
        return;
      }
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
  }, [auto, i, card, order.length, ratePercent]);

  useEffect(() => () => stopSpeaking(), []);

  const next = () => {
    setAuto(false);
    stopSpeaking();
    setFlipped(false);
    setI((x) => (x + 1) % order.length);
  };
  const prev = () => {
    setAuto(false);
    stopSpeaking();
    setFlipped(false);
    setI((x) => (x - 1 + order.length) % order.length);
  };
  const shuffle = () => {
    setAuto(false);
    stopSpeaking();
    setOrder(integerShuffle(order, Date.now()));
    setI(0);
    setFlipped(false);
  };
  const reset = () => {
    setAuto(false);
    stopSpeaking();
    setOrder(ALL_FLASHCARDS);
    setI(0);
    setFlipped(false);
  };

  const readCard = async () => {
    setAuto(false);
    stopSpeaking();
    setAudioMessage(flipped ? "Reading the answer." : "Reading the question.");
    const result = await speakAndWait(
      flipped ? `Answer. ${card.back}` : `Question. ${card.front}`,
      {
        ratePercent,
      },
    );
    setAudioMessage(
      result === "ended"
        ? "Reader finished."
        : "Audio could not start. Check browser text-to-speech permissions and try again.",
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Card {i + 1} of {order.length} ·{" "}
          <span className="text-neon">{card.category}</span>
        </span>
        <div className="flex flex-wrap items-center gap-1">
          <Button
            size="sm"
            variant={auto ? "default" : "outline"}
            onClick={() => setAuto((a) => !a)}
            className={
              auto ? "bg-gradient-primary text-primary-foreground" : ""
            }
            title="Autoplay reads each card aloud and advances"
          >
            {auto ? (
              <Pause className="mr-1 h-3.5 w-3.5" />
            ) : (
              <Play className="mr-1 h-3.5 w-3.5" />
            )}
            {auto ? "Pause" : "Autoplay"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => void readCard()}
            disabled={auto}
          >
            <Volume2 className="mr-1 h-3.5 w-3.5" /> Read card
          </Button>
          <select
            value={ratePercent}
            onChange={(e) => setRatePercent(Number(e.target.value))}
            className="h-8 rounded-md border border-border bg-card px-1 text-xs"
            title="Voice speed"
          >
            <option value={85}>85%</option>
            <option value={100}>100%</option>
            <option value={115}>115%</option>
            <option value={130}>130%</option>
          </select>
          <Button size="sm" variant="ghost" onClick={shuffle}>
            <Shuffle className="mr-1 h-3.5 w-3.5" /> Shuffle
          </Button>
          <Button size="sm" variant="ghost" onClick={reset}>
            <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reset
          </Button>
        </div>
      </div>

      <p
        role="status"
        aria-live="polite"
        className="mt-2 min-h-5 text-xs text-muted-foreground"
      >
        {auto ? audioMessage || "Autoplay is active." : audioMessage}
      </p>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="mt-3 block w-full"
        aria-label="Flip card"
      >
        <Card
          className={`card-elevated min-h-[230px] cursor-pointer border-border p-5 text-left transition sm:min-h-[260px] sm:p-8 ${
            flipped
              ? "bg-gradient-primary text-primary-foreground glow"
              : "bg-card/70"
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
        <Button
          onClick={next}
          className="bg-gradient-primary text-primary-foreground hover:opacity-95"
        >
          Next <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Cheatsheet() {
  const grouped = useMemo(() => {
    const map = new Map<string, Flashcard[]>();
    for (const fc of ALL_FLASHCARDS) {
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
                <div className="mt-1 text-sm text-muted-foreground">
                  {c.back}
                </div>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
