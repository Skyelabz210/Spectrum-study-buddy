import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ChangeEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  METHOD_STACK,
  PROMPT_DEPTH_COPY,
  SALES_CALL_DRIVERS,
  SALES_PROMPT_GUARDRAILS,
  SALES_TONE_COPY,
  getSalesCallDriver,
  type PromptDepth,
  type SalesPromptInput,
  type SalesTone,
} from "@/data/salesPromptEngineer";
import {
  CRAM_CARRY_BOUND,
  CRAM_RECOVERY_MODULUS,
  buildCramEnhancedSalesPrompt,
  compileCramSalesCertificate,
  type CramExactLane,
} from "@/data/cramSalesCompiler";
import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  Database,
  Layers,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/sales-prompts")({
  component: SalesPromptEngineerPage,
  head: () => ({
    meta: [
      { title: "AI Sales Specialist Prompt Engineer · Spectrum SAS" },
      {
        name: "description",
        content:
          "Generate CRAM exact-state, source-grounded Spectrum sales prompts, discovery questions, objection branches, and choice-preserving positive closes for the internal AI agent.",
      },
    ],
  }),
});

function SalesPromptEngineerPage() {
  const [driverId, setDriverId] = useState(
    SALES_CALL_DRIVERS[0]?.id ?? "new-internet",
  );
  const [customerWords, setCustomerWords] = useState("");
  const [knownServices, setKnownServices] = useState("");
  const [desiredOutcome, setDesiredOutcome] = useState("");
  const [objection, setObjection] = useState("");
  const [tone, setTone] = useState<SalesTone>("consultative");
  const [depth, setDepth] = useState<PromptDepth>("standard");
  const driver = getSalesCallDriver(driverId);

  const input = useMemo<SalesPromptInput>(
    () => ({
      driverId,
      customerWords,
      knownServices,
      desiredOutcome,
      objection,
      tone,
      depth,
    }),
    [
      customerWords,
      depth,
      desiredOutcome,
      driverId,
      knownServices,
      objection,
      tone,
    ],
  );

  const certificate = useMemo(
    () => compileCramSalesCertificate(input),
    [input],
  );
  const prompt = useMemo(() => buildCramEnhancedSalesPrompt(input), [input]);
  const activeRisks = certificate.riskFlags.filter((flag) => flag.present);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success(
        "CRAM-certified sales prompt copied. Paste it into the internal Spectrum AI agent.",
      );
    } catch {
      toast.error("Could not copy the prompt.");
    }
  };

  const loadExample = () => {
    setCustomerWords(
      "I only called for internet. I work from home and the kids game, but I do not want a huge bill.",
    );
    setKnownServices(
      "New customer; address and offer eligibility not yet confirmed.",
    );
    setDesiredOutcome(
      "Right-size Internet, check WiFi continuity need, and introduce Mobile early enough for a meaningful comparison.",
    );
    setObjection("I do not want to be upsold.");
    setDriverId("total-connectivity");
    setTone("reassuring");
    setDepth("full");
  };

  return (
    <main className="page-frame mx-auto max-w-7xl py-6 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon" /> Internal-AI
            prompt workbench
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            AI Sales Specialist Prompt Engineer
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Give it one customer sentence and a call driver. The CRAM compiler
            preserves the exact observation, recovers missing state as
            questions, selects an evidence-graded persuasion stack, and carries
            only verified facts into the close.
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          CRAM exact-state · source-grounded
        </Badge>
      </div>

      <label className="mt-4 block xl:hidden">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Call driver
        </span>
        <select
          value={driverId}
          onChange={(event) => setDriverId(event.target.value)}
          className="mt-2 w-full rounded-xl border border-border bg-card px-3 text-sm"
        >
          {SALES_CALL_DRIVERS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.shortLabel}
            </option>
          ))}
        </select>
      </label>

      <section className="mt-4 grid gap-4 xl:mt-8 xl:grid-cols-[330px_1fr]">
        <aside className="hidden space-y-4 xl:block">
          <Card className="border-border bg-card/70 p-4">
            <div className="flex items-center gap-2">
              <WandSparkles className="h-5 w-5 text-neon" />
              <h2 className="font-semibold">Common call drivers</h2>
            </div>
            <div className="mt-3 space-y-2">
              {SALES_CALL_DRIVERS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDriverId(item.id)}
                  className={`w-full rounded-lg border px-3 py-3 text-left text-sm transition ${
                    item.id === driverId
                      ? "border-neon bg-secondary text-foreground"
                      : "border-border bg-background/40 text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  <div className="font-semibold">{item.shortLabel}</div>
                  <div className="mt-1 text-xs opacity-80">
                    {item.objective}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="border-border bg-card/70 p-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-neon" />
              <h2 className="font-semibold">Likely controlling sources</h2>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {driver.sourceHints.map((source) => (
                <Badge key={source} variant="outline">
                  {source}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              The generated prompt makes the internal AI verify live pricing,
              eligibility, serviceability, equipment, and promotions instead of
              filling gaps from memory.
            </p>
          </Card>

          <Card className="border-neon/30 bg-card/80 p-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-neon" />
              <h2 className="font-semibold">Prime-pair certificate</h2>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-lg border border-border bg-background/40 p-3">
                <div className="text-muted-foreground">Carry bound M</div>
                <div className="mt-1 text-xl font-bold text-neon">
                  {CRAM_CARRY_BOUND}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-background/40 p-3">
                <div className="text-muted-foreground">Recovery A</div>
                <div className="mt-1 text-xl font-bold text-neon">
                  {CRAM_RECOVERY_MODULUS}
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-lg border border-border bg-background/40 p-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span>Exact gates</span>
                <strong>
                  {certificate.exactGateCount}/{certificate.totalGateCount}
                </strong>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span>Risk mask</span>
                <strong>
                  {certificate.riskMask} mod 37 = {certificate.riskRecovered}
                </strong>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span>All masks exact</span>
                <Badge
                  variant={
                    certificate.allMasksExact ? "secondary" : "destructive"
                  }
                >
                  {certificate.allMasksExact ? "YES" : "REPAIR"}
                </Badge>
              </div>
            </div>
          </Card>
        </aside>

        <section className="space-y-4">
          <Card className="card-elevated border-border bg-card/75 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Minimum-input builder</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  The customer’s own sentence is the Level 0 value. Missing
                  facts remain visible and are recovered as questions or
                  live-tool checks.
                </p>
              </div>
              <Button variant="outline" onClick={loadExample}>
                Load example
              </Button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <Field
                label="Customer’s exact words"
                helper="Paste one sentence or a few keywords from the live call."
                wide
              >
                <Textarea
                  value={customerWords}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setCustomerWords(event.target.value)
                  }
                  rows={4}
                  placeholder="Example: I work from home, my kids game, and the back room buffers."
                  className="bg-card"
                />
              </Field>

              <Field
                label="Known/current services"
                helper="Leave blank when unknown; the AI will create a verification carry."
              >
                <Input
                  value={knownServices}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setKnownServices(event.target.value)
                  }
                  placeholder="Example: Existing Premier + Advanced WiFi"
                  className="bg-card"
                />
              </Field>

              <Field
                label="Desired outcome"
                helper="The sale or next step the agent is trying to earn."
              >
                <Input
                  value={desiredOutcome}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setDesiredOutcome(event.target.value)
                  }
                  placeholder="Example: Verify 2 Gig fit and add Mobile comparison"
                  className="bg-card"
                />
              </Field>

              <Field
                label="Objection or hesitation"
                helper="Use the customer’s wording when possible."
                wide
              >
                <Textarea
                  value={objection}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setObjection(event.target.value)
                  }
                  rows={3}
                  placeholder="Example: I only want the cheapest internet and I do not want an upsell."
                  className="bg-card"
                />
              </Field>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <ChoiceGroup
                label="Delivery tone"
                values={Object.keys(SALES_TONE_COPY) as SalesTone[]}
                selected={tone}
                renderLabel={(value) => value[0].toUpperCase() + value.slice(1)}
                onSelect={setTone}
              />
              <ChoiceGroup
                label="Output depth"
                values={Object.keys(PROMPT_DEPTH_COPY) as PromptDepth[]}
                selected={depth}
                renderLabel={(value) => PROMPT_DEPTH_COPY[value].label}
                onSelect={setDepth}
              />
            </div>
          </Card>

          <Card className="card-elevated border-neon/30 bg-card/80 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neon" />
                <div>
                  <h2 className="font-semibold">Paste-ready CRAM prompt</h2>
                  <p className="text-xs text-muted-foreground">
                    The exact-state contract, strategy ledger, hold ledger, risk
                    mask, and source gates are embedded in the copied prompt.
                  </p>
                </div>
              </div>
              <Button
                onClick={copyPrompt}
                className="bg-gradient-primary text-primary-foreground hover:opacity-95"
              >
                <Clipboard className="mr-1 h-4 w-4" /> Copy prompt
              </Button>
            </div>
            <Textarea
              value={prompt}
              readOnly
              rows={18}
              className="mt-4 max-h-[50dvh] bg-background font-mono text-xs leading-relaxed"
            />
          </Card>
        </section>
      </section>

      <details className="tool-details mt-6">
        <summary>
          <span>Compiler evidence, risk carries, and integrity gates</span>
          <Badge variant="outline">
            {certificate.exactGateCount}/{certificate.totalGateCount} exact
          </Badge>
        </summary>
        <div className="pb-1">
          <section className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Exact winding tower</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Each level has five binary invariants. Every mask is bounded
                  by 31, so reduction modulo 37 recovers the same integer
                  exactly.
                </p>
              </div>
              <Badge variant="outline">mod = recovery boundary</Badge>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {certificate.lanes.map((lane) => (
                <ExactLaneCard key={lane.level} lane={lane} />
              ))}
            </div>
          </section>

          <section className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
            <Card className="border-border bg-card/70 p-5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-neon" />
                <h2 className="font-semibold">
                  Active evidence-graded strategy ledger
                </h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {certificate.activeStrategies.map((strategy) => (
                  <div
                    key={strategy.id}
                    className="rounded-xl border border-border bg-background/40 p-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">Grade {strategy.grade}</Badge>
                      <Badge variant="secondary">{strategy.phase}</Badge>
                      <span className="text-sm font-semibold">
                        {strategy.label}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {strategy.instruction}
                    </p>
                    <p className="mt-2 text-[11px] text-muted-foreground/80">
                      {strategy.basis}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="border-border bg-card/70 p-5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-neon" />
                  <h2 className="font-semibold">Current recovery carries</h2>
                </div>
                <div className="mt-4 space-y-3">
                  {activeRisks.length ? (
                    activeRisks.map((flag) => (
                      <div
                        key={flag.id}
                        className="rounded-xl border border-border bg-background/40 p-3"
                      >
                        <div className="text-sm font-semibold">
                          {flag.label}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {flag.repair}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-neon/30 bg-secondary/50 p-3 text-sm">
                      No current risk bits are set.
                    </div>
                  )}
                </div>
              </Card>

              <Card className="border-border bg-card/70 p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-neon" />
                  <h2 className="font-semibold">Hold ledger</h2>
                </div>
                <div className="mt-4 space-y-3">
                  {certificate.heldStrategies.map((strategy) => (
                    <div
                      key={strategy.id}
                      className="rounded-xl border border-border bg-background/40 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{strategy.grade}</Badge>
                        <span className="text-sm font-semibold">
                          {strategy.label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {strategy.instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card className="border-border bg-card/70 p-5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-neon" />
                <h2 className="font-semibold">Method stack</h2>
              </div>
              <div className="mt-4 space-y-3">
                {METHOD_STACK.map((method) => (
                  <div
                    key={method.name}
                    className="rounded-xl border border-border bg-background/40 p-3"
                  >
                    <div className="text-sm font-semibold">{method.name}</div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {method.use}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-border bg-card/70 p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-neon" />
                <h2 className="font-semibold">
                  Conversion and integrity gates
                </h2>
              </div>
              <div className="mt-4 space-y-3">
                {SALES_PROMPT_GUARDRAILS.map((guardrail) => (
                  <div
                    key={guardrail}
                    className="flex gap-3 rounded-xl border border-border bg-background/40 p-3 text-sm"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                    <span>{guardrail}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </details>
    </main>
  );
}

function ExactLaneCard({ lane }: { lane: CramExactLane }) {
  return (
    <Card className="border-border bg-card/70 p-4">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="outline">Level {lane.level}</Badge>
        <Badge variant={lane.exact ? "secondary" : "destructive"}>
          {lane.exact ? "EXACT" : "REPAIR"}
        </Badge>
      </div>
      <h3 className="mt-3 font-semibold">{lane.name}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{lane.purpose}</p>
      <div className="mt-3 rounded-lg border border-border bg-background/40 p-3 font-mono text-xs">
        mask {lane.mask} · {lane.mask} mod 37 = {lane.recovered} · carry{" "}
        {lane.carry}
      </div>
      <div className="mt-3 space-y-2">
        {lane.checks.map((check) => (
          <div key={check.id} className="flex items-center gap-2 text-xs">
            {check.passed ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-neon" />
            ) : (
              <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />
            )}
            <span
              className={
                check.passed ? "text-foreground" : "text-muted-foreground"
              }
            >
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Field({
  label,
  helper,
  wide = false,
  children,
}: {
  label: string;
  helper: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={wide ? "lg:col-span-2" : ""}>
      <span className="text-sm font-semibold">{label}</span>
      <span className="mt-1 block text-xs text-muted-foreground">{helper}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function ChoiceGroup<T extends string>({
  label,
  values,
  selected,
  renderLabel,
  onSelect,
}: {
  label: string;
  values: T[];
  selected: T;
  renderLabel: (value: T) => string;
  onSelect: (value: T) => void;
}) {
  return (
    <div>
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((value) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`rounded-lg border px-3 py-2 text-sm transition ${
              value === selected
                ? "border-neon bg-secondary text-foreground"
                : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {renderLabel(value)}
          </button>
        ))}
      </div>
    </div>
  );
}
