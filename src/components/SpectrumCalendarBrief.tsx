import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  SPECTRUM_CALENDAR_SOURCE,
  SPECTRUM_ORIENTATION_EVENT,
} from "@/data/outlookCalendarSpectrum";

type SpectrumCalendarBriefProps = {
  variant: "compact" | "plan" | "setup";
};

export function SpectrumCalendarBrief({ variant }: SpectrumCalendarBriefProps) {
  const event = SPECTRUM_ORIENTATION_EVENT;
  const source = SPECTRUM_CALENDAR_SOURCE;

  if (variant === "compact") {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background/45 p-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-neon">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="eyebrow">Next calendar milestone</div>
          <div className="mt-1 text-sm font-semibold">
            First-day orientation
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Tue, Aug 11 · arrive {event.arrivalTime} {event.timeZone}
          </div>
        </div>
        <Button asChild size="sm" variant="outline" className="min-h-10">
          <Link to="/plan">View plan</Link>
        </Button>
      </div>
    );
  }

  if (variant === "setup") {
    return (
      <Card className="card-elevated mb-5 border-border bg-card/75 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-neon">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <div className="eyebrow">First-day readiness</div>
              <h2 className="mt-1 text-xl font-semibold">{event.dateLabel}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Arrive {event.arrivalTime} · training {event.startTime}–
                {event.endTime} {event.timeZone}
              </p>
            </div>
          </div>
          <Badge variant="outline">{source.status}</Badge>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {event.checklist.map((item) => (
            <div
              key={item}
              className="flex gap-2 rounded-xl border border-border bg-background/45 p-3 text-sm text-foreground/90"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {event.confirmationInstruction} {source.authorityNote}
        </p>
      </Card>
    );
  }

  return (
    <Card className="card-elevated mt-6 border-border bg-card/75 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="eyebrow text-neon">Outlook calendar brief</div>
          <h2 className="mt-1 text-2xl font-semibold">{event.title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{source.status}</Badge>
          <Badge variant="outline">1 of {source.itemCount} items</Badge>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <CalendarFact
          icon={<CalendarDays />}
          label="Date"
          value={event.dateLabel}
        />
        <CalendarFact
          icon={<Clock />}
          label="Time"
          value={`Arrive ${event.arrivalTime} · ${event.startTime}–${event.endTime} ${event.timeZone}`}
        />
        <CalendarFact
          icon={<MapPin />}
          label="Location"
          value={event.location}
        />
        <CalendarFact
          icon={<ShieldCheck />}
          label="Schedule"
          value={event.scheduleNote}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-background/45 p-4">
        <h3 className="text-sm font-semibold">Before you leave</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {event.checklist.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm font-medium text-foreground/90">
          {event.confirmationInstruction}
        </p>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Source: {source.source} · checked {source.verifiedAtLabel}.{" "}
        {source.privacyBoundary} {source.authorityNote}
      </p>
    </Card>
  );
}

function CalendarFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-border bg-background/45 p-4">
      <div className="mt-0.5 text-neon [&_svg]:h-4 [&_svg]:w-4">{icon}</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 text-sm leading-relaxed text-foreground/90">
          {value}
        </div>
      </div>
    </div>
  );
}
