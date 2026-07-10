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

export const CURRENT_APP_VERSION = "1.0.0-spectrum.2";
export const CURRENT_WEEK_ID = "2026-W28";

export const WEEKLY_UPDATES: WeeklyTrainingUpdate[] = [
  {
    weekId: "2026-W28",
    appVersion: CURRENT_APP_VERSION,
    dateRange: "2026-07-05 through 2026-07-11",
    source: "mixed",
    summary:
      "Gmail and GitHub ingestion expanded from privacy/setup review into current Spectrum product training. The active deck now includes verified July material from PR223 Mobile, PR131 Internet, HOW7726 Invincible WiFi, BYOD, Phone Balance Buyout, trade-ins, and device-protection overview. Outlook-originated product messages that were forwarded into Gmail were included as provenance, while credentials, security codes, personal documents, and account-access material were deliberately excluded.",
    recordings: [
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
        title: "GitHub/Codex review: remove hard-coded employee identity from setup data",
        recordedAt: "2026-07-09T09:42:43-05:00",
        duration: "email",
        status: "ingested",
        focus: ["privacy", "PII", "setup page", "local profile", "code review"],
      },
      {
        id: "gmail-2026-07-09-mobile-device-notes",
        title: "Gmail: BYOD, Phone Balance Buyout, trade-ins, RR/RRP overview",
        recordedAt: "2026-07-09T19:07:01-05:00",
        duration: "email",
        status: "ingested",
        focus: ["BYOD", "PBB", "trade-in", "device protection", "eligibility gates"],
      },
      {
        id: "gmail-2026-07-08-pr223-mobile",
        title: "Gmail: PR223 Spectrum Mobile Service Product Details",
        recordedAt: "2026-07-08T18:38:17-05:00",
        duration: "email",
        status: "ingested",
        focus: ["Mobile", "By the Gig", "roaming", "network wording", "plan verification"],
      },
      {
        id: "gmail-2026-07-07-pr131-internet",
        title: "Gmail: PR131 Spectrum Internet Product Details",
        recordedAt: "2026-07-07T18:36:05-05:00",
        duration: "email",
        status: "ingested",
        focus: ["Premier", "2 Gig", "7 Gig", "SPP4", "WiFi 7", "serviceability"],
      },
      {
        id: "gmail-2026-07-07-how7726",
        title: "Gmail: HOW7726 Supporting Invincible WiFi",
        recordedAt: "2026-07-07T18:11:42-05:00",
        duration: "email",
        status: "ingested",
        focus: ["Invincible WiFi", "5G backup", "battery", "WiFi 7 Extender", "order integrity"],
      },
      {
        id: "gmail-2026-07-07-outlook-forward-bundle",
        title: "Gmail attachment bundle: Outlook-originated product and operations messages",
        recordedAt: "2026-07-07T18:09:25-05:00",
        duration: "email bundle",
        status: "ingested",
        focus: ["2 Gig", "Invincible WiFi", "Mobile expectations", "launch updates", "incentives"],
      },
    ],
    modulesTouched: ["m4", "m5", "m6", "m9", "m10"],
    newTerms: [
      "PR223",
      "PR131",
      "HOW7726",
      "BYOD",
      "Phone Balance Buyout",
      "By the Gig shared data",
      "RR",
      "RRP",
      "Invincible WiFi",
      "WiFi 7 Extender",
      "SPP4 2 Gig",
      "SPP4 7 Gig",
      "licensed MVNO",
      "source-priority rule",
    ],
    scenarioSeeds: [
      "Customer wants to bring an unlocked phone but compatibility has not been checked.",
      "Customer still owes on multiple devices and asks whether Spectrum will pay the balance.",
      "Two By the Gig lines use a combined amount that crosses into the next whole GB.",
      "Customer asks directly whose mobile network Spectrum uses.",
      "Customer asks for 7 Gig at an address outside the listed FTTP market.",
      "Customer wants to use Invincible WiFi away from the primary service location.",
      "Agent removes Invincible WiFi equipment before the disconnect work order completes.",
      "An older flashcard conflicts with a newly published internal article.",
    ],
    actionItems: [
      "Use the My Setup private profile field for the work email on the user's own device.",
      "Keep SSNs, passwords, authenticator codes, account-access instructions, and document images out of app source and app data.",
      "Use current official PR, HOW, GEN, biller, Agent OS, and SOP content for live customer work.",
      "Do not repeat superseded Mobile throttling language; verify the current PR223 plan terms.",
      "Check serviceability before positioning 2 Gig, 7 Gig, or Invincible WiFi pricing.",
      "Run local lint and build validation before deployment.",
    ],
    unresolvedQuestions: [
      "Direct Outlook mailbox access is not connected; only Outlook-originated messages forwarded into Gmail were available for this ingestion.",
      "Whether Lovable project write scope can be granted so the private editor preview can be overwritten directly from ChatGPT.",
      "Whether the private Lovable preview URL should be replaced after the product-ingestion branch is merged.",
      "Exact current Unlimited and Unlimited Plus customer-facing feature table after the June 30 PR223 article revision.",
      "Exact current RR and RRP coverage and deductible tiers from GEN9001.",
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
      {
        id: "1jaYdigiIkoS9OgdZl-WjGTBisE",
        title: "Policy, SOP, call flow, zero-tolerance, benefits overview",
        recordedAt: "2026-07-01T10:42:45",
        duration: "1h 4m",
        status: "ingested",
        focus: ["escalation", "SOP", "integrity", "authentication", "employee benefits"],
      },
      {
        id: "zS3QHLvtKI4gaH4ItmENf-1xFms",
        title: "Spectrum.com navigation and onboarding documentation",
        recordedAt: "2026-07-01T13:34:25",
        duration: "26m 50s",
        status: "ingested",
        focus: ["Spectrum.com", "product navigation", "ID documentation", "employee services"],
      },
      {
        id: "dTGsD_ZbFIDoeIpriwjmpyOAQdE",
        title: "Copilot, Webex, Spark, incentives, classroom tools",
        recordedAt: "2026-07-01T15:07:13",
        duration: "53m 30s",
        status: "ingested",
        focus: ["Copilot", "Webex", "Spark", "incentives", "recognition"],
      },
      {
        id: "cW5-dr7jMuPE1Z1EehvLZWSMueI",
        title: "Panorama, Connectivity Services, benefits enrollment",
        recordedAt: "2026-07-01T16:26:49",
        duration: "32m 28s",
        status: "ingested",
        focus: ["Panorama", "Connectivity Services", "address updates", "Benefit Connect"],
      },
      {
        id: "3xZydAdBv7Q485ZVUqZVyi1L8MU",
        title: "Sales strategy and top-performer discussion",
        recordedAt: "2026-07-02T10:50:51",
        duration: "43m 36s",
        status: "ingested",
        focus: ["offer positioning", "mobile", "confidence", "commission", "burnout"],
      },
      {
        id: "-xGVzRhvmJac5Nbq-X4pEjDSa7s",
        title: "Sales Skills Workshop",
        recordedAt: "2026-07-02T11:41:24",
        duration: "25m 33s",
        status: "ingested",
        focus: ["empathy", "coachability", "active listening", "tone", "teamwork"],
      },
      {
        id: "tP5ndPiy6Be9bItLBfNIdlS8S28",
        title: "A-R-M objection handling and positive framing",
        recordedAt: "2026-07-03T13:06:26",
        duration: "44m 38s",
        status: "ingested",
        focus: ["A-R-M", "new customer pricing", "prepay", "serviceability", "positive framing"],
      },
      {
        id: "udWUoqBHj9MzUfjlGRdVq77FXsE",
        title: "Note fragment",
        recordedAt: "2026-07-02T09:00:12",
        duration: "1s",
        status: "fragment",
        focus: [],
      },
      {
        id: "xW3jx0zG3Nb2Ix6Sh9mrq1e5TTc",
        title: "Note fragment",
        recordedAt: "2026-07-02T08:59:45",
        duration: "1s",
        status: "fragment",
        focus: [],
      },
      {
        id: "L3VBvYz5VCapRSHH0kmEvI",
        title: "Note fragment",
        recordedAt: "2026-07-03T04:58:14",
        duration: "2s",
        status: "fragment",
        focus: [],
      },
      {
        id: "1ITysoCXp7l0uiCd4nr1KbRALk4",
        title: "Note fragment",
        recordedAt: "2026-07-02T10:45:17",
        duration: "14s",
        status: "fragment",
        focus: [],
      },
    ],
    modulesTouched: ["m1", "m2", "m3", "m4", "m5", "m6", "m7", "m8", "m9", "m10"],
    newTerms: [
      "A-R-M",
      "scope of support",
      "universal audit",
      "Copilot Residential",
      "Panorama",
      "Connectivity Services",
      "Benefit Connect",
      "Spark",
      "Sparks",
      "power hour",
      "serviceability",
      "account takeover",
      "room account",
      "positive framing",
    ],
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
