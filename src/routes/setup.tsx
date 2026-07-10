import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WORK_PROFILE, SETUP_TASKS, SIGN_IN_ITEMS, SPOUSE_INFO_LIST, EMPLOYEE_PERKS } from "@/data/workSetup";
import { CheckCircle2, KeyRound, ShieldAlert, UserRoundCheck } from "lucide-react";

export const Route = createFileRoute("/setup")({
  component: SetupPage,
});

const priorityLabel = {
  now: "Do now",
  next: "Next",
  verify: "Verify",
} as const;

function SetupPage() {
  const [workEmail, setWorkEmail] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(WORK_PROFILE.localStorageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { workEmail?: string };
      if (typeof parsed.workEmail === "string") setWorkEmail(parsed.workEmail);
    } catch {
      // Ignore private-profile read errors; this page remains usable without local storage.
    }
  }, []);

  const updateWorkEmail = (value: string) => {
    setWorkEmail(value);
    try {
      window.localStorage.setItem(
        WORK_PROFILE.localStorageKey,
        JSON.stringify({ workEmail: value.trim() })
      );
    } catch {
      // Local storage may be unavailable in some preview contexts.
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-neon" /> Personal onboarding checklist
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          My Spectrum setup
        </h1>
        <p className="mt-3 text-muted-foreground">
          A working checklist for employee services, Benefit Connect, Webex, Spark, and the family information needed before insurance or mobile setup. This is a study aid; official HR, Benefit Connect, and Employee Services screens control.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
        <Card className="card-elevated border-border bg-card/75 p-5">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-neon">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Sign-in spine</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {WORK_PROFILE.authorityNote}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-border bg-background/50 p-4">
            <label className="text-sm font-semibold" htmlFor="work-email">
              {WORK_PROFILE.workEmailLabel}
            </label>
            <input
              id="work-email"
              value={workEmail}
              onChange={(event) => updateWorkEmail(event.target.value)}
              placeholder="Enter your exact IDM/onboarding work email"
              className="mt-2 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-neon"
              autoComplete="email"
            />
            <p className="mt-2 text-xs text-neon">
              This value is stored only in this browser's local storage. It is not committed to the app source.
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            {SIGN_IN_ITEMS.map((item) => (
              <div key={item.id} className="rounded-xl border border-border bg-background/50 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{item.label}</h3>
                  <Badge variant="secondary">
                    {item.id === "work-email" && workEmail ? workEmail : item.path}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.useFor}</p>
                <p className="mt-2 text-xs text-neon">{item.credentialNote}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="card-elevated border-border bg-card/75 p-5">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-neon">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Wife / dependent info list</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Do not store SSNs, passwords, or document images here. Use this as the checklist for what to gather before Benefit Connect.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {SPOUSE_INFO_LIST.map((item) => (
              <div key={item.id} className="rounded-xl border border-border bg-background/50 p-4">
                <div className="font-semibold">{item.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">{item.reason}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-neon" />
          <h2 className="text-2xl font-semibold tracking-tight">To-do list</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {SETUP_TASKS.map((task) => (
            <Card key={task.id} className="card-elevated border-border bg-card/75 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{priorityLabel[task.priority]}</Badge>
                <Badge variant="outline">{task.system}</Badge>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{task.title}</h3>
              <ol className="mt-3 space-y-2 pl-5 text-sm text-muted-foreground">
                {task.steps.map((step) => (
                  <li key={step} className="list-decimal">{step}</li>
                ))}
              </ol>
              {task.needed && (
                <div className="mt-4 rounded-xl border border-border bg-background/50 p-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Have ready</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {task.needed.map((need) => (
                      <Badge key={need} variant="secondary">{need}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {task.warning && <p className="mt-3 text-xs text-neon">{task.warning}</p>}
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <UserRoundCheck className="h-5 w-5 text-neon" />
          <h2 className="text-2xl font-semibold tracking-tight">Perks captured from training</h2>
        </div>
        <Card className="card-elevated border-border bg-card/75 p-5">
          <ul className="grid gap-3 md:grid-cols-2">
            {EMPLOYEE_PERKS.map((perk) => (
              <li key={perk} className="rounded-xl border border-border bg-background/50 p-4 text-sm text-muted-foreground">
                {perk}
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </main>
  );
}
