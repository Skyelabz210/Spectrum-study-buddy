// Small wrapper around the browser SpeechSynthesis API.
// Safe no-op when unavailable (SSR / unsupported browsers).
// Voice availability varies by browser and operating system, so callers use
// preference tokens plus a deterministic fallback rather than claiming a
// guaranteed gender or named voice.

export type SpeakOptions = {
  ratePercent?: number;
  pitchPercent?: number;
  volumePercent?: number;
  lang?: string;
  preferredVoiceTokens?: string[];
  fallbackVoiceIndex?: number;
  onstart?: () => void;
  onend?: () => void;
  onerror?: (reason: string) => void;
};

export type SpeechResult = "ended" | "cancelled" | "unsupported" | "error";

let activeUtterance: SpeechSynthesisUtterance | null = null;
let activeFailure: ((reason: string) => void) | null = null;

function chooseVoice(opts: SpeakOptions) {
  if (typeof window === "undefined" || !("speechSynthesis" in window))
    return undefined;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;

  const lang = (opts.lang ?? "en-US").toLowerCase();
  const languageMatches = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith(lang.split("-")[0]),
  );
  const candidates = languageMatches.length ? languageMatches : voices;
  const preferredTokens = (opts.preferredVoiceTokens ?? []).map((token) =>
    token.toLowerCase(),
  );

  const preferred = candidates.find((voice) => {
    const haystack = `${voice.name} ${voice.voiceURI}`.toLowerCase();
    return preferredTokens.some((token) => haystack.includes(token));
  });
  if (preferred) return preferred;

  const fallbackIndex =
    Math.abs(opts.fallbackVoiceIndex ?? 0) % candidates.length;
  return candidates[fallbackIndex];
}

export function speak(text: string, opts: SpeakOptions = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    opts.onerror?.("unsupported");
    return () => {};
  }
  try {
    const interrupted = activeFailure;
    activeFailure = null;
    activeUtterance = null;
    window.speechSynthesis.cancel();
    interrupted?.("interrupted");
    window.speechSynthesis.resume();
    const utterance = new SpeechSynthesisUtterance(text);
    activeUtterance = utterance;
    activeFailure = opts.onerror ?? null;
    utterance.lang = opts.lang ?? "en-US";
    utterance.rate = (opts.ratePercent ?? 100) / 100;
    utterance.pitch = (opts.pitchPercent ?? 100) / 100;
    utterance.volume = (opts.volumePercent ?? 100) / 100;
    const voice = chooseVoice(opts);
    if (voice) utterance.voice = voice;
    utterance.onstart = () => opts.onstart?.();
    utterance.onend = () => {
      if (activeUtterance === utterance) activeUtterance = null;
      activeFailure = null;
      opts.onend?.();
    };
    utterance.onerror = (event) => {
      if (activeUtterance === utterance) activeUtterance = null;
      activeFailure = null;
      opts.onerror?.(event.error || "speech-error");
    };
    window.speechSynthesis.speak(utterance);
    return () => {
      if (activeUtterance === utterance) window.speechSynthesis.cancel();
    };
  } catch {
    activeUtterance = null;
    activeFailure = null;
    opts.onerror?.("speech-error");
    return () => {};
  }
}

export function speakAndWait(
  text: string,
  opts: Omit<SpeakOptions, "onend" | "onerror"> = {},
) {
  return new Promise<SpeechResult>((resolve) => {
    let settled = false;
    const finish = (result: SpeechResult) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    speak(text, {
      ...opts,
      onend: () => finish("ended"),
      onerror: (reason) => {
        if (reason === "canceled" || reason === "interrupted")
          finish("cancelled");
        else if (reason === "unsupported") finish("unsupported");
        else finish("error");
      },
    });
  });
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      const cancelled = activeFailure;
      activeFailure = null;
      window.speechSynthesis.cancel();
      activeUtterance = null;
      cancelled?.("canceled");
    } catch {
      /* noop */
    }
  }
}
