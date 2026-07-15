export type BulletinBucket = "priority" | "direct" | "general";

export type BulletinItem = {
  id: string;
  bucket: BulletinBucket;
  title: string;
  summary: string;
  action?: string;
  receivedOn: string;
  dueOn?: string;
  sourceLabel: string;
  senderLabel: string;
  resource?: string;
};

export const WORK_SCHEDULE = {
  label: "Tuesday–Saturday · 10 AM–7 PM",
  timeZone: "America/Chicago",
  workingWeekdays: [2, 3, 4, 5, 6],
} as const;

export const COMPANY_BULLETIN: BulletinItem[] = [
  {
    id: "everify-further-action-2026",
    bucket: "priority",
    title: "Resolve E-Verify mismatch / Further Action Notice",
    summary:
      "An official E-Verify notice requires a decision about whether to take action on the mismatch within 10 federal working days.",
    action:
      "Contact the employer, obtain and review the Further Action Notice, and communicate the decision through the official process by July 24.",
    receivedOn: "2026-07-14",
    dueOn: "2026-07-24",
    sourceLabel: "Official E-Verify and HireRight notices",
    senderLabel: "U.S. E-Verify / HireRight notification",
    resource:
      "Employer-provided Further Action Notice and official E-Verify process",
  },
  {
    id: "benefits-enrollment-2026",
    bucket: "priority",
    title: "Finish 2026 benefits enrollment",
    summary:
      "Medical, dental and vision enrollment must be completed within 30 days of the start date. The exact start-date anchor was not present in the forwarded email.",
    action:
      "Open Benefit Connect now and confirm the exact countdown before selecting coverage.",
    receivedOn: "2026-07-07",
    sourceLabel: "Welcome to Your Spectrum Benefits",
    senderLabel: "Spectrum Employee Benefits",
    resource: "Benefit Connect · official plan documents control",
  },
  {
    id: "sosp-training-2026",
    bucket: "priority",
    title: "Complete Standards of Sales Performance training",
    summary:
      "Required Residential Inbound Sales Agent course in Learning Central.",
    action: "Launch the course from the Learning Central transcript.",
    receivedOn: "2026-07-07",
    dueOn: "2026-08-05",
    sourceLabel: "Training is due in 30 days: Standards of Sales Performance",
    senderLabel: "Learning Central",
    resource: "Learning Central transcript",
  },
  {
    id: "workplace-courses-2026-08",
    bucket: "priority",
    title: "Complete two workplace-expectations courses",
    summary:
      "Ensuring a Workplace Free of Sexual Harassment and Foundations of a Respectful Workplace are assigned.",
    action:
      "Complete both courses and verify they show completed in Learning Central.",
    receivedOn: "2026-07-05",
    dueOn: "2026-08-29",
    sourceLabel: "Two Learning Central assignment notices",
    senderLabel: "Learning Central",
    resource: "Learning Central transcript",
  },
  {
    id: "privacy-courses-2026-09",
    bucket: "priority",
    title: "Complete CPNI, records and data-privacy courses",
    summary:
      "Three required 2026 compliance assignments share the same confirmed deadline.",
    action:
      "Complete all three and verify completion status in Learning Central.",
    receivedOn: "2026-07-05",
    dueOn: "2026-09-03",
    sourceLabel: "Three Learning Central assignment notices",
    senderLabel: "Learning Central",
    resource: "Learning Central transcript",
  },
  {
    id: "training-dates-needed-2026",
    bucket: "priority",
    title: "Confirm two missing training due dates",
    summary:
      "Timekeeping 101 and Staying Safe in Challenging Situations are assigned, but the forwarded notices did not expose due dates.",
    action:
      "Open Learning Central, record both due dates, then complete the earlier item first.",
    receivedOn: "2026-07-05",
    sourceLabel: "Two Learning Central assignment notices",
    senderLabel: "Learning Central",
    resource: "Learning Central transcript",
  },
  {
    id: "mobile-expectations-july-2026",
    bucket: "priority",
    title: "Use a complete Mobile pitch on every call",
    summary:
      "Effective immediately, each pitch should include pricing, plan, feature and benefit; it must be a meaningful conversation, not an end-of-call mention.",
    action:
      "Practice the four-part pitch and offer Mobile during discovery on every eligible call.",
    receivedOn: "2026-07-06",
    sourceLabel: "RE: July Mobile Expectations",
    senderLabel: "Eva Duran · VP, IBS San Antonio",
    resource:
      "Spectrum email · current live offer still controls customer quotes",
  },
  {
    id: "internet-training-feedback-plans-2026",
    bucket: "direct",
    title: "Internet plans and equipment training feedback",
    summary:
      "A non-anonymous evaluation is available for the completed course.",
    action:
      "Submit feedback if the evaluation launches; otherwise no further action is required.",
    receivedOn: "2026-07-07",
    sourceLabel:
      "ACTION REQUESTED: feedback on Internet plans, speeds, WiFi and equipment",
    senderLabel: "Learning Central",
  },
  {
    id: "internet-training-feedback-101-2026",
    bucket: "direct",
    title: "Internet 101 training feedback",
    summary:
      "A non-anonymous evaluation is available for the completed basics course.",
    action:
      "Submit feedback if the evaluation launches; otherwise no further action is required.",
    receivedOn: "2026-07-07",
    sourceLabel: "ACTION REQUESTED: feedback on Internet 101",
    senderLabel: "Learning Central",
  },
  {
    id: "multiple-internet-delay-2026",
    bucket: "general",
    title: "Multiple Internet Instances launch delayed",
    summary:
      "A Residential Alert announced a launch delay. Treat the feature as unavailable until a newer approved source replaces this status.",
    receivedOn: "2026-07-06",
    sourceLabel: "Update: Multiple Internet Instances Launch Delayed",
    senderLabel: "Residential Alert",
  },
  {
    id: "extreme-weather-2026-07",
    bucket: "general",
    title: "Extreme weather customer impacts",
    summary:
      "Residential teams were notified of weather impacts in the Great Lakes and Northeast regions.",
    receivedOn: "2026-07-06",
    sourceLabel:
      "Extreme Weather Impacts Customers in the Great Lakes and Northeast Region",
    senderLabel: "Residential Alert",
  },
  {
    id: "july-incentive-2026",
    bucket: "general",
    title: "Fiscal July sales incentive is active",
    summary:
      "The June 29–July 28 incentive emphasizes Mobile lines, Invincible WiFi, 2 Gig and eligible repair-and-replacement attachments.",
    receivedOn: "2026-07-03",
    dueOn: "2026-07-28",
    sourceLabel: "FW: July Incentive — Residential IBS",
    senderLabel: "Tony Guevara · SVP, Inbound & Outbound Sales",
  },
  {
    id: "spark-welcome-2026",
    bucket: "general",
    title: "Spark recognition account is ready",
    summary:
      "Spark can be used to recognize colleagues and participate in the company recognition program.",
    receivedOn: "2026-07-03",
    sourceLabel: "Welcome to Spark! Your account is ready",
    senderLabel: "Spark at Charter",
  },
  {
    id: "rene-recognition-2026",
    bucket: "general",
    title: "Kudos: Rene Rodriguez",
    summary:
      "Rene was recognized for professional, knowledgeable support and a clear customer conversation.",
    receivedOn: "2026-07-03",
    sourceLabel: "Recognition for Rene Rodriguez",
    senderLabel: "Brenda Flores · Bilingual IBS Sales Supervisor",
  },
];

export const BULLETIN_CLARIFICATION_QUEUE = [
  "Benefits: confirm the official start date and exact enrollment deadline.",
  "Learning Central: capture due dates for Timekeeping 101 and Staying Safe in Challenging Situations.",
  "Company walkthrough: confirm Sarah Pastrano’s title and the local reporting chain.",
  "Product corpus: ingest the full clean business-rule body for the Multiple Internet Instances delay/update.",
  "E-Verify: confirm the employer received the decision and preserve only the completion status, never case IDs or portal credentials.",
] as const;

export function getBulletinItems(bucket: BulletinBucket) {
  return COMPANY_BULLETIN.filter((item) => item.bucket === bucket);
}
