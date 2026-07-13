import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageReader } from "@/components/PageReader";
import {
  AGENT_CORPORATE_TAKEAWAYS,
  AGENTIC_APPLICATIONS,
  COMPETITOR_VECTORS,
  CORPORATE_LEADERSHIP,
  CORPORATE_METRICS,
  CORPORATE_MISSION,
  CORPORATE_SOURCES,
  CORPORATE_TIMELINE,
  COX_TRANSACTION,
  CUSTOMER_COMMITMENT_PILLARS,
  FULL_SPECTRUM_LAST_VERIFIED,
} from "@/data/fullSpectrumCorporate";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Globe2,
  History,
  Network,
  Scale,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/full-spectrum")({
  component: FullSpectrumPage,
  head: () => ({
    meta: [
      { title: "The Full Spectrum · CallFlow Lab" },
      {
        name: "description",
        content:
          "A source-backed corporate briefing on Charter and Spectrum mission, history, leadership, technology, AI direction, Cox transaction and competitive position.",
      },
    ],
  }),
});

const sourceById = new Map(
  CORPORATE_SOURCES.map((source) => [source.id, source]),
);

function sourceLabel(sourceId: string) {
  return sourceById.get(sourceId)?.label ?? sourceId;
}

function FullSpectrumPage() {
  return (
    <main className="page-frame mx-auto max-w-7xl py-6 sm:py-10">
      <section className="overflow-hidden rounded-3xl border border-border bg-card/75 p-6 shadow-2xl sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge variant="secondary" className="gap-2">
            <Building2 className="h-3.5 w-3.5" /> Corporate intelligence
          </Badge>
          <span className="text-xs text-muted-foreground">
            Public sources verified {FULL_SPECTRUM_LAST_VERIFIED}
          </span>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neon">
              Charter Communications · Spectrum
            </p>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              The Full Spectrum
            </h1>
            <p className="mt-4 max-w-3xl text-xl font-semibold leading-relaxed">
              {CORPORATE_MISSION.headline}
            </p>
            <blockquote className="mt-4 max-w-3xl border-l-2 border-neon pl-4 text-base leading-relaxed text-foreground/90">
              “{CORPORATE_MISSION.statement}”
            </blockquote>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {CORPORATE_MISSION.interpretation}
            </p>
          </div>
          <Card className="border-neon/30 bg-background/45 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-neon" /> Source boundary
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              This page is a dated public-source corporate briefing, not an
              official internal policy page. Current Charter communications,
              approved Spectrum systems and leadership direction control when
              facts or procedures change.
            </p>
          </Card>
        </div>
      </section>

      <PageReader
        label="Read briefing overview"
        text={`${CORPORATE_MISSION.headline}. ${CORPORATE_MISSION.interpretation} This source-backed briefing is organized into four expandable sections: company at a glance, history and the Cox transaction, technology and competitive direction, and agent takeaways with public sources. Public sources were verified ${FULL_SPECTRUM_LAST_VERIFIED}.`}
        className="mt-4 rounded-xl border border-border bg-card/60 px-3 py-2"
      />

      <details className="tool-details mt-4">
        <summary>Company at a glance</summary>
        <div>
          <SectionHeading
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Corporate compass"
            subtitle="The Customer Commitment translated into frontline operating behavior."
          />
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {CUSTOMER_COMMITMENT_PILLARS.map((pillar) => (
              <Card
                key={pillar.title}
                className="card-elevated border-border bg-card/70 p-5"
              >
                <h3 className="font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.detail}
                </p>
                <div className="mt-4 rounded-xl border border-border bg-background/40 p-3 text-xs leading-relaxed">
                  <span className="font-semibold text-neon">
                    Agent meaning:
                  </span>{" "}
                  {pillar.agentMeaning}
                </div>
              </Card>
            ))}
          </section>

          <SectionHeading
            icon={<TrendingUp className="h-5 w-5" />}
            title="State of the company"
            subtitle="Current operating scale and direction, primarily as of first-quarter 2026."
          />
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {CORPORATE_METRICS.map((metric) => (
              <Card key={metric.label} className="border-border bg-card/65 p-4">
                <div className="text-2xl font-bold text-neon">
                  {metric.value}
                </div>
                <div className="mt-1 text-sm font-semibold">{metric.label}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {metric.note}
                </p>
                <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                  {sourceLabel(metric.sourceId)}
                </div>
              </Card>
            ))}
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            <SignalCard
              title="Growth engine"
              icon={<TrendingUp className="h-5 w-5 text-neon" />}
            >
              Spectrum Mobile is the clearest current unit-growth engine. The
              strategic logic is convergence: Internet, managed WiFi and Mobile
              operating as one household connectivity relationship.
            </SignalCard>
            <SignalCard
              title="Transformation pressure"
              icon={<Scale className="h-5 w-5 text-neon" />}
            >
              Internet customer counts face fiber and fixed-wireless pressure,
              while traditional video and voice continue structural decline.
              Product packaging, service quality and household value are
              therefore central.
            </SignalCard>
            <SignalCard
              title="Investment posture"
              icon={<Network className="h-5 w-5 text-neon" />}
            >
              Network evolution, symmetrical and multi-gig capability, rural
              construction, WiFi 7, 5G backup and integrated entertainment
              remain the principal technology responses.
            </SignalCard>
          </section>
        </div>
      </details>

      <details className="tool-details mt-3">
        <summary>History and the Charter–Cox combination</summary>
        <div>
          <SectionHeading
            icon={<History className="h-5 w-5" />}
            title="Lineage and corporate path"
            subtitle="From community cable systems to a national converged-connectivity platform."
          />
          <section className="relative space-y-3 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-px before:bg-border">
            {CORPORATE_TIMELINE.map((event) => (
              <Card
                key={`${event.year}-${event.title}`}
                className="relative ml-10 border-border bg-card/65 p-4"
              >
                <span className="absolute -left-[30px] top-5 h-4 w-4 rounded-full border-4 border-background bg-neon" />
                <div className="flex flex-wrap items-baseline gap-3">
                  <Badge variant="outline">{event.year}</Badge>
                  <h3 className="font-semibold">{event.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {event.detail}
                </p>
              </Card>
            ))}
          </section>

          <SectionHeading
            icon={<Building2 className="h-5 w-5" />}
            title="Charter–Cox combination"
            subtitle="A major scale event that must be described by its verified transaction status."
          />
          <Card className="border-amber-400/30 bg-card/75 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Transaction status
                </div>
                <h2 className="mt-1 text-2xl font-bold">
                  {COX_TRANSACTION.status}
                </h2>
              </div>
              <Badge variant="outline">
                Expected close: {COX_TRANSACTION.expectedClose}
              </Badge>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Metric label="Announced" value={COX_TRANSACTION.announced} />
              <Metric
                label="FCC approval"
                value={COX_TRANSACTION.fccApproval}
              />
              <Metric
                label="Enterprise value"
                value={COX_TRANSACTION.enterpriseValue}
              />
              <Metric
                label="Expected scale"
                value={COX_TRANSACTION.expectedScale}
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {COX_TRANSACTION.structure}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {COX_TRANSACTION.leadership}
            </p>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background/40 p-4">
                <h3 className="font-semibold">Strategic logic</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {COX_TRANSACTION.strategicLogic.map((item) => (
                    <Bullet key={item} text={item} />
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-amber-400/25 bg-background/40 p-4">
                <h3 className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="h-4 w-4 text-amber-300" />{" "}
                  Integration cautions
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {COX_TRANSACTION.cautions.map((item) => (
                    <Bullet key={item} text={item} warning />
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </details>

      <details className="tool-details mt-3">
        <summary>Technology, AI, competition, and leadership</summary>
        <div>
          <SectionHeading
            icon={<Cpu className="h-5 w-5" />}
            title="Agentic and AI direction"
            subtitle="Separate confirmed public signals from high-value application opportunities."
          />
          <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {AGENTIC_APPLICATIONS.map((application) => (
              <Card
                key={application.area}
                className="card-elevated border-border bg-card/70 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{application.area}</h3>
                  <Badge
                    variant={
                      application.status === "publicly reported"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {application.currentSignal}
                </p>
                <div className="mt-4 rounded-xl border border-border bg-background/40 p-3 text-xs leading-relaxed">
                  <span className="font-semibold text-neon">Value:</span>{" "}
                  {application.operatingValue}
                </div>
                <div className="mt-2 rounded-xl border border-border bg-background/40 p-3 text-xs leading-relaxed">
                  <span className="font-semibold">Control:</span>{" "}
                  {application.control}
                </div>
              </Card>
            ))}
          </section>

          <Card className="mt-4 border-neon/30 bg-card/75 p-5">
            <div className="flex items-start gap-3">
              <Cpu className="mt-0.5 h-5 w-5 shrink-0 text-neon" />
              <div>
                <h3 className="font-semibold">Where CallFlow Lab fits</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  CallFlow Lab is a private learning and decision-support
                  prototype: source-grounded retrieval, structured practice,
                  prompt assistance and QA repair. It is useful only as a
                  human-controlled study layer. It is not a Spectrum system of
                  record, an autonomous ordering agent or an official corporate
                  AI deployment.
                </p>
              </div>
            </div>
          </Card>

          <SectionHeading
            icon={<Globe2 className="h-5 w-5" />}
            title="Competitor landscape"
            subtitle="The major forces shaping Spectrum's broadband, Mobile and entertainment strategy."
          />
          <section className="grid gap-4 lg:grid-cols-2">
            {COMPETITOR_VECTORS.map((item) => (
              <Card key={item.vector} className="border-border bg-card/70 p-5">
                <h3 className="text-lg font-semibold">{item.vector}</h3>
                <ComparisonRow label="Pressure" text={item.pressure} />
                <ComparisonRow
                  label="Spectrum position"
                  text={item.SpectrumPosition}
                />
                <ComparisonRow
                  label="Agent focus"
                  text={item.agentFocus}
                  emphasized
                />
              </Card>
            ))}
          </section>

          <SectionHeading
            icon={<Users className="h-5 w-5" />}
            title="Corporate and technology leadership"
            subtitle="Current leadership and transaction-contingent roles relevant to the strategy."
          />
          <section className="grid gap-4 md:grid-cols-3">
            {CORPORATE_LEADERSHIP.map((leader) => (
              <Card key={leader.name} className="border-border bg-card/70 p-5">
                <h3 className="text-lg font-semibold">{leader.name}</h3>
                <p className="mt-1 text-sm text-neon">{leader.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {leader.focus}
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                  {sourceLabel(leader.sourceId)}
                </p>
              </Card>
            ))}
          </section>
        </div>
      </details>

      <details className="tool-details mt-3">
        <summary>Agent takeaways and public sources</summary>
        <div>
          <SectionHeading
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="What this means for an agent"
            subtitle="Corporate strategy becomes real in the quality of each customer interaction."
          />
          <Card className="border-neon/30 bg-card/75 p-6">
            <ul className="grid gap-3 md:grid-cols-2">
              {AGENT_CORPORATE_TAKEAWAYS.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-border bg-background/40 p-4 text-sm leading-relaxed"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <SectionHeading
            icon={<ExternalLink className="h-5 w-5" />}
            title="Sources and verification"
            subtitle="Open the controlling public source before reusing a dated figure or transaction statement."
          />
          <section className="grid gap-3 md:grid-cols-2">
            {CORPORATE_SOURCES.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <Card className="h-full border-border bg-card/65 p-4 transition group-hover:border-neon/40 group-hover:bg-card">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{source.label}</h3>
                        <Badge variant="outline">{source.sourceClass}</Badge>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {source.note}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-neon" />
                  </div>
                </Card>
              </a>
            ))}
          </section>
        </div>
      </details>
    </main>
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
    <div className="mb-4 mt-10 flex items-start gap-3">
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

function SignalCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border bg-card/70 p-5">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

function Bullet({
  text,
  warning = false,
}: {
  text: string;
  warning?: boolean;
}) {
  return (
    <li className="flex gap-2">
      <span className={warning ? "text-amber-300" : "text-neon"}>•</span>
      <span>{text}</span>
    </li>
  );
}

function ComparisonRow({
  label,
  text,
  emphasized = false,
}: {
  label: string;
  text: string;
  emphasized?: boolean;
}) {
  return (
    <div
      className={`mt-3 rounded-xl border p-3 text-sm leading-relaxed ${emphasized ? "border-neon/30 bg-secondary/40" : "border-border bg-background/40"}`}
    >
      <span className={`font-semibold ${emphasized ? "text-neon" : ""}`}>
        {label}:
      </span>{" "}
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}
