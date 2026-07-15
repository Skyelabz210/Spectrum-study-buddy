export type CompanyPerson = {
  id: string;
  name: string;
  title: string;
  tier: "leadership" | "supervisor" | "support" | "colleague";
  channels: string[];
  context: string;
  evidence: string[];
  hierarchy: string;
  gaps: string[];
};

export const COMPANY_PEOPLE: CompanyPerson[] = [
  {
    id: "eva-duran",
    name: "Eva Duran",
    title: "Vice President, IBS San Antonio",
    tier: "leadership",
    channels: ["Spectrum email", "Site-wide leadership correspondence"],
    context: "Communicates sales expectations, Mobile-pitch standards and compensation-plan changes for the San Antonio IBS organization.",
    evidence: ["July Mobile Expectations · received 2026-07-06"],
    hierarchy: "Site executive leadership; direct reporting path to the user is not yet confirmed.",
    gaps: ["Confirm the leadership chain between agent, supervisor, manager and VP."],
  },
  {
    id: "tony-guevara",
    name: "Tony Guevara",
    title: "Senior Vice President, Inbound & Outbound Sales",
    tier: "leadership",
    channels: ["Spectrum email", "Ask Tony channel referenced in correspondence"],
    context: "Communicates organization-wide Residential IBS incentive structure and sales-performance guidance.",
    evidence: ["July Incentive — Residential IBS · dated 2026-07-02"],
    hierarchy: "Senior sales leadership; exact chain to the San Antonio site is not yet confirmed.",
    gaps: ["Confirm organizational scope and intermediate leaders."],
  },
  {
    id: "sarah-pastrano",
    name: "Sarah Pastrano",
    title: "Site leadership role — title needs confirmation",
    tier: "leadership",
    channels: ["Spectrum email", "San Antonio Hwy 151 employee distribution"],
    context: "Shares site sales coaching on discovery, Invincible WiFi, 2 Gig and current incentives.",
    evidence: ["Invincible WiFi — June · received 2026-07-03", "July Incentive forward · received 2026-07-03"],
    hierarchy: "Appears in site leadership correspondence; reporting relationship is not inferred from distribution data.",
    gaps: ["Confirm formal title.", "Confirm manager/direct-report relationships."],
  },
  {
    id: "brenda-flores",
    name: "Brenda Flores",
    title: "Bilingual IBS Sales Supervisor",
    tier: "supervisor",
    channels: ["Spectrum email", "San Antonio Hwy 151 employee distribution"],
    context: "Shares agent recognition and coaching examples from customer interactions.",
    evidence: ["Recognition for Rene Rodriguez · received 2026-07-03"],
    hierarchy: "Supervisor-level role is confirmed by the message signature; specific team assignment needs confirmation.",
    gaps: ["Confirm assigned manager and team roster."],
  },
  {
    id: "rene-rodriguez",
    name: "Rene Rodriguez",
    title: "IBS sales colleague — exact title needs confirmation",
    tier: "colleague",
    channels: ["Spectrum email", "Spark recognition"],
    context: "Recognized for professional, knowledgeable service, troubleshooting guidance and a clear Mobile conversation.",
    evidence: ["Recognition for Rene Rodriguez · received 2026-07-03"],
    hierarchy: "Colleague relationship is confirmed; team and supervisor are not yet confirmed.",
    gaps: ["Confirm exact role, team and supervisor."],
  },
];
