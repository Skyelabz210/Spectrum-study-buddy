import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageReader } from "@/components/PageReader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ACADEMY_GLOSSARY,
  ACADEMY_LESSONS,
  ACADEMY_LEVEL_LABELS,
  ACADEMY_PITFALLS,
  ACADEMY_PRACTICE_DRILLS,
  ACADEMY_WORKFLOWS,
  ADVANCED_DEEP_DIVE,
  OUTPUT_RECIPES,
  PRICING_SAFE_PROMPT,
  PROMPT_ACADEMY_VERSION,
  PROMPT_FORMULA,
  PROMPT_TEMPLATES,
  type AcademyLevel,
} from "@/data/promptEngineeringAcademy";
import {
  AlertTriangle,
  BookOpenCheck,
  Check,
  CheckCircle2,
  Clipboard,
  Code2,
  Copy,
  ExternalLink,
  GraduationCap,
  Layers3,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Table2,
  WandSparkles,
  Workflow,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/prompt-academy")({
  component: PromptAcademyPage,
  head: () => ({
    meta: [
      { title: "Prompt Engineering Academy · Spectrum SAS" },
      {
        name: "description",
        content:
          "A beginner-to-professional prompt engineering tutorial for Spectrum inbound sales agents, with pricing-safe templates, formatting recipes, workflows, practice and an advanced engineering track.",
      },
    ],
  }),
});

const STORAGE_KEY = "callflowlab.promptAcademy.completed.v1";
const LEVELS = Object.keys(ACADEMY_LEVEL_LABELS) as AcademyLevel[];

type BuilderState = {
  task: string;
  facts: string;
  limits: string;
  format: string;
  verify: string;
};

const DEFAULT_BUILDER: BuilderState = {
  task: "Create a plan shortlist and a short customer-facing explanation.",
  facts:
    "Call driver: new Internet. Household: two adults, four connected TVs, gaming and work from home. Use only the approved source packet I provide.",
  limits:
    "Do not invent price, term, fees, availability, eligibility or policy. Write NOT PROVIDED for missing facts. Do not request customer identifiers.",
  format:
    "Return a three-row table: highest capability, most logical fit and value alternative. Then give three discovery questions and one 30-word talk track.",
  verify:
    "End with what must be confirmed in Agent OS, biller, serviceability and the current approved offer.",
};

function PromptAcademyPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<AcademyLevel | "all">(
    "all",
  );
  const [advancedAudience, setAdvancedAudience] = useState<
    "all" | "all agents" | "power users" | "developers"
  >("all");
  const [builder, setBuilder] = useState<BuilderState>(DEFAULT_BUILDER);

  useEffect(() => {
    try {
      const parsed = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) ?? "[]",
      ) as unknown;
      if (Array.isArray(parsed))
        setCompleted(
          parsed.filter((value): value is string => typeof value === "string"),
        );
    } catch {
      // Academy remains usable when local storage is unavailable.
    }
  }, []);

  const saveCompleted = (next: string[]) => {
    setCompleted(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Progress persistence is optional.
    }
  };

  const toggleLesson = (id: string) => {
    saveCompleted(
      completed.includes(id)
        ? completed.filter((item) => item !== id)
        : [...completed, id],
    );
  };

  const filteredLessons = useMemo(
    () =>
      ACADEMY_LESSONS.filter(
        (lesson) => selectedLevel === "all" || lesson.level === selectedLevel,
      ),
    [selectedLevel],
  );

  const filteredAdvanced = useMemo(
    () =>
      ADVANCED_DEEP_DIVE.filter(
        (topic) =>
          advancedAudience === "all" || topic.audience === advancedAudience,
      ),
    [advancedAudience],
  );

  const generatedPrompt = useMemo(
    () =>
      [
        "TASK",
        builder.task.trim() || "{{state the exact job}}",
        "",
        "FACTS / APPROVED CONTEXT",
        builder.facts.trim() ||
          "{{supply de-identified call facts and approved source material}}",
        "",
        "LIMITS",
        builder.limits.trim() ||
          "{{state prohibited assumptions, privacy rules and unknown handling}}",
        "",
        "OUTPUT FORMAT",
        builder.format.trim() ||
          "{{state headings, rows, word limits and order}}",
        "",
        "VERIFY",
        builder.verify.trim() ||
          "{{name the controlling systems and unresolved checks}}",
      ].join("\n"),
    [builder],
  );

  const progress = Math.round(
    (completed.length / ACADEMY_LESSONS.length) * 100,
  );

  return (
    <main className="page-frame mx-auto max-w-7xl py-6 sm:py-10">
      <section className="overflow-hidden rounded-3xl border border-border bg-card/75 p-6 shadow-2xl sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="secondary" className="gap-2">
            <GraduationCap className="h-3.5 w-3.5" /> Beginner → seasoned
            professional
          </Badge>
          <span className="text-xs text-muted-foreground">
            Academy content verified {PROMPT_ACADEMY_VERSION}
          </span>
        </div>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neon">
              Spectrum inbound sales
            </p>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              Prompt Engineering Academy
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Learn AI from the absolute basics through advanced prompt systems.
              Every lesson is built around inbound sales work: discovery,
              product explanation, pricing-safe plan comparison, objections, QA,
              practice, source verification and concise live-call output.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-gradient-primary text-primary-foreground"
              >
                <a href="#academy-tabs">
                  <BookOpenCheck className="mr-2 h-4 w-4" /> Start the academy
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/sales-prompts">
                  <WandSparkles className="mr-2 h-4 w-4" /> Open Prompt Engineer
                </Link>
              </Button>
            </div>
          </div>
          <Card className="border-neon/30 bg-background/45 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Learning progress</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Stored only in this browser.
                </div>
              </div>
              <div className="text-2xl font-bold text-neon">{progress}%</div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-gradient-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {completed.length} of {ACADEMY_LESSONS.length} lessons completed
            </div>
          </Card>
        </div>
      </section>

      <PageReader
        label="Read Academy guide"
        text="Prompt Engineering Academy guide. Start with the five-part formula: task, facts, limits, format, and verify. Use the horizontal tabs to open Start here, Lessons, Templates, Formatting, Workflows, or the Advanced deep dive. For live pricing, eligibility, and policy, require the internal AI to verify current approved Spectrum sources before presenting an answer."
        className="mt-4 rounded-xl border border-border bg-card/60 px-3 py-2"
      />

      <Card className="mt-5 border-amber-400/30 bg-amber-400/5 p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <div>
            <h2 className="font-semibold">The non-negotiable boundary</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Use fictional or de-identified context only. Never paste names,
              addresses, account numbers, phone numbers, payment data, PINs,
              credentials, security codes or customer screenshots. AI can
              organize approved facts; current Agent OS, biller, serviceability,
              approved articles and live offers control pricing, eligibility,
              availability and procedure.
            </p>
          </div>
        </div>
      </Card>

      <Tabs id="academy-tabs" defaultValue="start" className="mt-8">
        <TabsList className="h-auto flex-wrap justify-start">
          <TabsTrigger value="start">Start here</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="formatting">Formatting</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="advanced">Advanced deep dive</TabsTrigger>
        </TabsList>

        <TabsContent value="start" className="mt-6 space-y-6">
          <section className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
            <Card className="border-border bg-card/70 p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neon" />
                <h2 className="text-xl font-semibold">
                  The one formula to remember
                </h2>
              </div>
              <div className="mt-4 rounded-xl border border-neon/30 bg-secondary/40 p-4 text-center text-lg font-bold text-neon">
                {PROMPT_FORMULA.short}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {PROMPT_FORMULA.mnemonic}
              </p>
              <div className="mt-5 space-y-3">
                {PROMPT_FORMULA.parts.map((part) => (
                  <div
                    key={part.label}
                    className="rounded-xl border border-border bg-background/40 p-3"
                  >
                    <div className="font-semibold">{part.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {part.question}
                    </div>
                    <div className="mt-2 text-xs text-foreground/85">
                      Example: {part.example}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-border bg-card/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">
                    Prompt blueprint builder
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Edit the five boxes. The academy assembles a paste-ready
                    prompt.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setBuilder(DEFAULT_BUILDER)}
                >
                  Reset example
                </Button>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <BuilderField
                  label="Task"
                  value={builder.task}
                  onChange={(value) => setBuilder({ ...builder, task: value })}
                />
                <BuilderField
                  label="Facts / approved context"
                  value={builder.facts}
                  onChange={(value) => setBuilder({ ...builder, facts: value })}
                />
                <BuilderField
                  label="Limits"
                  value={builder.limits}
                  onChange={(value) =>
                    setBuilder({ ...builder, limits: value })
                  }
                />
                <BuilderField
                  label="Output format"
                  value={builder.format}
                  onChange={(value) =>
                    setBuilder({ ...builder, format: value })
                  }
                />
                <div className="sm:col-span-2">
                  <BuilderField
                    label="Verify"
                    value={builder.verify}
                    onChange={(value) =>
                      setBuilder({ ...builder, verify: value })
                    }
                  />
                </div>
              </div>
              <CopyBlock title="Generated prompt" text={generatedPrompt} />
            </Card>
          </section>

          <section>
            <SectionHeading
              icon={<Layers3 className="h-5 w-5" />}
              title="Plain-English glossary"
              subtitle="The terms you will hear, translated before the technical definition."
            />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {ACADEMY_GLOSSARY.map((item) => (
                <Card key={item.term} className="border-border bg-card/65 p-4">
                  <h3 className="font-semibold text-neon">{item.term}</h3>
                  <p className="mt-2 text-sm font-medium">{item.plain}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {item.exact}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="lessons" className="mt-6">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={selectedLevel === "all" ? "default" : "outline"}
              onClick={() => setSelectedLevel("all")}
            >
              All levels
            </Button>
            {LEVELS.map((level) => (
              <Button
                key={level}
                size="sm"
                variant={selectedLevel === level ? "default" : "outline"}
                onClick={() => setSelectedLevel(level)}
              >
                {ACADEMY_LEVEL_LABELS[level].label}
              </Button>
            ))}
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {filteredLessons.map((lesson) => {
              const done = completed.includes(lesson.id);
              return (
                <Card
                  key={lesson.id}
                  className={`border-border bg-card/70 p-5 ${done ? "border-neon/35" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="outline">
                        {ACADEMY_LEVEL_LABELS[lesson.level].label}
                      </Badge>
                      <h2 className="mt-3 text-xl font-semibold">
                        {lesson.number}. {lesson.title}
                      </h2>
                    </div>
                    <Button
                      size="icon"
                      variant={done ? "default" : "outline"}
                      onClick={() => toggleLesson(lesson.id)}
                      title={done ? "Mark incomplete" : "Mark complete"}
                    >
                      {done ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-relaxed">
                    {lesson.plainEnglish}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Objective:
                    </span>{" "}
                    {lesson.objective}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {lesson.concepts.map((concept) => (
                      <Badge key={concept} variant="secondary">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border border-border bg-background/40 p-4 text-sm leading-relaxed">
                    <span className="font-semibold text-neon">
                      Spectrum example:
                    </span>{" "}
                    {lesson.spectrumExample}
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="font-semibold">Practice:</span>{" "}
                    <span className="text-muted-foreground">
                      {lesson.exercise}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Ready when:
                    </span>{" "}
                    {lesson.completionCheck}
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6 space-y-6">
          <Card className="border-neon/30 bg-card/75 p-5">
            <div className="flex items-start gap-3">
              <Table2 className="mt-0.5 h-5 w-5 shrink-0 text-neon" />
              <div>
                <h2 className="text-xl font-semibold">
                  Pricing-safe master template
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Use only after you have a current approved source packet. It
                  ranks capability, fit and value while refusing to invent
                  missing prices or eligibility.
                </p>
              </div>
            </div>
            <CopyBlock
              title="Copy master template"
              text={PRICING_SAFE_PROMPT}
            />
          </Card>
          <div className="grid gap-4 lg:grid-cols-2">
            {PROMPT_TEMPLATES.map((template) => (
              <Card key={template.id} className="border-border bg-card/70 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold">{template.title}</h2>
                  <Badge variant="outline">
                    {ACADEMY_LEVEL_LABELS[template.level].label}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Use when:
                  </span>{" "}
                  {template.useWhen}
                </p>
                <CopyBlock title="Template" text={template.prompt} compact />
                <div className="mt-4 flex flex-wrap gap-2">
                  {template.whyItWorks.map((reason) => (
                    <Badge key={reason} variant="secondary">
                      {reason}
                    </Badge>
                  ))}
                </div>
                {template.caution && (
                  <p className="mt-4 rounded-xl border border-amber-400/25 bg-amber-400/5 p-3 text-xs text-amber-100">
                    <AlertTriangle className="mr-1 inline h-3.5 w-3.5" />{" "}
                    {template.caution}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="formatting" className="mt-6 space-y-8">
          <section>
            <SectionHeading
              icon={<Table2 className="h-5 w-5" />}
              title="Output formatting recipes"
              subtitle="Tell the AI exactly what shape you need instead of accepting a wall of text."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {OUTPUT_RECIPES.map((recipe) => (
                <Card key={recipe.id} className="border-border bg-card/70 p-5">
                  <h3 className="font-semibold">{recipe.title}</h3>
                  <p className="mt-1 text-xs text-neon">
                    Best for: {recipe.bestFor}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {recipe.instruction}
                  </p>
                  <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl border border-border bg-background/60 p-3 text-xs">
                    {recipe.exampleShape}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3"
                    onClick={() => copyText(recipe.instruction)}
                  >
                    <Copy className="mr-1 h-3.5 w-3.5" /> Copy instruction
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading
              icon={<AlertTriangle className="h-5 w-5" />}
              title="Common failures and repairs"
              subtitle="The fastest way to improve is to recognize the failure pattern."
            />
            <div className="grid gap-3 md:grid-cols-2">
              {ACADEMY_PITFALLS.map((pitfall) => (
                <Card
                  key={pitfall.title}
                  className="border-border bg-card/65 p-4"
                >
                  <h3 className="font-semibold">{pitfall.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-amber-200">
                      Symptom:
                    </span>{" "}
                    {pitfall.symptom}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-neon">Repair:</span>{" "}
                    {pitfall.repair}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="workflows" className="mt-6 space-y-8">
          <section>
            <SectionHeading
              icon={<Workflow className="h-5 w-5" />}
              title="Useful Spectrum workflows"
              subtitle="Prompting becomes valuable when it fits a repeatable job, not when it produces one impressive answer."
            />
            <div className="grid gap-4 lg:grid-cols-2">
              {ACADEMY_WORKFLOWS.map((workflow) => (
                <Card
                  key={workflow.id}
                  className="border-border bg-card/70 p-5"
                >
                  <h3 className="text-lg font-semibold">{workflow.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {workflow.description}
                  </p>
                  <ol className="mt-4 space-y-2 pl-5 text-sm text-foreground/90">
                    {workflow.steps.map((step) => (
                      <li key={step} className="list-decimal">
                        {step}
                      </li>
                    ))}
                  </ol>
                  <CopyBlock
                    title="Starter prompt"
                    text={workflow.starterPrompt}
                    compact
                  />
                </Card>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading
              icon={<ListChecks className="h-5 w-5" />}
              title="Practice lab"
              subtitle="Run these drills with fictional data before using the technique during work."
            />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {ACADEMY_PRACTICE_DRILLS.map((drill, index) => (
                <Card
                  key={drill.title}
                  className="border-border bg-card/65 p-4"
                >
                  <Badge variant="secondary">Drill {index + 1}</Badge>
                  <h3 className="mt-3 font-semibold">{drill.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {drill.task}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6 space-y-6">
          <Card className="border-neon/30 bg-card/75 p-5">
            <div className="flex items-start gap-3">
              <Code2 className="mt-0.5 h-5 w-5 shrink-0 text-neon" />
              <div>
                <h2 className="text-xl font-semibold">Advanced deep dive</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  This track incorporates the supplied mastery
                  report—tokenization, structural control, retrieval, multimodal
                  prompting, tool use, agent orchestration, security, caching,
                  evaluation, DSPy, TextGrad and OPRO—translated into the
                  Spectrum sales-agent environment. Developer-only topics are
                  clearly labeled. The track does not authorize hidden-data use,
                  coercive optimization or bypassing approved systems.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex flex-wrap gap-2">
            {(["all", "all agents", "power users", "developers"] as const).map(
              (audience) => (
                <Button
                  key={audience}
                  size="sm"
                  variant={
                    advancedAudience === audience ? "default" : "outline"
                  }
                  onClick={() => setAdvancedAudience(audience)}
                >
                  {audience === "all" ? "All topics" : audience}
                </Button>
              ),
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {filteredAdvanced.map((topic) => (
              <Card key={topic.id} className="border-border bg-card/70 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{topic.title}</h3>
                  <Badge
                    variant={
                      topic.audience === "developers" ? "secondary" : "outline"
                    }
                  >
                    {topic.audience}
                  </Badge>
                </div>
                <div className="mt-4 rounded-xl border border-border bg-background/40 p-3 text-sm">
                  <span className="font-semibold text-neon">
                    Plain English:
                  </span>{" "}
                  {topic.plainEnglish}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Professional meaning:
                  </span>{" "}
                  {topic.professionalMeaning}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Spectrum use:
                  </span>{" "}
                  {topic.spectrumUse}
                </p>
                <p className="mt-3 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs leading-relaxed text-amber-100">
                  <span className="font-semibold">Boundary:</span>{" "}
                  {topic.boundary}
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

function BuilderField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-28 font-normal"
      />
    </label>
  );
}

function CopyBlock({
  title,
  text,
  compact = false,
}: {
  title: string;
  text: string;
  compact?: boolean;
}) {
  return (
    <div className="mt-5 rounded-xl border border-border bg-background/55 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold">{title}</div>
        <Button size="sm" variant="outline" onClick={() => copyText(text)}>
          <Clipboard className="mr-1 h-3.5 w-3.5" /> Copy
        </Button>
      </div>
      <pre
        className={`mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed text-foreground/90 ${compact ? "max-h-72" : "max-h-[36rem]"}`}
      >
        {text}
      </pre>
    </div>
  );
}

function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-neon">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard.");
  } catch {
    toast.error("Clipboard unavailable. Select and copy the text manually.");
  }
}
