import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Wand2, Brain, Send, Loader2 } from "lucide-react";
import { askTutor } from "@/server/tutor.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/tutor")({
  component: TutorPage,
  head: () => ({
    meta: [
      { title: "AI Tutor · Tish-Sticks" },
      { name: "description", content: "Chat, simplify, or quiz with your phlebotomy AI tutor." },
    ],
  }),
});

type Msg = { role: "user" | "assistant"; content: string };
type Mode = "tutor" | "simplify" | "quiz";

const STARTERS: Record<Mode, string> = {
  tutor:
    "Hey Tish 👋 I'm Tish-Sticks. Ask me anything — order of draw, why veins matter, what HIPAA means in real life. Or say 'I don't know where to start' and I'll pick something tiny.",
  simplify:
    "Paste anything — a textbook paragraph, a confusing sentence, a question stem — and I'll rewrite it in plain English with a 3-bullet recap.",
  quiz:
    "Ready to drill? Say 'go' and I'll send you one practice question at a time. Pick a topic if you have one (e.g. 'tubes', 'safety').",
};

function TutorPage() {
  const [mode, setMode] = useState<Mode>("tutor");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: STARTERS.tutor },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setMessages([{ role: "assistant", content: STARTERS[m] }]);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const result = await askTutor({
        data: {
          mode,
          messages: next.filter((m) => m.role !== "assistant" || messages.indexOf(m) !== 0),
        },
      });
      setMessages([...next, { role: "assistant", content: result.reply || "…" }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-3rem)] max-w-3xl flex-col px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tish-Sticks Tutor</h1>
          <p className="text-xs text-muted-foreground">
            warm · plain-language · one bite at a time
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

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
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
