import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageReader } from "@/components/PageReader";
import { Textarea } from "@/components/ui/textarea";
import {
  CALLER_PERSONAS,
  DIFFICULTY_COPY,
  SIMULATOR_MARKERS,
  type CallerPersona,
  type SimulatorDifficulty,
} from "@/data/acrossSpectrum";
import { buildSimulatorOfferBoard } from "@/data/acrossSpectrumOffers";
import {
  getCallerVoiceProfile,
  getTargetedCallerResponse,
} from "@/data/acrossSpectrumVoice";
import {
  evaluateAgentLine,
  nextQaSuggestion,
  type MarkerEvidence,
} from "@/lib/acrossSpectrumQa";
import {
  createRecognitionSession,
  isSpeechRecognitionSupported,
  type SpeechRecognitionLike,
} from "@/lib/liveSpeech";
import { simulateCallerTurn } from "@/lib/simulator.functions";
import { speak, stopSpeaking } from "@/lib/speak";
import {
  AlertTriangle,
  CheckCircle2,
  Headphones,
  Keyboard,
  Loader2,
  Mic,
  MicOff,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Volume2,
  VolumeX,
} from "lucide-react";

export const Route = createFileRoute("/across-spectrum")({
  component: AcrossSpectrumPage,
  head: () => ({
    meta: [
      { title: "Spectrum Across the Spectrum · CallFlow Lab" },
      {
        name: "description",
        content:
          "A voice-first Spectrum sales-call simulator with caller audio, microphone transcription, evidence-based QA, offer guidance, caller personas and wrap-up coaching.",
      },
    ],
  }),
});

type CallStatus = "ready" | "active" | "wrap";
type VoicePhase =
  "idle" | "caller-speaking" | "listening" | "processing" | "unsupported";
type LineSource = "system" | "speech" | "typed" | "ai" | "script";

type TranscriptLine = {
  speaker: "caller" | "agent" | "coach";
  text: string;
  source?: LineSource;
  confidence?: number;
};

type EvidenceMap = Record<string, MarkerEvidence>;

const PRACTICE_BOUNDARY = "Practice only—no real customer data or transactions";

function AcrossSpectrumPage() {
  const [difficulty, setDifficulty] = useState<SimulatorDifficulty>("guided");
  const [personaId, setPersonaId] = useState(CALLER_PERSONAS[0]?.id ?? "");
  const persona = useMemo(
    () =>
      CALLER_PERSONAS.find((item) => item.id === personaId) ??
      CALLER_PERSONAS[0],
    [personaId],
  );
  const voiceProfile = useMemo(
    () => getCallerVoiceProfile(persona.id),
    [persona.id],
  );

  const [status, setStatus] = useState<CallStatus>("ready");
  const [phase, setPhase] = useState<VoicePhase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [agentDraft, setAgentDraft] = useState("");
  const [interimText, setInterimText] = useState("");
  const [turnIndex, setTurnIndex] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [achieved, setAchieved] = useState<string[]>([]);
  const [markerEvidence, setMarkerEvidence] = useState<EvidenceMap>({});
  const [usedResponseRuleIds, setUsedResponseRuleIds] = useState<string[]>([]);
  const [recognitionError, setRecognitionError] = useState("");
  const [voiceLoop, setVoiceLoop] = useState(true);
  const [preferLocalRecognition, setPreferLocalRecognition] = useState(false);
  const [callerAudio, setCallerAudio] = useState(true);
  const [lastCallerText, setLastCallerText] = useState("");

  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const delayedCallerRef = useRef<number | null>(null);
  const statusRef = useRef<CallStatus>(status);
  const transcriptStateRef = useRef<TranscriptLine[]>(transcript);
  const achievedRef = useRef<string[]>(achieved);
  const turnIndexRef = useRef(turnIndex);
  const usedRuleIdsRef = useRef<string[]>(usedResponseRuleIds);
  const voiceLoopRef = useRef(voiceLoop);
  const callerAudioRef = useRef(callerAudio);
  const preferLocalRef = useRef(preferLocalRecognition);

  const recognitionSupported = useMemo(
    () => isSpeechRecognitionSupported(),
    [],
  );

  useEffect(() => {
    statusRef.current = status;
  }, [status]);
  useEffect(() => {
    transcriptStateRef.current = transcript;
  }, [transcript]);
  useEffect(() => {
    achievedRef.current = achieved;
  }, [achieved]);
  useEffect(() => {
    turnIndexRef.current = turnIndex;
  }, [turnIndex]);
  useEffect(() => {
    usedRuleIdsRef.current = usedResponseRuleIds;
  }, [usedResponseRuleIds]);
  useEffect(() => {
    voiceLoopRef.current = voiceLoop;
  }, [voiceLoop]);
  useEffect(() => {
    callerAudioRef.current = callerAudio;
  }, [callerAudio]);
  useEffect(() => {
    preferLocalRef.current = preferLocalRecognition;
  }, [preferLocalRecognition]);

  useEffect(() => {
    if (status !== "active") return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [status]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [transcript, interimText]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      stopSpeaking();
      if (delayedCallerRef.current)
        window.clearTimeout(delayedCallerRef.current);
    };
  }, []);

  const achievedMarkers = SIMULATOR_MARKERS.filter((marker) =>
    achieved.includes(marker.id),
  );
  const missingMarkers = SIMULATOR_MARKERS.filter(
    (marker) => !achieved.includes(marker.id),
  );
  const score = Math.round(
    (achievedMarkers.length / SIMULATOR_MARKERS.length) * 100,
  );
  const transcriptText = useMemo(
    () =>
      [...transcript.map((line) => line.text), interimText, agentDraft]
        .filter(Boolean)
        .join(" "),
    [agentDraft, interimText, transcript],
  );
  const offerBoard = useMemo(
    () => buildSimulatorOfferBoard(persona.id, transcriptText),
    [persona.id, transcriptText],
  );
  const qaSuggestion = nextQaSuggestion(achieved, turnIndex);
  const difficultyHint =
    persona.rebuttalHints[difficulty][
      Math.min(turnIndex, persona.rebuttalHints[difficulty].length - 1)
    ];

  const appendLines = (newLines: TranscriptLine[]) => {
    setTranscript((current) => {
      const next = [...current, ...newLines];
      transcriptStateRef.current = next;
      return next;
    });
  };

  const stopRecognition = (abort = true) => {
    const recognition = recognitionRef.current;
    recognitionRef.current = null;
    if (!recognition) return;
    try {
      if (abort) recognition.abort();
      else recognition.stop();
    } catch {
      // Recognition can already be stopped by the browser.
    }
    setInterimText("");
    setPhase((current) => (current === "listening" ? "idle" : current));
  };

  const startListening = () => {
    if (statusRef.current !== "active") return;
    if (!recognitionSupported) {
      setPhase("unsupported");
      setRecognitionError(
        "Speech recognition is not available in this browser. Use the typing fallback.",
      );
      return;
    }

    stopSpeaking();
    stopRecognition();
    setRecognitionError("");
    setInterimText("");
    let finalText = "";
    let finalConfidence: number | undefined;

    const recognition = createRecognitionSession(
      {
        onStart: () => setPhase("listening"),
        onResult: (result) => {
          if (result.interimText) setInterimText(result.interimText);
          if (result.finalText) {
            finalText = `${finalText} ${result.finalText}`.trim();
            finalConfidence = result.confidence;
            setInterimText(result.finalText);
            try {
              recognitionRef.current?.stop();
            } catch {
              // Browser may stop automatically after a final result.
            }
          }
        },
        onError: (message) => {
          setPhase("idle");
          setRecognitionError(message);
        },
        onEnd: () => {
          recognitionRef.current = null;
          setPhase("idle");
          setInterimText("");
          if (finalText && statusRef.current === "active") {
            void processAgentLine(finalText, "speech", finalConfidence);
          }
        },
      },
      { lang: "en-US", preferLocal: preferLocalRef.current },
    );

    if (!recognition) {
      setPhase("unsupported");
      return;
    }

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setRecognitionError(
        "The microphone could not start. Try again or use typing.",
      );
      setPhase("idle");
    }
  };

  const speakCallerLine = (
    text: string,
    source: "ai" | "script" = "script",
    append = true,
  ) => {
    stopRecognition();
    setLastCallerText(text);
    if (append) appendLines([{ speaker: "caller", text, source }]);

    if (!callerAudioRef.current) {
      setPhase("idle");
      if (voiceLoopRef.current && statusRef.current === "active")
        window.setTimeout(startListening, 250);
      return;
    }

    setPhase("caller-speaking");
    speak(text, {
      ratePercent: voiceProfile.ratePercent,
      pitchPercent: voiceProfile.pitchPercent,
      preferredVoiceTokens: voiceProfile.preferredVoiceTokens,
      fallbackVoiceIndex: voiceProfile.fallbackVoiceIndex,
      onend: () => {
        setPhase("idle");
        if (voiceLoopRef.current && statusRef.current === "active")
          window.setTimeout(startListening, 250);
      },
      onerror: () => {
        setPhase("idle");
        setRecognitionError(
          "Caller audio could not start. The caller line remains in the transcript; use Replay caller or continue with the typing fallback.",
        );
      },
    });
  };

  const resetForPersona = (nextPersona: CallerPersona = persona) => {
    statusRef.current = "ready";
    setStatus("ready");
    stopRecognition();
    stopSpeaking();
    if (delayedCallerRef.current) window.clearTimeout(delayedCallerRef.current);
    setPhase("idle");
    setSeconds(0);
    setAgentDraft("");
    setInterimText("");
    setTurnIndex(0);
    setAchieved([]);
    setMarkerEvidence({});
    setUsedResponseRuleIds([]);
    setRecognitionError("");
    setLastCallerText("");
    setTranscript([
      {
        speaker: "coach",
        source: "system",
        text: `Ready drill loaded: ${nextPersona.title}. Click Ready to start the audible call and timer.`,
      },
    ]);
  };

  useEffect(() => {
    resetForPersona(persona);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personaId]);

  const startCall = () => {
    statusRef.current = "active";
    setStatus("active");
    setSeconds(0);
    setTurnIndex(0);
    setAchieved([]);
    setMarkerEvidence({});
    setUsedResponseRuleIds([]);
    setAgentDraft("");
    setInterimText("");
    setRecognitionError("");
    setPhase("idle");
    setTranscript([
      {
        speaker: "coach",
        source: "system",
        text: `Call started. Persona: ${persona.title}. Difficulty: ${DIFFICULTY_COPY[difficulty].label}. Voice loop: ${voiceLoop ? "on" : "manual"}.`,
      },
    ]);
    transcriptStateRef.current = [];
    playStartBeep();
    delayedCallerRef.current = window.setTimeout(() => {
      if (statusRef.current === "active")
        speakCallerLine(persona.openingLine, "script");
    }, 850);
  };

  const endCall = () => {
    statusRef.current = "wrap";
    setStatus("wrap");
    stopRecognition();
    stopSpeaking();
    setPhase("idle");
    const currentScore = Math.round(
      (achievedRef.current.length / SIMULATOR_MARKERS.length) * 100,
    );
    appendLines([
      {
        speaker: "coach",
        source: "system",
        text: `Wrap-up started. QA score: ${currentScore}%. Review the exact evidence, missing markers, offer fit and next coaching focus before the next rep.`,
      },
    ]);
  };

  const handleControlClick = () => {
    if (status === "ready") startCall();
    else if (status === "active") endCall();
    else resetForPersona();
  };

  const fallbackCallerReply = (agentText: string) => {
    const targeted = getTargetedCallerResponse(
      persona.id,
      agentText,
      usedRuleIdsRef.current,
    );
    if (targeted) {
      const nextIds = [...usedRuleIdsRef.current, targeted.ruleId];
      usedRuleIdsRef.current = nextIds;
      setUsedResponseRuleIds(nextIds);
      return targeted.response;
    }
    return (
      persona.callerTurns[
        Math.min(turnIndexRef.current, persona.callerTurns.length - 1)
      ] ?? "Tell me what the next step would be."
    );
  };

  const processAgentLine = async (
    rawText: string,
    source: "speech" | "typed",
    confidence?: number,
  ) => {
    const clean = rawText.trim();
    if (!clean || statusRef.current !== "active") return;

    stopRecognition();
    setAgentDraft("");
    setInterimText("");
    setPhase("processing");

    const hits = evaluateAgentLine(clean);
    const newHits = hits.filter(
      (hit) => !achievedRef.current.includes(hit.markerId),
    );
    if (newHits.length) {
      const nextAchieved = [
        ...achievedRef.current,
        ...newHits.map((hit) => hit.markerId),
      ];
      achievedRef.current = nextAchieved;
      setAchieved(nextAchieved);
      setMarkerEvidence((current) => {
        const next = { ...current };
        for (const hit of newHits) next[hit.markerId] = hit;
        return next;
      });
    }

    const agentLine: TranscriptLine = {
      speaker: "agent",
      text: clean,
      source,
      confidence,
    };
    const coachLines = newHits.map((hit): TranscriptLine => {
      const marker = SIMULATOR_MARKERS.find((item) => item.id === hit.markerId);
      return {
        speaker: "coach",
        source: "system",
        text: `Achievement unlocked: ${marker?.positiveCue ?? hit.markerId}. Evidence: “${clean}”`,
      };
    });
    appendLines([agentLine, ...coachLines]);

    const conversation = [...transcriptStateRef.current, agentLine]
      .filter((line) => line.speaker === "caller" || line.speaker === "agent")
      .slice(-20)
      .map((line) => ({
        speaker: line.speaker as "caller" | "agent",
        text: line.text,
      }));
    const currentOffers = buildSimulatorOfferBoard(
      persona.id,
      `${transcriptText} ${clean}`,
    );

    let reply = "";
    let replySource: "ai" | "script" = "script";
    try {
      const result = await simulateCallerTurn({
        data: {
          personaId: persona.id,
          agentText: clean,
          transcript: conversation,
          offerTitles: currentOffers.map((offer) => offer.title),
        },
      });
      reply = result.reply.trim();
      replySource = "ai";
    } catch {
      reply = fallbackCallerReply(clean);
    }

    if (statusRef.current !== "active") return;
    const nextTurn = turnIndexRef.current + 1;
    turnIndexRef.current = nextTurn;
    setTurnIndex(nextTurn);
    setPhase("idle");
    speakCallerLine(reply || fallbackCallerReply(clean), replySource);
  };

  const sendTypedLine = () => {
    void processAgentLine(agentDraft, "typed");
  };

  const toggleMic = () => {
    if (phase === "listening") stopRecognition(false);
    else startListening();
  };

  const replayCaller = () => {
    if (!lastCallerText) return;
    speakCallerLine(lastCallerText, "script", false);
  };

  return (
    <main className="page-frame mx-auto max-w-[1500px] py-5 sm:py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" /> Voice-first
            live practice
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Spectrum Across the Spectrum
          </h1>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            Hear the caller, answer aloud, watch your words appear on screen,
            unlock QA evidence, and use a live offer board plus targeted
            coaching. The caller uses the private AI gateway when available and
            a deterministic scenario fallback when it is not.{" "}
            {PRACTICE_BOUNDARY}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            {status === "active"
              ? "Call active"
              : status === "wrap"
                ? "Wrap-up"
                : "Ready room"}
          </Badge>
          <Badge variant="outline">{voiceProfile.label}</Badge>
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="mt-4 rounded-xl border border-border bg-card/60 px-4 py-3 text-sm"
      >
        <span className="font-semibold text-neon">Live state:</span>{" "}
        {phase === "caller-speaking" &&
          "Caller speaking—listen for the complete thought."}
        {phase === "listening" && "Microphone active—answer the caller now."}
        {phase === "processing" &&
          "Auditor is scoring the response and preparing the next caller turn."}
        {phase === "unsupported" &&
          "Voice recognition is unavailable; typing fallback is active."}
        {phase === "idle" &&
          status === "active" &&
          "Ready for the next spoken turn."}
        {phase === "idle" &&
          status !== "active" &&
          "Choose a caller and press Ready."}
      </div>

      <PageReader
        label="Read simulator guide"
        disabled={status === "active"}
        text={`Spectrum Across the Spectrum simulator guide. Selected caller: ${persona.title}. Difficulty: ${DIFFICULTY_COPY[difficulty].label}. Press Ready to play the start beep and hear the caller. Answer by voice or use the typing fallback. The live auditor marks exact QA evidence. Use fictional practice language only. Never enter real customer data or complete transactions here.`}
        className="mt-3 rounded-xl border border-border bg-card/60 px-3 py-2"
      />

      <section className="mt-6 grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
        <aside className="order-2 xl:order-1">
          <details className="responsive-disclosure">
            <summary>Caller, difficulty, and voice setup</summary>
            <div className="mt-3 space-y-4 xl:mt-0">
              <Card className="border-border bg-card/70 p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neon">
                  Caller spectrum
                </h2>
                <div className="mt-3 space-y-2">
                  {CALLER_PERSONAS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setPersonaId(item.id)}
                      disabled={status === "active"}
                      className={`w-full rounded-lg border px-3 py-3 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
                        persona.id === item.id
                          ? "border-neon bg-secondary text-foreground"
                          : "border-border bg-background/40 text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <div className="font-semibold">{item.title}</div>
                      <div className="mt-1 text-xs opacity-80">
                        {item.temperament}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="border-border bg-card/70 p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neon">
                  Difficulty
                </h2>
                <div className="mt-3 space-y-2">
                  {(Object.keys(DIFFICULTY_COPY) as SimulatorDifficulty[]).map(
                    (level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        disabled={status === "active"}
                        className={`w-full rounded-lg border px-3 py-3 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          difficulty === level
                            ? "border-neon bg-secondary text-foreground"
                            : "border-border bg-background/40 text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        }`}
                      >
                        <div className="font-semibold">
                          {DIFFICULTY_COPY[level].label}
                        </div>
                        <div className="mt-1 text-xs opacity-80">
                          {DIFFICULTY_COPY[level].description}
                        </div>
                      </button>
                    ),
                  )}
                </div>
              </Card>

              <Card className="border-border bg-card/70 p-4">
                <h2 className="flex items-center gap-2 font-semibold">
                  <Radio className="h-4 w-4 text-neon" /> Voice controls
                </h2>
                <label className="mt-4 flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={voiceLoop}
                    onChange={(event) => setVoiceLoop(event.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <strong>Hands-free turn loop</strong>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Automatically opens the microphone after caller playback.
                    </span>
                  </span>
                </label>
                <label className="mt-4 flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={callerAudio}
                    onChange={(event) => setCallerAudio(event.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <strong>Caller audio</strong>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      The on-screen caller response is also spoken aloud.
                    </span>
                  </span>
                </label>
                <label className="mt-4 flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={preferLocalRecognition}
                    onChange={(event) =>
                      setPreferLocalRecognition(event.target.checked)
                    }
                    className="mt-1"
                  />
                  <span>
                    <strong>Prefer on-device recognition</strong>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Experimental. Turn off if the browser reports a missing
                      language pack.
                    </span>
                  </span>
                </label>
                <div className="mt-4 rounded-xl border border-border bg-background/40 p-3 text-xs leading-relaxed text-muted-foreground">
                  Browser recognition may use an online speech service unless
                  on-device mode is supported. Use fictional practice language
                  only—never real customer identifiers or account details.
                </div>
              </Card>
            </div>
          </details>
        </aside>

        <section className="order-1 flex min-w-0 flex-col gap-4 xl:order-2">
          <Card className="card-elevated order-2 border-border bg-card/75 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">
                  QA achievement markers
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Markers now retain the exact agent sentence used as evidence.
                </p>
              </div>
              <Badge variant="outline">
                {achievedMarkers.length}/{SIMULATOR_MARKERS.length} complete
              </Badge>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {SIMULATOR_MARKERS.map((marker) => {
                const hit = achieved.includes(marker.id);
                const evidence = markerEvidence[marker.id];
                return (
                  <div
                    key={marker.id}
                    className={`rounded-xl border p-3 transition ${
                      hit
                        ? "border-neon bg-secondary text-foreground shadow-sm"
                        : "border-border bg-background/40 text-muted-foreground opacity-75"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      {hit ? (
                        <CheckCircle2 className="h-4 w-4 text-neon" />
                      ) : (
                        <ShieldCheck className="h-4 w-4" />
                      )}
                      {hit ? marker.positiveCue : marker.label}
                    </div>
                    <p className="mt-1 text-xs opacity-85">
                      {marker.description}
                    </p>
                    {evidence && (
                      <p className="mt-2 border-t border-border/60 pt-2 text-[11px] leading-relaxed">
                        “{evidence.evidence}”
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="card-elevated order-1 border-border bg-card/75 p-5 text-center sm:p-6">
            <button
              onClick={handleControlClick}
              className={`mx-auto grid h-36 w-36 place-items-center rounded-full border text-xl font-bold tracking-tight transition sm:h-44 sm:w-44 ${
                status === "active"
                  ? "border-neon bg-neon text-background shadow-[0_0_35px_#00a8e059]"
                  : status === "wrap"
                    ? "border-amber-400 bg-amber-400/15 text-amber-200"
                    : "border-border bg-card text-foreground hover:border-neon hover:text-neon"
              }`}
              aria-label="Call control"
            >
              <span>
                {status === "active"
                  ? formatTime(seconds)
                  : status === "wrap"
                    ? "Wrap"
                    : "Ready"}
              </span>
            </button>
            <p className="mt-4 text-sm text-muted-foreground">
              {status === "ready" &&
                "Press Ready. The beep plays, caller audio starts, and the microphone opens after the caller finishes."}
              {status === "active" &&
                "Press the timer to stop the call and enter evidence-based wrap-up."}
              {status === "wrap" && "Press Wrap to reset and run another rep."}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button
                variant={phase === "listening" ? "default" : "outline"}
                onClick={toggleMic}
                disabled={
                  status !== "active" ||
                  phase === "caller-speaking" ||
                  phase === "processing" ||
                  !recognitionSupported
                }
              >
                {phase === "listening" ? (
                  <MicOff className="mr-1 h-4 w-4" />
                ) : (
                  <Mic className="mr-1 h-4 w-4" />
                )}
                {phase === "listening" ? "Stop listening" : "Answer by voice"}
              </Button>
              <Button
                variant="outline"
                onClick={replayCaller}
                disabled={!lastCallerText || phase === "processing"}
              >
                {callerAudio ? (
                  <Volume2 className="mr-1 h-4 w-4" />
                ) : (
                  <VolumeX className="mr-1 h-4 w-4" />
                )}{" "}
                Replay caller
              </Button>
            </div>
            {recognitionError && (
              <p className="mx-auto mt-4 max-w-xl text-sm text-amber-300">
                {recognitionError}
              </p>
            )}
          </Card>

          <div className="order-3 grid gap-4 lg:grid-cols-[1fr_.85fr]">
            <Card className="card-elevated min-w-0 border-border bg-card/75 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Headphones className="h-5 w-5 text-neon" />
                  <h2 className="font-semibold">Live call transcript</h2>
                </div>
                {phase === "processing" && (
                  <Loader2 className="h-4 w-4 animate-spin text-neon" />
                )}
              </div>
              <div
                ref={transcriptRef}
                className="mt-4 max-h-[430px] space-y-3 overflow-auto rounded-xl border border-border bg-background/50 p-3"
              >
                {transcript.map((line, index) => (
                  <div
                    key={`${line.speaker}-${index}-${line.text.slice(0, 12)}`}
                    className={`rounded-lg border p-3 text-sm ${
                      line.speaker === "agent"
                        ? "ml-8 border-neon/50 bg-secondary text-foreground"
                        : line.speaker === "coach"
                          ? "border-border bg-card/60 text-neon"
                          : "mr-8 border-border bg-background text-foreground"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider opacity-70">
                      <span>{line.speaker}</span>
                      {line.source && <span>{line.source}</span>}
                    </div>
                    {line.text}
                    {line.confidence !== undefined && line.confidence > 0 && (
                      <div className="mt-2 text-[10px] opacity-60">
                        Recognition confidence:{" "}
                        {Math.round(line.confidence * 100)}%
                      </div>
                    )}
                  </div>
                ))}
                {interimText && (
                  <div className="ml-8 rounded-lg border border-dashed border-neon/50 bg-secondary/50 p-3 text-sm text-foreground">
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-neon">
                      agent · live transcript
                    </div>
                    {interimText}
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-xl border border-border bg-background/35 p-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Keyboard className="h-4 w-4 text-neon" /> Typing fallback
                </div>
                <Textarea
                  value={agentDraft}
                  onChange={(event) => setAgentDraft(event.target.value)}
                  rows={3}
                  placeholder="Use only when microphone recognition is unavailable or needs correction."
                  disabled={status !== "active" || phase === "processing"}
                  className="mt-3 bg-card"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    onClick={sendTypedLine}
                    disabled={
                      status !== "active" ||
                      phase === "processing" ||
                      !agentDraft.trim()
                    }
                    className="bg-gradient-primary text-primary-foreground hover:opacity-95"
                  >
                    <Send className="mr-1 h-4 w-4" /> Send typed response
                  </Button>
                  <Button variant="outline" onClick={() => resetForPersona()}>
                    <RotateCcw className="mr-1 h-4 w-4" /> Reset drill
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="card-elevated border-border bg-card/75 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neon" />
                <h2 className="font-semibold">Live auditor</h2>
              </div>
              <div className="mt-4 rounded-xl border border-neon/30 bg-secondary/35 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">
                  Next QA behavior
                </div>
                <p className="mt-2 text-sm leading-relaxed">{qaSuggestion}</p>
              </div>
              {difficultyHint && (
                <div className="mt-3 rounded-xl border border-border bg-background/50 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">
                    Difficulty cue
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {difficultyHint}
                  </p>
                </div>
              )}
              <div className="mt-4 rounded-xl border border-border bg-background/50 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neon">
                  Caller profile
                </div>
                <h3 className="mt-1 text-lg font-semibold">{persona.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {persona.context}
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  <span className="text-foreground">Voice:</span>{" "}
                  {persona.voice}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="text-foreground">Goal:</span>{" "}
                  {persona.salesGoal}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <aside className="order-3 xl:order-3">
          <details className="responsive-disclosure">
            <summary>Offers, score, and coaching detail</summary>
            <div className="mt-3 space-y-4 xl:mt-0">
              <Card className="border-neon/30 bg-card/75 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-semibold">Live offer board</h2>
                  <Badge variant="outline">verify first</Badge>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Candidates respond to the persona and transcript. They are not
                  confirmed availability or pricing.
                </p>
                <div className="mt-4 space-y-3">
                  {offerBoard.map((offer, index) => (
                    <div
                      key={`${offer.lane}-${offer.recordId}`}
                      className={`rounded-xl border p-3 ${index === 1 ? "border-neon/40 bg-secondary/35" : "border-border bg-background/45"}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-neon">
                          {offer.laneLabel}
                        </span>
                        <Badge variant="outline">{offer.verification}</Badge>
                      </div>
                      <h3 className="mt-2 font-semibold">{offer.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {offer.detail}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed">
                        {offer.reason}
                      </p>
                      <div className="mt-3 border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
                        Verify:{" "}
                        {offer.verify.join(" · ") ||
                          "current live offer and eligibility"}
                      </div>
                      <div className="mt-1 text-[10px] text-muted-foreground/70">
                        Sources: {offer.sourceIds.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-border bg-card/70 p-4">
                <div className="flex items-center gap-2">
                  <TimerReset className="h-5 w-5 text-neon" />
                  <h2 className="font-semibold">Wrap-up score</h2>
                </div>
                <div className="mt-4 text-5xl font-bold tracking-tight">
                  {score}%
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Rule-based practice score from achieved QA evidence. It is not
                  an official Spectrum QA score.
                </p>
              </Card>

              <Card className="border-border bg-card/70 p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neon">
                  Unlocked evidence
                </h2>
                <div className="mt-3 space-y-2">
                  {achievedMarkers.length ? (
                    achievedMarkers.map((marker) => (
                      <div
                        key={marker.id}
                        className="rounded-lg border border-neon/40 bg-secondary p-2 text-sm"
                      >
                        <div className="font-semibold">
                          {marker.positiveCue}
                        </div>
                        {markerEvidence[marker.id] && (
                          <div className="mt-1 text-xs opacity-80">
                            {markerEvidence[marker.id].reason}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No markers yet. Start the call and answer by voice.
                    </p>
                  )}
                </div>
              </Card>

              <Card className="border-border bg-card/70 p-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neon">
                  Next coaching focus
                </h2>
                <div className="mt-3 space-y-2">
                  {missingMarkers.slice(0, 4).map((marker) => (
                    <div
                      key={marker.id}
                      className="rounded-lg border border-border bg-background/50 p-2 text-sm text-muted-foreground"
                    >
                      <div className="font-semibold text-foreground">
                        {marker.label}
                      </div>
                      <div className="mt-1 text-xs">{marker.description}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {!recognitionSupported && (
                <Card className="border-amber-400/30 bg-card/70 p-4 text-sm">
                  <div className="flex gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                    <span>
                      This browser does not expose Web Speech recognition.
                      Caller playback still works; use typing for agent turns.
                    </span>
                  </div>
                </Card>
              )}
            </div>
          </details>
        </aside>
      </section>
    </main>
  );
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function playStartBeep() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.75);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.8);
  } catch {
    // Audio may be blocked in preview; the visual call state still starts.
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
