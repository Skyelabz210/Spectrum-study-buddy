import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MODULES } from "@/data/fullCurriculum";
import { ALL_FLASHCARDS } from "@/data/flashcardDeck";
import { getCurrentWeek } from "@/data/weeklyTraining";
import { SCENARIOS } from "@/data/scenarios";
import { WORK_PROFILE } from "@/data/workSetup";
import { CALLER_PERSONAS } from "@/data/acrossSpectrum";
import { ACADEMY_LESSONS } from "@/data/promptEngineeringAcademy";
import {
  DEFAULT_PRIVATE_PROFILE,
  type PrivateWorkProfile,
} from "@/data/privateProfile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpectrumCalendarBrief } from "@/components/SpectrumCalendarBrief";
import {
  ArrowRight,
  BookOpen,
  Building2,
  ClipboardCheck,
  Copy,
  GraduationCap,
  History,
  KeyRound,
  Layers,
  Lightbulb,
  PhoneCall,
  Search,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const week = getCurrentWeek();
  const lessonCount = MODULES.reduce(
    (moduleTotal, module) =>
      moduleTotal +
      module.sections.reduce(
        (sectionTotal, section) => sectionTotal + section.lessons.length,
        0,
      ),
    0,
  );
  const [profile, setProfile] = useState<PrivateWorkProfile>(
    DEFAULT_PRIVATE_PROFILE,
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WORK_PROFILE.localStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<PrivateWorkProfile>;
      setProfile({
        pid: typeof parsed.pid === "string" ? parsed.pid.trim() : "",
        workEmail:
          typeof parsed.workEmail === "string" ? parsed.workEmail.trim() : "",
      });
    } catch {
      // The workspace remains usable when local storage is unavailable.
    }
  }, []);

  const copyPid = async () => {
    if (!profile.pid) return;
    try {
      await navigator.clipboard.writeText(profile.pid);
      toast.success("PID copied.");
    } catch {
      toast.error("Could not copy PID.");
    }
  };

  return (
    <div className="bg-hero min-h-full">
      <main className="page-frame mx-auto max-w-6xl py-5 sm:py-8">
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3 shadow-sm">
          <div className="flex min-w-0 items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-neon" />
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">
                {profile.pid || "PID ready when you are"}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {week.weekId} · {week.appVersion}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {profile.pid && (
              <Button
                variant="ghost"
                size="sm"
                onClick={copyPid}
                className="min-h-10 sm:min-h-8"
              >
                <Copy className="h-3.5 w-3.5" /> Copy PID
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="min-h-10 sm:min-h-8"
            >
              <Link to="/setup">
                <KeyRound className="h-3.5 w-3.5" /> Setup
              </Link>
            </Button>
          </div>
        </section>

        <section className="surface-panel-strong mt-4 grid gap-5 rounded-3xl p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="eyebrow text-neon">Today</div>
            <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
              {profile.pid
                ? `${profile.pid}, your call tools are ready.`
                : "Your Spectrum shift, organized."}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Pull an exact answer during a call, practice a live caller, or
              continue one focused lesson. Everything else stays one level down.
            </p>
            <SpectrumCalendarBrief variant="compact" />
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:w-64 lg:grid-cols-1">
            <Button
              asChild
              size="lg"
              className="min-h-12 bg-gradient-primary text-primary-foreground glow"
            >
              <Link to="/lookup">
                <Search className="h-4 w-4" /> Quick Lookup{" "}
                <ArrowRight className="ml-auto h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 bg-card/70"
            >
              <Link to="/across-spectrum">
                <PhoneCall className="h-4 w-4" /> Start call practice
              </Link>
            </Button>
          </div>
        </section>

        <section
          className="mt-4 grid gap-3 lg:grid-cols-3"
          aria-label="Primary workspaces"
        >
          <WorkspaceCard
            eyebrow="Live call"
            title="Answer and respond"
            icon={<Search className="h-5 w-5" />}
            detail="Exact lookup, paste-ready prompts, and coaching without hunting through the app."
            links={[
              { label: "Lookup", to: "/lookup", icon: <Search /> },
              { label: "Prompt", to: "/sales-prompts", icon: <WandSparkles /> },
              { label: "Coach", to: "/tutor", icon: <Sparkles /> },
            ]}
          />
          <WorkspaceCard
            eyebrow="Practice"
            title="Run one rep"
            icon={<PhoneCall className="h-5 w-5" />}
            detail={`${CALLER_PERSONAS.length} callers, ${SCENARIOS.length} scenarios, and ${ALL_FLASHCARDS.length} cards.`}
            links={[
              { label: "Live", to: "/across-spectrum", icon: <PhoneCall /> },
              { label: "Scenario", to: "/scenarios", icon: <ClipboardCheck /> },
              { label: "Cards", to: "/flashcards", icon: <Layers /> },
            ]}
          />
          <WorkspaceCard
            eyebrow="Learn"
            title="Continue in small bites"
            icon={<BookOpen className="h-5 w-5" />}
            detail={`${MODULES.length} modules · ${lessonCount} lessons · ${ACADEMY_LESSONS.length} prompt lessons.`}
            links={[
              { label: "Curriculum", to: "/curriculum", icon: <BookOpen /> },
              {
                label: "Academy",
                to: "/prompt-academy",
                icon: <GraduationCap />,
              },
            ]}
          />
        </section>

        <section className="mt-4 rounded-2xl border border-border bg-card/55 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">More when you need it</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Reference, planning, account setup, and weekly source history.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <UtilityLink
                to="/full-spectrum"
                label="Full Spectrum"
                icon={<Building2 />}
              />
              <UtilityLink to="/plan" label="Study Plan" icon={<BookOpen />} />
              <UtilityLink to="/tips" label="Tips" icon={<Lightbulb />} />
              <UtilityLink
                to="/corner"
                label="Weekly Ledger"
                icon={<History />}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

type WorkspaceHref =
  | "/lookup"
  | "/sales-prompts"
  | "/tutor"
  | "/across-spectrum"
  | "/scenarios"
  | "/flashcards"
  | "/curriculum"
  | "/prompt-academy";

function WorkspaceCard({
  eyebrow,
  title,
  icon,
  detail,
  links,
}: {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  detail: string;
  links: Array<{ label: string; to: WorkspaceHref; icon: React.ReactNode }>;
}) {
  return (
    <Card className="card-elevated flex h-full flex-col border-border bg-card/75 p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-neon">
          {icon}
        </div>
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="mt-0.5 font-semibold">{title}</h2>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {detail}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <Button
            key={link.to}
            asChild
            size="sm"
            variant="outline"
            className="min-h-10 flex-1 bg-background/45 sm:min-h-8"
          >
            <Link to={link.to}>
              {link.icon}
              {link.label}
            </Link>
          </Button>
        ))}
      </div>
    </Card>
  );
}

type UtilityHref = "/full-spectrum" | "/plan" | "/tips" | "/corner";

function UtilityLink({
  to,
  label,
  icon,
}: {
  to: UtilityHref;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
    >
      <span className="[&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
      {label}
    </Link>
  );
}
