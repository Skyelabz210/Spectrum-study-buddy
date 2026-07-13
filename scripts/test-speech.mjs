import fs from "node:fs";
import process from "node:process";
import ts from "typescript";

const source = fs.readFileSync(new URL("../src/lib/speak.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
  },
}).outputText;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`;
const { speakAndWait, stopSpeaking } = await import(moduleUrl);

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

delete globalThis.window;
expect((await speakAndWait("unsupported")) === "unsupported", "unsupported browser must return unsupported");

class MockUtterance {
  constructor(text) {
    this.text = text;
    this.lang = "";
    this.rate = 1;
    this.pitch = 1;
    this.volume = 1;
    this.voice = null;
    this.onstart = null;
    this.onend = null;
    this.onerror = null;
  }
}

let mode = "end";
let active = null;
const speechSynthesis = {
  getVoices: () => [{ name: "Test Voice", voiceURI: "test", lang: "en-US" }],
  resume: () => {},
  cancel: () => {},
  speak: (utterance) => {
    active = utterance;
    utterance.onstart?.();
    queueMicrotask(() => {
      if (active !== utterance) return;
      active = null;
      if (mode === "end") utterance.onend?.();
      else if (mode === "error") utterance.onerror?.({ error: "not-allowed" });
    });
  },
};

globalThis.SpeechSynthesisUtterance = MockUtterance;
globalThis.window = { speechSynthesis };

mode = "end";
expect((await speakAndWait("success")) === "ended", "completed speech must return ended");

mode = "error";
expect((await speakAndWait("failure")) === "error", "blocked speech must return error");

mode = "hold";
const cancelledPromise = speakAndWait("cancel me");
stopSpeaking();
expect((await cancelledPromise) === "cancelled", "stopSpeaking must settle active speech as cancelled");

if (failures.length) {
  console.error("Speech lifecycle tests failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Speech lifecycle tests passed.");
