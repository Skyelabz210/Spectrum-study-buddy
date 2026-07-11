import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  CALLER_PERSONAS,
  DIFFICULTY_COPY,
  SIMULATOR_MARKERS,
  type CallerPersona,
  type SimulatorDifficulty,
} from "@/data/acrossSpectrum";
import { CheckCircle2, Headphones, RotateCcw, Send, ShieldCheck, TimerReset } from "lucide-react";

export const Route = createFileRoute("/across-spectrum")({
  component: AcrossSpectrumPage,
  head: () => ({
    meta: [
      { title: "Spectrum Across the Spectrum · CallFlow Lab" },
      {
        name: "description",
        content:
          "A live mock-call simulator for Spectrum sales call comfort, QA markers, caller personas, rebuttals, and wrap-up coaching.",
      },
    ],
  }),
});

type CallStatus = "ready" | "active" | "wrap";

type TranscriptLine = {
  speaker: "caller" | "agent" | "coach";
  text: string;
};

function AcrossSpectrumPage() {
  const [difficulty, setDifficulty] = useState<SimulatorDifficulty>("guided");
  const [personaId, setPersonaId] = useState(CALLER_PERSONAS[0]?.id ?? "");
  const persona = useMemo(
    () => CALLER_PERSONAS.find((item) => item.id === personaId) ?? CALLER_PERSONAS[0],
    [personaId]
  );
  const [status, setStatus] = useState<CallStatus>("ready");
  const [seconds, setSeconds] = useState(0);
  const [agentDraft, setAgentDraft] = useState("");
  const [turnIndex, setTurnIndex] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [achieved, setAchieved] = useState<string[]>([]);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status !== "active") return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [status]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [transcript]);

  const achievedMarkers = SIMULATOR_MARKERS.filter((marker) => achieved.includes(marker.id));
  const missingMarkers = SIMULATOR_MARKERS.filter((marker) => !achieved.includes(marker.id));
  const score = Math.round((achievedMarkers.length / SIMULATOR_MARKERS.length) * 100);

  const resetForPersona = (nextPersona: CallerPersona = persona) => {
    setStatus("ready");
    setSeconds(0);
    setAgentDraft("");
    setTurnIndex(0);
    setAchieved([]);
    setTranscript([
      {
        speaker: "coach",
        text: `Ready drill loaded: ${nextPersona.title}. Click Ready to start the beep and timer.`,
      },
    ]);
  };

  useEffect(() => {
    resetForPersona(persona);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personaId]);

  const startCall = () => {
    setSeconds(0);
    setTurnIndex(0);
    setAchieved([]);
    setAgentDraft("");
    setStatus("active");
    playStartBeep();
    setTranscript([
      {
        speaker: "coach",
        text: `Call started. Persona: ${persona.title}. Difficulty: ${DIFFICULTY_COPY[difficulty].label}.`,
      },
      { speaker: "caller", text: persona.openingLine },
    ]);
  };

  const endCall = () => {
    setStatus("wrap");
    setTranscript((lines) => [
      ...lines,
      {
        speaker: "coach",
        text: `Wrap-up started. QA score: ${score}%. Review achieved markers and missing markers before the next rep.`,
      },
    ]);
  };

  const handleControlClick = () => {
    if (status === "ready") startCall();
    else if (status === "active") endCall();
    else resetForPersona();
  };

  const sendAgentLine = () => {
    const clean = agentDraft.trim();
    if (!clean || status !== "active") return;
    const newMarkers = detectMarkers(clean).filter((id) => !achieved.includes(id));
    const nextCaller = persona.callerTurns[Math.min(turnIndex, persona.callerTurns.length - 1)] ?? "Tell me what the next step would be.";

    setAchieved((current) => [...current, ...newMarkers]);
    setTranscript((lines) => [
      ...lines,
      { speaker: "agent", text: clean },
      ...newMarkers.map((id): TranscriptLine => {
        const marker = SIMULATOR_MARKERS.find((item) => item.id === id);
        return { speaker: "coach", text: `Achievement unlocked: ${marker?.positiveCue ?? id}.` };
      }),
      { speaker: "caller", text: nextCaller },
    ]);
    setTurnIndex((value) => value + 1);
    setAgentDraft("");
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" /> Live practice simulator
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Spectrum Across the Spectrum
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            A mock sales-call simulator for getting comfortable with many caller types. The caller is simulated, the QA checklist watches your response, and achievements appear when you hit the right call behaviors. No point-of-service transactions.
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {status === "active" ? "Call active" : status === "wrap" ? "Wrap-up" : "Ready room"}
        </Badge>
      </div>

      <section className="mt-8 grid gap-4 lg:grid-cols-[280px_1fr_320px]">
        <aside className="space-y-4">
          <Card className="border-border bg-card/70 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neon">Caller spectrum</h2>
            <div className="mt-3 space-y-2">
              {CALLER_PERSONAS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPersonaId(item.id)}
                  className={`w-full rounded-lg border px-3 py-3 text-left text-sm transition ${
                    persona.id === item.id
                      ? "border-neon bg-secondary text-foreground"
                      : "border-border bg-background/40 text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-1 text-xs opacity-80">{item.temperament}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-border bg-card/70 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neon">Difficulty</h2>
            <div className="mt-3 space-y-2">
              {(Object.keys(DIFFICULTY_COPY) as SimulatorDifficulty[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`w-full rounded-lg border px-3 py-3 text-left text-sm transition ${
                    difficulty === level
                      ? "border-neon bg-secondary text-foreground"
                      : "border-border bg-background/40 text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <div className="font-semibold">{DIFFICULTY_COPY[level].label}</div>
                  <div className="mt-1 text-xs opacity-80">{DIFFICULTY_COPY[level].description}</div>
                </button>
              ))}
            </div>
          </Card>
        </aside>

        <section className="space-y-4">
          <Card className="card-elevated border-border bg-card/75 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">QA achievement markers</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  These indicators materialize when your response hits a quality marker.
                </p>
              </div>
              <Badge variant="outline">{achievedMarkers.length}/{SIMULATOR_MARKERS.length} complete</Badge>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {SIMULATOR_MARKERS.map((marker) => {
                const hit = achieved.includes(marker.id);
                return (
                  <div
                    key={marker.id}
                    className={`rounded-xl border p-3 transition ${
                      hit ? "border-neon bg-secondary text-foreground shadow-sm" : "border-border bg-background/40 text-muted-foreground opacity-70"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      {hit ? <CheckCircle2 className="h-4 w-4 text-neon" /> : <ShieldCheck className="h-4 w-4" />}
                      {hit ? marker.positiveCue : marker.label}
                    </div>
                    <p className="mt-1 text-xs opacity-85">{marker.description}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="card-elevated border-border bg-card/75 p-6 text-center">
            <button
              onClick={handleControlClick}
              className={`mx-auto grid h-36 w-36 place-items-center rounded-full border text-xl font-bold tracking-tight transition sm:h-44 sm:w-44 ${
                status === "active"
                  ? "border-neon bg-neon text-background shadow-[0_0_35px_rgba(99,255,218,0.35)]"
                  : status === "wrap"
                    ? "border-amber-400 bg-amber-400/15 text-amber-200"
                    : "border-border bg-card text-foreground hover:border-neon hover:text-neon"
              }`}
              aria-label="Call control"
            >
              <span>{status === "active" ? formatTime(seconds) : status === "wrap" ? "Wrap" : "Ready"}</span>
            </button>
            <p className="mt-4 text-sm text-muted-foreground">
              {status === "ready" && "Click Ready. The button turns green, the start beep plays, and the call timer starts."}
              {status === "active" && "Click the timer button again to stop the call and enter wrap-up."}
              {status === "wrap" && "Click Wrap to reset this call and run another rep."}
            </p>
          </Card>

          <div className="grid gap-4 lg:grid-cols-[1fr_.9fr]">
            <Card className="card-elevated border-border bg-card/75 p-4">
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-neon" />
                <h2 className="font-semibold">Live call transcript</h2>
              </div>
              <div ref={transcriptRef} className="mt-4 max-h-[360px] space-y-3 overflow-auto rounded-xl border border-border bg-background/50 p-3">
                {transcript.map((line, index) => (
                  <div
                    key={`${line.speaker}-${index}`}
                    className={`rounded-lg border p-3 text-sm ${
                      line.speaker === "agent"
                        ? "ml-8 border-neon/50 bg-secondary text-foreground"
                        : line.speaker === "coach"
                          ? "border-border bg-card/60 text-neon"
                          : "mr-8 border-border bg-background text-foreground"
                    }`}
                  >
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider opacity-70">{line.speaker}</div>
                    {line.text}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Textarea
                  value={agentDraft}
                  onChange={(event) => setAgentDraft(event.target.value)}
                  rows={4}
                  placeholder="Type your agent response. Example: Thank you for calling... I understand... Let me verify..."
                  disabled={status !== "active"}
                  className="bg-card"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button onClick={sendAgentLine} disabled={status !== "active" || !agentDraft.trim()} className="bg-gradient-primary text-primary-foreground hover:opacity-95">
                    <Send className="mr-1 h-4 w-4" /> Send agent response
                  </Button>
                  <Button variant="outline" onClick={() => resetForPersona()}>
                    <RotateCcw className="mr-1 h-4 w-4" /> Reset drill
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="card-elevated border-border bg-card/75 p-4">
              <h2 className="font-semibold">Scripting and tips</h2>
              <div className="mt-3 rounded-xl border border-border bg-background/50 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">Caller profile</div>
                <h3 className="mt-1 text-lg font-semibold">{persona.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{persona.context}</p>
                <div className="mt-3 text-xs text-muted-foreground"><span className="text-foreground">Voice:</span> {persona.voice}</div>
                <div className="mt-1 text-xs text-muted-foreground"><span className="text-foreground">Sales goal:</span> {persona.salesGoal}</div>
              </div>

              <div className="mt-4">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">Difficulty guidance</div>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {persona.rebuttalHints[difficulty].map((hint) => (
                    <li key={hint}>• {hint}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">Coach reminders</div>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {persona.coachingTips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </section>

        <aside className="space-y-4">
          <Card className="border-border bg-card/70 p-4">
            <div className="flex items-center gap-2">
              <TimerReset className="h-5 w-5 text-neon" />
              <h2 className="font-semibold">Wrap-up score</h2>
            </div>
            <div className="mt-4 text-5xl font-bold tracking-tight">{score}%</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Score is based on achieved QA markers in this practice rep.
            </p>
          </Card>

          <Card className="border-border bg-card/70 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neon">Unlocked</h2>
            <div className="mt-3 space-y-2">
              {achievedMarkers.length ? achievedMarkers.map((marker) => (
                <div key={marker.id} className="rounded-lg border border-neon/40 bg-secondary p-2 text-sm">
                  {marker.positiveCue}
                </div>
              )) : <p className="text-sm text-muted-foreground">No markers yet. Start the call and send a response.</p>}
            </div>
          </Card>

          <Card className="border-border bg-card/70 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neon">Next coaching focus</h2>
            <div className="mt-3 space-y-2">
              {missingMarkers.slice(0, 4).map((marker) => (
                <div key={marker.id} className="rounded-lg border border-border bg-background/50 p-2 text-sm text-muted-foreground">
                  <div className="font-semibold text-foreground">{marker.label}</div>
                  <div className="mt-1 text-xs">{marker.description}</div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </section>
    </main>
  );
}

function detectMarkers(text: string) {
  const lower = text.toLowerCase();
  return SIMULATOR_MARKERS.filter((marker) => marker.keywords.some((keyword) => lower.includes(keyword))).map((marker) => marker.id);
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function playStartBeep() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.8);
  } catch {
    // Audio may be blocked in preview or unsupported browsers; the visual timer still starts.
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
