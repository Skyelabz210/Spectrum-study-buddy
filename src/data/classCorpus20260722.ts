import type { Flashcard } from "@/data/curriculum";

// Class-materials ingestion — 2026-07-23.
// Sources: photographed classroom call-flow sheet (San Antonio DSC), the
// Residential & SMB Sales DSC Certification Checklist, three pages of
// handwritten class notes, the Milestone 1 review sheet, and GEN9237
// (Explaining Spectrum Voice, published 07/10/2026, replaces PR139) forwarded
// in the 7/10 notes email. Handwriting transcription is best-effort; items
// marked VERIFY need a second read against the physical page or the article.
// Current official articles, biller, Agent OS and live offers control.

// ——— The certified call flow (Certification Checklist + printed sheet) ———
export type CallFlowStep = {
  id: string;
  phase: "Greeting" | "Discovery" | "Offer & Assume the Sale" | "Recap";
  requirement: string;
  wordTrack?: string;
};

export const CERTIFIED_CALL_FLOW: CallFlowStep[] = [
  {
    id: "greet-brand",
    phase: "Greeting",
    requirement: "Brand Spectrum in the greeting and introduce yourself by name with an offer to assist.",
    wordTrack:
      "Thank you for calling Spectrum, my name is ____. I'm located in San Antonio, TX — how can I assist you?",
  },
  {
    id: "greet-align",
    phase: "Greeting",
    requirement: "Align to the caller's reason and set the seamless-connectivity frame before transitioning.",
    wordTrack:
      "Sure thing! By the time we end this call, you will be taken care of in terms of seamless connectivity and entertainment needs. It's my understanding that you're calling in to set up… let's start with your address?",
  },
  {
    id: "greet-newexisting",
    phase: "Greeting",
    requirement: "New customer: determine serviceability and capture email. Existing customer: complete authentication and verify email on account.",
  },
  {
    id: "greet-transition",
    phase: "Greeting",
    requirement: "Transition to discovery explicitly.",
    wordTrack: "Let me ask you a few questions so I can make sure we build the right package for you.",
  },
  {
    id: "disc-slow-internet",
    phase: "Discovery",
    requirement: "Internet Advantage probe (MUST): ask whether internet speed ever feels slow.",
    wordTrack: "Are there times when your internet speed feels slow?",
  },
  {
    id: "disc-devices",
    phase: "Discovery",
    requirement: "Device-count probe (MUST): anchor with the 20+ device statistic, then count the household's connected devices.",
    wordTrack:
      "On average, most households connect 20 or more devices to their Wi-Fi — how many devices do you connect? How many mobile lines are you connecting to Wi-Fi?",
  },
  {
    id: "disc-mobile-provider",
    phase: "Discovery",
    requirement: "Non-Spectrum Mobile customers: determine the existing provider and spend.",
    wordTrack: "What provider do you use — Verizon? T-Mobile? AT&T Wireless? And how much are you paying for those mobile lines?",
  },
  {
    id: "disc-streaming",
    phase: "Discovery",
    requirement: "Streaming probe: identify TV streaming services, count, and monthly spend.",
    wordTrack: "Does your household normally stream TV services? [IF YES] How many streaming services do you pay for per month?",
  },
  {
    id: "disc-price-lock",
    phase: "Discovery",
    requirement: "Price-lock preference question sets up the close.",
    wordTrack: "Most importantly, would you like to lock your price for 2 years or 3?",
  },
  {
    id: "disc-wins",
    phase: "Discovery",
    requirement: "Gather household WINs (What's Important Now): who uses what, devices and types, security, home office — across Caller, Spouse/Roommates, Children/Others.",
    wordTrack: "How do you currently use your devices in the home — streaming, gaming, working from home? How many are connected? Who helps with what?",
  },
  {
    id: "offer-talking-points",
    phase: "Offer & Assume the Sale",
    requirement: "Use talking points from discovery inside the pitch (discovery appropriation), with a linking statement between Internet and Mobile.",
    wordTrack: "…and there's an exclusive mobile offer by signing up for Internet today.",
  },
  {
    id: "offer-feature-benefit",
    phase: "Offer & Assume the Sale",
    requirement: "Restate value with a feature-and-benefits statement matched to the household.",
    wordTrack:
      "I recommend our Spectrum Internet 1 Gig service, specifically designed for households like yours, paired with our Unlimited Spectrum Mobile. The increased speeds let you keep multiple devices connected while streaming with no congestion.",
  },
  {
    id: "offer-mobile-savings",
    phase: "Offer & Assume the Sale",
    requirement: "Mobile savings proof: reviewed-bill framing with the $70/month → $1,000+/year comparison, then offer to pull their bill.",
    wordTrack:
      "Many of my customers said the same thing — and when I reviewed their mobile bill, the only reason they were paying less for Internet is because they were being charged over $70 per Mobile line. Let me prove to you that I can save you over $1,000 per year. Let's pull up your bill on your mobile phone.",
  },
  {
    id: "offer-assume",
    phase: "Offer & Assume the Sale",
    requirement: "Assume the sale with the lock-it-in transition. Default to Self-Install Kit (SIK) as the primary install option.",
    wordTrack:
      "The best part is we have everything in place — and in order to handle this for you, give me one moment while I lock it in for you.",
  },
  {
    id: "recap",
    phase: "Recap",
    requirement:
      "Recap order details: what services they're getting, monthly price, length of promo, price increase after promo, and Mobile.",
    wordTrack:
      "To make sure I captured what you said correctly: today you are paying $X.XX for your streaming apps, $X.XX for your internet, and $X.XX for your mobile lines — a total spend of $X.XX monthly. Did I miss anything?",
  },
];

// ——— The Pitch formula (handwritten notes, 7/22 class) ———
export const PITCH_FORMULA = {
  structure: "2 features + 2 benefits on the service initiating the call, 1 reason for Voice, plus Mobile savings.",
  durationSeconds: { min: 30, max: 45 },
  rules: [
    "Have purpose — every question and statement earns its place (Question Power Pause: ask with purpose, open-ended).",
    "Sell the promo — it is offered once.",
    "TV: sell the panorama — any TV channels they care about (e.g. TV One, Bravo, OWN) — then bring it back to their devices.",
    "Ease into pricing; use yourself as the price-point example and as the initiator: 'I like to use…'.",
    "Personalize to the caller; stay off hold; don't double up questions.",
    "Build anticipation, then use the natural stream-line to close (procedural approach).",
    "Recap with discovery + specific benefits: list their devices and the benefit each gets.",
  ],
  transitionToClose:
    "The best part is we have everything in place — and in order to handle this for you, give me one moment while I lock it in for you.",
} as const;

// ——— Discovery-3 framework (handwritten) ———
export const DISCOVERY_THREE = {
  probes: ["Who — household probe: who's in charge? who's it for? who helps with what?", "What — devices, shows and streams, most-important channels for the family", "Current spend — internet, streaming, mobile (positive assumptive: 'How much are you paying?')"],
  productOrder: ["① HSIA (Internet)", "② Video", "③ Home Phone"], // VERIFY exact circled order on the page
  screenTimeAngle: "A2: 'What are you doing for screen time now?' — opens the panorama for TV/streaming.",
  paySheet: "Create a pay sheet / cheat-off list of their current spend as you discover — acquire targets for the package analysis.",
} as const;

// ——— Flashcards ———
export const CLASS_CORPUS_FLASHCARDS: Flashcard[] = [
  {
    id: "class-callflow-greeting",
    module: 1,
    category: "Certified Call Flow",
    front: "Recite the certified Spectrum greeting and alignment word track.",
    back: "\"Thank you for calling Spectrum, my name is ____, I'm located in San Antonio, TX — how can I assist you?\" Then align: \"By the time we end this call, you'll be taken care of in terms of seamless connectivity and entertainment needs… let's start with your address?\" New customer → serviceability + email capture. Existing → authenticate + verify email.",
  },
  {
    id: "class-callflow-20devices",
    module: 2,
    category: "Certified Call Flow",
    front: "What statistic anchors the device-count discovery question, and what MUST follow it?",
    back: "\"On average, most households connect 20 or more devices to their Wi-Fi.\" Then count their devices, their mobile lines on Wi-Fi, their provider (Verizon/T-Mobile/AT&T) and spend, and their streaming services and spend.",
  },
  {
    id: "class-pricelock",
    module: 2,
    category: "Certified Call Flow",
    front: "What is the price-lock discovery question and why does it matter?",
    back: "\"Most importantly, would you like to lock your price for 2 years or 3?\" It is positive-assumptive: both answers move toward the sale and it pre-frames the promo-length recap item.",
  },
  {
    id: "class-pitch-formula",
    module: 8,
    category: "The Pitch",
    front: "What is the class pitch formula and time budget?",
    back: "2 features + 2 benefits on the service that initiated the call, 1 reason for Voice, plus Mobile savings — delivered in 30–45 seconds, with purpose. The promo is offered once.",
  },
  {
    id: "class-pitch-transition",
    module: 8,
    category: "The Pitch",
    front: "Recite the assume-the-sale transition line.",
    back: "\"The best part is we have everything in place — and in order to handle this for you, give me one moment while I lock it in for you.\" Then default to SIK as the primary install option and recap the order details.",
  },
  {
    id: "class-mobile-1000",
    module: 7,
    category: "Mobile Savings",
    front: "Deliver the $1,000 mobile-savings proof track.",
    back: "\"Many of my customers said the same thing — when I reviewed their bill, the only reason they paid less for Internet is they were being charged over $70 per Mobile line. Let me prove I can save you over $1,000 per year — let's pull up your bill on your phone.\" Verify actual figures against the live bill; never invent savings.",
  },
  {
    id: "class-discovery3",
    module: 2,
    category: "Discovery",
    front: "Name the three Discovery-3 probes and the product order.",
    back: "Who (household probe — who's in charge, who's it for, who helps with what), What (devices, shows/streams, most-important channels), Current spend (positive assumptive). Product order: HSIA → Video → Home Phone. Build a pay sheet of their current spend as you go.",
  },
  {
    id: "class-recap",
    module: 9,
    category: "Recap",
    front: "What five items must the order recap cover?",
    back: "What services they're getting, monthly price, length of promo, price increase after the promo, and Mobile. Close the loop: \"Did I miss anything?\"",
  },
  {
    id: "milestone1-pillars",
    module: 1,
    category: "Milestone 1",
    front: "Name the 4 Pillars of Spectrum's Customer Commitment.",
    back: "Always Improving, Exceptional Service, Transparency, and Reliable Connectivity.",
  },
  {
    id: "milestone1-fttp",
    module: 3,
    category: "Milestone 1",
    front: "What does FTTP stand for?",
    back: "Fiber To The Premise.",
  },
  {
    id: "milestone1-equipment",
    module: 3,
    category: "Milestone 1",
    front: "Per CoPilot, what two equipment pieces deliver both Internet and WiFi service?",
    back: "A modem and router — or a single Advanced WiFi gateway. (Milestone 1, Q6.)",
  },
  {
    id: "milestone1-instances",
    module: 3,
    category: "Milestone 1",
    front: "How many Spectrum Internet Gig instances are allowed per residential single-family home account?",
    back: "Two instances (Milestone 1, Q7 — verify the current CoPilot article for the exact per-account instance and total-line rule before quoting).",
  },
  {
    id: "milestone1-not-current",
    module: 3,
    category: "Milestone 1",
    front: "Which option is NOT a current SPP4 Internet service: Ultra, Assist, Premier, or Gig?",
    back: "Spectrum Internet Ultra — it is a legacy tier under PR131, not a current SPP4 offer.",
  },
  // ——— GEN9237 Voice (published 07/10/2026; replaces PR139) ———
  {
    id: "gen9237-core",
    module: 4,
    category: "GEN9237 Voice",
    front: "GEN9237: what is Spectrum Voice and how many lines can residential support?",
    back: "A residential landline service using a Spectrum-provided phone modem (customer phones connect by telephone cord; customer-owned modems are NOT supported). Residential supports up to two lines. Customers get a free private listing in the standard directory. GEN9237 replaced PR139 on 07/10/2026.",
  },
  {
    id: "gen9237-calling",
    module: 4,
    category: "GEN9237 Voice",
    front: "GEN9237: what calling is included, and what are Native vs Port?",
    back: "Unlimited calling to the U.S., Puerto Rico, Mexico, Canada, Guam, USVI, American Samoa, and Northern Mariana Islands. Native = choose a new number; Port = transfer an existing number when eligible.",
  },
  {
    id: "gen9237-e911",
    module: 4,
    category: "GEN9237 Voice",
    front: "GEN9237: what E911 facts must a new Voice customer understand?",
    back: "E911 automatically identifies the service address to the 911 operator. New customers must confirm understanding via Third Party Verification (TPV) before installation. E911 may fail during power outages without a backup battery, cable outages, suspended service, or if the modem is moved without a technician — and may not be available immediately at activation. A backup battery is available for purchase.",
  },
  {
    id: "gen9237-compat",
    module: 4,
    category: "GEN9237 Voice",
    front: "GEN9237: which household devices work with Spectrum Voice — and what should customers test?",
    back: "Corded phones, cordless systems, many home security systems, CapTel phones, fax machines, and most Life Alert systems. Customers should test alarm/emergency systems after installation. This is the 'Home Phone / Emergency Services / FAX' trio from the class call-flow sheet.",
  },
  {
    id: "gen9237-svi",
    module: 4,
    category: "GEN9237 Voice",
    front: "GEN9237: how does international calling work on Spectrum Voice?",
    back: "Standard per-minute international rates, or the optional Spectrum Voice International (SVI) add-on: unlimited calling to 70 countries (landline and mobile) with low per-minute rates elsewhere. Requires a Voice subscription. Incoming international calls are free to the customer.",
  },
];
