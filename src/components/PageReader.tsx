import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakAndWait, stopSpeaking } from "@/lib/speak";

type PageReaderProps = {
  text?: string;
  targetSelector?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
};

function readableText(targetSelector: string) {
  const target = document.querySelector(targetSelector);
  if (!target) return "";
  const copy = target.cloneNode(true) as HTMLElement;
  copy
    .querySelectorAll(
      "button, input, select, textarea, script, style, [hidden], [aria-hidden='true'], [data-reader-ignore]",
    )
    .forEach((node) => node.remove());
  return (copy.textContent ?? "").replace(/\s+/g, " ").trim();
}

function speechChunks(text: string, maxCharacters = 220) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const clean = sentence.trim();
    if (!clean) continue;
    if (current && current.length + clean.length + 1 > maxCharacters) {
      chunks.push(current);
      current = "";
    }
    if (clean.length <= maxCharacters) {
      current = current ? `${current} ${clean}` : clean;
      continue;
    }
    const words = clean.split(" ");
    for (const word of words) {
      if (current && current.length + word.length + 1 > maxCharacters) {
        chunks.push(current);
        current = word;
      } else {
        current = current ? `${current} ${word}` : word;
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

export function PageReader({
  text,
  targetSelector = ".app-main",
  label = "Read page",
  disabled = false,
  className = "",
}: PageReaderProps) {
  const [reading, setReading] = useState(false);
  const [message, setMessage] = useState("");
  const [ratePercent, setRatePercent] = useState(100);
  const sequenceRef = useRef(0);

  useEffect(() => {
    return () => {
      sequenceRef.current += 1;
      stopSpeaking();
    };
  }, []);

  const stop = () => {
    sequenceRef.current += 1;
    stopSpeaking();
    setReading(false);
    setMessage("Reader stopped.");
  };

  const start = async () => {
    const content = (text ?? readableText(targetSelector)).trim();
    if (!content) {
      setMessage("No readable page text was found.");
      return;
    }

    const sequence = sequenceRef.current + 1;
    sequenceRef.current = sequence;
    stopSpeaking();
    setReading(true);
    setMessage("Reading aloud.");

    for (const chunk of speechChunks(content)) {
      if (sequenceRef.current !== sequence) return;
      const result = await speakAndWait(chunk, { ratePercent });
      if (sequenceRef.current !== sequence) return;
      if (result !== "ended") {
        setReading(false);
        setMessage(
          "Audio could not start. Check browser text-to-speech permissions, then tap Read page again.",
        );
        return;
      }
    }

    if (sequenceRef.current === sequence) {
      setReading(false);
      setMessage("Reader finished.");
    }
  };

  return (
    <div
      className={`reader-bar flex flex-wrap items-center gap-2 ${className}`}
      data-reader-ignore
    >
      <Volume2 className="h-4 w-4 text-neon" aria-hidden="true" />
      <Button
        type="button"
        size="sm"
        variant={reading ? "secondary" : "outline"}
        onClick={reading ? stop : () => void start()}
        disabled={disabled}
        className="min-h-11 sm:min-h-8"
      >
        {reading ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {reading ? "Stop reader" : label}
      </Button>
      <label className="sr-only" htmlFor="page-reader-rate">
        Reader speed
      </label>
      <select
        id="page-reader-rate"
        value={ratePercent}
        onChange={(event) => setRatePercent(Number(event.target.value))}
        disabled={reading || disabled}
        className="min-h-11 rounded-lg border border-border bg-card px-2 text-xs sm:min-h-8"
        title="Reader speed"
      >
        <option value={85}>85%</option>
        <option value={100}>100%</option>
        <option value={115}>115%</option>
        <option value={130}>130%</option>
      </select>
      <span
        role="status"
        aria-live="polite"
        className="text-xs text-muted-foreground"
      >
        {disabled ? "Available before or after the call." : message}
      </span>
    </div>
  );
}
