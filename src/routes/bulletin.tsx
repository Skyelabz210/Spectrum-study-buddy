import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BULLETIN_CLARIFICATION_QUEUE,
  WORK_SCHEDULE,
  getBulletinItems,
  type BulletinItem,
} from "@/data/companyBulletin";
import { BellRing, CalendarClock, Check, CircleHelp, Users } from "lucide-react";

export const Route = createFileRoute("/bulletin")({
  component: BulletinPage,
  head: () => ({
    meta: [{ title: "Bulletin Board · Spectrum SAS" }],
  }),
});

const DAY_MILLISECONDS = 86_400_000;

function localDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

function calendarDaysRemaining(dueOn: string) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  const delta = localDate(dueOn).getTime() - today.getTime();
  const wholeDays = Math.trunc(delta / DAY_MILLISECONDS);
  return delta > 0 && delta % DAY_MILLISECONDS !== 0 ? wholeDays + 1 : wholeDays;
}

function workingShiftsRemaining(dueOn: string) {
  const now = new Date();
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  const end = localDate(dueOn);
  let count = 0;
  while (cursor <= end) {
    if (WORK_SCHEDULE.workingWeekdays.includes(cursor.getDay() as 2 | 3 | 4 | 5 | 6)) count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

function Deadline({ dueOn }: { dueOn?: string }) {
  if (!dueOn) {
    return <span className="font-semibold text-amber-200">Due date needs confirmation</span>;
  }
  const days = calendarDaysRemaining(dueOn);
  const shifts = workingShiftsRemaining(dueOn);
  const label = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(localDate(dueOn));
  if (days < 0) return <span className="font-semibold text-red-200">Overdue · was due {label}</span>;
  if (days === 0) return <span className="font-semibold text-amber-200">Due today · {shifts} work shift left</span>;
  return <span>{label} · {days} calendar days · {shifts} work shifts</span>;
}

function PriorityItem({ item }: { item: BulletinItem }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);
  const begin = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setDone((value) => !value);
      timer.current = null;
    }, 5_000);
  };
  const cancel = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };

  return (
    <button
      type="button"
      aria-pressed={done}
      onPointerDown={begin}
      onPointerUp={cancel}
      onPointerCancel={cancel}
      onPointerLeave={cancel}
      onKeyDown={(event) => {
        if ((event.key === " " || event.key === "Enter") && !event.repeat) begin();
      }}
      onKeyUp={cancel}
      className={`w-full touch-pan-y rounded-2xl border-2 p-4 text-left font-bold text-black shadow-lg transition-colors ${
        done ? "border-red-950 bg-[#ff3b30]" : "border-[#123900] bg-[#39ff14]"
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="text-lg leading-tight">{item.title}</span>
        {done && <Check className="h-6 w-6 shrink-0" />}
      </span>
      <span className="mt-2 block text-sm leading-relaxed">{item.summary}</span>
      {item.action && <span className="mt-3 block rounded-xl bg-black/10 p-3 text-sm">Next: {item.action}</span>}
      <span className="mt-3 block text-xs uppercase tracking-wide">
        <Deadline dueOn={item.dueOn} />
      </span>
      <span className="mt-3 block text-xs font-semibold">Hold for 5 seconds to mark {done ? "active again" : "done for this session"}. Resets on refresh.</span>
    </button>
  );
}

function BulletinCard({ item }: { item: BulletinItem }) {
  return (
    <Card className="border-border bg-card/70 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold">{item.title}</h3>
        <Badge variant="outline">{item.receivedOn}</Badge>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
      {item.action && <p className="mt-3 text-sm"><span className="font-semibold text-neon">Next:</span> {item.action}</p>}
      <div className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
        <div><Deadline dueOn={item.dueOn} /></div>
        <div className="mt-1">{item.senderLabel} · {item.sourceLabel}</div>
      </div>
    </Card>
  );
}

function BulletinPage() {
  const priority = getBulletinItems("priority");
  const direct = getBulletinItems("direct");
  const general = getBulletinItems("general");

  return (
    <main className="page-frame mx-auto max-w-5xl py-5 sm:py-9">
      <section className="surface-panel-strong rounded-3xl p-5 sm:p-7">
        <div className="flex items-center gap-2 text-neon"><BellRing className="h-5 w-5" /><span className="eyebrow">My Stuff · Outlook ingestion</span></div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Spectrum Bulletin Board</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">Company correspondence, deadlines and direct requests—sorted for the next decision instead of replaying the inbox.</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <Badge variant="secondary"><CalendarClock className="mr-1 h-3 w-3" />{WORK_SCHEDULE.label}</Badge>
          <Badge variant="outline">{WORK_SCHEDULE.timeZone}</Badge>
        </div>
      </section>

      <section className="mt-5" aria-labelledby="priority-heading">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div><div className="eyebrow text-[#39ff14]">Do first</div><h2 id="priority-heading" className="mt-1 text-2xl font-bold">Priority · {priority.length}</h2></div>
          <span className="text-right text-xs text-muted-foreground">Long-press is session-only</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">{priority.map((item) => <PriorityItem key={item.id} item={item} />)}</div>
      </section>

      <section className="mt-7 grid gap-6 lg:grid-cols-2">
        <div><div className="eyebrow text-neon">Addressed to you</div><h2 className="mt-1 text-2xl font-bold">Direct · {direct.length}</h2><div className="mt-3 grid gap-3">{direct.map((item) => <BulletinCard key={item.id} item={item} />)}</div></div>
        <div><div className="eyebrow">Company-wide</div><h2 className="mt-1 text-2xl font-bold">General · {general.length}</h2><div className="mt-3 grid gap-3">{general.map((item) => <BulletinCard key={item.id} item={item} />)}</div></div>
      </section>

      <Card className="mt-7 border-amber-400/30 bg-card/70 p-5">
        <div className="flex items-center gap-2"><CircleHelp className="h-5 w-5 text-amber-300" /><h2 className="font-semibold">Next-ingestion clarification queue</h2></div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{BULLETIN_CLARIFICATION_QUEUE.map((item) => <li key={item}>• {item}</li>)}</ul>
      </Card>

      <Button asChild variant="outline" className="mt-5 min-h-11"><Link to="/company-walkthrough"><Users className="h-4 w-4" />Open company walkthrough</Link></Button>
    </main>
  );
}
