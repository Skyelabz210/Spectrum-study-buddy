export type Difficulty = "guided" | "coached" | "live";

export type QaMarker = {
  id: string;
  label: string;
  description: string;
  coachLine: string;
};

export type CallerScenario = {
  id: string;
  title: string;
  callType: string;
  persona: string;
  context: string;
  opening: string;
  objective: string;
  required: string[];
  boundaries: string[];
  guided: string[];
  rebuttal: string;
  fallback: string[];
};

export const DIFFICULTIES: Record<Difficulty, { label: string; help: string }> = {
  guided: { label: "Low · Guided", help: "Full next line and rebuttal support." },
  coached: { label: "Medium · Coached", help: "Goal cues without a full script." },
  live: { label: "High · Live", help: "QA markers only until wrap-up." },
};

export const QA_MARKERS: QaMarker[] = [
  { id: "greeting", label: "Greeting", description: "Professional opening and agent identification.", coachLine: "Give the complete greeting and identify yourself." },
  { id: "permission", label: "Permission", description: "Set the agenda or ask before discovery.", coachLine: "Ask permission to learn about the household." },
  { id: "discovery", label: "Discovery", description: "Ask about usage, timing, household, or priorities.", coachLine: "Ask one open question tied to the caller's need." },
  { id: "listening", label: "Listening", description: "Acknowledge or accurately paraphrase the caller.", coachLine: "Reflect the concern before recommending." },
  { id: "value", label: "Value fit", description: "Connect the recommendation to a stated priority.", coachLine: "Use the caller's words to explain value." },
  { id: "accuracy", label: "Accuracy", description: "Use verification gates; avoid unsupported guarantees.", coachLine: "State what must be verified before quoting." },
  { id: "qualification", label: "Eligibility", description: "Check serviceability, compatibility, account, or promotion requirements.", coachLine: "Name the exact eligibility check." },
  { id: "opportunity", label: "Opportunity", description: "Explore a relevant Internet, Mobile, or Voice fit without forcing it.", coachLine: "Ask one relevant cross-service question." },
  { id: "arm", label: "A-R-M", description: "Acknowledge, respond, and create forward motion.", coachLine: "Acknowledge, answer, then offer one next step." },
  { id: "consent", label: "Consent", description: "Keep choice explicit; no hidden add-ons or implied authorization.", coachLine: "Make the customer's choice explicit." },
  { id: "close", label: "Next step", description: "Ask for one specific appropriate action.", coachLine: "Offer one concrete next step." },
  { id: "recap", label: "Recap", description: "Summarize need, recommendation, gates, and next step.", coachLine: "Give a compact recap and confirm understanding." },
];

export const SCENARIOS: CallerScenario[] = [
  {
    id: "mover-connected-home",
    title: "New mover · connected home",
    callType: "New Internet sale",
    persona: "Friendly comparison shopper; asks detailed questions",
    context: "Two remote workers, a gamer, streaming devices, and a move next week.",
    opening: "Hi, I'm moving next week. Two of us work from home, my son games, and I cannot deal with buffering, but I also do not want to overpay.",
    objective: "Discover simultaneous use, align a speed tier, verify address eligibility, and establish the next step.",
    required: ["greeting", "permission", "discovery", "listening", "value", "accuracy", "qualification", "close", "recap"],
    boundaries: ["Do not invent price.", "Do not guarantee WiFi performance.", "Verify serviceability and the live offer."],
    guided: [
      "Thank you for calling Spectrum. This is Anthony. May I ask a few questions so I can match the home to the right option?",
      "You mentioned remote work, gaming, and several devices. How many people are usually online at once?",
      "I will compare the eligible options at the new address and verify the current offer before quoting.",
    ],
    rebuttal: "I understand not wanting to overbuy. Let me match the option to simultaneous use rather than simply naming the fastest tier.",
    fallback: ["Usually four of us are online at night. What would you recommend?", "How do I know WiFi reaches upstairs?", "Okay, what is the next step?"],
  },
  {
    id: "budget-light-user",
    title: "Budget-first light user",
    callType: "Entry-tier Internet inquiry",
    persona: "Cautious, concise, price-sensitive",
    context: "One-person household using email, browsing, and occasional streaming.",
    opening: "I just need the cheapest internet. I live alone and watch a show sometimes. Please do not try to sell me everything.",
    objective: "Respect the boundary, perform minimal discovery, and verify address-gated choices.",
    required: ["greeting", "listening", "discovery", "accuracy", "qualification", "consent", "close"],
    boundaries: ["Eligibility controls address-gated options.", "Do not quote stale price.", "Do not force unrelated products."],
    guided: [
      "I hear you. I will keep this focused on the lowest appropriate option and verify what the address is eligible for.",
      "How many devices are connected at the same time?",
      "I can check the address and show the current terms before you decide.",
    ],
    rebuttal: "That is fair. I am not adding anything; I am checking which eligible option matches the light use you described.",
    fallback: ["Usually just my phone and TV. What is cheapest?", "Why do you need my address?", "Fine, what do you need to check it?"],
  },
  {
    id: "mobile-pbb-family",
    title: "Family Mobile consolidation · PBB",
    callType: "Internet plus Mobile opportunity",
    persona: "Analytical, skeptical, bill-focused",
    context: "Three lines with another carrier and balances on two devices.",
    opening: "We need internet, but I keep seeing Mobile ads. We have three lines and still owe on two phones. Will Spectrum definitely pay them off?",
    objective: "Discover usage, explain BYOD and PBB gates, avoid guarantees, and ask permission to compare.",
    required: ["greeting", "permission", "discovery", "listening", "opportunity", "accuracy", "qualification", "arm", "consent", "close"],
    boundaries: ["Never guarantee PBB.", "BYOD requires unlock and compatibility checks.", "Verify current PBB payment-history, bill, line, account, timing, and cap rules."],
    guided: [
      "I understand why the balances decide whether switching makes sense. May I ask how the three lines are used and whether you want to keep the phones?",
      "I can compare the eligible plans, then separately verify compatibility and every current PBB requirement.",
      "Nothing moves forward until you see the verified terms and choose.",
    ],
    rebuttal: "I would rather give you a verified answer than promise money the documents or current rules may not support.",
    fallback: ["Two lines use heavy data and one barely does. We want to keep the phones.", "One phone has only two payments. Is that covered?", "What must be visible on the bill?"],
  },
  {
    id: "traveler-unlimited",
    title: "Traveler · Unlimited comparison",
    callType: "Mobile plan comparison",
    persona: "Fast, feature-driven, impatient with vague answers",
    context: "Uses hotspot for work and travels internationally several times each year.",
    opening: "What is the real difference between Unlimited and Unlimited Plus? I travel and use hotspot, so skip the sales speech.",
    objective: "Clarify usage, compare only verified features, and preserve source discrepancies.",
    required: ["greeting", "listening", "discovery", "value", "accuracy", "qualification", "close", "recap"],
    boundaries: ["Current approved article and live offer control.", "Do not invent thresholds, roaming countries, or price.", "State unresolved source differences."],
    guided: [
      "I can keep it direct. How much hotspot use and what kind of international travel matter most?",
      "Plus is the option I would verify first for heavier hotspot and travel needs, but the current approved terms control.",
      "I will compare the verified details side by side before you choose.",
    ],
    rebuttal: "You are right that 'premium' is not enough. Let me verify the exact current hotspot and travel terms.",
    fallback: ["I use hotspot a few days monthly and travel to Mexico and Europe.", "So Plus is definitely better?", "What exactly are you verifying?"],
  },
  {
    id: "voice-outage",
    title: "Voice · power-outage concern",
    callType: "Internet plus Voice fit",
    persona: "Protective, careful, risk-focused",
    context: "Arranging service for a parent and asking what happens in a power outage.",
    opening: "This is for my mother. She wants a home phone and worries about the power going out. What keeps working?",
    objective: "Discover the concern, explain power dependency, verify backup options, and avoid emergency guarantees.",
    required: ["greeting", "permission", "discovery", "listening", "value", "accuracy", "qualification", "close", "recap"],
    boundaries: ["Do not guarantee outage operation.", "Verify current battery product, duration, and price.", "Do not frame this as emergency-service advice."],
    guided: [
      "I understand why outage behavior matters. May I ask what she relies on the phone for and whether another backup method is available?",
      "The equipment depends on power, so I will verify the current backup option and explain its limits.",
      "I will recap what is included, what requires power, and the verified backup choice.",
    ],
    rebuttal: "That is why I do not want to overpromise. Let me separate normal service from the verified backup-power limits.",
    fallback: ["She mainly calls family, but I worry about emergencies.", "Will it work all night in an outage?", "What do you need to verify?"],
  },
  {
    id: "angry-returning",
    title: "Angry returning customer",
    callType: "Win-back sales conversation",
    persona: "Frustrated, distrustful, interruptive",
    context: "Prior billing frustration and a new move.",
    opening: "Before you sell me anything, I had Spectrum before and the bill was a mess. Why should I trust this call?",
    objective: "Acknowledge the experience, clarify the present need, verify current terms, and keep scope clean.",
    required: ["greeting", "listening", "permission", "discovery", "accuracy", "arm", "consent", "close"],
    boundaries: ["Do not argue about the past.", "Do not guarantee a bill never changes.", "Use support handoff for unresolved prior-account issues."],
    guided: [
      "I hear why that experience makes you cautious, and I will not ask you to ignore it.",
      "May I separate the prior-account issue from what you need at the new address and show only current verified terms?",
      "You will see the option and next step before choosing anything.",
    ],
    rebuttal: "You are right to expect clarity. I can document the current verified offer without promising what I cannot control.",
    fallback: ["The old price changed and nobody explained it.", "Are you guaranteeing this bill stays the same?", "What can you actually show me today?"],
  },
  {
    id: "talkative-chaos",
    title: "Talkative caller · background chaos",
    callType: "Conversation control",
    persona: "Warm, distracted, highly talkative",
    context: "Cooking, dog barking, family commenting, and multiple service questions.",
    opening: "Sorry about the dog—I'm calling about internet, maybe phones, but my daughter says ours is fine except it drops upstairs, and my neighbor said you have a deal.",
    objective: "Use respectful call control, isolate priorities, avoid chasing tangents, and recap confirmed facts.",
    required: ["greeting", "listening", "permission", "discovery", "value", "opportunity", "close", "recap"],
    boundaries: ["Do not infer a promotion from a neighbor.", "Do not diagnose coverage without discovery.", "Ask one question at a time."],
    guided: [
      "No problem. I heard two priorities: internet dropping upstairs and a possible Mobile comparison.",
      "May I handle the upstairs connection first, then ask one Mobile question?",
      "How many floors are there, and where is the current equipment?",
    ],
    rebuttal: "I want to make this easier, so I will keep us on one decision at a time and recap as we go.",
    fallback: ["Two floors. The router is behind the TV—wait, my daughter says it is in a cabinet.", "What about moving four phone lines?", "Sorry, what were you asking again?"],
  },
  {
    id: "rushed-price",
    title: "Rushed caller · price trap",
    callType: "Price-first pressure",
    persona: "Impatient, dominant, time-constrained",
    context: "No address or usage details supplied.",
    opening: "I have two minutes. Tell me the price for the fastest internet and do not ask twenty questions.",
    objective: "Respect time, explain the minimum verification need, compress discovery, and avoid invented price.",
    required: ["greeting", "listening", "accuracy", "qualification", "consent", "close"],
    boundaries: ["No quote without the current address-specific offer.", "The fastest tier may not be serviceable.", "Keep discovery compressed."],
    guided: [
      "I can keep it to two questions and give you only verified information.",
      "The fastest eligible option and current price depend on the address. What is the address, and how many people use it at once?",
      "I will check availability first and give the current terms without adding anything you did not request.",
    ],
    rebuttal: "I understand the time limit. The address check is the shortest path to an accurate number.",
    fallback: ["Why cannot you give the advertised price?", "Assume it is available. What is the number?", "I can give the address, but be quick."],
  },
  {
    id: "accessible-pace",
    title: "Caller requests slower pacing",
    callType: "Accessible communication",
    persona: "Direct, patient, asks for repetition",
    context: "Caller requests one concept at a time and slower speech.",
    opening: "I want to compare internet plans, but please speak slowly and give me one thing at a time.",
    objective: "Honor pacing, use plain language, confirm understanding, and avoid patronizing language.",
    required: ["greeting", "permission", "listening", "discovery", "value", "accuracy", "consent", "recap"],
    boundaries: ["Do not infer a diagnosis.", "Do not become patronizing.", "Use one question or concept at a time."],
    guided: [
      "Absolutely. I will slow down and cover one point at a time.",
      "First question: how many people use the internet in your home?",
      "I will pause after each option and check that it is clear.",
    ],
    rebuttal: "Thank you for telling me. I will repeat the point in shorter language rather than saying it louder or faster.",
    fallback: ["Two people use it.", "Could you repeat that in simpler words?", "Yes, that makes sense. What comes next?"],
  },
  {
    id: "privacy-scope",
    title: "Privacy and sales-scope boundary",
    callType: "Privacy, consent, and handoff",
    persona: "Urgent, convenience-focused, boundary-testing",
    context: "Caller asks for personal contact, offers credentials, and mentions an outage.",
    opening: "My internet is out, but I also want faster speed. Can you text me from your phone? I can give you my password to make it quick.",
    objective: "Decline credentials and private contact, route the outage, and preserve a future sales conversation without pressure.",
    required: ["greeting", "listening", "accuracy", "consent", "close", "recap"],
    boundaries: ["Never accept passwords, PINs, MFA codes, SSNs, or payment data.", "No private customer contact.", "Do not troubleshoot beyond authorized sales scope or exploit an outage."],
    guided: [
      "I can help through the approved Spectrum channel, but I cannot use a personal number or accept your password.",
      "The outage is the immediate issue, so I will give you the correct support path first.",
      "After restoration, we can compare eligible speed options without tying the outage to an upgrade.",
    ],
    rebuttal: "The safeguard protects both of us and keeps the process in the approved channel.",
    fallback: ["Why cannot I just give you the password?", "Can you reset the service from sales?", "Fine, tell me the approved next step."],
  },
];

export const MARKER_IDS = new Set(QA_MARKERS.map((marker) => marker.id));

export function scenarioById(id: string) {
  return SCENARIOS.find((scenario) => scenario.id === id) ?? SCENARIOS[0];
}

export function markerById(id: string) {
  return QA_MARKERS.find((marker) => marker.id === id);
}

export function detectMarkers(text: string) {
  const value = text.toLowerCase();
  const found = new Set<string>();
  if (/(thank you for calling|good morning|good afternoon|my name is|this is anthony|how can i help)/.test(value)) found.add("greeting");
  if (/(may i|can i ask|is it okay|with your permission|before i recommend)/.test(value)) found.add("permission");
  if (/(how many|what do you|tell me about|which matters|how often|where is|what is most important)/.test(value)) found.add("discovery");
  if (/(i understand|i hear you|that makes sense|you mentioned|it sounds like|you are right)/.test(value)) found.add("listening");
  if (/(based on|because you|since you|matches|fits|your priority)/.test(value)) found.add("value");
  if (/(verify|current offer|approved article|serviceability|eligible|availability|cannot guarantee|do not want to promise)/.test(value)) found.add("accuracy");
  if (/(address|compatib|unlocked|installments|payment history|qualif|account standing|device information)/.test(value)) found.add("qualification");
  if (/(mobile|voice|home phone|other lines|consolidat|another service)/.test(value)) found.add("opportunity");
  if (/(i understand|you are right|that is fair).*(let me|what i can do|next step|we can)/.test(value)) found.add("arm");
  if (/(your choice|with your permission|before you decide|nothing moves forward|you choose|without placing)/.test(value)) found.add("consent");
  if (/(next step|move forward|would you like|shall i|i can check|let us verify|where you need to go)/.test(value)) found.add("close");
  if (/(to recap|quick recap|what we covered|we confirmed|before we end)/.test(value)) found.add("recap");
  return [...found];
}
