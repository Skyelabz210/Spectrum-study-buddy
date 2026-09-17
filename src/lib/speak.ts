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
};

function chooseVoice(opts: SpeakOptions) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;

  const lang = (opts.lang ?? "en-US").toLowerCase();
  const languageMatches = voices.filter((voice) => voice.lang.toLowerCase().startsWith(lang.split("-")[0]));
  const candidates = languageMatches.length ? languageMatches : voices;
  const preferredTokens = (opts.preferredVoiceTokens ?? []).map((token) => token.toLowerCase());

  const preferred = candidates.find((voice) => {
    const haystack = `${voice.name} ${voice.voiceURI}`.toLowerCase();
    return preferredTokens.some((token) => haystack.includes(token));
  });
  if (preferred) return preferred;

  const fallbackIndex = Math.abs(opts.fallbackVoiceIndex ?? 0) % candidates.length;
  return candidates[fallbackIndex];
}

export function speak(text: string, opts: SpeakOptions = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    opts.onend?.();
    return () => {};
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = opts.lang ?? "en-US";
    utterance.rate = (opts.ratePercent ?? 100) / 100;
    utterance.pitch = (opts.pitchPercent ?? 100) / 100;
    utterance.volume = (opts.volumePercent ?? 100) / 100;
    const voice = chooseVoice(opts);
    if (voice) utterance.voice = voice;
    utterance.onstart = () => opts.onstart?.();
    utterance.onend = () => opts.onend?.();
    utterance.onerror = () => opts.onend?.();
    window.speechSynthesis.speak(utterance);
    return () => window.speechSynthesis.cancel();
  } catch {
    opts.onend?.();
    return () => {};
  }
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* noop */
    }
  }
}
