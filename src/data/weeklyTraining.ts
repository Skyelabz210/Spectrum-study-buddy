export type TrainingRecording = {
  id: string;
  title: string;
  recordedAt: string;
  duration: string;
  status: "ingested" | "fragment" | "pending";
  focus: string[];
};

export type WeeklyTrainingUpdate = {
  weekId: string;
  appVersion: string;
  dateRange: string;
  source: "otter" | "manual" | "mixed";
  summary: string;
  recordings: TrainingRecording[];
  modulesTouched: string[];
  newTerms: string[];
  scenarioSeeds: string[];
  actionItems: string[];
  unresolvedQuestions: string[];
};

export const CURRENT_APP_VERSION = "1.2.0-spectrum.0";
export const CURRENT_WEEK_ID = "2026-W28";

export const WEEKLY_UPDATES: WeeklyTrainingUpdate[] = [
  {
    weekId: "2026-W28",
    appVersion: CURRENT_APP_VERSION,
    dateRange: "2026-07-05 through 2026-07-12",
    source: "mixed",
    summary:
      "Comprehensive system audit and full July Otter corpus reconciliation. The app now adds four curriculum modules for technical product fluency, Agent OS AI/prompt engineering, QA/metrics/floor readiness, and benefits/support; 100 new source-cautious flashcards; a full subsystem audit; and automated audit/typecheck/build release tooling. Existing Quick Lookup, Prompt Engineer, Across the Spectrum, scenarios, coach, setup, plans, tips and weekly history remain additive and intact.",
    recordings: [
      { id: "manual-2026-07-12-full-system-audit", title: "Manual: CallFlow Lab full system and subsystem audit", recordedAt: "2026-07-12T12:00:00-05:00", duration: "system audit", status: "ingested", focus: ["architecture", "wiring", "privacy", "accessibility", "testing", "release gates"] },
      { id: "XLiNBWFE89MY6LqZzMSAYpP2gjs", title: "Agent OS AI and prompt engineering", recordedAt: "2026-07-11T10:36:00-05:00", duration: "2h 2m", status: "ingested", focus: ["Agent OS AI", "prompt structure", "privacy", "Copilot verification", "hallucination"] },
      { id: "gXrvWYNGrCI8V4tU4dSpUAmMRLw", title: "Agent OS AI-assisted sales pitches", recordedAt: "2026-07-11T13:41:00-05:00", duration: "26m", status: "ingested", focus: ["sales prompts", "pitch length", "customer-centered language", "verification"] },
      { id: "YM2VW-EKU_wkFYS_pe4FWwWrpbY", title: "Pitch review and technical explanation practice", recordedAt: "2026-07-11T14:10:00-05:00", duration: "1h 7m", status: "ingested", focus: ["LTE", "5G", "modem", "router", "simplification", "pitch review"] },
      { id: "ji8g731_S4evJ6VSmCkSk24kK9g", title: "Mobile practical, order confirmation and performance metrics", recordedAt: "2026-07-11T15:38:00-05:00", duration: "2h 14m", status: "ingested", focus: ["Mobile pitch", "device financing", "order confirmation", "AHT", "conversion", "yield", "product mix"] },
      { id: "fSG8doS5LFTnlPrnQ2KC8n4mlD4", title: "Internet, TV, Mobile, Voice and product vocabulary", recordedAt: "2026-07-07T13:45:00-05:00", duration: "1h 51m", status: "ingested", focus: ["Internet tiers", "TV", "Xumo", "Mobile", "Voice", "technical vocabulary", "complimentary wording"] },
      { id: "bpDk0AWumETBC0USnmkgW_VTjgE", title: "Advanced WiFi versus Invincible WiFi", recordedAt: "2026-07-07T16:42:00-05:00", duration: "38m", status: "ingested", focus: ["Advanced WiFi", "Invincible WiFi", "router controls", "backup mode", "battery", "extenders"] },
      { id: "FiSlRobPwbs4Gw_HEPXBIgmLEDc", title: "Employee services, benefits, pay and schedules", recordedAt: "2026-07-08T09:38:00-05:00", duration: "1h 59m", status: "ingested", focus: ["employee services", "Benefit Connect", "pay", "schedule", "shift bids", "HR verification"] },
      { id: "vVGfW3-iX2oIexYwdMgPXUurwMc", title: "Dental, vision, medical comparison and IGS/EAP", recordedAt: "2026-07-08T12:29:00-05:00", duration: "45m", status: "ingested", focus: ["dental", "orthodontia", "vision", "medical plans", "life insurance", "IGS", "EAP"] },
      { id: "CuSNAbcEs3RlZNKmvjxUnIFi_iw", title: "Mobile plans, devices and assets", recordedAt: "2026-07-08T13:28:00-05:00", duration: "1h 13m", status: "pending", focus: ["Mobile plans", "devices", "assets", "Otter fetch parsing failure"] },
      { id: "manual-2026-07-11-across-spectrum-simulator", title: "Manual feature spec: Spectrum Across the Spectrum live call simulator", recordedAt: "2026-07-11T00:00:00-05:00", duration: "feature design", status: "ingested", focus: ["live call simulator", "caller personas", "QA markers", "difficulty coaching", "wrap-up"] },
      { id: "outlook-direct-2026-07-10-corpus-reconcile", title: "Direct Outlook: canonical work-email corpus reconciliation", recordedAt: "2026-07-10T09:00:00-05:00", duration: "mailbox ingestion", status: "ingested", focus: ["PR223", "PR131", "HOW7726", "GEN sources", "deduplication", "source discrepancies"] },
      { id: "gmail-2026-07-09-work-preview-link", title: "Gmail: Spectrum Class study buddy preview link", recordedAt: "2026-07-09T15:03:12-05:00", duration: "email", status: "ingested", focus: ["Lovable preview", "work email", "study buddy access"] },
      { id: "github-codex-review-2026-07-09-pii", title: "GitHub/Codex review: separate employee identity from product data", recordedAt: "2026-07-09T09:42:43-05:00", duration: "email", status: "ingested", focus: ["privacy", "PII", "private profile", "corpus separation", "code review"] },
      { id: "outlook-gmail-2026-07-09-mobile-device-notes", title: "Outlook/Gmail: BYOD, Phone Balance Buyout, trade-ins, RR/RRP overview", recordedAt: "2026-07-09T19:07:01-05:00", duration: "email lesson", status: "ingested", focus: ["GEN7777", "GEN9023", "GEN8761", "HOW7449", "GEN9001", "eligibility gates"] },
      { id: "outlook-gmail-2026-07-08-pr223-mobile", title: "Outlook/Gmail: PR223 Spectrum Mobile Service Product Details", recordedAt: "2026-07-08T18:38:17-05:00", duration: "email", status: "ingested", focus: ["Mobile", "By the Gig", "MVNO wording", "WiFi backbone", "plan-source discrepancy"] },
      { id: "outlook-gmail-2026-07-07-pr131-internet", title: "Outlook/Gmail: PR131 Spectrum Internet Product Details", recordedAt: "2026-07-07T18:36:05-05:00", duration: "email", status: "ingested", focus: ["Advantage", "SIA", "Premier", "Gig", "2 Gig", "7 Gig", "serviceability"] },
      { id: "outlook-gmail-2026-07-07-how7726", title: "Outlook/Gmail: HOW7726 Supporting Invincible WiFi", recordedAt: "2026-07-07T18:11:42-05:00", duration: "email", status: "ingested", focus: ["Invincible WiFi", "5G backup", "battery", "WiFi 7 Extender", "order integrity"] },
    ],
    modulesTouched: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10", "m11", "m12", "m13", "m14"],
    newTerms: [
      "Advanced WiFi", "Invincible WiFi", "DOCSIS", "FTTH", "ONT", "WiFi 7", "MVNO", "SIM", "eSIM", "IMEI", "eMTA", "PBX", "Cloud DVR", "Agent OS AI", "prompt injection", "OARS", "need-proof-benefit", "AHT", "ACW", "conversion", "yield", "APC", "product mix", "adherence", "occupancy", "semantic QA", "IGS", "EAP", "source supersession", "release gate"
    ],
    scenarioSeeds: [
      "Customer calls a router a modem and needs a respectful technical correction.",
      "Customer expects full plan speed on an older WiFi device.",
      "Customer interprets Invincible WiFi as unlimited portable cellular service.",
      "Customer challenges a broad 'free' claim and asks for every condition.",
      "Agent OS AI provides a confident price not present in the controlling source.",
      "Customer text attempts to instruct the AI to ignore pricing and disclosure rules.",
      "Agent mentions Mobile without connecting it to a discovered need.",
      "Agent rushes the order confirmation to lower AHT.",
      "Simulator awards a keyword although the sentence is not empathetic.",
      "Employee chooses a benefit using a dated classroom premium rather than Benefit Connect."
    ],
    actionItems: [
      "Use the four new curriculum modules and Otter flashcard pack for structured review.",
      "Run npm run audit, npm run typecheck and npm run build before release.",
      "Regenerate the TanStack route tree through the configured plugin and remove manual @ts-nocheck ownership.",
      "Add semantic QA evidence spans before treating simulator scores as reliable.",
      "Add visible source dates, stale status and supersession to corpus records/cards.",
      "Keep customer and employee secrets out of AI, prompts, simulator and repository.",
      "Verify benefits, metric formulas, pricing and operational rules in their current controlling systems."
    ],
    unresolvedQuestions: [
      "Exact current Mobile threshold wording across public and PR223/live offer sources.",
      "Exact current PBB caps, line requirements, submission steps and exclusions.",
      "Current Advanced and Invincible WiFi prices, equipment quantities, fallback speed and battery duration.",
      "Official formulas and targets for yield, APC, adherence, occupancy and any site-specific AFH metric.",
      "Current dental/vision/life/medical premiums and limits for this plan year.",
      "Whether the pending July 8 Mobile-device transcript can be fetched without Otter parse failure.",
      "Whether Lovable projects:write access can be granted for private-preview deployment."
    ],
  },
  {
    weekId: "2026-W27",
    appVersion: "1.0.0-spectrum.0",
    dateRange: "2026-06-27 through 2026-07-04",
    source: "otter",
    summary: "Initial conversion from the former study shell into CallFlow Lab. July 1–3 classroom recordings became the first call-flow, SOP, systems, benefits, sales-skill and A-R-M curriculum.",
    recordings: [
      { id: "1jaYdigiIkoS9OgdZl-WjGTBisE", title: "Policy, SOP, call flow, zero-tolerance, benefits overview", recordedAt: "2026-07-01T10:42:45", duration: "1h 4m", status: "ingested", focus: ["escalation", "SOP", "integrity", "authentication", "employee benefits"] },
      { id: "zS3QHLvtKI4gaH4ItmENf-1xFms", title: "Spectrum.com navigation and onboarding documentation", recordedAt: "2026-07-01T13:34:25", duration: "26m 50s", status: "ingested", focus: ["Spectrum.com", "product navigation", "ID documentation", "employee services"] },
      { id: "dTGsD_ZbFIDoeIpriwjmpyOAQdE", title: "Copilot, Webex, Spark, incentives, classroom tools", recordedAt: "2026-07-01T15:07:13", duration: "53m 30s", status: "ingested", focus: ["Copilot", "Webex", "Spark", "incentives", "recognition"] },
      { id: "cW5-dr7jMuPE1Z1EehvLZWSMueI", title: "Panorama, Connectivity Services, benefits enrollment", recordedAt: "2026-07-01T16:26:49", duration: "32m 28s", status: "ingested", focus: ["Panorama", "Connectivity Services", "address updates", "Benefit Connect"] },
      { id: "3xZydAdBv7Q485ZVUqZVyi1L8MU", title: "Sales strategy and top-performer discussion", recordedAt: "2026-07-02T10:50:51", duration: "43m 36s", status: "ingested", focus: ["offer positioning", "mobile", "confidence", "commission", "burnout"] },
      { id: "-xGVzRhvmJac5Nbq-X4pEjDSa7s", title: "Sales Skills Workshop", recordedAt: "2026-07-02T11:41:24", duration: "25m 33s", status: "ingested", focus: ["empathy", "coachability", "active listening", "tone", "teamwork"] },
      { id: "tP5ndPiy6Be9bItLBfNIdlS8S28", title: "A-R-M objection handling and positive framing", recordedAt: "2026-07-03T13:06:26", duration: "44m 38s", status: "ingested", focus: ["A-R-M", "new customer pricing", "prepay", "serviceability", "positive framing"] },
    ],
    modulesTouched: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10"],
    newTerms: ["A-R-M", "scope of support", "universal audit", "Copilot Residential", "Panorama", "Connectivity Services", "Benefit Connect", "Spark", "power hour", "serviceability", "account takeover", "room account", "positive framing"],
    scenarioSeeds: ["Supervisor request at opening", "Lower-my-bill discovery", "New-customer pricing objection", "Payment before service", "Serviceability mismatch", "Spouse decision", "Service under another name", "Old equipment resistance"],
    actionItems: ["Track benefits enrollment deadline", "Resolve employee-service address mismatch", "Use official SOP for conflicts", "Add each future source batch through the weekly ledger"],
    unresolvedQuestions: ["Exact post-merger SOP changes", "Exact benefits details", "Exact commission/payroll treatment", "Current Mobile network wording", "Required versus optional payment language"],
  },
];

export function getCurrentWeek() {
  return WEEKLY_UPDATES.find((week) => week.weekId === CURRENT_WEEK_ID) ?? WEEKLY_UPDATES[0];
}
