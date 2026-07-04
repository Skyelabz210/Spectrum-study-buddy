// Tiny wrapper around the browser SpeechSynthesis API.
// Safe no-op when unavailable (SSR / unsupported browsers).
// The public app state uses integer rate percentages to keep study controls exact.

export function speak(text: string, opts?: { ratePercent?: number; onend?: () => void }) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    opts?.onend?.();
    return () => {};
  }
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const ratePercent = opts?.ratePercent ?? 100;
    u.rate = ratePercent / 100;
    u.pitch = 1;
    u.onend = () => opts?.onend?.();
    u.onerror = () => opts?.onend?.();
    window.speechSynthesis.speak(u);
    return () => window.speechSynthesis.cancel();
  } catch {
    opts?.onend?.();
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
