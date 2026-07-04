import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Sparkles, Wand2, Brain, Send, Loader2, Trash2, PencilLine } from "lucide-react";
import { askTutor, extractTakeaway } from "@/lib/tutor.functions";
import {
  loadMemory,
  buildMemoryPrompt,
  addTakeaway,
  setName,
  clearMemory,
  memoryEventName,
  type TutorMemory,
} from "@/lib/tutorMemory";
import { toast } from "sonner";

export const Route = createFileRoute("/tutor")({
  component: TutorPage,
  head: () => ({
    meta: [
      { title: "Coach · CallFlow Lab" },
      { name: "description", content: "Chat, simplify, or drill with a weekly-updated call-flow coach." },
    ],
  }),
});

type Msg = { role: "user" | "assistant"; content: string };
type Mode = "tutor" | "simplify" | "quiz";

const STARTERS: Record<Mode, (name: string, hasMem: boolean) => string> = {
  tutor: (name, hasMem) =>
    hasMem
      ? `Welcome back, ${name}. Pick up from your last module, or ask for a fresh scenario drill.`
      : `Ready, ${name}. Ask about call flow, SOP gates, Spectrum tools, A-R-M, or say "give me one scenario" and I will start small.`,
  simplify: (name) =>
    `Paste the confusing training line, ${name}. I will rewrite it in plain English and give you the next action.`,
  quiz: (name, hasMem) =>
    hasMem
      ? `Drill mode ready, ${name}. I will start near what you already touched, then stretch into weak spots. Type "go".`
      : `Drill mode ready, ${name}. Type "go" and I will send one call-flow question at a time.`,
};

function TutorPage() {
  const [mem, setMemState] = useState<TutorMemory>(() => loadMemory());
  const [mode, setMode] = useState<Mode>("tutor");
  const [messages, setMessages] = useState<Msg[]>(() => {
    const m = loadMemory();
    return [{ role: "assistant", content: STARTERS.tutor(m.name, m.takeaways.length > 0) }];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(mem.name);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onUpdate = () => setMemState(loadMemory());
    window.addEventListener(memoryEventName(), onUpdate);
    return () => window.removeEventListener(memoryEventName(), onUpdate);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const switchMode = (m: Mode) => {
    setMode(m);
    const memory = loadMemory();
    setMessages([{ role: "assistant", content: STARTERS[m](memory.name, memory.takeaways.length > 0) }]);
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
          messages: next.filter((m, i) => !(i === 0 && m.role === "assistant")),
        },
      });
      const reply = result.reply || "…";
      setMessages([...next, { role: "assistant", content: reply }]);
      extractTakeaway({ data: { userMessage: text, assistantReply: reply } })
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
    toast.success(`Saved — ${nameInput.trim() || "Anthony"}.`);
  };

  return (
    <div className="mx-auto grid h-[calc(100vh-3rem)] max-w-6xl gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_280px]">
      <div className="flex min-h-0 flex-col">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">CallFlow Coach</h1>
            <p className="text-xs text-muted-foreground">direct · scenario-first · remembers what you study</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <ModeBtn active={mode === "tutor"} onClick={() => switchMode("tutor")}>
              <Sparkles className="mr-1 h-3.5 w-3.5" /> Coach
            </ModeBtn>
            <ModeBtn active={mode === "simplify"} onClick={() => switchMode("simplify")}>
              <Wand2 className="mr-1 h-3.5 w-3.5" /> Plain English
            </ModeBtn>
            <ModeBtn active={mode === "quiz"} onClick={() => switchMode("quiz")}>
              <Brain className="mr-1 h-3.5 w-3.5" /> Drill
            </ModeBtn>
          </div>
        </div>

        <Card ref={scrollRef as never} className="card-elevated mt-4 flex-1 overflow-y-auto border-border bg-card/40 p-4">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>{m.content}</Bubble>
            ))}
            {loading && <Bubble role="assistant"><Loader2 className="inline h-4 w-4 animate-spin" /> thinking…</Bubble>}
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
            placeholder={mode === "simplify" ? "Paste the confusing training note…" : mode === "quiz" ? "Type 'go' or pick a topic…" : "Ask about call flow, SOP, A-R-M, tools, or products…"}
            className="min-h-[52px] resize-none bg-card"
            rows={2}
          />
          <Button onClick={send} disabled={loading || !input.trim()} className="bg-gradient-primary text-primary-foreground hover:opacity-95">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">Study tool only — official SOP and current system articles control.</p>
      </div>

      <aside className="hidden min-h-0 lg:block">
        <Card className="card-elevated h-full overflow-y-auto border-border bg-card/40 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wider text-neon">What I remember</div>
            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => { if (confirm("Clear all coach memory?")) { clearMemory(); toast.success("Memory cleared."); } }} title="Clear memory">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="mt-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Name</div>
            {editingName ? (
              <div className="mt-1 flex gap-1">
                <Input value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="h-8 bg-card text-sm" />
                <Button size="sm" className="h-8" onClick={saveName}>Save</Button>
              </div>
            ) : (
              <button onClick={() => setEditingName(true)} className="mt-1 flex items-center gap-1 text-sm hover:text-neon">
                {mem.name}<PencilLine className="h-3 w-3 opacity-60" />
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
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Things learned</div>
              <ul className="mt-2 space-y-1.5">
                {mem.takeaways.slice().reverse().slice(0, 8).map((t, i) => (
                  <li key={i} className="flex gap-2 rounded-md border border-border bg-secondary/40 p-2 text-xs">
                    <span className="text-neon">✓</span><span className="text-foreground/90">{t.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {mem.visitedLessons.length > 0 && (
            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Recent lessons</div>
              <ul className="mt-2 space-y-1">
                {mem.visitedLessons.slice().reverse().slice(0, 6).map((l) => (
                  <li key={l.id} className="text-xs text-muted-foreground"><span className="text-foreground/80">{l.title}</span> <span className="opacity-60">· {l.module}</span></li>
                ))}
              </ul>
            </div>
          )}

          {mem.takeaways.length === 0 && mem.visitedLessons.length === 0 && (
            <p className="mt-6 text-xs text-muted-foreground">As you study lessons, flip cards, and drill scenarios, I will remember the key wins here and weave them into future coaching.</p>
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
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function ModeBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <Button size="sm" variant={active ? "default" : "outline"} onClick={onClick} className={active ? "bg-gradient-primary text-primary-foreground" : ""}>{children}</Button>;
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? "bg-gradient-primary text-primary-foreground" : "border border-border bg-card text-foreground"}`}>
        {children}
      </div>
    </div>
  );
}
