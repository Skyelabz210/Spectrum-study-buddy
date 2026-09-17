import type { Flashcard } from "@/data/curriculum";

// GEN9253 product-name update — 2026-07-23 ingestion of the printed class
// Comparison sheet. Ingested 2026-07-23 from printed class materials
// (photographed handouts, San Antonio market). Current official GEN9253,
// biller, Agent OS and live offers control. Prices are promotional/standard
// monthly amounts from the printed comparison sheet and MUST be verified in
// the live offer tool before quoting.
//
// ARCHITECTURE RULE: all money is stored as INTEGER CENTS. No floating point
// exists anywhere in this module. Formatting uses integer division/modulo.

export const REBRAND_TIMELINE = {
  videoNotificationsBegin: "2026-07-16", // video customers begin receiving bill notifications
  internetNotificationsBegin: "2026-09-16", // internet customers begin receiving bill notifications
  changesGoLive: "2026-09-16", // note on sheet: changes will go live on or after September 16
  source: "GEN9253",
  note: "Pricing and package inclusions remain the same; only product names change. No changes are being made to customers' services as part of this update.",
} as const;

export type RebrandEntry = {
  current: string;
  next: string;
  changed: boolean;
  domain: "video" | "internet";
  note?: string;
};

export const VIDEO_REBRAND: RebrandEntry[] = [
  { current: "Spectrum TV Stream", next: "Spectrum TV Lite", changed: true, domain: "video" },
  { current: "Spectrum TV Choice", next: "Spectrum TV Choice", changed: false, domain: "video" },
  { current: "Spectrum TV Select", next: "Spectrum Stream TV", changed: true, domain: "video" },
  { current: "Spectrum TV Select Signature", next: "Spectrum Stream TV Signature", changed: true, domain: "video" },
  { current: "Spectrum TV Select Plus", next: "Spectrum Stream TV Pro", changed: true, domain: "video" },
  { current: "Spectrum TV Platinum", next: "Spectrum Stream TV VIP", changed: true, domain: "video" },
  { current: "Spectrum TV Basic", next: "Spectrum TV Basic", changed: false, domain: "video" },
];

export const INTERNET_REBRAND: RebrandEntry[] = [
  { current: "Spectrum Internet Assist", next: "Spectrum Internet Assist", changed: false, domain: "internet" },
  { current: "Spectrum Internet Advantage", next: "Spectrum Internet 100", changed: true, domain: "internet" },
  {
    current: "Spectrum Internet (Flagship)",
    next: "Spectrum Internet 500",
    changed: true,
    domain: "internet",
    note: "Marked * on the printed sheet: will receive a speed lift as part of the update. Verify final speed in GEN9253/PR131.",
  },
  {
    current: "Spectrum Internet Premier",
    next: "Spectrum Internet 500",
    changed: true,
    domain: "internet",
    note: "Printed sheet reads as consolidation with Flagship into the Internet 500 name (Premier is already 500x20 under PR131). VERIFY the exact Premier row in GEN9253 before teaching as final.",
  },
  { current: "Spectrum Internet Gig", next: "Spectrum Internet 1 Gig", changed: true, domain: "internet" },
  { current: "Spectrum Internet 2 Gig", next: "Spectrum Internet 2 Gig", changed: false, domain: "internet" },
];

/** Translate any current or legacy product name into the post-Sept-16 name. */
export function toNewProductName(name: string): string {
  const normalized = name.trim().toLowerCase();
  const hit = [...VIDEO_REBRAND, ...INTERNET_REBRAND].find(
    (entry) => entry.current.toLowerCase() === normalized || entry.next.toLowerCase() === normalized
  );
  return hit ? hit.next : name;
}

// ——— TV package comparison (printed sheet, spectrum.com content) ———
export type TvPackage = {
  id: string;
  name: string; // post-rebrand name as printed on the comparison sheet
  promoCents: number | null; // integer cents; null when no promo listed
  standardCents: number;
  channels: string; // as printed, e.g. "230+"
  positioning: string;
  keyInclusions: string[];
  includedApps: string[];
};

export const TV_PACKAGES: TvPackage[] = [
  {
    id: "stream-tv-vip",
    name: "Spectrum TV VIP (Stream TV VIP)",
    promoCents: 14500,
    standardCents: 17500,
    channels: "230+",
    positioning: "Top tier. Everything in TV Pro plus Entertainment View + Paramount+ Premium and the full Sports View pack.",
    keyInclusions: [
      "Entertainment + (Entertainment View plus Paramount+ Premium; e.g. AXS, CNBC, UpTV, BBC, MTV)",
      "Sports View (ESPN News, NFL RedZone, Golf Channel, FanDuel TV, ACC*, Altitude*, Big10*, Starz/StarzEncore)",
      "All apps in TV Select Plus",
    ],
    includedApps: ["Paramount+ Premium", "HBO Max", "ESPN+", "Hulu", "Disney+", "Peacock", "Fox One", "ViX", "Spectrum TV App"],
  },
  {
    id: "stream-tv-pro",
    name: "Spectrum TV Pro (Stream TV Pro)",
    promoCents: 11000,
    standardCents: 14000,
    channels: "160+",
    positioning: "Sports-forward tier: everything in TV Select Stream Signature plus the league networks and RSNs.",
    keyInclusions: [
      "Regional Sports Networks (RSNs)",
      "NFL Network, MLB Network, NBA TV, NHL Network, Tennis Channel",
      "All apps in TV Select Signature",
    ],
    includedApps: ["Tennis Channel+", "Peacock", "AMC+", "HBO Max", "ESPN+", "Hulu", "Disney+", "Paramount+", "Fox One", "ViX", "Spectrum TV App"],
  },
  {
    id: "tv-stream-signature",
    name: "TV Stream Signature",
    promoCents: 10000,
    standardCents: 13000,
    channels: "150+",
    positioning: "Core streaming tier on top of traditional TV Select (grandfathered). Does NOT include Regional Sports Networks.",
    keyInclusions: ["On top of Traditional TV Select (grandfathered)", "No RSNs — key differentiator versus TV Pro"],
    includedApps: ["Disney+ Basic", "ViX Premium with Ads", "Paramount+ Essential", "Max Basic with Ads", "Spectrum TV App"],
  },
  {
    id: "mi-plan-latino",
    name: "Mi Plan Latino",
    promoCents: 7500,
    standardCents: 9500,
    channels: "170+",
    positioning: "Top Spanish and English language channels for bilingual households.",
    keyInclusions: ["ESPN Deportes", "Fox Deportes", "beIN Sports", "Estrella TV", "Telemundo", "Univision"],
    includedApps: ["Paramount+ Essential", "ViX Premium with Ads", "Spectrum TV App"],
  },
  {
    id: "spectrum-tv-lite",
    name: "Spectrum TV Lite",
    promoCents: 4000,
    standardCents: 4500,
    channels: "85+",
    positioning: "Entry tier for light viewers: family and lifestyle staples.",
    keyInclusions: ["Animal Planet", "BET", "Disney", "Lifetime", "Travel Channel"],
    includedApps: ["Spectrum TV App"],
  },
  {
    id: "tv-stream-latino",
    name: "TV Stream Latino",
    promoCents: null,
    standardCents: 2500,
    channels: "45+ Spanish",
    positioning: "Lowest-cost Spanish-language streaming pack.",
    keyInclusions: ["Antena 3 TV", "Bandamax", "beIN sport"],
    includedApps: ["Spectrum TV App"],
  },
];

/** Integer-only USD formatter. cents=14500 -> "$145.00". No floats. */
export function formatUsd(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const magnitude = cents < 0 ? -cents : cents;
  const dollars = Math.trunc(magnitude / 100);
  const remainder = magnitude % 100;
  return `${sign}$${dollars}.${String(remainder).padStart(2, "0")}`;
}

export const REBRAND_FLASHCARDS: Flashcard[] = [
  {
    id: "gen9253-timeline",
    module: 10,
    category: "GEN9253 Rebrand",
    front: "GEN9253: when do the product-name updates start appearing and go live?",
    back: "Video customers begin receiving bill notifications July 16, 2026; Internet customers begin September 16, 2026. Changes go live on or after September 16, 2026. Pricing and package inclusions stay the same — only names change.",
  },
  {
    id: "gen9253-video-map",
    module: 10,
    category: "GEN9253 Rebrand",
    front: "GEN9253 video renames: TV Stream, TV Select, Select Signature, Select Plus, TV Platinum become…?",
    back: "TV Stream → TV Lite; TV Select → Stream TV; Select Signature → Stream TV Signature; Select Plus → Stream TV Pro; TV Platinum → Stream TV VIP. TV Choice and TV Basic keep their names.",
  },
  {
    id: "gen9253-internet-map",
    module: 10,
    category: "GEN9253 Rebrand",
    front: "GEN9253 internet renames: Advantage, Flagship, Gig become…?",
    back: "Advantage → Spectrum Internet 100; Spectrum Internet (Flagship) → Spectrum Internet 500 with a speed lift; Gig → Spectrum Internet 1 Gig. Assist and 2 Gig keep their names. Verify the Premier row in GEN9253 — the printed sheet reads as consolidation into Internet 500.",
  },
  {
    id: "gen9253-customer-script",
    module: 10,
    category: "GEN9253 Rebrand",
    front: "A customer asks why their bill shows a new product name after September 16. What do you say?",
    back: "Reassure: it is a name update only. Pricing and package inclusions remain the same, and no changes are being made to their services. Use the current and new product names from GEN9253 to explain, then confirm their pricing on the live account.",
  },
  {
    id: "tvpkg-vip",
    module: 4,
    category: "TV Packages",
    front: "Spectrum TV VIP: price, channels, and what it adds over TV Pro?",
    back: "$145 promo / $175 standard, 230+ channels. Adds Entertainment+ (Entertainment View + Paramount+ Premium: AXS, CNBC, UpTV, BBC, MTV) and Sports View (ESPN News, NFL RedZone, Golf, FanDuel TV, Starz/StarzEncore), plus all TV Select Plus apps. Verify current pricing in the live offer tool.",
  },
  {
    id: "tvpkg-pro",
    module: 4,
    category: "TV Packages",
    front: "Spectrum TV Pro: price, channels, and its sports differentiator?",
    back: "$110 promo / $140 standard, 160+ channels. On top of Select Stream Signature it adds RSNs plus NFL, MLB, NBA, NHL Networks and Tennis Channel. Included extra apps: Tennis Channel+, Peacock, AMC+.",
  },
  {
    id: "tvpkg-signature-rsn",
    module: 4,
    category: "TV Packages",
    front: "TV Stream Signature: price and the one sports caveat to disclose?",
    back: "$100 promo / $130 standard, 150+ channels on the grandfathered traditional TV Select base. It does NOT include Regional Sports Networks — sports households usually belong on TV Pro or VIP. Apps: Disney+ Basic, ViX Premium w/Ads, Paramount+ Essential, Max Basic w/Ads.",
  },
  {
    id: "tvpkg-latino",
    module: 4,
    category: "TV Packages",
    front: "Mi Plan Latino vs TV Stream Latino: prices and fit?",
    back: "Mi Plan Latino: $75 promo / $95 standard, 170+ top Spanish AND English channels (ESPN Deportes, Fox Deportes, beIN, Estrella, Telemundo, Univision) with Paramount+ Essential and ViX Premium. TV Stream Latino: $25 standard, 45+ Spanish channels — the budget Spanish-first fit.",
  },
  {
    id: "tvpkg-lite",
    module: 4,
    category: "TV Packages",
    front: "Spectrum TV Lite: price and target viewer?",
    back: "$40 promo / $45 standard, 85+ channels (Animal Planet, BET, Disney, Lifetime, Travel Channel). Fits light viewers who want familiar cable staples plus the Spectrum TV App without a full lineup.",
  },
];
