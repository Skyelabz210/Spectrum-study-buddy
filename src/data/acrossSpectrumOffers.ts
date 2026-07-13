import { KNOWLEDGE_CORPUS, type KnowledgeRecord } from "@/data/knowledgeCorpus";

export type OfferLane = "capability" | "best-fit" | "value";

export type SimulatorOffer = {
  lane: OfferLane;
  laneLabel: string;
  recordId: string;
  title: string;
  summary: string;
  detail: string;
  reason: string;
  verify: string[];
  sourceIds: string[];
  verification: KnowledgeRecord["verification"];
};

const recordById = new Map(KNOWLEDGE_CORPUS.map((record) => [record.id, record]));

const DEFAULT_TRACKS: Record<string, [string, string, string]> = {
  "budget-defender": ["internet-gig", "internet-premier", "internet-advantage"],
  "fiber-loyalist": ["internet-2gig", "internet-gig", "internet-premier"],
  "mobile-skeptic": ["mobile-unlimited-plus", "mobile-unlimited", "mobile-by-the-gig"],
  "old-box-loyalist": ["internet-gig", "internet-premier", "internet-advantage"],
  "spouse-gate": ["internet-2gig", "internet-gig", "internet-premier"],
  "availability-frustrated": ["internet-2gig", "internet-gig", "internet-premier"],
};

const LANES: { lane: OfferLane; laneLabel: string }[] = [
  { lane: "capability", laneLabel: "Capability ceiling" },
  { lane: "best-fit", laneLabel: "Most logical" },
  { lane: "value", laneLabel: "Value alternative" },
];

function inferTrack(personaId: string, transcriptText: string): [string, string, string] {
  const lower = transcriptText.toLowerCase();
  if (/mobile|phone|carrier|line|device|hotspot|international/.test(lower)) {
    return ["mobile-unlimited-plus", "mobile-unlimited", "mobile-by-the-gig"];
  }
  if (/fiber|upload|creator|gaming|work from home|fastest|speed/.test(lower)) {
    return ["internet-2gig", "internet-gig", "internet-premier"];
  }
  if (/budget|cheaper|lower bill|save|cost|price/.test(lower)) {
    return ["internet-gig", "internet-premier", "internet-advantage"];
  }
  if (/backup|outage|reliable|continuity|battery|wifi/.test(lower)) {
    return ["invincible-wifi", "internet-gig", "internet-premier"];
  }
  return DEFAULT_TRACKS[personaId] ?? ["internet-2gig", "internet-gig", "internet-premier"];
}

export function buildSimulatorOfferBoard(personaId: string, transcriptText: string): SimulatorOffer[] {
  return inferTrack(personaId, transcriptText)
    .map((recordId, index) => {
      const record = recordById.get(recordId);
      if (!record) return null;
      const lane = LANES[index];
      return {
        lane: lane.lane,
        laneLabel: lane.laneLabel,
        recordId,
        title: record.title,
        summary: record.summary,
        detail: record.speed ?? record.plan ?? record.services[0] ?? "Verify current product details.",
        reason: offerReason(lane.lane, record),
        verify: record.requirements.slice(0, 3),
        sourceIds: record.sourceIds,
        verification: record.verification,
      } satisfies SimulatorOffer;
    })
    .filter((offer): offer is SimulatorOffer => Boolean(offer));
}

function offerReason(lane: OfferLane, record: KnowledgeRecord) {
  if (lane === "capability") return `Start here only to show the strongest relevant capability. Do not assume ${record.title} is available or necessary.`;
  if (lane === "best-fit") return `Use this as the working recommendation when discovery supports the household need and live eligibility confirms it.`;
  return "Keep this visible as the lower-complexity or lower-cost alternative if the richer option does not fit.";
}
