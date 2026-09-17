import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clipboard, PhoneIncoming, Zap } from "lucide-react";
import { toast } from "sonner";
import { buildCallDropPrompt, CALL_DROP_QUICK_CHIPS } from "@/data/callDropOneClick";
import { REBRAND_TIMELINE } from "@/data/spectrumRebrand20260722";

export const Route = createFileRoute("/call-drop")({
  component: CallDropPage,
  head: () => ({
    meta: [
      { title: "One-Click Call Drop · CallFlow Lab" },
      {
        name: "description",
        content:
          "Paste one line from the customer, press one button, and get a paste-ready Spectrum AI prompt that uses the CRM's authorized account visibility to run the certified call flow.",
      },
    ],
  }),
});

function CallDropPage() {
  const [line, setLine] = useState("");
  const [note, setNote] = useState("");
  const prompt = useMemo(
    () => buildCallDropPrompt({ customerOpeningLine: line, agentNote: note }),
    [line, note]
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success("Call-drop prompt copied. Paste into the internal Spectrum AI.");
    } catch {
      toast.error("Could not copy the prompt.");
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-neon" /> One-click workflow · GEN9253 rebrand goes live {REBRAND_TIMELINE.changesGoLive}
      </div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
        <PhoneIncoming className="mr-2 inline h-8 w-8 text-neon" />
        One-Click Call Drop
      </h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Paste one line from the customer. Press one button. The internal Spectrum AI in your CRM does the account profiling and returns a full call-flow-ready pitch. This app never sees customer identifiers.
      </p>

      <Card className="card-elevated mt-6 border-border bg-card/75 p-5">
        <div className="text-sm font-semibold">Quick chips</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {CALL_DROP_QUICK_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setLine(chip.sample)}
              className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground hover:border-neon/40 hover:text-foreground"
            >
              {chip.label}
            </button>
          ))}
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-semibold">Customer opening line</span>
          <Textarea
            value={line}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setLine(e.target.value)}
            rows={3}
            placeholder="Example: I just moved and I need to set up internet."
            className="mt-2 bg-card"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-semibold">Agent note (optional)</span>
          <Input
            value={note}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
            placeholder="Anything you already noticed — leave blank if nothing"
            className="mt-2 bg-card"
          />
        </label>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline">No customer identifiers leave your browser</Badge>
          <Button onClick={copy} className="bg-gradient-primary text-primary-foreground hover:opacity-95">
            <Zap className="mr-1 h-4 w-4" /> <Clipboard className="mr-1 h-4 w-4" /> Copy prompt
          </Button>
        </div>
      </Card>

      <Card className="mt-4 border-neon/30 bg-card/80 p-5">
        <div className="text-sm font-semibold">Paste-ready prompt</div>
        <Textarea value={prompt} readOnly rows={28} className="mt-3 bg-background font-mono text-xs leading-relaxed" />
      </Card>
    </main>
  );
}
