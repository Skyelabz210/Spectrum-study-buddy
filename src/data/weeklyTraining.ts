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

export const CURRENT_APP_VERSION = "1.0.0-spectrum.1";
export const CURRENT_WEEK_ID = "2026-W28";

export const WEEKLY_UPDATES: WeeklyTrainingUpdate[] = [
  {
    weekId: "2026-W28",
    appVersion: CURRENT_APP_VERSION,
    dateRange: "2026-07-05 through 2026-07-11",
    source: "mixed",
    summary:
      "Daily Gmail/GitHub ingestion started. The first ingestion found a private Lovable preview link sent to the work address and a Codex PR review warning that a real employee identity was hard-coded into setup data. The app now keeps the work email in a local browser profile field instead of committed source data.",
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
    ],
    modulesTouched: ["m5", "m6", "m10"],
    newTerms: ["private local profile", "employee PII", "daily ingestion", "Codex review", "private preview"],
    scenarioSeeds: [
      "App review flags hard-coded employee identity before deployment.",
      "User needs a personal sign-in checklist without exposing credentials or employee PII in shared source.",
    ],
    actionItems: [
      "Use the My Setup private profile field for the work email on the user's own device.",
      "Keep SSNs, passwords, authenticator codes, and document images out of app source and app data.",
      "Continue daily Gmail ingestion for work-email, GitHub/Codex, Lovable, benefits, training, and product-update material.",
      "Run local build/lint after route tree regeneration before production deployment.",
    ],
    unresolvedQuestions: [
      "Whether Lovable project write scope can be granted so the private editor preview can be overwritten directly from ChatGPT.",
      "Whether the private Lovable preview URL should be replaced with a new private preview after the latest main-branch privacy patch.",
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
