export type CorpusVerification = "verified-internal" | "verified-public" | "source-discrepancy" | "source-pointer";

export type CorpusSource = {
  id: string;
  title: string;
  kind: "copilot-kb" | "internal-training" | "internal-email" | "public-spectrum";
  publishedOrChecked: string;
  authority: string;
};

export type KnowledgeRecord = {
  id: string;
  title: string;
  aliases: string[];
  category: string;
  summary: string;
  plan?: string;
  speed?: string;
  services: string[];
  requirements: string[];
  notes: string[];
  sourceIds: string[];
  verification: CorpusVerification;
  lastVerified: string;
  businessDepth?: "residential" | "shallow-business";
};

export const CORPUS_SOURCES: CorpusSource[] = [
  { id: "PR131", title: "Spectrum Internet Product Details", kind: "copilot-kb", publishedOrChecked: "2026-07-07", authority: "Current internal Internet product article captured from Outlook and Gmail; duplicate copies canonicalized by KB ID." },
  { id: "HOW7726", title: "Supporting Invincible WiFi", kind: "copilot-kb", publishedOrChecked: "2026-07-01", authority: "Current internal Invincible WiFi article captured from Outlook and Gmail; duplicate copies canonicalized by KB ID." },
  { id: "PR223", title: "Spectrum Mobile Service Product Details", kind: "copilot-kb", publishedOrChecked: "2026-07-07", authority: "Current internal Mobile overview and positioning article captured from Outlook and Gmail; duplicate copies canonicalized by KB ID." },
  { id: "GEN7777", title: "Spectrum Mobile Bring Your Own Device (BYOD)", kind: "copilot-kb", publishedOrChecked: "2026-07-09 training extract", authority: "Referenced by the internal device-and-accessories lesson." },
  { id: "GEN9023", title: "Spectrum Mobile Phone Balance Buyout Overview", kind: "copilot-kb", publishedOrChecked: "2026-07-09 training extract", authority: "Referenced by the internal device-and-accessories lesson." },
  { id: "GEN8761", title: "Mobile Device Trade-In Policies and Business Rules", kind: "copilot-kb", publishedOrChecked: "2026-07-09 training extract", authority: "Referenced by the internal device-and-accessories lesson." },
  { id: "HOW7449", title: "Mobile Anytime Upgrade", kind: "copilot-kb", publishedOrChecked: "2026-07-09 training extract", authority: "Referenced by the internal device-and-accessories lesson." },
  { id: "GEN9001", title: "Repair and Replacement Plans Overview", kind: "copilot-kb", publishedOrChecked: "2026-07-09 training extract", authority: "Current internal RR/RRP overview captured in the forwarded lesson." },
  { id: "GEN6633", title: "Spectrum Internet Assist Eligibility", kind: "copilot-kb", publishedOrChecked: "Referenced by PR131", authority: "Eligibility source referenced by PR131; full article not independently ingested." },
  { id: "GEN9008", title: "Spectrum Internet Assist Overview", kind: "copilot-kb", publishedOrChecked: "Referenced by PR131", authority: "Overview source referenced by PR131; full article not independently ingested." },
  { id: "PUBLIC-MOBILE-2026-07-10", title: "Spectrum Mobile Plans", kind: "public-spectrum", publishedOrChecked: "2026-07-10", authority: "Current customer-facing Spectrum plan page. Live account offer and current internal workflow still control fulfillment." },
  { id: "EMAIL-MII-DELAY-2026-07-06", title: "Multiple Internet Instances Launch Delayed", kind: "internal-email", publishedOrChecked: "2026-07-06", authority: "Internal alert source pointer; full clean business-rule body was not extractable." },
  { id: "GEN9237", title: "Explaining Spectrum Voice: Landline Home Phone", kind: "copilot-kb", publishedOrChecked: "2026-07-10", authority: "Current internal Spectrum Voice overview captured from the forwarded Outlook knowledge article; it replaces PR139." },
];

export const KNOWLEDGE_CORPUS: KnowledgeRecord[] = [
  {
    id: "internet-advantage",
    title: "Spectrum Internet Advantage",
    aliases: ["advantage", "internet advantage", "100x20", "budget internet"],
    category: "Internet",
    summary: "Address-gated residential Internet tier shown only for approved addresses in ESE/CSG or Agent OS.",
    plan: "Spectrum Internet Advantage — SPP 3.0 and SPP4",
    speed: "100 Mbps download × 20 Mbps upload",
    services: ["Internet service", "Seasonal Suspension eligibility"],
    requirements: ["Approved service address", "Eligibility flag in the biller", "Use qualified-offer path for an existing-account downgrade"],
    notes: ["Eligible addresses may overlap Spectrum Internet Assist pre-approved addresses.", "Cannot be combined with another Spectrum Internet product.", "Seasonal Suspension is temporarily unavailable for Advantage customers in Legacy TWC CSG markets.", "Do not quote availability until the address/account is checked."],
    sourceIds: ["PR131"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "internet-premier",
    title: "Spectrum Internet Premier",
    aliases: ["premier", "internet premier", "standard tier", "500x20"],
    category: "Internet",
    summary: "SPP4 standard residential Internet tier.",
    plan: "Spectrum Internet Premier SPP4",
    speed: "500 Mbps download × 20 Mbps upload",
    services: ["Internet service", "Optional Spectrum WiFi"],
    requirements: ["Verify address serviceability and current offer"],
    notes: ["WiFi is listed at $10 per month when added.", "WiFi can be changed to Opt In or Opt Out at any time.", "Use current biller and offer screen before quoting final price."],
    sourceIds: ["PR131"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "internet-gig",
    title: "Spectrum Internet Gig",
    aliases: ["gig", "1 gig", "internet gig", "1000x35"],
    category: "Internet",
    summary: "High-speed residential tier available in SPP3 and SPP4 markets.",
    plan: "Spectrum Internet Gig SPP 3.0 and SPP4",
    speed: "Up to 1000 Mbps download × 35 Mbps upload; PR131 lists typical hardwired download performance of 750–900 Mbps",
    services: ["DOCSIS 3.1 modem", "Advanced WiFi router when Spectrum WiFi is used", "Voice-capable eMTA when Voice is present"],
    requirements: ["Address/market eligibility", "Compatible equipment", "Authorized modem if customer-owned"],
    notes: ["WiFi is included with Gig SPP4.", "SPP3 Gig WiFi is listed at $10 per month.", "Device age, WiFi conditions, connected-device load, websites and content-provider capacity affect observed performance."],
    sourceIds: ["PR131"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "internet-2gig",
    title: "Spectrum Internet 2 Gig",
    aliases: ["2 gig", "2gig", "two gig", "2000x1000"],
    category: "Internet",
    summary: "Address-gated SPP4 tier available in eligible 2 Gig markets.",
    plan: "Spectrum Internet 2 Gig SPP4",
    speed: "2000 Mbps download × 1000 Mbps upload",
    services: ["Internet Premier base line-item structure", "Advanced WiFi", "WiFi 7 as the supported WiFi option"],
    requirements: ["Eligible market and address", "All FTTP locations or selected coax locations in some symmetrical-speed areas", "Biller/Agent OS confirmation"],
    notes: ["Agent OS displays an alert for eligible customers not already on 2 Gig.", "Some customers may wait up to two weeks to receive 2×1 speed; impacted accounts receive a $20 one-time credit and an Agent OS pop-up.", "Do not assume availability."],
    sourceIds: ["PR131"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "internet-7gig",
    title: "Spectrum Internet 7 Gig",
    aliases: ["7 gig", "7gig", "seven gig", "7000x7000"],
    category: "Internet",
    summary: "Highly restricted symmetrical FTTP tier under SPP4 rules.",
    plan: "Spectrum Internet 7 Gig SPP4",
    speed: "7000 Mbps download × 7000 Mbps upload",
    services: ["Advanced WiFi included", "Invincible WiFi included", "WiFi 7 only", "SPP4 bundle benefits aligned with 2 Gig"],
    requirements: ["New or existing SPP4 customer", "Eligible FTTP symmetrical location in Louisville/Lexington, Kentucky", "Biller eligibility", "Non-SPP4 customers must migrate to SPP4"],
    notes: ["Residential Bulk Internet is out of scope, with limited tenant-paid upgrade rules.", "TV + eligible Internet bundle is required for the cited cDVR benefit; TV + Internet SPP4 bundle is required for the cited Xumo discount.", "Agent OS displays an eligibility alert."],
    sourceIds: ["PR131"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "internet-assist",
    title: "Spectrum Internet Assist",
    aliases: ["sia", "internet assist", "assist", "50x10", "affordable internet"],
    category: "Internet",
    summary: "Qualified-household affordability tier with separate eligibility tactics.",
    plan: "Spectrum Internet Assist (SIA)",
    speed: "50 Mbps download × 10 Mbps upload, or the highest locally available speed if 50×10 is unavailable",
    services: ["Internet service", "Optional WiFi at $10 per month"],
    requirements: ["Qualified household", "Targeted Marketing or Customer-Initiated eligibility tactic", "Use GEN6633 and GEN9008/current workflow for exact qualification"],
    notes: ["WiFi activation charge is waived.", "Self-installation charge is waived where self-install is available.", "Professional installation is waived when self-install is unavailable; customer-requested professional installation and added lines of business can carry standard charges.", "Ordinary downgrade to SIA is not allowed except through qualified offers."],
    sourceIds: ["PR131", "GEN6633", "GEN9008"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "internet-ultra-legacy",
    title: "Spectrum Internet Ultra — Legacy",
    aliases: ["ultra", "internet ultra", "600x20", "grandfathered ultra"],
    category: "Internet",
    summary: "Grandfathered SPP3 tier retained for legacy-account support.",
    plan: "Spectrum Internet Ultra SPP 3.0",
    speed: "600 Mbps download × 20 Mbps upload, market dependent",
    services: ["DOCSIS 3.1 modem", "Router when In-Home WiFi is used", "Voice eMTA when Voice is present"],
    requirements: ["Existing grandfathered eligibility; grandfathered September 17, 2024"],
    notes: ["WiFi is $10 per month except Hawaii markets and grandfathered offers that include it.", "Not a standard new-connect tier."],
    sourceIds: ["PR131"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "invincible-wifi",
    title: "Invincible WiFi",
    aliases: ["invincible", "invincible wifi", "iwf", "cellular backup", "wifi 7 backup"],
    category: "WiFi",
    summary: "WiFi 7 router, 5G cellular backup and battery-resilience product for continuity during qualifying outages.",
    plan: "WiFi 7 Cellular Router + Battery Backup",
    services: ["WiFi 7 coverage", "5G cellular backup", "Eight-hour battery-resilience design", "Compatible WiFi 7 Extender for whole-home coverage"],
    requirements: ["Spectrum Internet and WiFi service", "Primary service-location use only", "One Invincible WiFi instance per account", "Tier/account-specific pricing and eligibility"],
    notes: ["Not a mobile hotspot; off-location use can disable and remove the service.", "Legacy pods are not compatible; use a WiFi 7 Extender.", "An upgrade generates a router swap and the old router must be returned.", "Complete a disconnect work order before removing equipment or the billing work order can become stuck.", "SPP4 2 Gig and above were listed as $0-add eligibility in the captured article; verify current account pricing."],
    sourceIds: ["HOW7726"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "spectrum-voice-home-phone",
    title: "Spectrum Voice — Landline Home Phone",
    aliases: ["voice", "home phone", "landline", "e911", "svi", "native", "port"],
    category: "Voice",
    summary: "Residential landline service delivered through a Spectrum-provided phone modem and compatible home phone equipment.",
    plan: "Spectrum Voice",
    services: ["Unlimited calling to the U.S. and listed North American/U.S. territories", "Up to two residential telephone lines", "Calling features", "Enhanced 911", "Optional Spectrum Voice International"],
    requirements: ["Spectrum-issued Voice modem", "Compatible telephone connected by telephone cord", "E911 Third Party Verification before new installation", "Eligibility check when porting an existing number"],
    notes: ["Customer-owned modems are not supported for Voice.", "Customers may choose a new Native number or port an eligible existing number.", "E911 can be unavailable during power or cable outages, after service disconnection, or when the modem is moved without proper support.", "Spectrum Voice International requires Spectrum Voice and includes unlimited calling to 70 countries; verify current rates and country list.", "GEN9237 was initially published July 10, 2026 and replaces PR139."],
    sourceIds: ["GEN9237"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "mobile-overview",
    title: "Spectrum Mobile — Residential Overview",
    aliases: ["mobile", "spectrum mobile", "mvno", "network"],
    category: "Mobile",
    summary: "Residential Mobile service for Spectrum Internet customers, positioned around nationwide cellular coverage plus Spectrum WiFi.",
    services: ["Nationwide 5G and 4G LTE coverage", "Spectrum WiFi access-point connectivity", "Speed Boost / total-connectivity positioning"],
    requirements: ["Residential or eligible Spectrum Business Internet relationship", "Account and device eligibility"],
    notes: ["Lead with Spectrum connectivity, WiFi and partner carriers—not another carrier's brand.", "If specifically asked whose network is used, PR223 authorizes saying Spectrum is a licensed MVNO using Verizon's network.", "PR223 states approximately 87% of Spectrum Mobile traffic uses Spectrum WiFi."],
    sourceIds: ["PR223"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "mobile-unlimited",
    title: "Spectrum Mobile Unlimited",
    aliases: ["unlimited", "mobile unlimited", "unl"],
    category: "Mobile",
    summary: "Standard unlimited residential Mobile plan.",
    plan: "Unlimited",
    services: ["Unlimited U.S. talk, text and data", "Mobile hotspot included", "Free international texting from the U.S. and while abroad", "Anytime Upgrade shown on the current public page"],
    requirements: ["Spectrum Internet required", "Verify current line offer and account eligibility"],
    notes: ["Current public Spectrum page checked July 10 lists $30 per additional line and reduced hotspot speeds at 5 GB.", "Internal PR223 removed throttling references for Unlimited on June 30 and removed its prior 5 GB hotspot wording on July 7.", "Because current public and internal surfaces differ, present the live customer offer/current approved article rather than treating either copied sentence as universal."],
    sourceIds: ["PR223", "PUBLIC-MOBILE-2026-07-10"],
    verification: "source-discrepancy",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "mobile-unlimited-plus",
    title: "Spectrum Mobile Unlimited Plus",
    aliases: ["unlimited plus", "plus", "unl plus", "mobile plus"],
    category: "Mobile",
    summary: "Premium residential unlimited Mobile plan with stronger travel and upgrade positioning.",
    plan: "Unlimited Plus",
    services: ["Unlimited U.S. talk, text and data", "Mobile hotspot included", "Free roaming in 215+ countries and destinations including Canada and Mexico", "Free international texting", "Exclusive Anytime Upgrade access"],
    requirements: ["Spectrum Internet required", "Verify current line offer and account eligibility"],
    notes: ["Current public Spectrum page checked July 10 lists $40 per additional line, reduced hotspot speeds at 10 GB and roaming speeds reduced at 10 GB.", "Internal PR223 removed throttling references for Unlimited Plus on June 30.", "Because current public and internal surfaces differ, use the live offer/current approved article for customer-facing thresholds."],
    sourceIds: ["PR223", "PUBLIC-MOBILE-2026-07-10"],
    verification: "source-discrepancy",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "mobile-by-the-gig",
    title: "Spectrum Mobile By the Gig",
    aliases: ["by the gig", "btg", "gig mobile", "shared data"],
    category: "Mobile",
    summary: "Shared-data plan for low-use or primarily WiFi-connected lines.",
    plan: "By the Gig",
    services: ["First GB per line", "Shared account usage across By the Gig lines", "Ability to switch to Unlimited or Unlimited Plus"],
    requirements: ["Spectrum Internet required", "Monitor shared usage and whole-GB billing"],
    notes: ["Current public page lists $20 per month for the first GB per additional line and $5 per additional GB.", "PR223 training material states shared total usage rounds up to the next whole GB for billing."],
    sourceIds: ["PR223", "PUBLIC-MOBILE-2026-07-10"],
    verification: "verified-public",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "mobile-byod",
    title: "Bring Your Own Device",
    aliases: ["byod", "bring your device", "bring your own phone", "device compatibility"],
    category: "Mobile Devices",
    summary: "Allows a customer to bring an eligible device and phone number to Spectrum Mobile.",
    services: ["Device transfer", "Eligible number port", "Trade-in remains a separate option"],
    requirements: ["Device must be unlocked", "Device must pass compatibility check", "Follow current porting and activation workflow"],
    notes: ["Not every device is eligible; never present transfer as ready before compatibility is confirmed."],
    sourceIds: ["GEN7777"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "mobile-phone-balance-buyout",
    title: "Phone Balance Buyout",
    aliases: ["pbb", "phone balance", "buyout", "pay off phones", "switcher"],
    category: "Mobile Devices",
    summary: "Visa Reward Card reimbursement path for qualifying ported devices with outstanding balances.",
    services: ["Phone-balance reimbursement for qualifying switches"],
    requirements: ["At least three installments paid on each eligible device", "Previous-carrier bill within the required order window showing total balance, payments owed and prior payments", "Previous-carrier and Spectrum Core accounts not past due and in good standing", "Active payment plan or devices paid off within the stated seven-day window"],
    notes: ["The July 9 lesson says the qualifying prior-carrier bill must be within 30 days of the Spectrum order.", "Use current GEN9023 for line-count, reimbursement caps, submission and exclusion rules before making a commitment."],
    sourceIds: ["GEN9023"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "mobile-trade-in",
    title: "Mobile Device Trade-In",
    aliases: ["trade in", "trade-in", "device trade", "100 bonus"],
    category: "Mobile Devices",
    summary: "Device-value estimate and qualifying promotional path when purchasing a new Spectrum Mobile phone.",
    services: ["Estimated device trade-in offer", "Potential extra $100 switching promotion"],
    requirements: ["Qualifying trade-in device", "Add a new line", "Purchase and activate a new phone", "Verify promotion remains active"],
    notes: ["Use GEN8761 for trade-in rules and HOW7449 for Anytime Upgrade details."],
    sourceIds: ["GEN8761", "HOW7449"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "mobile-rr",
    title: "Repair and Replacement",
    aliases: ["rr", "repair replacement", "device protection", "5 dollar protection"],
    category: "Mobile Protection",
    summary: "Base device-protection plan with nationwide and New York variants.",
    plan: "Repair and Replacement (RR)",
    services: ["Loss/theft coverage with two claims in a rolling 12-month period", "Screen-only breakdown/damage repair", "New York variant includes additional accidental-damage coverage"],
    requirements: ["Eligible device and enrollment under current GEN9001 rules", "Use state-specific coverage/deductible table"],
    notes: ["Captured monthly fee: $5 per device.", "Captured front-screen service fee/deductible: $29 when repair criteria are met.", "Nationwide-excluding-NY RR does not include the same broad accidental-damage, mechanical/electrical, back-glass or battery benefits as Premium.", "Claims: fastclaims.com/spectrummobile or 1-877-875-4282."],
    sourceIds: ["GEN9001"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "mobile-rrp",
    title: "Repair and Replacement Premium",
    aliases: ["rrp", "repair replacement premium", "premium protection", "10 dollar protection"],
    category: "Mobile Protection",
    summary: "Premium nationwide device-protection plan excluding New York.",
    plan: "Repair and Replacement Premium (RRP)",
    services: ["Loss/theft", "Front-screen repair", "Back-glass repair", "Accidental damage including liquid damage", "Mechanical/electrical failure after manufacturer warranty", "Unlimited battery replacement"],
    requirements: ["Eligible device and enrollment under current GEN9001 rules", "Use device-MSRP tier for loss/theft and replacement deductibles"],
    notes: ["Captured monthly fee: $10 per device.", "Front screen, back glass and qualifying battery service are listed at $29 when authorized repair is available.", "Combined front-and-back glass repair is listed at $58.", "Other damage/replacement deductibles vary by device tier.", "Claims: fastclaims.com/spectrummobile or 1-877-875-4282."],
    sourceIds: ["GEN9001"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "multiple-internet-instances",
    title: "Multiple Internet Instances",
    aliases: ["multiple internet", "second internet", "additional instance", "two modems"],
    category: "Internet Operations",
    summary: "Launch/update area requiring current internal verification.",
    services: ["Potential additional Internet-instance workflow"],
    requirements: ["Check current internal alert, biller and approved launch status before positioning"],
    notes: ["An internal July 6 alert stated the launch was delayed.", "HOW7726 states additional Internet instances cannot have Invincible WiFi.", "Do not treat this feature as live from study memory alone."],
    sourceIds: ["EMAIL-MII-DELAY-2026-07-06", "HOW7726"],
    verification: "source-pointer",
    lastVerified: "2026-07-10",
    businessDepth: "residential",
  },
  {
    id: "business-mobile-shallow",
    title: "Spectrum Mobile for Business — Shallow Context",
    aliases: ["business mobile", "smb mobile", "t mobile business"],
    category: "Business — Shallow",
    summary: "New-business Mobile context retained only so residential agents recognize the distinction.",
    services: ["T-Mobile network partner for new business connects", "Up to 20 lines at launch", "Hotspot usage not counted against overall plan data", "International use in 215+ destinations where available", "WiFi Calling enabled by default", "Spam labeling/blocking"],
    requirements: ["Business-new-connect workflow", "Use Business article and systems; do not apply residential Verizon/MVNO wording blindly"],
    notes: ["PR223 says no speed reductions after data threshold, although congestion deprioritization may occur.", "This app intentionally keeps Business coverage shallow."],
    sourceIds: ["PR223"],
    verification: "verified-internal",
    lastVerified: "2026-07-10",
    businessDepth: "shallow-business",
  },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function recordSearchText(record: KnowledgeRecord) {
  return normalize([
    record.title,
    ...record.aliases,
    record.category,
    record.summary,
    record.plan ?? "",
    record.speed ?? "",
    ...record.services,
    ...record.requirements,
    ...record.notes,
    ...record.sourceIds,
  ].join(" "));
}

export function searchKnowledgeCorpus(query: string, limit = 6) {
  const q = normalize(query);
  if (!q) return [];
  const terms = q.split(" ").filter(Boolean);

  return KNOWLEDGE_CORPUS.map((record) => {
    const title = normalize(record.title);
    const aliases = record.aliases.map(normalize);
    const haystack = recordSearchText(record);
    let score = 0;

    if (title === q) score += 120;
    if (aliases.includes(q)) score += 110;
    if (title.includes(q)) score += 60;
    if (aliases.some((alias) => alias.includes(q) || q.includes(alias))) score += 55;
    for (const term of terms) {
      if (title.includes(term)) score += 16;
      if (aliases.some((alias) => alias.includes(term))) score += 14;
      if (haystack.includes(term)) score += 3;
    }
    return { record, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title))
    .slice(0, limit)
    .map((item) => item.record);
}

export function formatKnowledgeRecord(record: KnowledgeRecord) {
  const lines = [
    `PLAN: ${record.plan ?? record.title}`,
    record.speed ? `SPEED: ${record.speed}` : "",
    `SUMMARY: ${record.summary}`,
    `SERVICES / FEATURES:\n- ${record.services.join("\n- ")}`,
    `REQUIREMENTS:\n- ${record.requirements.join("\n- ")}`,
    `ITEMS OF NOTE:\n- ${record.notes.join("\n- ")}`,
    `SOURCE: ${record.sourceIds.join(", ")}`,
    `VERIFICATION: ${record.verification}; checked ${record.lastVerified}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export function buildLookupContext(query: string) {
  const matches = searchKnowledgeCorpus(query, 4);
  if (!matches.length) {
    return `No direct corpus match for: ${query}. Ask for one more identifying word and do not invent a product fact.`;
  }
  return matches.map((record) => formatKnowledgeRecord(record)).join("\n\n---\n\n");
}

export const QUICK_LOOKUP_TERMS = [
  "Advantage",
  "Premier",
  "Gig",
  "2 Gig",
  "7 Gig",
  "SIA",
  "Invincible WiFi",
  "Unlimited",
  "Unlimited Plus",
  "By the Gig",
  "BYOD",
  "PBB",
  "RR",
  "RRP",
  "Voice",
  "E911",
];
