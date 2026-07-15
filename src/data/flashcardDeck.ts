import {
  FLASHCARDS,
  type Flashcard,
  type FlashcardDeckTag,
  type FlashcardSource,
} from "@/data/curriculum";
import { DAILY_CLASS_FLASHCARDS_20260714 } from "@/data/dailyClassFlashcards20260714";
import { SPECTRUM_PRODUCT_UPDATE_FLASHCARDS } from "@/data/spectrumProductUpdate20260710";
import { OTTER_CORPUS_FLASHCARDS_20260712 } from "@/data/otterCorpusFlashcards20260712";
import { GMAIL_FLASHCARDS_20260715 } from "@/data/gmailProductFlashcards20260715";

export const SUPPLEMENTAL_FLASHCARDS: Flashcard[] = [
  {
    id: "sfc1",
    module: 4,
    category: "Internet Plans",
    front: "PR131: Internet Advantage speed and eligibility?",
    back: "100×20 Mbps. Display only for approved addresses flagged in ESE/CSG or Agent OS. Verify the biller; do not quote it as generally available.",
  },
  {
    id: "sfc2",
    module: 4,
    category: "Internet Plans",
    front: "Internet Advantage: what should you not confuse it with?",
    back: "Do not confuse Internet Advantage with Spectrum Internet Assist. Advantage is an address-gated 100×20 tier; SIA is the qualified-household affordability path.",
  },
  {
    id: "sfc3",
    module: 4,
    category: "Internet Plans",
    front: "Internet Premier: best-fit customer?",
    back: "Mainstream home internet: normal multi-device household, streaming, work/school, moderate gaming, and value without jumping straight to Gig.",
  },
  {
    id: "sfc4",
    module: 4,
    category: "Internet Plans",
    front: "PR131: Internet Premier SPP4 speed and WiFi rule?",
    back: "500×20 Mbps. WiFi is listed at $10/month when added and can be opted in or out. Verify current offer/account pricing before quoting.",
  },
  {
    id: "sfc5",
    module: 4,
    category: "Internet Plans",
    front: "Internet Gig: best-fit customer?",
    back: "High-demand household: many devices, gaming, heavy streaming, work from home, smart home, or customers complaining about lag/buffering.",
  },
  {
    id: "sfc6",
    module: 4,
    category: "Internet Plans",
    front: "PR131: Internet Gig speed language?",
    back: "Up to 1000×35 Mbps. PR131 lists typical hardwired download speeds of 750–900 Mbps; WiFi/device/network conditions affect results.",
  },
  {
    id: "sfc7",
    module: 4,
    category: "Internet Plans",
    front: "Internet 2 Gig: main sales gate?",
    back: "Do not assume availability. 2 Gig is market/address-dependent and should be checked by serviceability, biller, or Agent OS before positioning.",
  },
  {
    id: "sfc8",
    module: 4,
    category: "Internet Plans",
    front: "Internet 2 Gig: best-fit customer?",
    back: "Power users, multiple gamers, creators/uploaders, smart-home-heavy households, or customers explicitly asking for the fastest eligible residential tier.",
  },
  {
    id: "sfc9",
    module: 6,
    category: "Affordability",
    front: "PR131: Internet Assist safe description?",
    back: "Qualified-household 50×10 Mbps affordability tier. WiFi is $10; activation and qualifying self-install charges are waived. Use GEN6633/GEN9008 for exact eligibility.",
  },
  {
    id: "sfc10",
    module: 6,
    category: "Affordability",
    front: "ACP: current enrollment path?",
    back: "No. ACP ended June 1, 2024. Do not route customers as if ACP is an active enrollment path.",
  },
  {
    id: "sfc11",
    module: 4,
    category: "Mobile Plans",
    front: "Spectrum Mobile prerequisite?",
    back: "Spectrum Internet is required for residential Spectrum Mobile. Confirm the active Internet relationship and current account eligibility.",
  },
  {
    id: "sfc12",
    module: 4,
    category: "Mobile Plans",
    front: "Unlimited Plus: current source-control rule?",
    back: "Premium plan with hotspot, international roaming, international texting, and Anytime Upgrade positioning. The public page and internal PR223 currently differ on threshold wording; use the live offer/current approved article.",
  },
  {
    id: "sfc13",
    module: 4,
    category: "Mobile Plans",
    front: "Unlimited: current source-control rule?",
    back: "Standard unlimited plan with U.S. talk/text/data, hotspot, international texting, and Anytime Upgrade shown publicly. PR223 removed older threshold wording; use the live offer/current approved article.",
  },
  {
    id: "sfc14",
    module: 4,
    category: "Mobile Plans",
    front: "By the Gig: best-fit customer?",
    back: "Low-data users, secondary lines, mostly-on-WiFi customers, or households wanting tighter usage control. Shared usage rounds up to the next whole GB for billing.",
  },
  {
    id: "sfc15",
    module: 4,
    category: "Mobile Plans",
    front: "GEN9023/PBB: verified eligibility gates from the July 9 lesson?",
    back: "At least 3 installments paid per eligible device; qualifying prior-carrier bill showing balance/payment history; prior carrier and Spectrum Core accounts in good standing; active plan or payoff within the stated 7-day window. Verify current caps and line-count rules in GEN9023.",
  },
  {
    id: "sfc16",
    module: 4,
    category: "Mobile Plans",
    front: "BYOD: what must be checked first?",
    back: "Device must be unlocked and compatible. Do not present bring-your-own-device as ready until compatibility and unlock status are verified.",
  },
  {
    id: "sfc17",
    module: 5,
    category: "My Setup",
    front: "Where should PID and work email live in the study app?",
    back: "In the isolated private profile, separate from company product records. Never store passwords, activation PINs, MFA codes, SSNs, or document images.",
  },
  {
    id: "sfc18",
    module: 5,
    category: "My Setup",
    front: "Where do you start employee connectivity services?",
    back: "Panorama → My Charter → Connectivity Services. Confirm the service address before submitting anything.",
  },
  {
    id: "sfc19",
    module: 5,
    category: "My Setup",
    front: "What happens if your address was updated today?",
    back: "Expect a processing delay before employee serviceability works correctly. Recheck after the system reflects the updated address.",
  },
  {
    id: "sfc20",
    module: 5,
    category: "My Setup",
    front: "Can employee mobile be set up before internet is active?",
    back: "No. The transcript says employee mobile setup comes after the internet account is active.",
  },
  {
    id: "sfc21",
    module: 6,
    category: "Benefits",
    front: "Benefit Connect path?",
    back: "Panorama → nine-dot launcher → Benefit Connect. Use Enroll Now or Continue and finish before the countdown expires.",
  },
  {
    id: "sfc22",
    module: 6,
    category: "Benefits",
    front: "Benefits deadline rule?",
    back: "New-hire benefits were described as a 30-day enrollment window. Missing it can push changes to open enrollment.",
  },
  {
    id: "sfc23",
    module: 6,
    category: "Benefits",
    front: "What spouse/dependent info should be gathered?",
    back: "Legal name, DOB, SSN if required, relationship docs such as marriage certificate or birth certificate, current coverage, doctors, prescriptions, dental/vision needs.",
  },
  {
    id: "sfc24",
    module: 6,
    category: "Benefits",
    front: "Where should sensitive spouse/dependent documents go?",
    back: "Only into the official Benefit Connect or HR path. Do not store SSNs, passwords, or document images in the study app.",
  },
  {
    id: "sfc25",
    module: 6,
    category: "Employee Perks",
    front: "Employee standard internet perk from training?",
    back: "Standard employee internet was described as free, with standard speed discussed as 500 Mbps. Verify in Employee Services.",
  },
  {
    id: "sfc26",
    module: 6,
    category: "Employee Perks",
    front: "Employee internet upgrade differentials from training?",
    back: "1 Gig was discussed as $20/mo upgrade; 2 Gig as $30/mo where available. Verify in Employee Services before ordering.",
  },
  {
    id: "sfc27",
    module: 6,
    category: "Employee Perks",
    front: "Employee TV perk from training?",
    back: "Employee TV was described as every channel and premium included, with up to two Xumo boxes. Verify exact login/equipment path.",
  },
  {
    id: "sfc28",
    module: 6,
    category: "Employee Perks",
    front: "Employee mobile perk from training?",
    back: "Discounted service was discussed, up to 10 lines, but internet must be active first. Verify whether pricing differs by device or plan.",
  },
  {
    id: "sfc29",
    module: 6,
    category: "Spark",
    front: "Spark profile path?",
    back: "All Apps → Spark. Create the profile, browse rewards, send shout-outs, and watch for contests/power-hour rewards.",
  },
  {
    id: "sfc30",
    module: 6,
    category: "Spark",
    front: "What is the Spark cash-out caution?",
    back: "Transcript notes unredeemed Sparks can be lost after termination. Cash out rewards before leaving the company.",
  },
  {
    id: "sfc31",
    module: 10,
    category: "Competitors",
    front: "First competitor-intel filter?",
    back: "Exact address availability. Do not compare a competitor offer as real until the customer's address/account qualifies.",
  },
  {
    id: "sfc32",
    module: 10,
    category: "Competitors",
    front: "Second competitor-intel filter?",
    back: "Total household telecom cost: internet + mobile + TV/streaming + voice, not just advertised internet price.",
  },
  {
    id: "sfc33",
    module: 10,
    category: "Competitors",
    front: "Fiber competitor's strongest claim?",
    back: "Symmetrical upload/download, simple pricing, included WiFi/equipment, and high reliability where fiber is actually available.",
  },
  {
    id: "sfc34",
    module: 10,
    category: "Competitors",
    front: "Best Spectrum counter to a fiber competitor?",
    back: "Do not attack fiber. Shift to address availability, total household value, mobile savings, TV/sports/streaming, service timing, and current actual rate.",
  },
  {
    id: "sfc35",
    module: 10,
    category: "Competitors",
    front: "Fixed wireless competitor's strongest claim?",
    back: "Low friction, self-install, mobile-bundle price, and price guarantees.",
  },
  {
    id: "sfc36",
    module: 10,
    category: "Competitors",
    front: "Best Spectrum counter to fixed wireless?",
    back: "Wired broadband stability, gaming/work reliability, congestion risk, service-address restrictions, and WiFi/equipment confidence.",
  },
  {
    id: "sfc37",
    module: 10,
    category: "Competitors",
    front: "Price-lock competitor response?",
    back: "Compare the full household cost and conditions: equipment, taxes/fees, mobile eligibility, promo expiration, install path, device balances, and content needs.",
  },
  {
    id: "sfc38",
    module: 10,
    category: "Competitors",
    front: "Google Fiber in San Antonio: why is it a serious threat?",
    back: "Where available, it offers simple fiber pricing, symmetrical 1/3/8 Gig positioning, included WiFi, no data caps, free install, and no-extra-fee messaging.",
  },
  {
    id: "sfc39",
    module: 10,
    category: "Competitors",
    front: "AT&T Fiber: key threat?",
    back: "Symmetrical fiber, unlimited data, All-Fi Pro/ActiveArmor value stack, and wireless cross-sell savings where fiber is available.",
  },
  {
    id: "sfc40",
    module: 10,
    category: "Competitors",
    front: "T-Mobile Home Internet: key vulnerability?",
    back: "Fixed wireless can be affected by congestion, prioritization, latency, address restrictions, and some live-TV compatibility issues.",
  },
  {
    id: "sfc41",
    module: 9,
    category: "Selling Tactics",
    front: "Budget customer: first move?",
    back: "Ask usage and household size before naming the cheapest plan. If light use, check budget/assistance path; if multi-device, avoid underpowering the home.",
  },
  {
    id: "sfc42",
    module: 9,
    category: "Selling Tactics",
    front: "Customer says: 'I need to ask my spouse.' Best move?",
    back: "Clarify whether the issue is permission, information, or comfort. Offer to include the spouse if appropriate. Do not place an order without full commitment.",
  },
  {
    id: "sfc43",
    module: 9,
    category: "Selling Tactics",
    front: "Customer says: 'I still owe on my phones.' Best move?",
    back: "Check GEN9023 Phone Balance Buyout. Confirm installment history, current bill, good standing, current caps, line-count requirements, and exclusions before promising reimbursement.",
  },
  {
    id: "sfc44",
    module: 9,
    category: "Selling Tactics",
    front:
      "Customer says: 'You're just trying to sell me more.' Best response frame?",
    back: "Acknowledge it and compare total cost they already pay across providers. If moving mobile/TV does not solve the problem, leave it alone.",
  },
  {
    id: "sfc45",
    module: 9,
    category: "Selling Tactics",
    front: "WiFi complaint in one room: speed tier or coverage issue?",
    back: "Do not assume speed tier alone. Check router placement, WiFi coverage, equipment, interference, and whether Advanced WiFi or extender options apply.",
  },
  {
    id: "sfc46",
    module: 10,
    category: "Verification",
    front: "Universal quote rule for plans and competitors?",
    back: "All prices, speeds, benefits, promos, equipment, and eligibility must be verified by address/account/current official system before customer-facing use.",
  },
];

export const EXISTING_FLASHCARDS: Flashcard[] = [
  ...FLASHCARDS,
  ...SUPPLEMENTAL_FLASHCARDS,
  ...SPECTRUM_PRODUCT_UPDATE_FLASHCARDS,
  ...OTTER_CORPUS_FLASHCARDS_20260712,
];

export const OUTLOOK_VOICE_FLASHCARDS_20260710: Flashcard[] = [
  {
    id: "outlook-voice-gen9237-01",
    module: 4,
    category: "Voice",
    front:
      "GEN9237: What is Spectrum Voice and what equipment does it require?",
    back: "Spectrum Voice is a residential landline service using a Spectrum-provided phone modem. Customers connect compatible home phones with a telephone cord; customer-owned modems are not supported. Source: GEN9237 — Explaining Spectrum Voice: Landline Home Phone.",
    deckTags: ["voice"],
    source: {
      kind: "article",
      articleNumber: "GEN9237",
      articleTitle: "Explaining Spectrum Voice: Landline Home Phone",
      status: "article-verified",
      recordedAt: "2026-07-10",
    },
  },
  {
    id: "outlook-voice-gen9237-02",
    module: 4,
    category: "Voice",
    front:
      "GEN9237: What destinations are included in standard unlimited calling?",
    back: "The U.S., Puerto Rico, Mexico, Canada, Guam, the U.S. Virgin Islands, American Samoa and the Northern Mariana Islands. Source: GEN9237 — Explaining Spectrum Voice: Landline Home Phone.",
    deckTags: ["voice"],
    source: {
      kind: "article",
      articleNumber: "GEN9237",
      articleTitle: "Explaining Spectrum Voice: Landline Home Phone",
      status: "article-verified",
      recordedAt: "2026-07-10",
    },
  },
  {
    id: "outlook-voice-gen9237-03",
    module: 4,
    category: "Voice",
    front: "GEN9237: What are Native and Port phone-number choices?",
    back: "Native means choosing a new phone number. Port means transferring an eligible existing number. Residential Spectrum Voice supports up to two telephone lines. Source: GEN9237 — Explaining Spectrum Voice: Landline Home Phone.",
    deckTags: ["voice"],
    source: {
      kind: "article",
      articleNumber: "GEN9237",
      articleTitle: "Explaining Spectrum Voice: Landline Home Phone",
      status: "article-verified",
      recordedAt: "2026-07-10",
    },
  },
  {
    id: "outlook-voice-gen9237-04",
    module: 4,
    category: "Voice",
    front: "GEN9237: What must a new Voice customer confirm about E911?",
    back: "Before installation, the customer must confirm understanding of E911 through Third Party Verification. E911 can be unavailable during power/cable outages, after disconnection, or when equipment is moved without proper support. Source: GEN9237 — Explaining Spectrum Voice: Landline Home Phone.",
    deckTags: ["voice"],
    source: {
      kind: "article",
      articleNumber: "GEN9237",
      articleTitle: "Explaining Spectrum Voice: Landline Home Phone",
      status: "article-verified",
      recordedAt: "2026-07-10",
    },
  },
  {
    id: "outlook-voice-gen9237-05",
    module: 4,
    category: "Voice",
    front: "GEN9237: How does Spectrum Voice International work?",
    back: "SVI is an optional Voice add-on with unlimited calling to 70 countries and lower per-minute rates elsewhere. The customer must subscribe to Spectrum Voice; incoming international calls do not charge the Spectrum customer. Source: GEN9237 — Explaining Spectrum Voice: Landline Home Phone.",
    deckTags: ["voice"],
    source: {
      kind: "article",
      articleNumber: "GEN9237",
      articleTitle: "Explaining Spectrum Voice: Landline Home Phone",
      status: "article-verified",
      recordedAt: "2026-07-10",
    },
  },
];

export const ALL_FLASHCARDS: Flashcard[] = [
  ...DAILY_CLASS_FLASHCARDS_20260714,
  ...OUTLOOK_VOICE_FLASHCARDS_20260710,
  ...GMAIL_FLASHCARDS_20260715,
  ...EXISTING_FLASHCARDS,
];

export type FlashcardDeckId =
  | "milestone"
  | "milestone-questions"
  | "milestone-prep"
  | "kahoot"
  | "article-linked"
  | "mastery"
  | "internet"
  | "wifi"
  | "mobile"
  | "tv"
  | "voice"
  | "supplementary"
  | "all";

export type FlashcardDeckDefinition = {
  id: FlashcardDeckId;
  label: string;
  description: string;
  family: "Final exam" | "Article study" | "Optional mastery";
};

export const FLASHCARD_DECKS: FlashcardDeckDefinition[] = [
  {
    id: "milestone",
    label: "Milestone · Combined",
    description:
      "All milestone questions and preparatory exercises in one preserved view.",
    family: "Final exam",
  },
  {
    id: "milestone-questions",
    label: "Milestone Questions",
    description:
      "The 45 recovered assessment questions, isolated for focused final-exam cramming.",
    family: "Final exam",
  },
  {
    id: "milestone-prep",
    label: "Milestone Prep",
    description:
      "Testing instructions, timing, scoring and preparatory exercises only.",
    family: "Final exam",
  },
  {
    id: "kahoot",
    label: "Kahoot",
    description:
      "Recoverable classroom Kahoot questions with source holds exposed.",
    family: "Final exam",
  },
  {
    id: "article-linked",
    label: "Article-linked Review",
    description:
      "Cards carrying a known PR, GEN or HOW article number and full title.",
    family: "Article study",
  },
  {
    id: "mastery",
    label: "Mastery Lab · Optional",
    description:
      "Generated scenarios, comparisons, bundles, upgrade avenues and ideal-solution drills.",
    family: "Optional mastery",
  },
  {
    id: "internet",
    label: "Internet",
    description:
      "Internet tiers, eligibility, speed, equipment and offer rules.",
    family: "Article study",
  },
  {
    id: "wifi",
    label: "Wi‑Fi",
    description: "Advanced WiFi, pods, Security Shield and Invincible WiFi.",
    family: "Article study",
  },
  {
    id: "mobile",
    label: "Mobile",
    description:
      "Plans, devices, protection, offers and connectivity features.",
    family: "Article study",
  },
  {
    id: "tv",
    label: "TV",
    description: "Packages, channels, streaming, add-ons and Xumo.",
    family: "Article study",
  },
  {
    id: "voice",
    label: "Voice",
    description: "Residential Voice features, lines and international service.",
    family: "Article study",
  },
  {
    id: "supplementary",
    label: "Supplementary",
    description: "Every pre-ingestion card, preserved without deletion.",
    family: "Optional mastery",
  },
  {
    id: "all",
    label: "All cards",
    description: "The complete combined library across every deck view.",
    family: "Optional mastery",
  },
];

const SERVICE_PATTERNS: Record<FlashcardDeckTag, RegExp> = {
  milestone: /\bmilestone\b/i,
  kahoot: /\bkahoot\b/i,
  internet:
    /\binternet\b|\bbroadband\b|\bfttp\b|\bgig\b|\bdata caps?\b|\bsia\b|spectrum internet assist/i,
  wifi: /wi[‑-]?fi|\brouter\b|\bpod(s)?\b|security shield|invincible|out-of-home/i,
  mobile:
    /\bmobile\b|\bbyod\b|phone balance buyout|trade[ -]?in|unlimited plus|by the gig|smartwatch|\brrp?\b/i,
  tv: /\btv\b|\bvideo\b|\bchannel\b|\bdvr\b|xumo|entertainment view|stream box/i,
  voice:
    /\bvoice\b|home phone|call guard|selective call|spam calls?|international calling/i,
};

function cardMatchesTag(card: Flashcard, tag: FlashcardDeckTag) {
  if (card.deckTags?.includes(tag)) return true;
  return SERVICE_PATTERNS[tag].test(
    `${card.category} ${card.front} ${card.back}`,
  );
}

export function getDeckCards(deckId: FlashcardDeckId): Flashcard[] {
  if (deckId === "all") return ALL_FLASHCARDS;
  if (deckId === "supplementary") return EXISTING_FLASHCARDS;
  if (deckId === "milestone-questions")
    return ALL_FLASHCARDS.filter(
      (card) => card.source?.kind === "milestone-review",
    );
  if (deckId === "milestone-prep")
    return ALL_FLASHCARDS.filter(
      (card) => card.source?.kind === "milestone-prep",
    );
  if (deckId === "article-linked")
    return ALL_FLASHCARDS.filter((card) => {
      const source = resolveFlashcardSource(card);
      return /^(?:PR|HOW|GEN)\d+/.test(source.articleNumber);
    });
  if (deckId === "mastery")
    return ALL_FLASHCARDS.filter((card) => card.origin === "generated-mastery");
  return ALL_FLASHCARDS.filter((card) => cardMatchesTag(card, deckId));
}

export function resolveCardOrigin(card: Flashcard) {
  if (card.origin) return card.origin;
  const source = resolveFlashcardSource(card);
  if (source.kind === "milestone-review" || source.kind === "kahoot")
    return "verbatim-assessment" as const;
  if (source.kind === "milestone-prep") return "verbatim-prep" as const;
  if (/^(?:PR|HOW|GEN)\d+/.test(source.articleNumber))
    return "source-derived" as const;
  return "legacy-supplement" as const;
}

const ARTICLE_TITLES: Record<string, string> = {
  PR131: "Spectrum Internet Product Details",
  PR139: "Spectrum Voice Product Details",
  PR223: "Spectrum Mobile Service Product Details",
  HOW7726: "Supporting Invincible WiFi",
  HOW7449: "Mobile Anytime Upgrade",
  GEN6562: "Full GEN6562 article title to collect",
  GEN6633: "Spectrum Internet Assist Eligibility",
  GEN7777: "Spectrum Mobile Bring Your Own Device (BYOD)",
  GEN8761: "Mobile Device Trade-In Policies and Business Rules",
  GEN9001: "Repair and Replacement Plans Overview",
  GEN9008: "Spectrum Internet Assist Overview",
  GEN9023: "Spectrum Mobile Phone Balance Buyout Overview",
  GEN9079: "Residential Sales Offer Index",
  GEN9168: "Customer Loyalty Offers",
  GEN9237: "Explaining Spectrum Voice: Landline Home Phone",
};

export function resolveFlashcardSource(card: Flashcard): FlashcardSource {
  if (card.source) return card.source;
  const matches = `${card.category} ${card.front} ${card.back}`.match(
    /\b(?:PR|HOW|GEN)\d+\b/g,
  );
  const articleNumbers = [...new Set(matches ?? [])];
  if (articleNumbers.length === 0) {
    return {
      kind: "article",
      articleNumber: "ARTICLE NEEDED",
      articleTitle: "Full article number and title to collect",
      status: "needs-article",
    };
  }
  const missingTitle = articleNumbers.some(
    (articleNumber) => !ARTICLE_TITLES[articleNumber],
  );
  return {
    kind: "article",
    articleNumber: articleNumbers.join(" · "),
    articleTitle: articleNumbers
      .map(
        (articleNumber) =>
          ARTICLE_TITLES[articleNumber] ??
          `Full ${articleNumber} article title to collect`,
      )
      .join(" · "),
    status:
      missingTitle || articleNumbers.includes("GEN6562")
        ? "needs-article-title"
        : "article-verified",
  };
}

export const LEGACY_FLASHCARD_SOURCE_GAPS = EXISTING_FLASHCARDS.map((card) => ({
  card,
  source: resolveFlashcardSource(card),
})).filter(
  ({ source }) =>
    source.status === "needs-article" ||
    source.status === "needs-article-title",
);
