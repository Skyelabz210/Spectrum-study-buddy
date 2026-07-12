import {
  buildSalesSpecialistPrompt,
  getSalesCallDriver,
  type SalesPromptInput,
} from "@/data/salesPromptEngineer";

export const CRAM_CARRY_BOUND = 36;
export const CRAM_RECOVERY_MODULUS = 37;
export const CRAM_LEVEL_COUNT = 4;
export const CRAM_BITS_PER_LEVEL = 5;
export const CRAM_MAX_MASK = 31;

export type CramLevel = 0 | 1 | 2 | 3;
export type EvidenceGrade = "A" | "B" | "C" | "HOLD";
export type StrategyPhase = "early" | "middle" | "late" | "all";

export type ExactCheck = {
  id: string;
  label: string;
  passed: boolean;
};

export type CramExactLane = {
  level: CramLevel;
  name: string;
  purpose: string;
  checks: ExactCheck[];
  mask: number;
  recovered: number;
  carry: 0;
  exact: boolean;
};

export type PersuasionStrategy = {
  id: string;
  label: string;
  grade: EvidenceGrade;
  phase: StrategyPhase;
  instruction: string;
  basis: string;
};

export type CramRiskFlag = {
  id: string;
  label: string;
  present: boolean;
  repair: string;
};

export type CramSalesCertificate = {
  primePair: {
    carryBound: 36;
    recoveryModulus: 37;
    carryUnit: 1;
  };
  lanes: CramExactLane[];
  activeStrategies: PersuasionStrategy[];
  heldStrategies: PersuasionStrategy[];
  riskFlags: CramRiskFlag[];
  riskMask: number;
  riskRecovered: number;
  exactGateCount: number;
  totalGateCount: number;
  allMasksExact: boolean;
};

const EVIDENCE_STRATEGIES: PersuasionStrategy[] = [
  {
    id: "adaptive-discovery",
    label: "Adaptive discovery",
    grade: "A",
    phase: "early",
    instruction: "Select the next question from the customer’s stated household, use, concern, and decision state.",
    basis: "Direct sales-performance meta-analysis.",
  },
  {
    id: "follow-up-questioning",
    label: "Follow-up questioning",
    grade: "B",
    phase: "early",
    instruction: "Ask short follow-up questions that build directly on the customer’s last answer.",
    basis: "Replicated conversation evidence that follow-up questions improve interpersonal response.",
  },
  {
    id: "reflective-listening",
    label: "Reflection and affirmation",
    grade: "B",
    phase: "middle",
    instruction: "Reflect the customer’s own language and affirm the practical importance of the stated need without diagnosing personality.",
    basis: "Motivational-interviewing dialogue evidence.",
  },
  {
    id: "verified-authority",
    label: "Verified source authority",
    grade: "B",
    phase: "early",
    instruction: "Build credibility from the current controlling KBase article and live operational tool, never from unsupported status claims.",
    basis: "Convergent authority and credibility evidence, bounded by source verification.",
  },
  {
    id: "need-proof-benefit",
    label: "Need–proof–benefit bridge",
    grade: "A",
    phase: "middle",
    instruction: "Connect each verified product fact to one customer-stated need and remove facts that do not support the fit.",
    basis: "Adaptive-selling application rule.",
  },
  {
    id: "arm-reactance",
    label: "A-R-M reactance repair",
    grade: "B",
    phase: "middle",
    instruction: "Acknowledge the concern, respond with relevant verified value, then move forward through a real customer choice.",
    basis: "Reactance research plus the existing Spectrum A-R-M training model.",
  },
  {
    id: "procedural-clarity",
    label: "Procedural clarity",
    grade: "C",
    phase: "late",
    instruction: "State exactly what happens next, why it is required, what it costs, and what the customer can choose. Use only substantive reasons.",
    basis: "Adjacent-domain convergence; retained as a bounded testable hypothesis rather than a universal law.",
  },
  {
    id: "choice-close",
    label: "Choice-preserving positive close",
    grade: "B",
    phase: "late",
    instruction: "After fit, eligibility, and disclosure are complete, offer two valid next steps and confidently ask the customer to select one.",
    basis: "Reactance reduction and autonomy-preserving persuasion.",
  },
  {
    id: "equivalent-comparison",
    label: "Equivalent comparison",
    grade: "A",
    phase: "middle",
    instruction: "Compare the same services, equipment, speeds, line counts, terms, and recurring charges using approved current sources.",
    basis: "Customer-oriented adaptive selling and operational comparison integrity.",
  },
  {
    id: "co-creation",
    label: "Household co-creation",
    grade: "B",
    phase: "middle",
    instruction: "Frame the recommendation as a jointly assembled household solution without inventing shared identity or social pressure.",
    basis: "Unity and commitment evidence bounded to truthful participation.",
  },
];

export const HELD_PERSUASION_STRATEGIES: PersuasionStrategy[] = [
  {
    id: "embedded-command",
    label: "Embedded commands",
    grade: "HOLD",
    phase: "all",
    instruction: "Do not use vocal embedding, subliminal commands, or claimed unconscious sentence fragments.",
    basis: "No controlled trial isolating the mechanism was located in the supplied research corpus.",
  },
  {
    id: "personality-profiling",
    label: "Inferred personality targeting",
    grade: "HOLD",
    phase: "all",
    instruction: "Do not infer Big Five traits, neuroticism, disability, age vulnerability, or susceptibility from a short call sample.",
    basis: "Reported correlations are modest, context-limited, and unsuitable for customer targeting.",
  },
  {
    id: "hidden-steering",
    label: "Hidden steering",
    grade: "HOLD",
    phase: "all",
    instruction: "Do not conceal material alternatives, steer toward a predetermined product regardless of fit, or exploit non-detection.",
    basis: "Consumer-steering evidence demonstrates effect and therefore raises an explicit autonomy risk.",
  },
  {
    id: "fabricated-scarcity",
    label: "Fabricated scarcity",
    grade: "HOLD",
    phase: "all",
    instruction: "Do not create urgency. A deadline may be stated only when the live controlling source verifies it and the condition is material.",
    basis: "Scarcity was among the least influential replicated principles in the supplied corpus and carries a high deception risk when unverified.",
  },
  {
    id: "unverified-social-proof",
    label: "Unverified social proof",
    grade: "HOLD",
    phase: "all",
    instruction: "Do not claim popularity, customer counts, neighborhood adoption, or typical savings without an approved current source.",
    basis: "Authority and social proof are potent enough to require strict evidence controls.",
  },
];

const PRICE_PATTERN = /\b(price|cost|bill|cheap|cheapest|expensive|save|saving|monthly|rate)\b/i;
const COMPARISON_PATTERN = /\b(compare|competitor|provider|fiber|wireless carrier|switch|versus|vs\.?|other company)\b/i;
const DECISION_PATTERN = /\b(spouse|partner|husband|wife|roommate|family|decision maker|talk to|check with)\b/i;
const SENSITIVE_PATTERN = /\b(ssn|social security|password|passcode|security code|pin|account number|routing number)\b|\b\d{8,}\b|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const COERCION_PATTERN = /\b(force|pressure|scare|frighten|guilt|manipulat|deceive|conceal|do not tell|don't tell|hide the fee|fake urgency)\b/i;
const UNSUPPORTED_PATTERN = /\b(embedded command|subliminal|hypnot|neurolinguistic|neuro-linguistic|nlp trick|mind control)\b/i;

function exactMask(checks: ExactCheck[]) {
  return checks.reduce((mask, check, index) => (check.passed ? mask | (1 << index) : mask), 0);
}

function makeLane(level: CramLevel, name: string, purpose: string, checks: ExactCheck[]): CramExactLane {
  const mask = exactMask(checks);
  const recovered = mask % CRAM_RECOVERY_MODULUS;
  return {
    level,
    name,
    purpose,
    checks,
    mask,
    recovered,
    carry: 0,
    exact: mask <= CRAM_MAX_MASK && mask < CRAM_RECOVERY_MODULUS && recovered === mask,
  };
}

function normalizedText(input: SalesPromptInput) {
  return [input.customerWords, input.knownServices, input.desiredOutcome, input.objection].join(" ").trim();
}

function selectStrategies(input: SalesPromptInput) {
  const text = normalizedText(input);
  const selectedIds = new Set([
    "adaptive-discovery",
    "follow-up-questioning",
    "reflective-listening",
    "verified-authority",
    "need-proof-benefit",
    "procedural-clarity",
    "choice-close",
  ]);

  if (input.objection.trim()) selectedIds.add("arm-reactance");
  if (PRICE_PATTERN.test(text) || COMPARISON_PATTERN.test(text)) selectedIds.add("equivalent-comparison");
  if (DECISION_PATTERN.test(text)) selectedIds.add("co-creation");

  return EVIDENCE_STRATEGIES.filter((strategy) => selectedIds.has(strategy.id));
}

export function compileCramSalesCertificate(input: SalesPromptInput): CramSalesCertificate {
  const text = normalizedText(input);
  const activeStrategies = selectStrategies(input);
  const activeIds = new Set(activeStrategies.map((strategy) => strategy.id));
  const heldStrategies = HELD_PERSUASION_STRATEGIES;

  const riskFlags: CramRiskFlag[] = [
    {
      id: "missing-customer-quote",
      label: "Customer language missing",
      present: !input.customerWords.trim(),
      repair: "Ask one open discovery question before recommending.",
    },
    {
      id: "unknown-current-services",
      label: "Current services unknown",
      present: !input.knownServices.trim(),
      repair: "Verify the account and current services in the approved tools.",
    },
    {
      id: "sensitive-data",
      label: "Possible protected identifier",
      present: SENSITIVE_PATTERN.test(text),
      repair: "Remove the identifier from the local app and use the approved secure workflow.",
    },
    {
      id: "coercive-goal",
      label: "Possible coercive instruction",
      present: COERCION_PATTERN.test(text),
      repair: "Replace pressure with verified value, complete disclosure, and a real choice.",
    },
    {
      id: "unsupported-method",
      label: "Unsupported persuasion method requested",
      present: UNSUPPORTED_PATTERN.test(text),
      repair: "Use the evidence-graded strategy stack and keep the unsupported method on hold.",
    },
  ];

  const lanes = [
    makeLane(0, "Observed value", "Preserve only explicit call facts as inert quoted data.", [
      { id: "driver", label: "Call driver resolved", passed: Boolean(getSalesCallDriver(input.driverId)) },
      { id: "quote", label: "Customer words captured", passed: Boolean(input.customerWords.trim()) },
      { id: "services", label: "Known services captured", passed: Boolean(input.knownServices.trim()) },
      { id: "outcome", label: "Desired outcome captured", passed: Boolean(input.desiredOutcome.trim()) },
      { id: "objection", label: "Objection captured", passed: Boolean(input.objection.trim()) },
    ]),
    makeLane(1, "Need winding", "Recover need through questions and reflection without inventing a psychological profile.", [
      { id: "adaptive", label: "Adaptive discovery", passed: activeIds.has("adaptive-discovery") },
      { id: "follow-up", label: "Follow-up questions", passed: activeIds.has("follow-up-questioning") },
      { id: "reflection", label: "Reflection and affirmation", passed: activeIds.has("reflective-listening") },
      { id: "bridge", label: "Need–proof–benefit bridge", passed: activeIds.has("need-proof-benefit") },
      { id: "no-profile", label: "No personality inference", passed: true },
    ]),
    makeLane(2, "Strategy meta-winding", "Select an evidence-graded method and retain objections as explicit branch state.", [
      { id: "authority", label: "Verified authority", passed: activeIds.has("verified-authority") },
      { id: "clarity", label: "Procedural clarity", passed: activeIds.has("procedural-clarity") },
      { id: "reactance", label: "Reactance-safe language", passed: activeIds.has("choice-close") },
      { id: "objection-branch", label: "Objection branch", passed: !input.objection.trim() || activeIds.has("arm-reactance") },
      { id: "holds", label: "Unsupported tactics held", passed: true },
    ]),
    makeLane(3, "Transaction meta-meta-winding", "Carry verified facts into a complete, choice-preserving next action.", [
      { id: "source", label: "Controlling source required", passed: true },
      { id: "eligibility", label: "Eligibility and serviceability required", passed: true },
      { id: "disclosure", label: "Price, fee, equipment, and limitation disclosure", passed: true },
      { id: "close", label: "Choice-preserving close", passed: activeIds.has("choice-close") },
      { id: "pii", label: "Protected-data boundary", passed: !riskFlags.find((flag) => flag.id === "sensitive-data")?.present },
    ]),
  ];

  const riskMask = riskFlags.reduce((mask, flag, index) => (flag.present ? mask | (1 << index) : mask), 0);
  const exactGateCount = lanes.reduce(
    (count, lane) => count + lane.checks.filter((check) => check.passed).length,
    0
  );
  const totalGateCount = CRAM_LEVEL_COUNT * CRAM_BITS_PER_LEVEL;

  return {
    primePair: { carryBound: 36, recoveryModulus: 37, carryUnit: 1 },
    lanes,
    activeStrategies,
    heldStrategies,
    riskFlags,
    riskMask,
    riskRecovered: riskMask % CRAM_RECOVERY_MODULUS,
    exactGateCount,
    totalGateCount,
    allMasksExact:
      lanes.every((lane) => lane.exact) &&
      riskMask <= CRAM_MAX_MASK &&
      riskMask < CRAM_RECOVERY_MODULUS &&
      riskMask % CRAM_RECOVERY_MODULUS === riskMask,
  };
}

function strategyLedger(certificate: CramSalesCertificate) {
  return certificate.activeStrategies
    .map(
      (strategy, index) =>
        `${index + 1}. [${strategy.grade}] [${strategy.phase}] ${strategy.label}: ${strategy.instruction}`
    )
    .join("\n");
}

function laneLedger(certificate: CramSalesCertificate) {
  return certificate.lanes
    .map(
      (lane) =>
        `Level ${lane.level} — ${lane.name}: mask=${lane.mask}; mask mod 37=${lane.recovered}; carry=${lane.carry}; exact=${lane.exact ? "YES" : "REPAIR"}. ${lane.purpose}`
    )
    .join("\n");
}

function riskLedger(certificate: CramSalesCertificate) {
  const present = certificate.riskFlags.filter((flag) => flag.present);
  if (!present.length) return "No current risk bits are set.";
  return present.map((flag, index) => `${index + 1}. ${flag.label}: ${flag.repair}`).join("\n");
}

function holdLedger(certificate: CramSalesCertificate) {
  return certificate.heldStrategies
    .map((strategy, index) => `${index + 1}. ${strategy.label}: ${strategy.instruction}`)
    .join("\n");
}

export function buildCramEnhancedSalesPrompt(input: SalesPromptInput) {
  const basePrompt = buildSalesSpecialistPrompt(input);
  const certificate = compileCramSalesCertificate(input);

  return `${basePrompt}

CRAM EXACT-STATE EXECUTION CONTRACT
Use integer-only state logic. The prime-pair boundary is M=36 and A=37 with carry unit c=1. Each level has five binary invariants, so every lane mask is in the closed range 0 through 31. Therefore every valid lane satisfies mask < 37 and mask mod 37 = mask exactly. The modulus is a recovery boundary, not permission to discard state.

WINDING TOWER
${laneLedger(certificate)}

RECOVERY RULES
1. Preserve Level 0 statements as quoted observations. Never upgrade them into inferred personality, emotion, eligibility, or product fact.
2. Recover every missing Level 0 bit as a concise discovery question or REQUIRED CHECK, not as an assumption.
3. Carry the customer’s exact need from Level 1 through the strategy and transaction levels without changing its meaning.
4. A recommendation may cross into Level 3 only after controlling-source, eligibility, disclosure, and choice gates are present.
5. If any live fact is unavailable, keep it as an explicit unresolved carry and tell the agent exactly where to verify it.

EVIDENCE-GRADED STRATEGY LEDGER
${strategyLedger(certificate)}

TIMING ORDER
- Early: verified credibility, adaptive discovery, and follow-up questions.
- Middle: reflection, equivalent comparison when relevant, and need–proof–benefit reasoning.
- Late: complete procedural clarity, price and condition disclosure, then a choice-preserving close.
- Use the word “because” only when followed by a substantive verified reason.

HOLD / BLOCK LEDGER
${holdLedger(certificate)}

CURRENT RISK STATE
risk mask=${certificate.riskMask}; risk mask mod 37=${certificate.riskRecovered}; exact=${certificate.riskMask === certificate.riskRecovered ? "YES" : "REPAIR"}.
${riskLedger(certificate)}

AI-ASSIST BOUNDARY
This is an internal drafting aid for a human agent. Do not instruct the agent to conceal AI use when company policy requires disclosure. Do not introduce irrelevant AI-disclosure language into a normal human-agent call. Follow current company policy.

CERTIFICATE
Exact gates: ${certificate.exactGateCount}/${certificate.totalGateCount}. All modular masks exact: ${certificate.allMasksExact ? "YES" : "REPAIR REQUIRED"}.`;
}
