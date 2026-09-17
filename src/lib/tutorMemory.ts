// Local-only memory for the CallFlow Lab coach.
// Persists in localStorage so the coach remembers without accounts.

const KEY = "callflowlab.memory.v1";
const EVENT = "callflowlab:memory";

export type TutorMemory = {
  name: string;
  visitedModules: string[];
  visitedLessons: { id: string; title: string; module: string; at: number }[];
  flashcardsSeen: string[];
  takeaways: { text: string; at: number }[];
  strongTopics: string[];
  shakyTopics: string[];
  lastSeen: number;
};

const empty: TutorMemory = {
  name: "Anthony",
  visitedModules: [],
  visitedLessons: [],
  flashcardsSeen: [],
  takeaways: [],
  strongTopics: [],
  shakyTopics: [],
  lastSeen: 0,
};

export function loadMemory(): TutorMemory {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...empty };
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return { ...empty };
  }
}

export function saveMemory(m: TutorMemory) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(m));
  } catch {
    // ignore
  }
}

export function update(fn: (m: TutorMemory) => TutorMemory): TutorMemory {
  const next = fn(loadMemory());
  next.lastSeen = Date.now();
  saveMemory(next);
  window.dispatchEvent(new Event(EVENT));
  return next;
}

export function trackLesson(id: string, title: string, moduleTitle: string) {
  update((m) => {
    if (m.visitedLessons.some((l) => l.id === id)) {
      m.visitedLessons = m.visitedLessons.map((l) =>
        l.id === id ? { ...l, at: Date.now() } : l
      );
      return { ...m };
    }
    return {
      ...m,
      visitedLessons: [
        ...m.visitedLessons,
        { id, title, module: moduleTitle, at: Date.now() },
      ].slice(-30),
    };
  });
}

export function trackModule(id: string) {
  update((m) =>
    m.visitedModules.includes(id)
      ? m
      : { ...m, visitedModules: [...m.visitedModules, id] }
  );
}

export function trackFlashcard(id: string) {
  update((m) =>
    m.flashcardsSeen.includes(id)
      ? m
      : { ...m, flashcardsSeen: [...m.flashcardsSeen, id].slice(-100) }
  );
}

export function addTakeaway(text: string) {
  const trimmed = text.trim().replace(/^["']|["']$/g, "");
  if (!trimmed || trimmed.length < 4) return;
  update((m) => {
    if (m.takeaways.some((t) => t.text.toLowerCase() === trimmed.toLowerCase())) return m;
    return {
      ...m,
      takeaways: [...m.takeaways, { text: trimmed, at: Date.now() }].slice(-25),
    };
  });
}

export function setName(name: string) {
  update((m) => ({ ...m, name: name.trim() || "Anthony" }));
}

export function clearMemory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function memoryEventName() {
  return EVENT;
}

export function buildMemoryPrompt(m: TutorMemory): string {
  const lines: string[] = [];
  lines.push(`Learner name: ${m.name}`);

  if (m.visitedModules.length) {
    lines.push(`Modules opened: ${m.visitedModules.join(", ")}`);
  }
  if (m.visitedLessons.length) {
    const recent = m.visitedLessons.slice(-8).map((l) => `${l.title} (${l.module})`);
    lines.push(`Recent lessons studied: ${recent.join("; ")}`);
  }
  if (m.flashcardsSeen.length) {
    lines.push(`Flashcards reviewed: ${m.flashcardsSeen.length} so far.`);
  }
  if (m.takeaways.length) {
    lines.push(`Things ${m.name} has learned (use these — reference them):`);
    for (const t of m.takeaways.slice(-12)) lines.push(`  • ${t.text}`);
  }
  if (m.shakyTopics.length) {
    lines.push(`Topics ${m.name} found tricky: ${m.shakyTopics.join(", ")}`);
  }
  if (m.strongTopics.length) {
    lines.push(`Topics ${m.name} feels solid on: ${m.strongTopics.join(", ")}`);
  }
  return lines.join("\n");
}
