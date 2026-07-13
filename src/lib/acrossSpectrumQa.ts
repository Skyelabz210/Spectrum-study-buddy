import { SIMULATOR_MARKERS } from "@/data/acrossSpectrum";

export type MarkerEvidence = {
  markerId: string;
  evidence: string;
  reason: string;
};

const GREETING = /(thank you for calling|good (morning|afternoon|evening)|hello|hi there)/i;
const IDENTITY_OR_HELP = /(my name is|this is|how can i help|how may i help|happy to help|glad to help)/i;
const DISCOVERY_WORDS = /(how many|what do you|who do you|which|current provider|monthly bill|devices|stream|gaming|work from home|what matters|what are you paying|what is most important)/i;
const EMPATHY = /(i understand|that makes sense|i can see why|i hear you|that sounds frustrating|absolutely|i appreciate that|i get why)/i;
const NEED_LINK = /(based on|because you|for your household|that would fit|that fits|given what you said|since you mentioned|your priority)/i;
const PRODUCT = /(internet|premier|gig|2 gig|7 gig|advantage|assist|mobile|unlimited|by the gig|tv|xumo|voice|wifi|advanced wifi|invincible wifi)/i;
const PERMISSION_OR_FIT = /(would it help|would you like|can i compare|we can compare|might fit|could fit|option|if it lowers|if it solves|only if)/i;
const ACKNOWLEDGE = /(i understand|that makes sense|i hear you|absolutely|i can see why)/i;
const RESPOND = /(what i can do|here is what we can do|the way that works|we can check|we can compare|let me explain|let me verify)/i;
const MOVE = /(next step|from here|move forward|would you like|let us check|let me check|with your approval)/i;
const VERIFY = /(verify|confirm|check availability|check your address|serviceability|eligibility|live offer|approved article|before i quote|final pricing|current offer|account details)/i;
const CONSENT_CLOSE = /(would you like|are you ready|does that work|if that sounds good|with your approval|shall we|would you prefer|which option works|do you want me to)/i;

export function evaluateAgentLine(text: string): MarkerEvidence[] {
  const clean = text.trim();
  if (!clean) return [];
  const questionLike = /\?|^(how|what|who|which|when|where|why|do|does|are|is|can|could|would|will)\b/i.test(clean) || DISCOVERY_WORDS.test(clean);
  const hits: MarkerEvidence[] = [];

  const add = (markerId: string, reason: string) => {
    if (!SIMULATOR_MARKERS.some((marker) => marker.id === markerId)) return;
    hits.push({ markerId, evidence: clean, reason });
  };

  if (GREETING.test(clean) && IDENTITY_OR_HELP.test(clean)) {
    add("proper-greeting", "Greeting included an opening plus agent identity or offer to help.");
  }
  if (questionLike && DISCOVERY_WORDS.test(clean)) {
    add("discovery", "Agent asked a need, usage, provider, device or cost discovery question.");
  }
  if (EMPATHY.test(clean)) {
    add("empathy", "Agent explicitly acknowledged the caller's concern or perspective.");
  }
  if (NEED_LINK.test(clean) && PRODUCT.test(clean)) {
    add("value-fit", "Agent connected a product or service to a stated customer need.");
  }
  if (PRODUCT.test(clean) && PERMISSION_OR_FIT.test(clean)) {
    add("upsell-attach", "Agent explored an additional or higher-tier service with a fit or permission condition.");
  }
  if (ACKNOWLEDGE.test(clean) && RESPOND.test(clean) && MOVE.test(clean)) {
    add("objection-arm", "The response included acknowledgment, a positive answer and a forward step.");
  }
  if (VERIFY.test(clean)) {
    add("verification", "Agent stated a live source, address, account, offer or eligibility verification step.");
  }
  if (CONSENT_CLOSE.test(clean)) {
    add("clean-close", "Agent asked for a choice or permission-based next action.");
  }

  return hits;
}

export function nextQaSuggestion(achievedIds: string[], turnIndex: number) {
  const missing = SIMULATOR_MARKERS.filter((marker) => !achievedIds.includes(marker.id));
  if (!achievedIds.includes("proper-greeting") && turnIndex === 0) {
    return "Open with a complete greeting: company, your name, and an offer to help.";
  }
  if (!achievedIds.includes("empathy")) {
    return "Reflect the caller's concern before moving into a recommendation.";
  }
  if (!achievedIds.includes("discovery")) {
    return "Ask one focused question about household use, devices, provider, bill, or priority.";
  }
  if (!achievedIds.includes("value-fit")) {
    return "Connect one verified option directly to something the caller said.";
  }
  if (!achievedIds.includes("verification")) {
    return "State what you must verify before quoting price, eligibility, speed, or availability.";
  }
  if (!achievedIds.includes("clean-close")) {
    return "Ask for a clear, choice-preserving next step.";
  }
  return missing[0]?.description ?? "Summarize the fit, verify the facts, and close with consent.";
}
