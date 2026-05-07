import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { MODULES, type Module } from "@/data/curriculum";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, BookmarkPlus, Play, Pause, SkipForward } from "lucide-react";
import { trackLesson, trackModule, addTakeaway } from "@/lib/tutorMemory";
import { speak, stopSpeaking } from "@/lib/speak";
import { toast } from "sonner";

export const Route = createFileRoute("/curriculum/$moduleId")({
  component: ModulePage,
  loader: ({ params }): { mod: Module } => {
    const mod = MODULES.find((m) => m.id === params.moduleId);
    if (!mod) throw notFound();
    return { mod };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.mod.title} · Tish-Sticks` : "Module" },
    ],
  }),
});

function ModulePage() {
  const { mod } = Route.useLoaderData() as { mod: Module };
  const [auto, setAuto] = useState(false);
  const [rate, setRate] = useState(1);
  const [activeId, setActiveId] = useState<string | null>(null);
  const cancelRef = useRef(false);

  const playlist = useMemo(
    () => mod.sections.flatMap((s) => s.lessons),
    [mod]
  );

  useEffect(() => {
    trackModule(mod.id);
  }, [mod.id]);

  useEffect(() => () => stopSpeaking(), []);

  const speakAsync = (text: string) =>
    new Promise<void>((resolve) => {
      speak(text, { rate, onend: () => resolve() });
    });

  const playFrom = async (startIndex: number) => {
    cancelRef.current = false;
    setAuto(true);
    for (let i = startIndex; i < playlist.length; i++) {
      if (cancelRef.current) break;
      const l = playlist[i];
      setActiveId(l.id);
      const el = document.getElementById(`lesson-${l.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      const tipsText = l.tips?.length ? ` Tips: ${l.tips.join(". ")}.` : "";
      await speakAsync(`${l.title}. Why it matters: ${l.why}. ${l.body}${tipsText}`);
      if (cancelRef.current) break;
      await new Promise((r) => setTimeout(r, 500));
    }
    setAuto(false);
    setActiveId(null);
  };

  const stop = () => {
    cancelRef.current = true;
    stopSpeaking();
    setAuto(false);
    setActiveId(null);
  };

  const skip = () => {
    stopSpeaking();
  };

  const remember = (lessonId: string, lessonTitle: string, takeaway: string) => {
    trackLesson(lessonId, lessonTitle, mod.title);
    addTakeaway(takeaway);
    toast.success("Saved to tutor memory ✓");
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        to="/curriculum"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All modules
      </Link>
      <div className="mt-4 flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-primary text-2xl glow">
          {mod.emoji}
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-neon">
            Module {mod.number} · {mod.tag}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{mod.title}</h1>
          <p className="mt-2 text-muted-foreground">{mod.summary}</p>
        </div>
      </div>

      {/* Autoplay bar */}
      <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card/60 p-3">
        {auto ? (
          <Button size="sm" onClick={stop} className="bg-gradient-primary text-primary-foreground">
            <Pause className="mr-1 h-3.5 w-3.5" /> Stop
          </Button>
        ) : (
          <Button size="sm" onClick={() => playFrom(0)} className="bg-gradient-primary text-primary-foreground">
            <Play className="mr-1 h-3.5 w-3.5" /> Autoplay module
          </Button>
        )}
        {auto && (
          <Button size="sm" variant="outline" onClick={skip}>
            <SkipForward className="mr-1 h-3.5 w-3.5" /> Skip
          </Button>
        )}
        <select
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="h-8 rounded-md border border-border bg-card px-2 text-xs"
          title="Voice speed"
        >
          <option value={0.85}>0.85×</option>
          <option value={1}>1×</option>
          <option value={1.15}>1.15×</option>
          <option value={1.3}>1.3×</option>
        </select>
        <span className="text-xs text-muted-foreground">
          {auto ? "Reading aloud — tap any lesson's ▶ to jump" : "Plays each lesson aloud, in order"}
        </span>
      </div>

      <div className="mt-8 space-y-8">
        {mod.sections.map((sec) => (
          <section key={sec.id}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {sec.title}
            </h2>
            <div className="space-y-3">
              {sec.lessons.map((l) => (
                <Card
                  key={l.id}
                  id={`lesson-${l.id}`}
                  className={`card-elevated border-border bg-card/70 p-5 transition ${
                    activeId === l.id ? "ring-2 ring-neon glow" : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold">{l.title}</h3>
                  <p className="mt-2 text-sm text-neon/90">
                    <span className="font-semibold">Why it matters:</span> {l.why}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">{l.body}</p>
                  {l.tips && l.tips.length > 0 && (
                    <ul className="mt-3 space-y-1 rounded-lg border border-border bg-secondary/50 p-3 text-sm">
                      {l.tips.map((t, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-neon">•</span>
                          <span className="text-muted-foreground">{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => remember(l.id, l.title, `${l.title} — ${l.why}`)}
                    >
                      <BookmarkPlus className="mr-1 h-3.5 w-3.5" />
                      I got this
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card/60 p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 text-neon" />
          <div>
            <div className="font-semibold">Stuck on something here?</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Open the tutor and paste any sentence — Tish-Sticks will simplify
              it, quiz you on it, or make a flashcard.
            </p>
            <Button asChild className="mt-3 bg-gradient-primary text-primary-foreground hover:opacity-95">
              <Link to="/tutor">Ask the tutor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
