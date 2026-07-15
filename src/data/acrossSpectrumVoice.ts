export type CallerVoiceProfile = {
  label: string;
  ratePercent: number;
  pitchPercent: number;
  preferredVoiceTokens: string[];
  fallbackVoiceIndex: number;
};

export type CallerResponseRule = {
  id: string;
  patterns: string[];
  response: string;
};

export const CALLER_VOICE_PROFILES: Record<string, CallerVoiceProfile> = {
  "budget-defender": {
    label: "Grounded · direct",
    ratePercent: 96,
    pitchPercent: 92,
    preferredVoiceTokens: ["guy", "davis", "daniel", "david", "mark"],
    fallbackVoiceIndex: 0,
  },
  "fiber-loyalist": {
    label: "Measured · analytical",
    ratePercent: 108,
    pitchPercent: 98,
    preferredVoiceTokens: ["jenny", "aria", "samantha", "ava"],
    fallbackVoiceIndex: 1,
  },
  "mobile-skeptic": {
    label: "Cautious · detail-focused",
    ratePercent: 93,
    pitchPercent: 105,
    preferredVoiceTokens: ["zira", "susan", "karen", "victoria"],
    fallbackVoiceIndex: 2,
  },
  "old-box-loyalist": {
    label: "Familiar · change-resistant",
    ratePercent: 88,
    pitchPercent: 90,
    preferredVoiceTokens: ["fred", "ralph", "george", "alex"],
    fallbackVoiceIndex: 3,
  },
  "spouse-gate": {
    label: "Warm · hesitant",
    ratePercent: 101,
    pitchPercent: 108,
    preferredVoiceTokens: ["samantha", "ava", "allison", "jenny"],
    fallbackVoiceIndex: 4,
  },
  "availability-frustrated": {
    label: "Fast · frustrated",
    ratePercent: 112,
    pitchPercent: 96,
    preferredVoiceTokens: ["guy", "tony", "aaron", "daniel"],
    fallbackVoiceIndex: 5,
  },
};

export const CALLER_RESPONSE_RULES: Record<string, CallerResponseRule[]> = {
  "budget-defender": [
    { id: "household", patterns: ["how many", "devices", "household", "stream", "gaming"], response: "There are four of us, two TVs, a game console, and everybody is on WiFi at night." },
    { id: "bill", patterns: ["bill", "paying", "cost", "provider"], response: "Internet is around ninety dollars, and two phone lines are another hundred and twenty. That is why I called." },
    { id: "mobile", patterns: ["mobile", "phone", "lines", "carrier"], response: "I have two lines and both phones are paid off, but I do not want another promo that jumps later." },
    { id: "priority", patterns: ["priority", "matters", "most important"], response: "The bill has to come down, but I cannot have the kids complaining that everything buffers." },
  ],
  "fiber-loyalist": [
    { id: "work", patterns: ["work from home", "upload", "meetings", "job"], response: "I upload large design files and spend most of the day on video meetings, so upload performance is not theoretical for me." },
    { id: "address", patterns: ["address", "availability", "serviceability"], response: "Their website says fiber is available at my exact address, but I have not scheduled installation yet." },
    { id: "total", patterns: ["mobile", "total cost", "household", "bundle"], response: "I have three mobile lines and no traditional TV. I would compare the total if the math is actually clear." },
    { id: "priority", patterns: ["priority", "matters", "need"], response: "Reliable uploads first, then price. I do not want to trade performance for a bundle I will not use." },
  ],
  "mobile-skeptic": [
    { id: "lines", patterns: ["how many", "lines", "phones"], response: "Three lines. Two phones still have balances and one is already paid off." },
    { id: "usage", patterns: ["data", "hotspot", "travel", "usage"], response: "We use a lot of data, one line uses hotspot for work, and we travel to Mexico a few times a year." },
    { id: "carrier", patterns: ["carrier", "current provider", "bill"], response: "We are with a national carrier and the bill is about two hundred and ten dollars before device payments." },
    { id: "devices", patterns: ["unlock", "compatible", "device"], response: "I do not know if the phones are unlocked. I would need you to tell me exactly what has to be checked." },
  ],
  "old-box-loyalist": [
    { id: "viewing", patterns: ["watch", "channels", "content", "tv"], response: "Mostly news, sports, and a few local channels. My spouse records a lot of shows." },
    { id: "controls", patterns: ["remote", "familiar", "use it", "navigation"], response: "The remote and channel guide are the issue. We do not want to hunt through apps every night." },
    { id: "internet", patterns: ["internet", "wifi", "stream"], response: "We have internet, but the TV experience is what I am worried about changing." },
    { id: "price", patterns: ["cost", "equipment", "price"], response: "I need to know what the equipment costs and whether I lose anything we already watch." },
  ],
  "spouse-gate": [
    { id: "blocker", patterns: ["what concerns", "blocker", "permission", "information"], response: "It is mostly the monthly amount. My spouse handles the budget and will want the exact recurring total." },
    { id: "join", patterns: ["bring them", "join", "call them", "together"], response: "They are available in about twenty minutes. A three-way call would probably be easiest." },
    { id: "summary", patterns: ["summarize", "tell them", "numbers"], response: "Give me the plan, recurring price, equipment, and what changes after any promotion. That is what they will ask." },
    { id: "consent", patterns: ["approval", "order", "place"], response: "Good. I do not want anything submitted until both of us agree." },
  ],
  "availability-frustrated": [
    { id: "address", patterns: ["address", "unit", "zip"], response: "It is a new unit number in a recently renovated building. The street address is correct, but the unit may be new in the system." },
    { id: "neighbor", patterns: ["neighbor", "nearby", "same building"], response: "The unit across the hall has Spectrum, which is why the website result is so frustrating." },
    { id: "timeline", patterns: ["when", "timeline", "this week", "need it"], response: "I start a remote job next Monday, so I need a real answer quickly even if installation cannot happen immediately." },
    { id: "verify", patterns: ["check", "verify", "serviceability", "escalation"], response: "Okay, tell me exactly what you are checking and what happens if the address database is wrong." },
  ],
};

export function getCallerVoiceProfile(personaId: string) {
  return CALLER_VOICE_PROFILES[personaId] ?? CALLER_VOICE_PROFILES["budget-defender"];
}

export function getTargetedCallerResponse(personaId: string, agentText: string, usedRuleIds: string[]) {
  const lower = agentText.toLowerCase();
  const rule = (CALLER_RESPONSE_RULES[personaId] ?? []).find(
    (candidate) => !usedRuleIds.includes(candidate.id) && candidate.patterns.some((pattern) => lower.includes(pattern)),
  );
  return rule ? { ruleId: rule.id, response: rule.response } : null;
}

