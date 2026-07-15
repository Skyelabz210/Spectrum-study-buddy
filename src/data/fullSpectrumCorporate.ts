export type SourceClass = "official" | "investor" | "regulatory-news" | "industry-report";

export type CorporateSource = {
  id: string;
  label: string;
  sourceClass: SourceClass;
  url: string;
  note: string;
};

export type CorporateMetric = {
  label: string;
  value: string;
  note: string;
  sourceId: string;
};

export type CorporateTimelineEvent = {
  year: string;
  title: string;
  detail: string;
  sourceId: string;
};

export type CorporatePillar = {
  title: string;
  detail: string;
  agentMeaning: string;
};

export type AgenticApplication = {
  area: string;
  status: "publicly reported" | "current product direction" | "application opportunity";
  currentSignal: string;
  operatingValue: string;
  control: string;
};

export type CompetitorVector = {
  vector: string;
  pressure: string;
  SpectrumPosition: string;
  agentFocus: string;
};

export const FULL_SPECTRUM_LAST_VERIFIED = "2026-07-12";

export const CORPORATE_MISSION = {
  headline: "Connecting People to What Matters Most",
  statement:
    "We connect family, friends, businesses and local communities to unlimited possibilities with fast, reliable Spectrum Internet, Mobile, Video and Voice.",
  interpretation:
    "The corporate center of gravity is useful connectivity: reliable infrastructure, a converged Internet–WiFi–Mobile experience, flexible entertainment, clear customer treatment and continual service improvement.",
  sourceId: "charter-about",
};

export const CUSTOMER_COMMITMENT_PILLARS: CorporatePillar[] = [
  {
    title: "Reliable Connectivity",
    detail: "Keep customers connected and design products, networks and support around continuity.",
    agentMeaning: "Diagnose the real connectivity need, verify the fit and avoid promises the network or device cannot guarantee.",
  },
  {
    title: "Transparency at Every Step",
    detail: "Use clear pricing, timely updates and ownership when something goes wrong.",
    agentMeaning: "State recurring charges, one-time charges, equipment, conditions, limitations and next steps before agreement.",
  },
  {
    title: "Exceptional Service",
    detail: "Make the customer experience part of the product, not an afterthought.",
    agentMeaning: "Listen, reduce friction, use the correct tool and leave the customer with an accurate understanding of the order.",
  },
  {
    title: "Always Improving",
    detail: "Use customer feedback and operating evidence to improve products and service.",
    agentMeaning: "Treat QA, coaching and AI as repair systems—not shortcuts around judgment, consent or source verification.",
  },
];

export const CORPORATE_METRICS: CorporateMetric[] = [
  { label: "Customer relationships", value: "31.7M", note: "As of Q1 2026.", sourceId: "q1-2026" },
  { label: "Internet customers", value: "29.6M", note: "Q1 2026; down 120,000 in the quarter.", sourceId: "q1-2026" },
  { label: "Mobile lines", value: "12.1M", note: "Q1 2026; up 368,000 in the quarter and 1.8M year over year.", sourceId: "q1-2026" },
  { label: "Video customers", value: "12.5M", note: "Q1 2026; video remains under structural streaming pressure.", sourceId: "q1-2026" },
  { label: "Voice customers", value: "5.9M", note: "Q1 2026.", sourceId: "q1-2026" },
  { label: "Q1 revenue", value: "$13.6B", note: "Down 1.0% year over year; residential connectivity revenue grew 0.9%.", sourceId: "q1-2026" },
  { label: "2025 annual revenue", value: "$54.8B", note: "Reported on Charter's corporate profile.", sourceId: "charter-about" },
  { label: "U.S.-based employees", value: "92,000+", note: "Corporate profile states the workforce is 100% U.S.-based.", sourceId: "charter-about" },
  { label: "Serviceable footprint", value: "Nearly 59M", note: "Homes and businesses across 41 states, as of Q1 2026.", sourceId: "charter-about" },
];

export const CORPORATE_TIMELINE: CorporateTimelineEvent[] = [
  { year: "Late 1940s", title: "Cable's local roots", detail: "Early U.S. cable systems connected communities that broadcast signals could not reliably reach.", sourceId: "charter-history" },
  { year: "1964–1992", title: "Newhouse, Warner and Time Warner lineage", detail: "NewChannels, Warner Cable, Bright House predecessors and Time Warner Cable formed major branches of the lineage later assembled under Charter.", sourceId: "charter-history" },
  { year: "1993", title: "Charter founded", detail: "Charter Communications was founded in St. Louis and began acquiring cable systems nationally.", sourceId: "charter-history" },
  { year: "1999", title: "Public company", detail: "Charter began trading on Nasdaq under CHTR.", sourceId: "charter-history" },
  { year: "2009", title: "Financial restructuring", detail: "Charter completed a Chapter 11 restructuring and emerged under new equity ownership.", sourceId: "charter-history" },
  { year: "2012–2013", title: "Operating reset and Spectrum brand", detail: "Tom Rutledge became CEO, headquarters moved to Stamford and Charter introduced the Spectrum product brand.", sourceId: "charter-history" },
  { year: "2016", title: "Time Warner Cable and Bright House", detail: "Charter closed the transactions, exceeded 25 million customers and launched Spectrum Internet Assist.", sourceId: "charter-history" },
  { year: "2018–2020", title: "Converged connectivity", detail: "Spectrum Internet Gig, Spectrum Mobile, Advanced WiFi and 5G capabilities expanded the company beyond traditional cable service.", sourceId: "charter-history" },
  { year: "2022–2024", title: "Current leadership and experience strategy", detail: "Chris Winfrey became CEO; Xumo, Customer Commitment and WiFi 7 moved the strategy toward seamless connectivity and entertainment.", sourceId: "charter-history" },
  { year: "2025", title: "Mobile, apps and network scale", detail: "Spectrum Mobile passed 10 million lines, the Spectrum App Store launched and the fiber broadband network passed one million miles of infrastructure.", sourceId: "charter-history" },
  { year: "2026", title: "Network evolution and Cox combination", detail: "Charter is advancing symmetrical and multi-gig service, Invincible WiFi and rural expansion while preparing for the FCC-approved Cox transaction.", sourceId: "q1-2026" },
];

export const COX_TRANSACTION = {
  status: "FCC approved · closing not confirmed in reviewed sources",
  announced: "2025-05-16",
  fccApproval: "2026-02-27",
  expectedClose: "Mid-2026",
  enterpriseValue: "$34.5B",
  expectedScale: "Approximately 38 million subscribers after closing",
  structure:
    "Charter would combine with Cox Communications, assume approximately $12.6 billion of Cox net debt and obligations, and retain Spectrum as the consumer-facing brand. The combined company is expected to adopt the Cox Communications corporate name within a year after closing.",
  leadership:
    "Chris Winfrey is expected to remain President and CEO; Cox CEO Alex Taylor is expected to become chairman after closing.",
  strategicLogic: [
    "Greater network, purchasing, product-development and marketing scale.",
    "Expansion into complementary Cox markets with limited geographic overlap.",
    "A larger platform for broadband, mobile, video, business fiber, managed IT and cloud services.",
    "An expected $500 million in cost savings within three years after closing.",
  ],
  cautions: [
    "Do not describe the transaction as closed until an official closing announcement is verified.",
    "Integration creates execution, employee, systems, product-migration and customer-experience risk.",
    "Scale improves capability only when pricing, reliability, service and transparency improve at the customer level.",
  ],
  sourceIds: ["cox-reuters", "q1-2026"],
};

export const AGENTIC_APPLICATIONS: AgenticApplication[] = [
  {
    area: "Software engineering",
    status: "publicly reported",
    currentSignal: "Charter publicly reported standardizing GitLab Duo with Amazon Q Developer under an AWS generative-AI agreement.",
    operatingValue: "Faster development, testing, modernization and release of customer-facing Internet, TV and Mobile capabilities.",
    control: "Human review, secure code practices, test gates, source control and measurable quality must remain mandatory.",
  },
  {
    area: "Enterprise operations",
    status: "publicly reported",
    currentSignal: "The AWS agreement described plans to build agentic solutions across the company to improve operational efficiency.",
    operatingValue: "Automate bounded workflows, summarize operational state and route exceptions to the correct human owner.",
    control: "Agents need scoped permissions, audit trails, rollback, data minimization and explicit escalation thresholds.",
  },
  {
    area: "Network reliability",
    status: "application opportunity",
    currentSignal: "Network evolution, WiFi 7, 5G backup, rural construction and ultra-low-latency services create complex operating data.",
    operatingValue: "Anomaly detection, outage triage, proactive maintenance, capacity planning and clearer service-status communication.",
    control: "AI recommendations cannot replace network telemetry, engineering validation or incident-command authority.",
  },
  {
    area: "Customer care and knowledge",
    status: "application opportunity",
    currentSignal: "Agents work across product, pricing, eligibility, installation, billing and troubleshooting knowledge that changes frequently.",
    operatingValue: "Source-grounded retrieval, next-best diagnostic questions, summary assistance and accurate handoff context.",
    control: "No invented policy or offer; current approved article, account system and customer consent control.",
  },
  {
    area: "Sales enablement and QA",
    status: "application opportunity",
    currentSignal: "Training can use simulators, prompt support, semantic QA and targeted practice without processing real customer data.",
    operatingValue: "Faster product fluency, consistent disclosures, evidence-based coaching and stronger need-to-value recommendations.",
    control: "No covert persuasion, protected-trait profiling, fabricated scarcity or autonomous order placement.",
  },
  {
    area: "Product and entertainment discovery",
    status: "current product direction",
    currentSignal: "Xumo, the Spectrum App Store and bundled streaming relationships are moving video toward an integrated discovery and management experience.",
    operatingValue: "Help customers find, activate and manage relevant content and services across linear and streaming environments.",
    control: "Recommendations should preserve choice, explain cost and avoid paid-placement ambiguity.",
  },
];

export const COMPETITOR_VECTORS: CompetitorVector[] = [
  {
    vector: "Fiber-to-the-home",
    pressure: "Symmetrical speeds, simple high-speed positioning and strong reliability claims where fiber is built.",
    SpectrumPosition: "Broad footprint, network evolution toward symmetrical/multi-gig service, Mobile convergence, WiFi 7 and faster installation in many markets.",
    agentFocus: "Verify the actual address, compare complete household value and never attack fiber as a technology.",
  },
  {
    vector: "Fixed wireless",
    pressure: "Low-friction self-install, mobile-bundle pricing and price-lock messaging from national wireless carriers.",
    SpectrumPosition: "Wired broadband capacity, in-home WiFi management, converged Mobile/WiFi performance and outage-continuity products.",
    agentFocus: "Ask about congestion, latency, gaming, work-from-home, address restrictions and the customer's real experience.",
  },
  {
    vector: "Cable and converged peers",
    pressure: "Xfinity, Cox, Optimum, Astound and regional operators compete on speed, WiFi, bundles, mobile and retention economics.",
    SpectrumPosition: "Scale, Customer Commitment, Spectrum Mobile, app-based entertainment and a national product platform.",
    agentFocus: "Use approved equivalent comparisons: same speed, equipment, line count, term, fees and service mix.",
  },
  {
    vector: "Streaming and direct-to-consumer video",
    pressure: "Customers increasingly assemble entertainment outside traditional pay TV.",
    SpectrumPosition: "Xumo, Spectrum TV App, App Store and programmer agreements that integrate linear and streaming value.",
    agentFocus: "Discover content and convenience needs; do not sell a channel package the customer does not value.",
  },
  {
    vector: "Mobile-first household relationships",
    pressure: "AT&T, Verizon and T-Mobile use wireless relationships to cross-sell home connectivity.",
    SpectrumPosition: "Spectrum uses Internet, Advanced WiFi and Mobile as one converged connectivity proposition.",
    agentFocus: "Compare total household telecom cost, coverage, devices, hotspot, international use and current obligations.",
  },
];

export const CORPORATE_LEADERSHIP = [
  {
    name: "Chris Winfrey",
    role: "President & Chief Executive Officer",
    focus: "Seamless connectivity, customer experience and becoming a better service operator.",
    sourceId: "charter-leadership",
  },
  {
    name: "Jake Perlman",
    role: "Executive Vice President, Chief Technology & Information Officer",
    focus: "Publicly associated with Charter's AWS generative-AI and agentic-technology strategy.",
    sourceId: "charter-aws-ai",
  },
  {
    name: "Alex Taylor",
    role: "Prospective Chairman after Cox closing",
    focus: "Cox leadership continuity and governance for the proposed combined company; role is contingent on closing.",
    sourceId: "cox-reuters",
  },
];

export const AGENT_CORPORATE_TAKEAWAYS = [
  "The mission is expressed locally: accurate information, reliable setup, transparent terms and a customer who understands what happens next.",
  "Mobile growth and converged connectivity make every Internet conversation a legitimate Mobile discovery opportunity—but not an automatic attachment.",
  "Video strategy is shifting from a box-and-channel model toward integrated linear, streaming, app and device management.",
  "The Cox transaction increases scale and integration complexity; agents should expect process change but rely only on current approved communications.",
  "AI is strategically relevant when it improves speed, knowledge and reliability. It becomes misaligned when it invents facts, hides choices or bypasses human accountability.",
];

export const CORPORATE_SOURCES: CorporateSource[] = [
  {
    id: "charter-about",
    label: "Charter — About",
    sourceClass: "official",
    url: "https://corporate.charter.com/about-charter",
    note: "Mission, Customer Commitment, footprint, workforce and corporate metrics; data primarily as of Q1 2026.",
  },
  {
    id: "charter-history",
    label: "Charter — Corporate History",
    sourceClass: "official",
    url: "https://corporate.charter.com/charter-history",
    note: "Corporate lineage and milestone timeline.",
  },
  {
    id: "charter-leadership",
    label: "Charter — Leadership",
    sourceClass: "official",
    url: "https://corporate.charter.com/leadership",
    note: "Current public executive leadership.",
  },
  {
    id: "charter-connectivity",
    label: "Charter — Seamless Connectivity",
    sourceClass: "official",
    url: "https://corporate.charter.com/seamless-connectivity",
    note: "Internet, Advanced WiFi, Mobile, Invincible WiFi, latency and Spectrum Lab direction.",
  },
  {
    id: "charter-entertainment",
    label: "Charter — Seamless Entertainment",
    sourceClass: "official",
    url: "https://corporate.charter.com/seamless-entertainment",
    note: "Xumo, Spectrum TV App, App Store and programming-distribution strategy.",
  },
  {
    id: "charter-employees",
    label: "Charter — Investing in Employees",
    sourceClass: "official",
    url: "https://corporate.charter.com/investing-in-employees",
    note: "Public employee-investment and career-development posture.",
  },
  {
    id: "q1-2026",
    label: "Charter Q1 2026 Earnings Release",
    sourceClass: "investor",
    url: "https://ir.charter.com/static-files/8f4715b9-1c59-4a03-8829-05e75fdbb368",
    note: "Current operating metrics, network evolution, customer trends, investment and transition-expense context.",
  },
  {
    id: "cox-reuters",
    label: "Reuters — FCC approval of Charter/Cox transaction",
    sourceClass: "regulatory-news",
    url: "https://www.reuters.com/world/us-agency-approves-charter-communications-345-billion-deal-buy-cox-2026-02-27/",
    note: "FCC approval, expected transaction structure, scale, commitments and anticipated closing timing.",
  },
  {
    id: "charter-aws-ai",
    label: "TV Tech — Charter/AWS generative-AI agreement",
    sourceClass: "industry-report",
    url: "https://www.tvtechnology.com/news/charter-taps-aws-for-generative-ai-solutions",
    note: "Public reporting on GitLab Duo, Amazon Q Developer and planned agentic applications across Charter.",
  },
];

