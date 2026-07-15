import type { Flashcard, FlashcardSource } from "@/data/curriculum";

function article(articleNumber: string, articleTitle: string): FlashcardSource {
  return {
    kind: "article",
    articleNumber,
    articleTitle,
    status: "article-verified",
    recordedAt: "2026-07-15",
  };
}

function sourced(
  id: string,
  articleNumber: string,
  articleTitle: string,
  category: string,
  front: string,
  back: string,
  deckTags: Flashcard["deckTags"] = ["mobile"],
): Flashcard {
  return {
    id: `gmail15-${id}`,
    module: 4,
    category,
    front: `${articleNumber}: ${front}`,
    back: `${back} Source: ${articleNumber} — ${articleTitle}.`,
    deckTags,
    source: article(articleNumber, articleTitle),
    origin: "source-derived",
  };
}

function mastery(
  id: string,
  articleNumber: string,
  articleTitle: string,
  category: string,
  front: string,
  back: string,
  deckTags: Flashcard["deckTags"] = ["mobile"],
): Flashcard {
  return {
    id: `gmail15-mastery-${id}`,
    module: 9,
    category,
    front: `Mastery scenario · ${front}`,
    back: `${back} Source basis: ${articleNumber} — ${articleTitle}.`,
    deckTags,
    source: article(articleNumber, articleTitle),
    origin: "generated-mastery",
  };
}

export const GMAIL_SOURCE_FLASHCARDS_20260715: Flashcard[] = [
  sourced(
    "byod-tool",
    "GEN7777",
    "Spectrum Mobile Bring Your Own Device (BYOD)",
    "BYOD",
    "When should the online BYOD Eligibility Check tool be used?",
    "Use it for a device that has not already been activated on Spectrum Mobile. For a device already on an account, use the BYOD Compatibility Matrix.",
  ),
  sourced(
    "byod-dual-sim",
    "GEN7777",
    "Spectrum Mobile Bring Your Own Device (BYOD)",
    "BYOD",
    "Which IMEI should be entered for a dual-SIM device?",
    "Enter the primary IMEI, or IMEI1.",
  ),
  sourced(
    "byod-state",
    "GEN7777",
    "Spectrum Mobile Bring Your Own Device (BYOD)",
    "BYOD",
    "What device state must be confirmed before activation?",
    "The device must be paid in full, not reported lost or stolen, unlocked, updated to current software, and backed up.",
  ),
  sourced(
    "byod-failure",
    "GEN7777",
    "Spectrum Mobile Bring Your Own Device (BYOD)",
    "BYOD",
    "What happens when the model is eligible but the IMEI fails?",
    "If locked or blocklisted, send the customer to the prior carrier. If neither applies and eligibility still fails, follow the department escalation process.",
  ),
  sourced(
    "byod-features",
    "GEN7777",
    "Spectrum Mobile Bring Your Own Device (BYOD)",
    "BYOD",
    "What feature caveat applies to some international or carrier models?",
    "They may not receive Spectrum firmware; Spectrum apps may require manual installation and features such as WiFi Calling may not work, while ordinary cellular data, calls and texts can still work.",
  ),

  sourced(
    "pbb-maximum",
    "GEN9023",
    "Spectrum Mobile Phone Balance Buyout (PBB) Overview",
    "Phone Balance Buyout",
    "What is the captured maximum PBB reward and frequency?",
    "The captured article describes a one-time offer per account worth up to $2,500, subject to current approval and reimbursement rules.",
  ),
  sourced(
    "pbb-lines",
    "GEN9023",
    "Spectrum Mobile Phone Balance Buyout (PBB) Overview",
    "Phone Balance Buyout",
    "What is the current minimum-line structure in the captured article?",
    "The order must include two new lines and both must be ported. Current live rules control if the article changes.",
  ),
  sourced(
    "pbb-stack",
    "GEN9023",
    "Spectrum Mobile Phone Balance Buyout (PBB) Overview",
    "Phone Balance Buyout",
    "Which plans and offer types can combine with PBB?",
    "By the Gig, Unlimited and Unlimited Plus are eligible. The article says PBB can stack with service promotions, device promotions and trade-in offers; BYOD, paid-in-full and device-payment-plan options are eligible.",
  ),
  sourced(
    "pbb-exclusions",
    "GEN9023",
    "Spectrum Mobile Phone Balance Buyout (PBB) Overview",
    "Phone Balance Buyout",
    "Who is excluded from PBB in the captured article?",
    "Spectrum employees and standalone Mobile accounts are not eligible.",
  ),
  sourced(
    "pbb-intent",
    "GEN9023",
    "Spectrum Mobile Phone Balance Buyout (PBB) Overview",
    "Phone Balance Buyout",
    "When must PBB intent be declared?",
    "At order entry. PBB cannot be added retroactively after the order is submitted.",
  ),
  sourced(
    "pbb-retention",
    "GEN9023",
    "Spectrum Mobile Phone Balance Buyout (PBB) Overview",
    "Phone Balance Buyout",
    "What 12-month responsibility follows a PBB payout?",
    "At least one line must remain active for 12 months starting when payout begins. Early cancellation can require repayment on the Spectrum bill.",
  ),
  sourced(
    "pbb-history",
    "GEN9023",
    "Spectrum Mobile Phone Balance Buyout (PBB) Overview",
    "Phone Balance Buyout",
    "What prior-carrier history is required?",
    "At least 90 days with the current carrier, at least three device payments, a current bill showing balances and payment history, and good standing during the claim process.",
  ),
  sourced(
    "pbb-scope",
    "GEN9023",
    "Spectrum Mobile Phone Balance Buyout (PBB) Overview",
    "Phone Balance Buyout",
    "Which lines count toward reimbursement?",
    "Only eligible ported lines are reimbursed. Up to 20 eligible lines may be brought, but wearables and accessories do not count toward eligibility or payout.",
  ),
  sourced(
    "pbb-card",
    "GEN9023",
    "Spectrum Mobile Phone Balance Buyout (PBB) Overview",
    "Phone Balance Buyout",
    "What limitations apply to the Visa reward card?",
    "It can make most Visa purchases and a one-time Spectrum payment, but not Auto Pay; it has no cash value and cannot be transferred to a bank, PayPal, Venmo or Zelle or used to pay a credit-card bill.",
  ),

  sourced(
    "upgrade-eligibility",
    "HOW7449",
    "Mobile Anytime Upgrade",
    "Anytime Upgrade",
    "Who is eligible for Anytime Upgrade?",
    "New and existing Unlimited Plus phone customers, employees with Unlimited Plus, and standalone Unlimited Plus customers are eligible. Tablets and smartwatches are not.",
  ),
  sourced(
    "upgrade-limits",
    "HOW7449",
    "Mobile Anytime Upgrade",
    "Anytime Upgrade",
    "What transaction limit and fee apply?",
    "Up to four Anytime Upgrade transactions in a rolling 12-month period, with a captured $35 fee at upgrade.",
  ),
  sourced(
    "upgrade-wait",
    "HOW7449",
    "Mobile Anytime Upgrade",
    "Anytime Upgrade",
    "Who can upgrade immediately and who waits 30 days?",
    "A new Unlimited Plus customer can redeem immediately. A line moved from Unlimited or By the Gig to Unlimited Plus must wait 30 days.",
  ),
  sourced(
    "upgrade-downgrade",
    "HOW7449",
    "Mobile Anytime Upgrade",
    "Anytime Upgrade",
    "How soon can a customer downgrade after redeeming an Anytime Upgrade?",
    "After two full billing cycles.",
  ),
  sourced(
    "upgrade-dpp",
    "HOW7449",
    "Mobile Anytime Upgrade",
    "Anytime Upgrade",
    "What happens to the original device-payment balance?",
    "The remaining balance is waived for a qualified transaction, but installments continue until the new device ships and extra payments may occur for preorders or backorders.",
  ),
  sourced(
    "upgrade-return",
    "HOW7449",
    "Mobile Anytime Upgrade",
    "Anytime Upgrade",
    "What condition and return rules apply to the old device?",
    "It must be operable, power on, have no locks, loss/stolen status, cracks, major or liquid damage. Mail it to Assurant within 30 days of receiving the replacement; damaged but operable devices can receive adjusted value.",
  ),
  sourced(
    "upgrade-shipping",
    "HOW7449",
    "Mobile Anytime Upgrade",
    "Anytime Upgrade",
    "Can the upgrade be cancelled after the new device ships?",
    "No. The captured article says there is no cancellation escalation after shipment; the normal device exchange window is 14 days.",
  ),
  sourced(
    "upgrade-early",
    "HOW7449",
    "Mobile Anytime Upgrade",
    "Anytime Upgrade",
    "How does Anytime Upgrade differ from legacy Early Upgrade?",
    "Anytime Upgrade replaces Early Upgrade for Unlimited Plus phone lines. Apple customers on Unlimited or By the Gig may still use Early Upgrade in a Spectrum Store after paying 50% of the device.",
  ),

  sourced(
    "rr-foldables",
    "GEN9001",
    "Repair and Replacement Plans Overview",
    "Device Protection",
    "Why is RRP especially relevant to high-value foldable devices?",
    "The captured examples show very high unprotected foldable repair or replacement exposure, while RRP uses the applicable $29 glass/battery services and device-tier deductibles. Verify the exact device tier before quoting.",
  ),
  sourced(
    "wifi-wireless",
    "HOW7726",
    "Supporting Invincible WiFi",
    "Invincible WiFi",
    "Which devices receive backup connectivity during a power outage?",
    "Only connected wireless devices. Ethernet-connected devices do not receive Internet from the cellular backup path.",
    ["wifi"],
  ),
  sourced(
    "wifi-reconnect",
    "HOW7726",
    "Supporting Invincible WiFi",
    "Invincible WiFi",
    "What wait can follow removal for continued-use misuse?",
    "The captured reconnect workflow says the product can be added again on or after the downgrade date plus 60 days, with Lead Assist required for an earlier request.",
    ["wifi"],
  ),
  sourced(
    "wifi-light",
    "HOW7726",
    "Supporting Invincible WiFi",
    "Invincible WiFi",
    "How long can the router take to show a solid blue activation light?",
    "About 10 minutes; the backup-battery light can continue pulsing until fully charged.",
    ["wifi"],
  ),
  sourced(
    "mobile-compare",
    "PR223",
    "Spectrum Mobile Service Product Details",
    "Mobile Positioning",
    "What comparison frame should lead against another carrier?",
    "Compare total connectivity: Spectrum Internet, secure WiFi access points, Speed Boost, nationwide coverage and household cost. Do not lead with the third-party carrier name.",
  ),
  sourced(
    "7gig-bundle",
    "PR131",
    "Spectrum Internet Product Details",
    "Internet Bundles",
    "Which bundle benefits were captured for 7 Gig?",
    "The cDVR discount requires a TV plus eligible 1 Gig, 2 Gig or 7 Gig SPP4 Internet bundle. The Xumo discount requires a TV plus Internet SPP4 bundle. Verify current offer eligibility.",
    ["internet", "tv"],
  ),
];

export const GMAIL_MASTERY_FLASHCARDS_20260715: Flashcard[] = [
  mastery(
    "traveler-upgrade",
    "HOW7449",
    "Mobile Anytime Upgrade",
    "Ideal Solution",
    "A frequent traveler wants premium plan benefits and regular device upgrades. What avenue should be verified?",
    "Verify Unlimited Plus and Anytime Upgrade eligibility, then compare the device-protection need separately. Do not imply every device type qualifies.",
  ),
  mastery(
    "low-data",
    "PR223",
    "Spectrum Mobile Service Product Details",
    "Plan Comparison",
    "A mostly-on-WiFi customer uses very little cellular data. Which plan is the comparison starting point?",
    "Compare By the Gig with Unlimited using expected shared whole-GB usage, household line count and the live offer; avoid choosing on headline price alone.",
  ),
  mastery(
    "foldable",
    "GEN9001",
    "Repair and Replacement Plans Overview",
    "Ideal Solution",
    "A customer is financing an expensive foldable and worries about liquid damage, battery and glass. Which protection comparison matters?",
    "Compare RRP’s broader accidental, mechanical/electrical, battery and glass coverage against base RR, using the exact device tier and state rules.",
  ),
  mastery(
    "owes-devices",
    "GEN9023",
    "Spectrum Mobile Phone Balance Buyout (PBB) Overview",
    "Upgrade Avenue",
    "A customer owes balances on two phones and wants to switch. What must discovery verify before promising PBB?",
    "Verify both new lines will port, intent is declared at order, three installments and 90-day carrier history exist, accounts are in good standing, and the live credit/reward rules qualify.",
  ),
  mastery(
    "byod-failure",
    "GEN7777",
    "Spectrum Mobile Bring Your Own Device (BYOD)",
    "Scenario",
    "An eligible model fails the IMEI checker. What is the correct path?",
    "Check lock and blocklist status first. Route those issues to the prior carrier; otherwise follow the department escalation path instead of forcing the order.",
  ),
  mastery(
    "ethernet-outage",
    "HOW7726",
    "Supporting Invincible WiFi",
    "Scenario",
    "A work-from-home customer expects a wired desktop to stay online through Invincible WiFi backup. What nuance must be disclosed?",
    "The cellular backup serves connected wireless devices, not Ethernet devices. Confirm the customer’s critical devices can use WiFi before positioning it as the ideal continuity solution.",
    ["wifi"],
  ),
  mastery(
    "7gig-bundle",
    "PR131",
    "Spectrum Internet Product Details",
    "Bundle Avenue",
    "A qualified 7 Gig customer wants TV, cDVR and Xumo value. What must be separated?",
    "Verify the TV-plus-eligible-Internet requirement for cDVR and the TV-plus-SPP4-Internet requirement for Xumo; eligibility and live offer screens control each benefit.",
    ["internet", "tv"],
  ),
  mastery(
    "upgrade-wait",
    "HOW7449",
    "Mobile Anytime Upgrade",
    "Scenario",
    "An Unlimited customer upgrades to Unlimited Plus today and wants a new device immediately through Anytime Upgrade. What happens?",
    "The captured rule requires a 30-day wait after moving the line to Unlimited Plus before redemption.",
  ),
  mastery(
    "network-objection",
    "PR223",
    "Spectrum Mobile Service Product Details",
    "Competitive Positioning",
    "A customer asks whether Spectrum simply resells another carrier. How should the answer be framed?",
    "Lead with Spectrum’s total-connectivity experience, WiFi backbone, secure access points and nationwide coverage. Name the licensed MVNO network only if specifically asked.",
  ),
  mastery(
    "2gig-fit",
    "PR131",
    "Spectrum Internet Product Details",
    "Ideal Solution",
    "A creator household has heavy uploads, multiple gamers and many devices. Is 2 Gig automatically the answer?",
    "No. Treat 2 Gig as a capability avenue: verify address eligibility, equipment and current offer, then compare the actual upload, concurrency and coverage need against Gig and WiFi improvements.",
    ["internet", "wifi"],
  ),
];

export const GMAIL_FLASHCARDS_20260715: Flashcard[] = [
  ...GMAIL_SOURCE_FLASHCARDS_20260715,
  ...GMAIL_MASTERY_FLASHCARDS_20260715,
];

export const GMAIL_INGESTION_REPORT_20260715 = {
  medium: "Gmail",
  completedOn: "2026-07-15",
  reviewedProductMessages: 8,
  articleFamilies: 7,
  sourceCardsAdded: GMAIL_SOURCE_FLASHCARDS_20260715.length,
  masteryCardsAdded: GMAIL_MASTERY_FLASHCARDS_20260715.length,
  verbatimAssessmentCardsAdded: 0,
  peopleProfilesAdded: 0,
  duplicatePolicy:
    "Existing Outlook and classroom cards were retained and reused; no duplicate Gmail copy was added.",
  profilePolicy:
    "No new role could be established from Gmail sender or copied-recipient evidence, so no speculative person profile was created.",
  privacyPolicy:
    "Credentials, case identifiers, personnel documents and raw mailbox content were excluded from study data.",
} as const;

export const GMAIL_NEXT_INGESTION_QUEUE_20260715 = [
  {
    id: "gmail-next-verbatim",
    title: "Original Milestone and Kahoot wording",
    detail:
      "No new verbatim assessment prompt was present in the reviewed Gmail slice. Target the original classroom display, facilitator export or a complete Otter capture next.",
  },
  {
    id: "gmail-next-gen8761",
    title: "GEN8761 full article body",
    detail:
      "The Mobile Device Trade-In Policies and Business Rules material was partial. Capture the full current article before expanding authoritative trade-in cards.",
  },
  {
    id: "gmail-next-plan-conflict",
    title: "PR223 plan-threshold reconciliation",
    detail:
      "The internal article and public plan wording remain different. Capture the current approved sales source and effective date before converting thresholds into exam answers.",
  },
  {
    id: "gmail-next-pbb-readback",
    title: "GEN9023 required read-back language",
    detail:
      "Capture the complete current talking points and disclosures used immediately before order submission so the PBB workflow can be drilled verbatim.",
  },
] as const;
