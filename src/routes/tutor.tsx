import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Wand2,
  Brain,
  Send,
  Loader2,
  Trash2,
  PencilLine,
} from "lucide-react";
import { askTutor, extractTakeaway } from "@/lib/tutor.functions";
import {
  loadMemory,
  buildMemoryPrompt,
  addTakeaway,
  setName,
  clearMemory,
  type TutorMemory,
} from "@/lib/tutorMemory";
import { toast } from "sonner";

export const Route = createFileRoute("/tutor")({
  component: TutorPage,
  head: () => ({
    meta: [
      { title: "AI Tutor · Tish-Sticks" },
      {
        name: "description",
        content: "Chat, simplify, or quiz with your phlebotomy AI tutor that remembers what you've learned.",
      },
    ],
  }),
});

type Msg = { role: "user" | "assistant"; content: string };
type Mode = "tutor" | "simplify" | "quiz";

const STARTERS: Record<Mode, (name: string, hasMem: boolean) => string> = {
  tutor: (name, hasMem) =>
    hasMem
      ? `Welcome back, ${name} 👋 Picking up where we left off. Want to build on what you've already studied, or take a fresh angle?`
      : `Hey ${name} 👋 I'm Tish-Sticks. Ask me anything — order of draw, why veins matter, what HIPAA means in real life. Or say "I don't know where to start" and I'll pick something tiny.`,
  simplify: (name) =>
    `Hi ${name} — paste anything confusing and I'll rewrite it in plain English with a 3-bullet recap. I'll connect it to what you already know.`,
  quiz: (name, hasMem) =>
    hasMem
      ? `Ready, ${name}? I'll start with topics you've already touched so you get some wins, then stretch you. Say "go".`
      : `Ready to drill, ${name}? Say "go" and I'll send you one practice question at a time.`,
};

function TutorPage() {
  const [mem, setMem] = useState<TutorMemory>(() => loadMemory());
  const [mode, setMode] = useState<Mode>("tutor");
  const [messages, setMessages] = useState<Msg[]>(() => {
    const m = loadMemory();
    return [
      {
        role: "assistant",
        content: STARTERS.tutor(m.name, m.takeaways.length > 0),
      },
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(mem.name);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onUpdate = () => setMem(loadMemory());
    window.addEventListener("tishsticks:memory", onUpdate);
    return () => window.removeEventListener("tishsticks:memory", onUpdate);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const switchMode = (m: Mode) => {
    setMode(m);
    const memory = loadMemory();
    setMessages([
      {
        role: "assistant",
        content: STARTERS[m](memory.name, memory.takeaways.length > 0),
      },
    ]);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const memory = buildMemoryPrompt(loadMemory());
      const result = await askTutor({
        data: {
          mode,
          memory,
          // skip the canned starter assistant intro
          messages: next.filter(
            (m, i) => !(i === 0 && m.role === "assistant")
          ),
        },
      });
      const reply = result.reply || "…";
      setMessages([...next, { role: "assistant", content: reply }]);

      // Background: extract a takeaway and persist it
      extractTakeaway({
        data: { userMessage: text, assistantReply: reply },
      })
        .then((r) => {
          if (r.takeaway) addTakeaway(r.takeaway);
        })
        .catch(() => {});
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const saveName = () => {
    setName(nameInput);
    setEditingName(false);
    toast.success(`Got it — ${nameInput.trim() || "Tish"}.`);
  };

  return (
    <div className="mx-auto grid h-[calc(100vh-3rem)] max-w-6xl gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_280px]">
      <div className="flex min-h-0 flex-col">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Tish-Sticks Tutor
            </h1>
            <p className="text-xs text-muted-foreground">
              warm · plain-language · remembers what you learn
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <ModeBtn active={mode === "tutor"} onClick={() => switchMode("tutor")}>
              <Sparkles className="mr-1 h-3.5 w-3.5" /> Tutor
            </ModeBtn>
            <ModeBtn active={mode === "simplify"} onClick={() => switchMode("simplify")}>
              <Wand2 className="mr-1 h-3.5 w-3.5" /> Simplify
            </ModeBtn>
            <ModeBtn active={mode === "quiz"} onClick={() => switchMode("quiz")}>
              <Brain className="mr-1 h-3.5 w-3.5" /> Quiz
            </ModeBtn>
          </div>
        </div>

        <Card
          ref={scrollRef as never}
          className="card-elevated mt-4 flex-1 overflow-y-auto border-border bg-card/40 p-4"
        >
          <div className="space-y-4">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.content}
              </Bubble>
            ))}
            {loading && (
              <Bubble role="assistant">
                <Loader2 className="inline h-4 w-4 animate-spin" /> thinking…
              </Bubble>
            )}
          </div>
        </Card>

        <div className="mt-3 flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={
              mode === "simplify"
                ? "Paste the confusing thing here…"
                : mode === "quiz"
                  ? "Type 'go' or pick a topic…"
                  : "Ask anything about phlebotomy…"
            }
            className="min-h-[52px] resize-none bg-card"
            rows={2}
          />
          <Button
            onClick={send}
            disabled={loading || !input.trim()}
            className="bg-gradient-primary text-primary-foreground hover:opacity-95"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Study tool only — not medical advice.
        </p>
      </div>

      {/* Memory side panel */}
      <aside className="hidden min-h-0 lg:block">
        <Card className="card-elevated h-full overflow-y-auto border-border bg-card/40 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-neon">
              What I remember
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs"
              onClick={() => {
                if (confirm("Clear all tutor memory?")) {
                  clearMemory();
                  toast.success("Memory cleared.");
                }
              }}
              title="Clear memory"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="mt-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Name
            </div>
            {editingName ? (
              <div className="mt-1 flex gap-1">
                <Input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="h-8 bg-card text-sm"
                />
                <Button size="sm" className="h-8" onClick={saveName}>
                  Save
                </Button>
              </div>
            ) : (
              <button
                onClick={() => setEditingName(true)}
                className="mt-1 flex items-center gap-1 text-sm hover:text-neon"
              >
                {mem.name}
                <PencilLine className="h-3 w-3 opacity-60" />
              </button>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="Lessons" value={mem.visitedLessons.length} />
            <Stat label="Cards" value={mem.flashcardsSeen.length} />
            <Stat label="Wins" value={mem.takeaways.length} />
          </div>

          {mem.takeaways.length > 0 && (
            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Things you've learned
              </div>
              <ul className="mt-2 space-y-1.5">
                {mem.takeaways
                  .slice()
                  .reverse()
                  .slice(0, 8)
                  .map((t, i) => (
                    <li
                      key={i}
                      className="flex gap-2 rounded-md border border-border bg-secondary/40 p-2 text-xs"
                    >
                      <span className="text-neon">✓</span>
                      <span className="text-foreground/90">{t.text}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {mem.visitedLessons.length > 0 && (
            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Recent lessons
              </div>
              <ul className="mt-2 space-y-1">
                {mem.visitedLessons
                  .slice()
                  .reverse()
                  .slice(0, 6)
                  .map((l) => (
                    <li key={l.id} className="text-xs text-muted-foreground">
                      <span className="text-foreground/80">{l.title}</span>{" "}
                      <span className="opacity-60">· {l.module}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {mem.takeaways.length === 0 &&
            mem.visitedLessons.length === 0 && (
              <p className="mt-6 text-xs text-muted-foreground">
                As you study lessons, flip cards, and chat with the tutor, I'll
                remember the key wins here and weave them into our next chats.
              </p>
            )}
        </Card>
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-secondary/40 p-2">
      <div className="text-lg font-semibold text-neon">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function ModeBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      size="sm"
      variant={active ? "default" : "outline"}
      onClick={onClick}
      className={active ? "bg-gradient-primary text-primary-foreground" : ""}
    >
      {children}
    </Button>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-primary text-primary-foreground"
            : "border border-border bg-card text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
