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

export const CURRENT_APP_VERSION = "1.1.0-spectrum.4";
export const CURRENT_WEEK_ID = "2026-W28";

export const WEEKLY_UPDATES: WeeklyTrainingUpdate[] = [
  {
    weekId: "2026-W28",
    appVersion: CURRENT_APP_VERSION,
    dateRange: "2026-07-05 through 2026-07-11",
    source: "mixed",
    summary:
      "Direct Outlook and Gmail ingestion were reconciled by canonical KB/article ID instead of duplicating forwarded copies. The active corpus now includes PR223 Mobile, PR131 Internet, HOW7726 Invincible WiFi, GEN7777 BYOD, GEN9023 Phone Balance Buyout, GEN8761 trade-in, HOW7449 Anytime Upgrade references, and GEN9001 RR/RRP details. The app adds deterministic one-word Quick Lookup, corpus-grounded AI lookup mode, and Spectrum Across the Spectrum, a live mock-call simulator with caller personas, start beep, call timer, QA achievement markers, difficulty-based rebuttal support, and wrap-up coaching. Personal PID/work-email data remain isolated from customer product records; credentials, security codes, payroll documents, SSNs, activation PINs, and document images are excluded.",
    recordings: [
      {
        id: "manual-2026-07-11-across-spectrum-simulator",
        title: "Manual feature spec: Spectrum Across the Spectrum live call simulator",
        recordedAt: "2026-07-11T00:00:00-05:00",
        duration: "feature design",
        status: "ingested",
        focus: ["live call simulator", "caller personas", "QA markers", "difficulty coaching", "wrap-up"],
      },
      {
        id: "outlook-direct-2026-07-10-corpus-reconcile",
        title: "Direct Outlook: canonical work-email corpus reconciliation",
        recordedAt: "2026-07-10T09:00:00-05:00",
        duration: "mailbox ingestion",
        status: "ingested",
        focus: ["PR223", "PR131", "HOW7726", "GEN sources", "deduplication", "source discrepancies"],
      },
      {
        id: "gmail-2026-07-09-work-preview-link",
        title: "Gmail: Spectrum Class study buddy preview link",
        recordedAt: "2026-07-09T15:03:12-05:00",
        duration: "email",
        status: "ingested",
        focus: ["Lovable preview", "work email", "study buddy access"],
      },
      {
        id: "github-codex-review-2026-07-09-pii",
        title: "GitHub/Codex review: separate employee identity from product data",
        recordedAt: "2026-07-09T09:42:43-05:00",
        duration: "email",
        status: "ingested",
        focus: ["privacy", "PII", "private profile", "corpus separation", "code review"],
      },
      {
        id: "outlook-gmail-2026-07-09-mobile-device-notes",
        title: "Outlook/Gmail: BYOD, Phone Balance Buyout, trade-ins, RR/RRP overview",
        recordedAt: "2026-07-09T19:07:01-05:00",
        duration: "email lesson",
        status: "ingested",
        focus: ["GEN7777", "GEN9023", "GEN8761", "HOW7449", "GEN9001", "eligibility gates"],
      },
      {
        id: "outlook-gmail-2026-07-08-pr223-mobile",
        title: "Outlook/Gmail: PR223 Spectrum Mobile Service Product Details",
        recordedAt: "2026-07-08T18:38:17-05:00",
        duration: "email",
        status: "ingested",
        focus: ["Mobile", "By the Gig", "MVNO wording", "WiFi backbone", "plan-source discrepancy"],
      },
      {
        id: "outlook-gmail-2026-07-07-pr131-internet",
        title: "Outlook/Gmail: PR131 Spectrum Internet Product Details",
        recordedAt: "2026-07-07T18:36:05-05:00",
        duration: "email",
        status: "ingested",
        focus: ["Advantage", "SIA", "Premier", "Gig", "2 Gig", "7 Gig", "serviceability"],
      },
      {
        id: "outlook-gmail-2026-07-07-how7726",
        title: "Outlook/Gmail: HOW7726 Supporting Invincible WiFi",
        recordedAt: "2026-07-07T18:11:42-05:00",
        duration: "email",
        status: "ingested",
        focus: ["Invincible WiFi", "5G backup", "battery", "WiFi 7 Extender", "order integrity"],
      },
      {
        id: "outlook-gmail-2026-07-07-forward-bundle",
        title: "Outlook/Gmail attachment bundle: product, operations, compliance and private admin sources",
        recordedAt: "2026-07-07T18:09:25-05:00",
        duration: "email bundle",
        status: "ingested",
        focus: ["2 Gig", "Invincible WiFi", "Mobile expectations", "launch updates", "incentives", "privacy filtering"],
      },
    ],
    modulesTouched: ["m4", "m5", "m6", "m7", "m8", "m9", "m10"],
    newTerms: [
      "PR223",
      "PR131",
      "HOW7726",
      "GEN7777",
      "GEN9023",
      "GEN8761",
      "HOW7449",
      "GEN9001",
      "GEN6633",
      "GEN9008",
      "Quick Lookup",
      "Spectrum Across the Spectrum",
      "QA achievement marker",
      "caller persona",
      "wrap-up coaching",
      "source discrepancy",
      "canonical KB deduplication",
      "Repair and Replacement",
      "Repair and Replacement Premium",
      "Internet Advantage 100x20",
      "Internet Assist 50x10",
    ],
    scenarioSeeds: [
      "Agent types 'advantage' and needs speed, eligibility, combination, downgrade, and seasonal-suspension rules immediately.",
      "Customer wants to bring an unlocked phone but compatibility has not been checked.",
      "Customer still owes on multiple devices and asks whether Spectrum will pay the balance.",
      "Two By the Gig lines use a combined amount that crosses into the next whole GB.",
      "Customer asks directly whose residential Mobile network Spectrum uses.",
      "Customer asks for 7 Gig at an address outside the listed FTTP market.",
      "Customer wants to use Invincible WiFi away from the primary service location.",
      "Agent removes Invincible WiFi equipment before the disconnect work order completes.",
      "A live public plan page and current internal article use different threshold wording.",
      "Live simulator caller compares Spectrum against fiber and expects a real comparison.",
      "Live simulator caller needs a spouse decision path without a placeholder order.",
      "Live simulator caller wants lower cost but resists anything that sounds like an upsell.",
    ],
    actionItems: [
      "Use Quick Lookup for one-word plan/spec retrieval before opening a longer Coach conversation.",
      "Use Across the Spectrum to practice caller personalities, QA marker completion, and wrap-up coaching before live reps.",
      "Use the isolated private profile for PID/work email; never mix personal admin records into product search results.",
      "Keep SSNs, passwords, authenticator codes, activation PINs, account-access secrets, payroll documents, and document images out of app source/data.",
      "Use current official PR, HOW, GEN, biller, Agent OS, approved SOP, and live offer content for customer actions.",
      "When public and internal sources differ, preserve both source/timestamp records and verify the operational source instead of flattening the conflict.",
      "Check serviceability before positioning Advantage, SIA, 2 Gig, 7 Gig, or Invincible WiFi pricing/eligibility.",
      "Run lint and build validation before deployment.",
    ],
    unresolvedQuestions: [
      "Exact live customer-facing Unlimited and Unlimited Plus thresholds when the public page and internal PR223 wording differ.",
      "Exact current PBB caps, eligible line-count range, submission and exclusion rules from the complete GEN9023 article.",
      "Whether the Multiple Internet Instances launch has moved beyond the July 6 delayed status.",
      "Whether Lovable project write scope can be granted so the private editor preview can be overwritten directly from ChatGPT.",
      "Whether the simulator should later connect to a voice/LLM runtime for spoken live caller turns instead of the current deterministic local practice engine.",
    ],
  },
  {
    weekId: "2026-W27",
    appVersion: "1.0.0-spectrum.0",
    dateRange: "2026-06-27 through 2026-07-04",
    source: "otter",
    summary:
      "Initial conversion from Tish-Sticks phlebotomy study app into CallFlow Lab, a weekly-updated Spectrum inbound sales study system. This batch converts July 1 through July 3 classroom recordings into modules, flashcards, scenario seeds, and unresolved follow-up items.",
    recordings: [
      { id: "1jaYdigiIkoS9OgdZl-WjGTBisE", title: "Policy, SOP, call flow, zero-tolerance, benefits overview", recordedAt: "2026-07-01T10:42:45", duration: "1h 4m", status: "ingested", focus: ["escalation", "SOP", "integrity", "authentication", "employee benefits"] },
      { id: "zS3QHLvtKI4gaH4ItmENf-1xFms", title: "Spectrum.com navigation and onboarding documentation", recordedAt: "2026-07-01T13:34:25", duration: "26m 50s", status: "ingested", focus: ["Spectrum.com", "product navigation", "ID documentation", "employee services"] },
      { id: "dTGsD_ZbFIDoeIpriwjmpyOAQdE", title: "Copilot, Webex, Spark, incentives, classroom tools", recordedAt: "2026-07-01T15:07:13", duration: "53m 30s", status: "ingested", focus: ["Copilot", "Webex", "Spark", "incentives", "recognition"] },
      { id: "cW5-dr7jMuPE1Z1EehvLZWSMueI", title: "Panorama, Connectivity Services, benefits enrollment", recordedAt: "2026-07-01T16:26:49", duration: "32m 28s", status: "ingested", focus: ["Panorama", "Connectivity Services", "address updates", "Benefit Connect"] },
      { id: "3xZydAdBv7Q485ZVUqZVyi1L8MU", title: "Sales strategy and top-performer discussion", recordedAt: "2026-07-02T10:50:51", duration: "43m 36s", status: "ingested", focus: ["offer positioning", "mobile", "confidence", "commission", "burnout"] },
      { id: "-xGVzRhvmJac5Nbq-X4pEjDSa7s", title: "Sales Skills Workshop", recordedAt: "2026-07-02T11:41:24", duration: "25m 33s", status: "ingested", focus: ["empathy", "coachability", "active listening", "tone", "teamwork"] },
      { id: "tP5ndPiy6Be9bItLBfNIdlS8S28", title: "A-R-M objection handling and positive framing", recordedAt: "2026-07-03T13:06:26", duration: "44m 38s", status: "ingested", focus: ["A-R-M", "new customer pricing", "prepay", "serviceability", "positive framing"] },
      { id: "udWUoqBHj9MzUfjlGRdVq77FXsE", title: "Note fragment", recordedAt: "2026-07-02T09:00:12", duration: "1s", status: "fragment", focus: [] },
      { id: "xW3jx0zG3Nb2Ix6Sh9mrq1e5TTc", title: "Note fragment", recordedAt: "2026-07-02T08:59:45", duration: "1s", status: "fragment", focus: [] },
      { id: "L3VBvYz5VCapRSHH0kmEvI", title: "Note fragment", recordedAt: "2026-07-03T04:58:14", duration: "2s", status: "fragment", focus: [] },
      { id: "1ITysoCXp7l0uiCd4nr1KbRALk4", title: "Note fragment", recordedAt: "2026-07-02T10:45:17", duration: "14s", status: "fragment", focus: [] },
    ],
    modulesTouched: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10"],
    newTerms: ["A-R-M", "scope of support", "universal audit", "Copilot Residential", "Panorama", "Connectivity Services", "Benefit Connect", "Spark", "Sparks", "power hour", "serviceability", "account takeover", "room account", "positive framing"],
    scenarioSeeds: [
      "Customer asks for a supervisor at the start of the call.",
      "Customer wants to lower the bill but may save more through mobile consolidation.",
      "Customer saw new-customer pricing and wants the same rate.",
      "Customer asks why payment is required before service starts.",
      "Customer says service is unavailable at their address.",
      "Customer says they need to talk to a spouse before agreeing.",
      "Customer has service under another person's name at the address.",
      "Customer has old equipment and resists changing to a newer TV experience.",
    ],
    actionItems: [
      "Confirm any SOP changes after the merger timeline is officially communicated.",
      "Confirm payroll or tax-withholding questions with HR/payroll rather than training memory.",
      "Track benefits enrollment deadline inside Benefit Connect.",
      "Resolve any employee-services address mismatch before attempting service setup.",
      "Add each future week as a new WeeklyTrainingUpdate object before changing curriculum content.",
    ],
    unresolvedQuestions: [
      "Exact SOP changes, if any, after merger completion.",
      "Exact benefits coverage details for enhanced dental, orthodontia, bridges, and implants.",
      "Exact payroll/tax handling for high monthly commission checks.",
      "Exact current wording for mobile network positioning and partner-network disclosures.",
      "Exact process for payment-required versus payment-optional language in every scenario.",
    ],
  },
];

export function getCurrentWeek() {
  return WEEKLY_UPDATES.find((week) => week.weekId === CURRENT_WEEK_ID) ?? WEEKLY_UPDATES[0];
}
