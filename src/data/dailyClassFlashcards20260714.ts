import type {
  Flashcard,
  FlashcardDeckTag,
  FlashcardSource,
  FlashcardSourceStatus,
} from "@/data/curriculum";

const MILESTONE_MEETING_ID = "5xL1_QCQXVhI1obxc0Pc2U99EpM";
const PREP_MEETING_ID = "0EO6q7NtX6hd_XBZr7VhYzhK2jQ";
const KAHOOT_MEETING_ID = "CuSN_Y2sLNIFY3ty9ytKq-jbd4k";

function milestoneSource(
  questionNumber: number,
  articleNumber: string,
  articleTitle: string,
  status: FlashcardSourceStatus,
): FlashcardSource {
  return {
    kind: "milestone-review",
    articleNumber,
    articleTitle,
    status,
    meetingId: MILESTONE_MEETING_ID,
    questionNumber,
    recordedAt: "2026-07-14T15:38:00-05:00",
  };
}

function milestoneCard(
  questionNumber: number,
  front: string,
  back: string,
  deckTags: FlashcardDeckTag[],
  articleNumber = "ARTICLE NEEDED",
  articleTitle = "Full milestone source article to collect",
  status: FlashcardSourceStatus = "needs-article",
): Flashcard {
  return {
    id: `daily14-mr-${String(questionNumber).padStart(2, "0")}`,
    module: 4,
    category: "Milestone Review",
    front: `Milestone ${questionNumber} · ${front}`,
    back,
    deckTags: ["milestone", ...deckTags],
    source: milestoneSource(
      questionNumber,
      articleNumber,
      articleTitle,
      status,
    ),
    origin: "verbatim-assessment",
  };
}

export const MILESTONE_REVIEW_FLASHCARDS_20260714: Flashcard[] = [
  milestoneCard(
    1,
    "What are the four pillars of the Spectrum Customer Commitment?",
    "Reliable Connectivity; Exceptional Service; Transparency at Every Step; Always Improving.",
    [],
  ),
  milestoneCard(
    2,
    "Which Copilot article type can be emailed to a customer?",
    "Email Helpful Hints.",
    [],
  ),
  milestoneCard(
    3,
    "Where in Copilot can agents see recently updated articles?",
    "Open the Recent tab.",
    [],
  ),
  milestoneCard(4, "What does FTTP stand for?", "Fiber to the Premises.", [
    "internet",
  ]),
  milestoneCard(
    5,
    "John needs professional installation today. Which two Customer Commitment options fit?",
    "Before 5 PM, offer a same-day appointment when quota is available. When today or next-day quota is unavailable, submit an ETD, or Escalated Dispatch, ticket for dispatch follow-up. The transcript first rendered ETP, then the trainer defined ETD; collect the exact test wording.",
    ["tv"],
    "ARTICLE NEEDED",
    "Same-day appointment and Escalated Dispatch procedure",
    "needs-clarification",
  ),
  milestoneCard(
    6,
    "Which two pieces of equipment provide Spectrum Internet and Wi‑Fi?",
    "A DOCSIS 3.1 modem and an Advanced WiFi router.",
    ["internet", "wifi"],
    "PR131",
    "Spectrum Internet Product Details",
    "article-verified",
  ),
  milestoneCard(
    7,
    "How many Spectrum Internet Gig instances can a residential single-family account have?",
    "Classroom answer: two Gig instances, within the account's total Internet-instance limit. Collect the exact Multiple Internet Instances article because the discussion also referenced Premier instances and six total lines.",
    ["internet"],
    "ARTICLE NEEDED",
    "Multiple Internet Instances business rules",
    "needs-clarification",
  ),
  milestoneCard(
    8,
    "Which option is not a current SPP4 Internet service?",
    "Spectrum Internet Ultra.",
    ["internet"],
    "PR131",
    "Spectrum Internet Product Details",
    "article-verified",
  ),
  milestoneCard(
    9,
    "Which feature is included with Spectrum Internet?",
    "No data caps.",
    ["internet"],
    "PR131",
    "Spectrum Internet Product Details",
    "article-verified",
  ),
  milestoneCard(
    10,
    "Which feature is included with every Spectrum Internet tier and can build offer value?",
    "Out-of-Home WiFi.",
    ["internet", "wifi"],
    "PR131",
    "Spectrum Internet Product Details",
    "article-verified",
  ),
  milestoneCard(
    11,
    "What speed pair applies to Spectrum Internet Gig, including symmetrical high-split areas?",
    "1000×35 Mbps, or 1000×1000 Mbps where symmetrical speeds are available.",
    ["internet"],
    "PR131",
    "Spectrum Internet Product Details",
    "article-verified",
  ),
  milestoneCard(
    12,
    "True or false: WiFi pods require a direct physical connection to the router.",
    "False. WiFi pods extend coverage wirelessly after approved setup and placement.",
    ["wifi"],
  ),
  milestoneCard(
    13,
    "Which qualities do not describe a Spectrum Life Unlimited Brand Ambassador?",
    "Weak communication; disingenuous or inauthentic behavior; unreliability or disengagement.",
    [],
  ),
  milestoneCard(
    14,
    "Which option is not one of Charter's values?",
    "Pursue the sale of triple play with every customer interaction.",
    [],
  ),
  milestoneCard(
    15,
    "True or false: RR and RRP plans are available for tablets and smartwatches.",
    "False. The classroom answer excludes tablets and smartwatches.",
    ["mobile"],
    "GEN9001",
    "Repair and Replacement Plans Overview",
    "article-verified",
  ),
  milestoneCard(
    16,
    "Which statement is not true about the service described as ‘pipeline to the fixed’ in the transcript?",
    "Hold for clarification. The captured answer was ‘service is only provided by third-party vendors,’ while the product name was not intelligible in the recording.",
    [],
    "ARTICLE NEEDED",
    "Question 16 product and business-rule article",
    "needs-clarification",
  ),
  milestoneCard(
    17,
    "Which three talking points support Spectrum Internet when Anna compares Spectrum with a competitor?",
    "Faster speeds with 99.9% network reliability; no data caps with unlimited capacity; and fast Internet regardless of time of day or number of connected users. Collect the exact option text before treating the wording as final.",
    ["internet"],
    "PR131",
    "Spectrum Internet Product Details",
    "needs-clarification",
  ),
  milestoneCard(
    18,
    "Which feature lets visiting Spectrum Mobile customers connect without the homeowner sharing credentials?",
    "Classroom answer: the Spectrum Mobile SSID, described during review as a Spectrum Mobile wireless access point. The trainer said this item would be double-checked.",
    ["mobile", "wifi"],
    "ARTICLE NEEDED",
    "Spectrum Mobile SSID or wireless access point article",
    "needs-clarification",
  ),
  milestoneCard(
    19,
    "True or false: Residential Sales Offer Index promotional rates include optional add-ons, extra equipment, taxes, and fees.",
    "False. Optional upgrades, added equipment, taxes, and fees are added to the promotional line-of-business rate.",
    [],
    "GEN9079",
    "Residential Sales Offer Index",
    "article-verified",
  ),
  milestoneCard(
    20,
    "A single-play Internet customer accepts a Customer Loyalty offer and adds TV plus two Mobile lines. How long is the price guarantee?",
    "36 months.",
    ["internet", "tv", "mobile"],
    "GEN9168",
    "Customer Loyalty Offers",
    "article-verified",
  ),
  milestoneCard(
    21,
    "Which option is not a category in the Sales Offer Index?",
    "Mobile acquisition promotions.",
    ["mobile"],
    "GEN9079",
    "Residential Sales Offer Index",
    "article-verified",
  ),
  milestoneCard(
    22,
    "True or false: an existing customer can qualify for a promotional rate on a new line of business when it has not been on the account during the last 30 days.",
    "True, according to the classroom review. Confirm current offer eligibility in the live account and article.",
    [],
    "GEN9079",
    "Residential Sales Offer Index",
    "article-verified",
  ),
  milestoneCard(
    23,
    "True or false: Price Guarantee protects equipment, premium channels, and other ancillary charges from rate adjustments.",
    "False. The guarantee applies to the eligible promotional service rate, not ancillary services or equipment charges.",
    [],
    "GEN9079",
    "Residential Sales Offer Index",
    "article-verified",
  ),
  milestoneCard(
    24,
    "Which statement about Spectrum Internet Gig is true?",
    "Speeds are up to 1000 Mbps. One-gigabit WiFi performance is not guaranteed.",
    ["internet", "wifi"],
    "PR131",
    "Spectrum Internet Product Details",
    "article-verified",
  ),
  milestoneCard(
    25,
    "How do agents open the list of Copilot articles they subscribe to?",
    "Hover over Dashboard, then select Subscriptions.",
    [],
    "GEN6562",
    "Full GEN6562 article title to collect",
    "needs-article-title",
  ),
  milestoneCard(
    26,
    "True or false: a customer at an SIA pre-qualified location can add SIA without completing the application process.",
    "True. The pre-qualified location flag supplies the qualifying path; verify it in the account before fulfillment.",
    ["internet"],
    "GEN6633 · GEN9008",
    "Spectrum Internet Assist Eligibility · Spectrum Internet Assist Overview",
    "article-verified",
  ),
  milestoneCard(
    27,
    "Which program does not qualify a customer for Spectrum Internet Assist?",
    "Supplemental Nutrition Assistance Program, or SNAP, was the classroom answer.",
    ["internet"],
    "GEN6633 · GEN9008",
    "Spectrum Internet Assist Eligibility · Spectrum Internet Assist Overview",
    "article-verified",
  ),
  milestoneCard(
    28,
    "True or false: the Internet 2 Gig statement captured as ‘users won all March week tonight.’",
    "Hold for clarification. The classroom answer was false, but the statement itself was not intelligible enough to study safely.",
    ["internet"],
    "PR131",
    "Spectrum Internet Product Details",
    "needs-clarification",
  ),
  milestoneCard(
    29,
    "How does Security Shield protect a customer's home WiFi?",
    "The classroom answer was ‘all of the above.’ Collect every answer option so each protection can be studied directly.",
    ["wifi"],
    "ARTICLE NEEDED",
    "Security Shield product article and complete answer options",
    "needs-clarification",
  ),
  milestoneCard(
    30,
    "Why should customers use Spectrum-provided modem and router equipment?",
    "The classroom answer was ‘all of the above.’ Collect the complete option set before using this as an authoritative product card.",
    ["internet", "wifi"],
    "PR131",
    "Spectrum Internet Product Details",
    "needs-clarification",
  ),
  milestoneCard(
    31,
    "Which option is not a current SPP4 video package?",
    "Spectrum TV Lifestyle was the classroom answer; collect the exact displayed product name.",
    ["tv"],
    "ARTICLE NEEDED",
    "SPP4 Spectrum TV package article",
    "needs-clarification",
  ),
  milestoneCard(
    32,
    "What service must a customer have to add Spectrum TV Stream?",
    "Spectrum Internet.",
    ["internet", "tv"],
  ),
  milestoneCard(
    33,
    "Which statement about out-of-home channel availability is false?",
    "‘Video quality is reduced after 60 GB of out-of-home streaming’ is false; Spectrum Internet has no data caps.",
    ["internet", "tv"],
  ),
  milestoneCard(
    34,
    "Which two statements about adding Spectrum TV Choice are true?",
    "Customers can change the lineup during the first 30 days, and may choose one regional sports network available in their market. Collect the exact option wording and change limit.",
    ["tv"],
    "ARTICLE NEEDED",
    "Spectrum TV Choice product details",
    "needs-clarification",
  ),
  milestoneCard(
    35,
    "Which pitch best fits Lillian's sports, entertainment, streaming-app, and Fox-channel needs?",
    "Hold for clarification. The trainer selected option A and referenced TV Select plus an added entertainment tier and included apps, but the plan name was not captured cleanly.",
    ["tv"],
    "ARTICLE NEEDED",
    "Spectrum TV package and included-app comparison",
    "needs-clarification",
  ),
  milestoneCard(
    36,
    "Which channel is not available through Spectrum TV Stream?",
    "ESPN was the classroom answer.",
    ["tv"],
  ),
  milestoneCard(
    37,
    "Which option is not included in Spectrum TV Signature single play?",
    "Cloud DVR.",
    ["tv"],
  ),
  milestoneCard(
    38,
    "Which TV service is considered an add-on after Entertainment View?",
    "Hold for clarification. The trainer confirmed option D, but the service name was not intelligible in the recording.",
    ["tv"],
    "ARTICLE NEEDED",
    "Entertainment View add-on hierarchy",
    "needs-clarification",
  ),
  milestoneCard(
    39,
    "Which three features are included with Spectrum Voice International?",
    "Hold for clarification. The trainer confirmed options A, B, and C, while the option text was not spoken clearly enough to reconstruct.",
    ["voice"],
    "PR139",
    "Spectrum Voice Product Details",
    "needs-clarification",
  ),
  milestoneCard(
    40,
    "Which statement about Spectrum Voice is true?",
    "Hold for clarification. The trainer confirmed option A, while the full option text was not captured.",
    ["voice"],
    "PR139",
    "Spectrum Voice Product Details",
    "needs-clarification",
  ),
  milestoneCard(
    41,
    "Which two Voice features answer a customer's concern about spam calls?",
    "Call Guard and Selective Call Acceptance.",
    ["voice"],
    "PR139",
    "Spectrum Voice Product Details",
    "article-verified",
  ),
  milestoneCard(
    42,
    "How many residential Spectrum Voice lines can a customer have on one account?",
    "Two residential Voice lines.",
    ["voice"],
    "PR139",
    "Spectrum Voice Product Details",
    "article-verified",
  ),
  milestoneCard(
    43,
    "Which statement about Spectrum WiFi pods is not true?",
    "‘A customer in a 1,200-square-foot, two-level home should have two pods’ is not true. Pod count follows the approved coverage assessment.",
    ["wifi"],
  ),
  milestoneCard(
    44,
    "Which statement about Advanced Home WiFi is false?",
    "‘Customers must have TV service to qualify’ is false. TV is not the qualifying requirement.",
    ["wifi", "tv"],
  ),
  milestoneCard(
    45,
    "Which option is not a feature of the Xumo Stream Box?",
    "Hold for clarification. The recording rendered the selected option as ‘won't control,’ so the exact answer text and product article are needed.",
    ["tv"],
    "ARTICLE NEEDED",
    "Xumo Stream Box product features",
    "needs-clarification",
  ),
];

function prepCard(id: string, front: string, back: string): Flashcard {
  return {
    id: `daily14-prep-${id}`,
    module: 10,
    category: "Milestone Prep",
    front,
    back,
    deckTags: ["milestone"],
    source: {
      kind: "milestone-prep",
      articleNumber: "CLASS-2026-07-14",
      articleTitle: "Milestone preparation briefing",
      status: "classroom-verified",
      meetingId: PREP_MEETING_ID,
      recordedAt: "2026-07-14T08:21:00-05:00",
    },
    origin: "verbatim-prep",
  };
}

export const MILESTONE_PREP_FLASHCARDS_20260714: Flashcard[] = [
  prepCard(
    "pool",
    "How many questions appear on the milestone test from the full review pool?",
    "The test presents 25 questions selected from the complete review pool.",
  ),
  prepCard(
    "time",
    "How much time is available for the milestone test?",
    "Up to 60 minutes.",
  ),
  prepCard(
    "multi-select",
    "How should ‘select the best two’ or ‘select the best three’ questions be answered?",
    "Choose every requested answer. Selecting only part of the requested set makes the item incorrect.",
  ),
  prepCard(
    "follow-up",
    "What does Mark to Follow do during the milestone?",
    "It flags the question and returns it at the end. Clear the flag after supplying the final answer.",
  ),
  prepCard(
    "score",
    "What milestone score and attempt rules were reviewed in class?",
    "The classroom briefing described five milestones worth 150 points total, with 138 points needed to pass, two attempts per milestone, a retake within 24 hours, and the higher score retained. Confirm the current milestone policy before testing.",
  ),
];

function kahootCard(
  id: string,
  front: string,
  back: string,
  deckTags: FlashcardDeckTag[],
  articleNumber = "HOW7726",
  articleTitle = "Supporting Invincible WiFi",
  status: FlashcardSourceStatus = "article-verified",
): Flashcard {
  return {
    id: `daily14-kahoot-${id}`,
    module: 4,
    category: "Kahoot",
    front,
    back,
    deckTags: ["kahoot", ...deckTags],
    source: {
      kind: "kahoot",
      articleNumber,
      articleTitle,
      status,
      meetingId: KAHOOT_MEETING_ID,
      recordedAt: "2026-07-07T08:23:00-05:00",
    },
    origin: "verbatim-assessment",
  };
}

export const KAHOOT_FLASHCARDS_20260707: Flashcard[] = [
  kahootCard(
    "dsl-cable",
    "Kahoot · Which cable type carries DSL service?",
    "Twisted-pair telephone cable. Collect the original Kahoot question source before using this outside class review.",
    ["internet"],
    "ARTICLE NEEDED",
    "Original WiFi Kahoot question source",
    "needs-article",
  ),
  kahootCard(
    "wifi-standard",
    "Kahoot · Which WiFi generation is built into Invincible WiFi?",
    "WiFi 7.",
    ["wifi"],
  ),
  kahootCard(
    "cellular-backup",
    "Kahoot · Which backup connection is built into Invincible WiFi?",
    "5G cellular backup. The classroom audio briefly said LTE; HOW7726 is the controlling captured article.",
    ["wifi"],
  ),
  kahootCard(
    "battery",
    "Kahoot · How long can the Invincible WiFi battery provide resilience during an outage?",
    "Up to eight hours under the article's supported conditions.",
    ["wifi"],
  ),
  kahootCard(
    "instance",
    "Kahoot · How many Invincible WiFi instances can an account have?",
    "One. Additional Internet instances cannot also have Invincible WiFi.",
    ["internet", "wifi"],
  ),
  kahootCard(
    "devices",
    "Kahoot · How many connected devices does Invincible WiFi support?",
    "Up to 250 devices, according to the classroom reading of HOW7726.",
    ["wifi"],
  ),
];

export const DAILY_CLASS_FLASHCARDS_20260714: Flashcard[] = [
  ...MILESTONE_REVIEW_FLASHCARDS_20260714,
  ...MILESTONE_PREP_FLASHCARDS_20260714,
  ...KAHOOT_FLASHCARDS_20260707,
];

const CLARIFICATION_NOTES: Record<number, string> = {
  5: "Collect the exact same-day and ETD option wording and the controlling dispatch article.",
  7: "Confirm Gig-instance count, Premier-instance interaction, and total account limit from the Multiple Internet Instances article.",
  16: "Recover the product name and every option; the audio rendered it as ‘pipeline to the fixed.’",
  17: "Capture the exact three answer choices instead of relying on the classroom paraphrase.",
  18: "Confirm Spectrum Mobile SSID versus wireless access point terminology in the current article.",
  28: "Recover the full Internet 2 Gig statement; only the classroom answer ‘false’ survived clearly.",
  29: "Capture every Security Shield option and its article number and title.",
  30: "Capture every Spectrum-equipment option associated with ‘all of the above.’",
  31: "Confirm the exact non-SPP4 video-package name.",
  34: "Confirm the first-30-day lineup-change limit and regional-sports-network wording.",
  35: "Capture option A and the exact TV package or add-on name selected for Lillian.",
  38: "Recover the name of option D and the Entertainment View add-on hierarchy.",
  39: "Capture the three Spectrum Voice International feature options.",
  40: "Capture the full true Spectrum Voice statement in option A.",
  45: "Capture the exact Xumo Stream Box option rendered as ‘won't control.’",
};

export type DailyIngestionQueueItem = {
  cardId: string;
  prompt: string;
  missing: string[];
  nextIngestionTarget: string;
};

export const NEXT_DAILY_INGESTION_QUEUE_20260714: DailyIngestionQueueItem[] =
  DAILY_CLASS_FLASHCARDS_20260714.filter(
    (card) =>
      card.source?.status === "needs-article" ||
      card.source?.status === "needs-article-title" ||
      card.source?.status === "needs-clarification",
  ).map((card) => {
    const questionNumber = card.source?.questionNumber;
    const missing: string[] = [];
    if (card.source?.articleNumber === "ARTICLE NEEDED")
      missing.push("article number");
    if (
      card.source?.articleTitle.includes("collect") ||
      card.source?.articleTitle.includes("needed") ||
      card.source?.articleTitle.includes("Needed")
    )
      missing.push("full article name");
    if (card.source?.status === "needs-clarification")
      missing.push("exact question or answer wording");
    return {
      cardId: card.id,
      prompt: card.front,
      missing,
      nextIngestionTarget:
        questionNumber && CLARIFICATION_NOTES[questionNumber]
          ? CLARIFICATION_NOTES[questionNumber]
          : "Collect the controlling article number, full article title, and exact classroom wording.",
    };
  });
