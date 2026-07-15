import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { type Flashcard, type FlashcardSourceStatus } from "@/data/curriculum";
import {
  FLASHCARD_DECKS,
  LEGACY_FLASHCARD_SOURCE_GAPS,
  getDeckCards,
  resolveCardOrigin,
  resolveFlashcardSource,
  type FlashcardDeckId,
} from "@/data/flashcardDeck";
import { NEXT_DAILY_INGESTION_QUEUE_20260714 } from "@/data/dailyClassFlashcards20260714";
import {
  GMAIL_INGESTION_REPORT_20260715,
  GMAIL_NEXT_INGESTION_QUEUE_20260715,
} from "@/data/gmailProductFlashcards20260715";
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
  CircleAlert,
} from "lucide-react";
import { trackFlashcard } from "@/lib/tutorMemory";
import { speakAndWait, stopSpeaking } from "@/lib/speak";

export const Route = createFileRoute("/flashcards")({
  component: Flashcards,
  head: () => ({
    meta: [
      { title: "Flashcards · Spectrum SAS" },
      {
        name: "description",
        content:
          "Quick-flip flashcards and cheatsheets for call flow, SOP, tools, sales scenarios, Spectrum plans, competitor intel, and personal setup.",
      },
    ],
  }),
});

function Flashcards() {
  const [deckId, setDeckId] = useState<FlashcardDeckId>("milestone-questions");
  const deck = FLASHCARD_DECKS.find((item) => item.id === deckId)!;
  const cards = useMemo(() => getDeckCards(deckId), [deckId]);

  return (
    <div className="page-frame mx-auto max-w-4xl py-6 sm:py-10">
      <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
      <p className="mt-2 text-muted-foreground">
        Verbatim Milestone questions, Milestone prep and Kahoot stay separate
        for focused cramming. Article-derived study and generated mastery drills
        are selectable independently, and every older card remains available.
      </p>

      <Card className="mt-5 border-border bg-card/60 p-4">
        <label
          htmlFor="flashcard-deck"
          className="text-xs font-semibold uppercase tracking-wider text-neon"
        >
          Study deck
        </label>
        <div className="mt-2 grid gap-3 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-center">
          <select
            id="flashcard-deck"
            value={deckId}
            onChange={(event) =>
              setDeckId(event.target.value as FlashcardDeckId)
            }
            className="min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-semibold"
          >
            {(["Final exam", "Article study", "Optional mastery"] as const).map(
              (family) => (
                <optgroup key={family} label={family}>
                  {FLASHCARD_DECKS.filter((item) => item.family === family).map(
                    (item) => (
                      <option key={item.id} value={item.id}>
                        {item.label} · {getDeckCards(item.id).length} cards
                      </option>
                    ),
                  )}
                </optgroup>
              ),
            )}
          </select>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{deck.label}</span>{" "}
            · {cards.length} cards. {deck.description}
          </p>
        </div>
      </Card>

      <Tabs defaultValue="flip" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="flip">Flip mode</TabsTrigger>
          <TabsTrigger value="cheat">Cheatsheet</TabsTrigger>
          <TabsTrigger value="queue">Source queue</TabsTrigger>
        </TabsList>
        <TabsContent value="flip" className="mt-6">
          <FlipDeck cards={cards} deckLabel={deck.label} />
        </TabsContent>
        <TabsContent value="cheat" className="mt-6">
          <Cheatsheet cards={cards} />
        </TabsContent>
        <TabsContent value="queue" className="mt-6">
          <SourceQueue />
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

function FlipDeck({
  cards,
  deckLabel,
}: {
  cards: Flashcard[];
  deckLabel: string;
}) {
  const [order, setOrder] = useState<Flashcard[]>(cards);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [auto, setAuto] = useState(false);
  const [ratePercent, setRatePercent] = useState(100);
  const [audioMessage, setAudioMessage] = useState("");
  const card = order[i];
  const source = resolveFlashcardSource(card);
  const origin = getOriginMeta(resolveCardOrigin(card), source.status);
  const answerWithSource = `${card.back} Article ${source.articleNumber}. ${source.articleTitle}.`;

  useEffect(() => {
    setAuto(false);
    stopSpeaking();
    setOrder(cards);
    setI(0);
    setFlipped(false);
    setAudioMessage("");
  }, [cards]);

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
      const answerResult = await speakAndWait(`Answer. ${answerWithSource}`, {
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
  }, [auto, i, card, order.length, ratePercent, answerWithSource]);

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
    setOrder(cards);
    setI(0);
    setFlipped(false);
  };

  const readCard = async () => {
    setAuto(false);
    stopSpeaking();
    setAudioMessage(flipped ? "Reading the answer." : "Reading the question.");
    const result = await speakAndWait(
      flipped ? `Answer. ${answerWithSource}` : `Question. ${card.front}`,
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
          <span className="text-neon">{deckLabel}</span>
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
            {flipped ? "Answer" : "Question"} · Sender: {source.articleNumber} ·
            tap to flip
          </div>
          <div
            className={`mt-2 inline-flex rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${origin.className}`}
          >
            {origin.label}
          </div>
          <div className="mt-4 text-xl font-medium leading-snug sm:text-2xl">
            {flipped ? card.back : card.front}
          </div>
          {flipped ? (
            <div className="mt-5 border-t border-current/20 pt-3 text-xs font-medium leading-relaxed opacity-80">
              Article: {source.articleNumber} — {source.articleTitle}
            </div>
          ) : null}
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

function Cheatsheet({ cards }: { cards: Flashcard[] }) {
  const grouped = useMemo(() => {
    const map = new Map<string, Flashcard[]>();
    for (const fc of cards) {
      const arr = map.get(fc.category) ?? [];
      arr.push(fc);
      map.set(fc.category, arr);
    }
    return [...map.entries()];
  }, [cards]);

  return (
    <div className="space-y-8">
      {grouped.map(([cat, cards]) => (
        <section key={cat}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neon">
            {cat}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {cards.map((c) => (
              <CheatsheetCard key={c.id} card={c} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function CheatsheetCard({ card }: { card: Flashcard }) {
  const source = resolveFlashcardSource(card);
  const origin = getOriginMeta(resolveCardOrigin(card), source.status);
  return (
    <Card className="border-border bg-card/60 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">
          Sender: {source.articleNumber}
        </div>
        <div
          className={`rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${origin.className}`}
        >
          {origin.label}
        </div>
      </div>
      <div className="mt-1 text-sm font-semibold">{card.front}</div>
      <div className="mt-2 text-sm text-muted-foreground">{card.back}</div>
      <div className="mt-3 border-t border-border pt-2 text-xs text-muted-foreground">
        Article: {source.articleNumber} — {source.articleTitle}
      </div>
    </Card>
  );
}

function SourceQueue() {
  const report = GMAIL_INGESTION_REPORT_20260715;
  return (
    <div className="space-y-4">
      <Card className="border-neon/30 bg-neon/5 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-neon">
          Gmail ingestion complete · {report.completedOn}
        </div>
        <h2 className="mt-1 font-semibold">
          {report.sourceCardsAdded} article-derived cards +{" "}
          {report.masteryCardsAdded} optional mastery drills
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Reviewed {report.reviewedProductMessages} product messages across{" "}
          {report.articleFamilies} article families. Gmail added{" "}
          {report.verbatimAssessmentCardsAdded} new verbatim assessment
          questions, so the existing Milestone and Kahoot wording remains
          unchanged. {report.duplicatePolicy}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Profiles: {report.peopleProfilesAdded} added. {report.profilePolicy}{" "}
          {report.privacyPolicy}
        </p>
      </Card>

      <details className="responsive-disclosure rounded-xl border border-border bg-card/50 p-4">
        <summary className="cursor-pointer font-semibold">
          Gmail next-ingestion targets ·{" "}
          {GMAIL_NEXT_INGESTION_QUEUE_20260715.length}
        </summary>
        <div className="mt-4 space-y-3">
          {GMAIL_NEXT_INGESTION_QUEUE_20260715.map((item) => (
            <Card key={item.id} className="border-border bg-background/50 p-3">
              <div className="text-sm font-semibold">{item.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {item.detail}
              </div>
            </Card>
          ))}
        </div>
      </details>

      <Card className="border-amber-500/30 bg-amber-500/5 p-4">
        <div className="flex gap-3">
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div>
            <h2 className="font-semibold">Next daily ingestion target</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {NEXT_DAILY_INGESTION_QUEUE_20260714.length} new cards need an
              article number, full title, exact wording, or a combination of
              those fields. Hold cards stay in the deck without becoming
              authoritative answers.
            </p>
          </div>
        </div>
      </Card>

      <details className="responsive-disclosure rounded-xl border border-border bg-card/50 p-4">
        <summary className="cursor-pointer font-semibold">
          July 14 target list · {NEXT_DAILY_INGESTION_QUEUE_20260714.length}
        </summary>
        <div className="mt-4 space-y-3">
          {NEXT_DAILY_INGESTION_QUEUE_20260714.map((item) => (
            <Card
              key={item.cardId}
              className="border-border bg-background/50 p-3"
            >
              <div className="text-xs font-semibold text-neon">
                {item.cardId}
              </div>
              <div className="mt-1 text-sm font-medium">{item.prompt}</div>
              <div className="mt-2 text-xs text-muted-foreground">
                Missing: {item.missing.join(", ")}. {item.nextIngestionTarget}
              </div>
            </Card>
          ))}
        </div>
      </details>

      <details className="responsive-disclosure rounded-xl border border-border bg-card/50 p-4">
        <summary className="cursor-pointer font-semibold">
          Existing-deck article gaps · {LEGACY_FLASHCARD_SOURCE_GAPS.length}
        </summary>
        <p className="mt-3 text-sm text-muted-foreground">
          These cards are preserved in Supplementary. Target their article
          number and full title during future daily ingestion.
        </p>
        <div className="mt-4 max-h-[32rem] space-y-2 overflow-y-auto pr-1">
          {LEGACY_FLASHCARD_SOURCE_GAPS.map(({ card, source }) => (
            <Card key={card.id} className="border-border bg-background/50 p-3">
              <div className="text-xs font-semibold text-neon">{card.id}</div>
              <div className="mt-1 text-sm">{card.front}</div>
              <div className="mt-2 text-xs text-muted-foreground">
                Needed: {source.articleNumber} — {source.articleTitle}
              </div>
            </Card>
          ))}
        </div>
      </details>
    </div>
  );
}

function getOriginMeta(
  origin: ReturnType<typeof resolveCardOrigin>,
  sourceStatus: FlashcardSourceStatus,
) {
  if (
    origin === "verbatim-assessment" &&
    sourceStatus === "needs-clarification"
  )
    return {
      label: "Assessment wording hold",
      className: "border-rose-400/40 bg-rose-400/10 text-rose-200",
    };
  if (origin === "verbatim-assessment")
    return {
      label: "Verbatim assessment",
      className: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-200",
    };
  if (origin === "verbatim-prep")
    return {
      label: "Milestone prep",
      className: "border-sky-400/40 bg-sky-400/10 text-sky-200",
    };
  if (origin === "source-derived")
    return {
      label: "Article-derived",
      className: "border-neon/40 bg-neon/10 text-neon",
    };
  if (origin === "generated-mastery")
    return {
      label: "Generated mastery",
      className: "border-amber-400/40 bg-amber-400/10 text-amber-200",
    };
  return {
    label: "Supplementary",
    className: "border-border bg-muted/40 text-muted-foreground",
  };
}
