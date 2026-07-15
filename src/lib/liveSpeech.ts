export type RecognitionState = "idle" | "listening" | "unsupported" | "error";

export type RecognitionResult = {
  finalText: string;
  interimText: string;
  confidence?: number;
};

export type RecognitionCallbacks = {
  onStart?: () => void;
  onResult?: (result: RecognitionResult) => void;
  onEnd?: () => void;
  onError?: (message: string) => void;
};

interface SpeechRecognitionAlternativeLike {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionResultListLike {
  length: number;
  [index: number]: SpeechRecognitionResultLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: SpeechRecognitionResultListLike;
}

interface SpeechRecognitionErrorLike {
  error: string;
  message?: string;
}

export interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  processLocally?: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorLike) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported() {
  return Boolean(getSpeechRecognitionConstructor());
}

export function createRecognitionSession(
  callbacks: RecognitionCallbacks,
  options: { lang?: string; preferLocal?: boolean } = {},
) {
  const Recognition = getSpeechRecognitionConstructor();
  if (!Recognition) return null;

  const recognition = new Recognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = options.lang ?? "en-US";
  recognition.maxAlternatives = 1;
  if (options.preferLocal && "processLocally" in recognition) recognition.processLocally = true;

  recognition.onstart = () => callbacks.onStart?.();
  recognition.onresult = (event) => {
    let finalText = "";
    let interimText = "";
    let confidence: number | undefined;

    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const result = event.results[index];
      const alternative = result?.[0];
      if (!alternative) continue;
      if (result.isFinal) {
        finalText += `${alternative.transcript} `;
        confidence = alternative.confidence;
      } else {
        interimText += `${alternative.transcript} `;
      }
    }

    callbacks.onResult?.({
      finalText: finalText.trim(),
      interimText: interimText.trim(),
      confidence,
    });
  };
  recognition.onerror = (event) => {
    const friendly = recognitionErrorMessage(event.error, event.message);
    callbacks.onError?.(friendly);
  };
  recognition.onend = () => callbacks.onEnd?.();

  return recognition;
}

function recognitionErrorMessage(error: string, message?: string) {
  if (error === "not-allowed" || error === "service-not-allowed") return "Microphone permission was blocked. Allow microphone access or use the typing fallback.";
  if (error === "no-speech") return "No speech was detected. Tap the microphone and try again.";
  if (error === "audio-capture") return "No working microphone was found.";
  if (error === "network") return "The browser speech service could not connect. Use typing or try again.";
  if (error === "language-not-supported") return "On-device English recognition is not available in this browser. Turn off local-only recognition or use typing.";
  return message?.trim() || `Speech recognition error: ${error}`;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

