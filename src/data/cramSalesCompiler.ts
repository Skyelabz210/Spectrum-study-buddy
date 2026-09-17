// cramSalesCompiler.ts — v2 (2026-07-23)
// CORRECTED + ENHANCED replacement for the v1 compiler.
//
// What was conflated in v1 and is fixed here:
//  1. v1 called (M=36, A=37) a "prime pair". 36 = 2^2 * 3^2 is composite.
//     The property that matters is COPRIMALITY: gcd(M, A) = 1. CRAM doctrine
//     uses composite moduli and coprime relationships, not raw primes. Fixed.
//  2. v1's "recovery" (mask mod 37 = mask for masks 0..31) was vacuous: the
//     value could never exceed the modulus, so nothing was ever recovered.
//     v2 packs the full 25-bit certificate state into one integer that DOES
//     exceed the primary modulus, and recovers it exactly with K-Elimination.
//  3. v1 language implied certification. v2 keeps the audit's required wording:
//     this is a CRAM STATE CHECK, not a certification of facts or compliance.
//
// K-Elimination configuration (adjacent coprime pair):
//     M = 8192 = 2^13          (composite primary modulus)
//     A = 8191 = 2^13 - 1      (Mersenne prime anchor; gcd(M, A) = 1)
//   Because M ≡ 1 (mod A), M⁻¹ ≡ 1 (mod A), so the overflow count is
//     k = (vA - vM) mod A      — a single modular subtraction.
//   No Garner. No mixed-radix. Lanes are computed independently (i.i.d.);
//   the packed word is a *view* for verification, never a carry chain.
//   All arithmetic is integer-only. No floating point anywhere.

import {
  buildSalesSpecialistPrompt,
  getSalesCallDriver,
  type SalesPromptInput,
} from "@/data/salesPromptEngineer";

// ——— Residue configuration ———
export const CRAM_PRIMARY_MODULUS = 8192; // M = 2^13 (composite)
export const CRAM_ANCHOR_MODULUS = 8191; //  A = 2^13 - 1 (prime); gcd(M,A)=1
export const CRAM_LEVEL_COUNT = 4;
export const CRAM_BITS_PER_LEVEL = 5;
export const CRAM_RISK_BITS = 5;
export const CRAM_STATE_BITS = CRAM_LEVEL_COUNT * CRAM_BITS_PER_LEVEL + CRAM_RISK_BITS; // 25
export const CRAM_MAX_MASK = 31; // per-lane 5-bit bound

export type CramLevel = 0 | 1 | 2 | 3;
export type EvidenceGrade = "A" | "B" | "C" | "HOLD";
export type StrategyPhase = "early" | "middle" | "late" | "all";

export type ExactCheck = { id: string; label: string; passed: boolean };

export type CramExactLane = {
  level: CramLevel;
  name: string;
  purpose: string;
  checks: ExactCheck[];
  mask: number; // 0..31, computed independently per lane (i.i.d.)
  exact: boolean; // mask within the 5-bit bound
};

export type PersuasionStrategy = {
  id: string;
  label: string;
  grade: EvidenceGrade;
  phase: StrategyPhase;
  instruction: string;
  basis: string;
};

export type CramRiskFlag = { id: string; label: string; present: boolean; repair: string };

export type KEliminationWitness = {
  packedState: number; // S: 25-bit state word, 0 .. 2^25-1
  primaryResidue: number; // vM = S mod M  (equals the low 13 bits of S)
  anchorResidue: number; //  vA = S mod A
  k: number; // overflow count recovered by modular subtraction
  reconstructed: number; // vM + k*M — must equal S exactly
  exact: boolean;
};

export type CramSalesCertificate = {
  coprimePair: { primaryModulus: 8192; anchorModulus: 8191; coprime: true };
  lanes: CramExactLane[];
  activeStrategies: PersuasionStrategy[];
  heldStrategies: PersuasionStrategy[];
  riskFlags: CramRiskFlag[];
  riskMask: number;
  witness: KEliminationWitness;
  exactGateCount: number;
  totalGateCount: number;
  allMasksExact: boolean;
};

// ——— Evidence-graded strategy stack (unchanged from v1: this part was correct) ———
const EVIDENCE_STRATEGIES: PersuasionStrategy[] = [
  { id: "adaptive-discovery", label: "Adaptive discovery", grade: "A", phase: "early", instruction: "Select the next question from the customer’s stated household, use, concern, and decision state.", basis: "Direct sales-performance meta-analysis." },
  { id: "follow-up-questioning", label: "Follow-up questioning", grade: "B", phase: "early", instruction: "Ask short follow-up questions that build directly on the customer’s last answer.", basis: "Replicated conversation evidence that follow-up questions improve interpersonal response." },
  { id: "reflective-listening", label: "Reflection and affirmation", grade: "B", phase: "middle", instruction: "Reflect the customer’s own language and affirm the practical importance of the stated need without diagnosing personality.", basis: "Motivational-interviewing dialogue evidence." },
  { id: "verified-authority", label: "Verified source authority", grade: "B", phase: "early", instruction: "Build credibility from the current controlling KBase article and live operational tool, never from unsupported status claims.", basis: "Convergent authority and credibility evidence, bounded by source verification." },
  { id: "need-proof-benefit", label: "Need–proof–benefit bridge", grade: "A", phase: "middle", instruction: "Connect each verified product fact to one customer-stated need and remove facts that do not support the fit.", basis: "Adaptive-selling application rule." },
  { id: "arm-reactance", label: "A-R-M reactance repair", grade: "B", phase: "middle", instruction: "Acknowledge the concern, respond with relevant verified value, then move forward through a real customer choice.", basis: "Reactance research plus the existing Spectrum A-R-M training model." },
  { id: "procedural-clarity", label: "Procedural clarity", grade: "C", phase: "late", instruction: "State exactly what happens next, why it is required, what it costs, and what the customer can choose. Use only substantive reasons.", basis: "Adjacent-domain convergence; retained as a bounded testable hypothesis rather than a universal law." },
  { id: "choice-close", label: "Choice-preserving positive close", grade: "B", phase: "late", instruction: "After fit, eligibility, and disclosure are complete, offer two valid next steps and confidently ask the customer to select one.", basis: "Reactance reduction and autonomy-preserving persuasion." },
  { id: "equivalent-comparison", label: "Equivalent comparison", grade: "A", phase: "middle", instruction: "Compare the same services, equipment, speeds, line counts, terms, and recurring charges using approved current sources.", basis: "Customer-oriented adaptive selling and operational comparison integrity." },
  { id: "co-creation", label: "Household co-creation", grade: "B", phase: "middle", instruction: "Frame the recommendation as a jointly assembled household solution without inventing shared identity or social pressure.", basis: "Unity and commitment evidence bounded to truthful participation." },
];

export const HELD_PERSUASION_STRATEGIES: PersuasionStrategy[] = [
  { id: "embedded-command", label: "Embedded commands", grade: "HOLD", phase: "all", instruction: "Do not use vocal embedding, subliminal commands, or claimed unconscious sentence fragments.", basis: "No controlled trial isolating the mechanism was located in the supplied research corpus." },
  { id: "personality-profiling", label: "Inferred personality targeting", grade: "HOLD", phase: "all", instruction: "Do not infer Big Five traits, neuroticism, disability, age vulnerability, or susceptibility from a short call sample.", basis: "Reported correlations are modest, context-limited, and unsuitable for customer targeting." },
  { id: "hidden-steering", label: "Hidden steering", grade: "HOLD", phase: "all", instruction: "Do not conceal material alternatives, steer toward a predetermined product regardless of fit, or exploit non-detection.", basis: "Consumer-steering evidence demonstrates effect and therefore raises an explicit autonomy risk." },
  { id: "fabricated-scarcity", label: "Fabricated scarcity", grade: "HOLD", phase: "all", instruction: "Do not create urgency. A deadline may be stated only when the live controlling source verifies it and the condition is material.", basis: "Scarcity was among the least influential replicated principles in the supplied corpus and carries a high deception risk when unverified." },
  { id: "unverified-social-proof", label: "Unverified social proof", grade: "HOLD", phase: "all", instruction: "Do not claim popularity, customer counts, neighborhood adoption, or typical savings without an approved current source.", basis: "Authority and social proof are potent enough to require strict evidence controls." },
];

const PRICE_PATTERN = /\b(price|cost|bill|cheap|cheapest|expensive|save|saving|monthly|rate)\b/i;
const COMPARISON_PATTERN = /\b(compare|competitor|provider|fiber|wireless carrier|switch|versus|vs\.?|other company)\b/i;
const DECISION_PATTERN = /\b(spouse|partner|husband|wife|roommate|family|decision maker|talk to|check with)\b/i;
const SENSITIVE_PATTERN = /\b(ssn|social security|password|passcode|security code|pin|account number|routing number)\b|\b\d{8,}\b|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const COERCION_PATTERN = /\b(force|pressure|scare|frighten|guilt|manipulat|deceive|conceal|do not tell|don't tell|hide the fee|fake urgency)\b/i;
const UNSUPPORTED_PATTERN = /\b(embedded command|subliminal|hypnot|neurolinguistic|neuro-linguistic|nlp trick|mind control)\b/i;

// ——— Exact integer machinery ———
function exactMask(checks: ExactCheck[]) {
  return checks.reduce((mask, check, index) => (check.passed ? mask | (1 << index) : mask), 0);
}

function makeLane(level: CramLevel, name: string, purpose: string, checks: ExactCheck[]): CramExactLane {
  const mask = exactMask(checks);
  return { level, name, purpose, checks, mask, exact: mask >= 0 && mask <= CRAM_MAX_MASK };
}

/**
 * Pack the four 5-bit lane masks plus the 5-bit risk mask into one 25-bit word.
 * Lane order is fixed: level 0 in bits 0..4, level 1 in bits 5..9, level 2 in
 * bits 10..14, level 3 in bits 15..19, risk in bits 20..24. Packing is a view
 * for verification only; every lane mask remains independently computed.
 */
export function packCertificateState(laneMasks: number[], riskMask: number): number {
  let state = 0;
  laneMasks.forEach((mask, index) => {
    state |= (mask & CRAM_MAX_MASK) << (index * CRAM_BITS_PER_LEVEL);
  });
  state |= (riskMask & CRAM_MAX_MASK) << (CRAM_LEVEL_COUNT * CRAM_BITS_PER_LEVEL);
  return state >>> 0;
}

/**
 * K-Elimination witness over the adjacent coprime pair (M=8192, A=8191).
 * S = vM + k*M with vM = S mod M and, because M ≡ 1 (mod A):
 *   k = (vA - vM) mod A
 * One modular subtraction replaces Garner/mixed-radix reconstruction entirely.
 * Exactness holds for all S < M*A = 67,100,672 > 2^25, so every certificate
 * state is recovered exactly. Integer-only; no floats.
 */
export function kEliminationWitness(packedState: number): KEliminationWitness {
  const primaryResidue = packedState % CRAM_PRIMARY_MODULUS;
  const anchorResidue = packedState % CRAM_ANCHOR_MODULUS;
  const k =
    ((anchorResidue - primaryResidue) % CRAM_ANCHOR_MODULUS + CRAM_ANCHOR_MODULUS) %
    CRAM_ANCHOR_MODULUS;
  const reconstructed = primaryResidue + k * CRAM_PRIMARY_MODULUS;
  return {
    packedState,
    primaryResidue,
    anchorResidue,
    k,
    reconstructed,
    exact: reconstructed === packedState,
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
    { id: "missing-customer-quote", label: "Customer language missing", present: !input.customerWords.trim(), repair: "Ask one open discovery question before recommending." },
    { id: "unknown-current-services", label: "Current services unknown", present: !input.knownServices.trim(), repair: "Verify the account and current services in the approved tools." },
    { id: "sensitive-data", label: "Possible protected identifier", present: SENSITIVE_PATTERN.test(text), repair: "Remove the identifier from the local app and use the approved secure workflow." },
    { id: "coercive-goal", label: "Possible coercive instruction", present: COERCION_PATTERN.test(text), repair: "Replace pressure with verified value, complete disclosure, and a real choice." },
    { id: "unsupported-method", label: "Unsupported persuasion method requested", present: UNSUPPORTED_PATTERN.test(text), repair: "Use the evidence-graded strategy stack and keep the unsupported method on hold." },
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
  const witness = kEliminationWitness(packCertificateState(lanes.map((lane) => lane.mask), riskMask));
  const exactGateCount = lanes.reduce((count, lane) => count + lane.checks.filter((check) => check.passed).length, 0);
  const totalGateCount = CRAM_LEVEL_COUNT * CRAM_BITS_PER_LEVEL;

  return {
    coprimePair: { primaryModulus: 8192, anchorModulus: 8191, coprime: true },
    lanes,
    activeStrategies,
    heldStrategies,
    riskFlags,
    riskMask,
    witness,
    exactGateCount,
    totalGateCount,
    allMasksExact: lanes.every((lane) => lane.exact) && riskMask <= CRAM_MAX_MASK && witness.exact,
  };
}

function strategyLedger(certificate: CramSalesCertificate) {
  return certificate.activeStrategies
    .map((strategy, index) => `${index + 1}. [${strategy.grade}] [${strategy.phase}] ${strategy.label}: ${strategy.instruction}`)
    .join("\n");
}

function laneLedger(certificate: CramSalesCertificate) {
  return certificate.lanes
    .map((lane) => `Level ${lane.level} — ${lane.name}: mask=${lane.mask}/31; exact=${lane.exact ? "YES" : "REPAIR"}. ${lane.purpose}`)
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
  const w = certificate.witness;

  return `${basePrompt}

CRAM STATE CHECK — EXACT-STATE EXECUTION CONTRACT
Integer-only state logic on a coprime residue pair. Primary modulus M=8192 (composite, 2^13) and anchor A=8191 (prime, 2^13−1); gcd(M,A)=1. The four lane masks and the risk mask are computed independently (i.i.d.) and packed into one 25-bit state word for verification only. Because M ≡ 1 (mod A), the overflow count is recovered by one modular subtraction — no Garner, no mixed-radix, no carry chain.

WINDING TOWER
${laneLedger(certificate)}

K-ELIMINATION WITNESS
state=${w.packedState}; vM=state mod 8192=${w.primaryResidue}; vA=state mod 8191=${w.anchorResidue}; k=(vA−vM) mod 8191=${w.k}; vM+k·M=${w.reconstructed}; exact=${w.exact ? "YES" : "REPAIR"}.
Scope: exact recovery proves the configured Boolean state was encoded without ambiguity. It does not prove any product fact, eligibility, effectiveness, or approval. Plain-language gates are primary; this arithmetic is a verification layer.

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
risk mask=${certificate.riskMask}/31.
${riskLedger(certificate)}

AI-ASSIST BOUNDARY
This is an internal drafting aid for a human agent. Do not instruct the agent to conceal AI use when company policy requires disclosure. Do not introduce irrelevant AI-disclosure language into a normal human-agent call. Follow current company policy.

STATE CHECK SUMMARY
Exact gates: ${certificate.exactGateCount}/${certificate.totalGateCount}. Lane masks bounded and K-Elimination witness exact: ${certificate.allMasksExact ? "YES" : "REPAIR REQUIRED"}.`;
}
