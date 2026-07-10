import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MODULES } from "@/data/curriculum";
import { ALL_FLASHCARDS } from "@/data/flashcardDeck";
import { getCurrentWeek } from "@/data/weeklyTraining";
import { SCENARIOS } from "@/data/scenarios";
import { SETUP_TASKS, WORK_PROFILE } from "@/data/workSetup";
import { DEFAULT_PRIVATE_PROFILE, type PrivateWorkProfile } from "@/data/privateProfile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Layers, BookOpen, ArrowRight, ClipboardCheck, History, KeyRound, Search, Copy } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const week = getCurrentWeek();
  const lessonCount = MODULES.reduce((n, m) => n + m.sections.reduce((s, sec) => s + sec.lessons.length, 0), 0);
  const urgentSetupCount = SETUP_TASKS.filter((task) => task.priority === "now").length;
  const [profile, setProfile] = useState<PrivateWorkProfile>(DEFAULT_PRIVATE_PROFILE);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WORK_PROFILE.localStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<PrivateWorkProfile>;
      setProfile({
        pid: typeof parsed.pid === "string" ? parsed.pid.trim() : "",
        workEmail: typeof parsed.workEmail === "string" ? parsed.workEmail.trim() : "",
      });
    } catch {
      // Landing remains usable without local storage.
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
    <div className="bg-hero">
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-10 sm:pt-20 sm:pb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-neon" /> {week.appVersion} · {week.weekId}
        </div>
        {profile.pid ? (
          <>
            <div className="mt-5 flex flex-wrap items-end gap-3">
              <h1 className="text-balance text-5xl font-bold leading-none tracking-tight sm:text-7xl">
                <span className="bg-gradient-primary bg-clip-text text-transparent">{profile.pid}</span>
              </h1>
              <Button variant="outline" size="sm" onClick={copyPid} className="mb-1">
                <Copy className="mr-1 h-3.5 w-3.5" /> Copy PID
              </Button>
            </div>
            {profile.workEmail && <p className="mt-3 text-sm text-neon">{profile.workEmail}</p>}
          </>
        ) : (
          <div className="mt-5">
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Put your PID here—<span className="bg-gradient-primary bg-clip-text text-transparent">locally.</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">Enter it once in My Setup. It becomes this landing title and stays only in this browser.</p>
          </div>
        )}
        <p className="mt-5 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
          Spectrum Study Buddy: exact-source product lookup, call-flow training, flashcards, scenarios, setup, and AI coaching. Personal work identity stays isolated from the company product corpus.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground glow hover:opacity-95">
            <Link to="/lookup"><Search className="mr-1 h-4 w-4" /> Quick lookup <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
          {!profile.pid && <Button asChild size="lg" variant="outline"><Link to="/setup"><KeyRound className="mr-1 h-4 w-4" /> Set PID</Link></Button>}
          <Button asChild size="lg" variant="outline"><Link to="/curriculum">Start curriculum</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/setup"><KeyRound className="mr-1 h-4 w-4" /> My setup</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/scenarios"><ClipboardCheck className="mr-1 h-4 w-4" /> Drill scenarios</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/tutor" search={{ mode: "tutor" }}><Sparkles className="mr-1 h-4 w-4" /> Sales coach</Link></Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-6">
        <Tile icon={<Search className="h-5 w-5 text-neon" />} title="Quick lookup" subtitle="One-word exact specs" href="/lookup" />
        <Tile icon={<BookOpen className="h-5 w-5 text-neon" />} title={`${MODULES.length} modules`} subtitle={`${lessonCount} lessons`} href="/curriculum" />
        <Tile icon={<KeyRound className="h-5 w-5 text-neon" />} title="My setup" subtitle={`${urgentSetupCount} do-now tasks`} href="/setup" />
        <Tile icon={<ClipboardCheck className="h-5 w-5 text-neon" />} title={`${SCENARIOS.length} scenarios`} subtitle="A-R-M + policy gates" href="/scenarios" />
        <Tile icon={<Layers className="h-5 w-5 text-neon" />} title={`${ALL_FLASHCARDS.length} flashcards`} subtitle="Flip mode + cheatsheet" href="/flashcards" />
        <Tile icon={<History className="h-5 w-5 text-neon" />} title="Weekly ledger" subtitle={week.dateRange} href="/corner" />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Training spine</h2>
          <Link to="/curriculum" className="text-sm text-neon hover:underline">See all →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODULES.map((m) => (
            <Link key={m.id} to="/curriculum/$moduleId" params={{ moduleId: m.id }}>
              <Card className="card-elevated group flex items-start gap-3 border-border bg-card/70 p-4 transition hover:border-neon/40 hover:bg-card">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-lg">{m.emoji}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-neon">Module {m.number}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">· {m.tag}</span>
                  </div>
                  <div className="mt-0.5 font-semibold">{m.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{m.summary}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Tile({ icon, title, subtitle, href }: { icon: React.ReactNode; title: string; subtitle: string; href: "/lookup" | "/curriculum" | "/setup" | "/scenarios" | "/flashcards" | "/tutor" | "/corner" }) {
  return (
    <Link to={href}>
      <Card className="card-elevated flex h-full items-center gap-3 border-border bg-card/70 p-4 transition hover:border-neon/40 hover:bg-card">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary">{icon}</div>
        <div><div className="font-semibold">{title}</div><div className="text-sm text-muted-foreground">{subtitle}</div></div>
      </Card>
    </Link>
  );
}
