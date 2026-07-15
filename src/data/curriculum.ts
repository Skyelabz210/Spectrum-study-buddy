// Spectrum SAS curriculum derived from weekly Otter training review.
// Domain: Spectrum inbound sales onboarding, call flow, SOP discipline, tools, and scenario practice.
// Official SOP, facilitator updates, and current company policy control when any conflict appears.

export type Lesson = {
  id: string;
  title: string;
  why: string;
  body: string;
  tips?: string[];
};

export type Section = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Module = {
  id: string;
  number: number;
  title: string;
  tag: string;
  emoji: string;
  summary: string;
  sections: Section[];
};

export const MODULES: Module[] = [
  {
    id: "m1",
    number: 1,
    title: "Call Flow & Scope of Support",
    tag: "Foundation",
    emoji: "☎️",
    summary:
      "The call spine: greet, discover, present, handle, close, and route only after the correct support path is complete.",
    sections: [
      {
        id: "m1s1",
        title: "Call Spine",
        lessons: [
          {
            id: "m1s1l1",
            title: "Do not surrender the call too early",
            why: "A first request for a supervisor or billing does not automatically mean transfer.",
            body: "Use the call flow first. Ask for a brief scenario, read notes, determine what is inside scope, attempt a valid solution, and only route after the required process is complete.",
            tips: [
              "Bridge: 'Do you mind giving me a brief scenario so I can get the right help lined up?'",
              "If a customer becomes abusive, follow the approved warning and disconnect process rather than reacting emotionally.",
            ],
          },
          {
            id: "m1s1l2",
            title: "Hold check-ins protect trust",
            why: "Long silence makes customers feel abandoned and damages control of the call.",
            body: "When a customer is on hold, check back at the required interval. Give a useful status update, ask permission to continue holding, and keep the customer oriented.",
          },
          {
            id: "m1s1l3",
            title: "Bullet points beat robotic scripts",
            why: "The customer must hear a human, but compliance points still have to be hit.",
            body: "You do not have to sound identical to every other agent. You do have to hit required disclosures, authentication steps, consent points, and call-flow milestones.",
          },
        ],
      },
      {
        id: "m1s2",
        title: "Scope Boundaries",
        lessons: [
          {
            id: "m1s2l1",
            title: "Lowering a bill is relative",
            why: "A customer may ask to lower the bill, but the real need may be value, consolidation, or a better service mix.",
            body: "Discovery decides the path. A lower bill may come from a downgrade, but it may also come from moving mobile lines, improving coverage, or replacing a more expensive provider. Connect the offer to the stated problem.",
            tips: [
              "Ask who they use for mobile and what they pay before proposing mobile.",
              "Move from price-only thinking to benefit-per-cost thinking.",
            ],
          },
          {
            id: "m1s2l2",
            title: "Route after the intended role is complete",
            why: "Routing is allowed, but it should not replace discovery and valid offer presentation.",
            body: "Complete greeting, discovery, relevant pitch, objection handling, and scope check. If the customer still needs billing, retention, or another department, route using the approved path.",
          },
        ],
      },
    ],
  },
  {
    id: "m2",
    number: 2,
    title: "Integrity, SOP & Zero-Tolerance Rules",
    tag: "Policy gates",
    emoji: "🛡️",
    summary:
      "The non-negotiables: consent, account changes, discounts, orders, time codes, and audit behavior.",
    sections: [
      {
        id: "m2s1",
        title: "Zero-Tolerance Behaviors",
        lessons: [
          {
            id: "m2s1l1",
            title: "Never substitute personal identity data",
            why: "Using your own identity, payment, or profile data on a customer workflow creates a serious integrity risk.",
            body: "Customer information must come from the customer or approved account records. Never substitute your own data or another person's data to push an order through.",
          },
          {
            id: "m2s1l2",
            title: "Customer consent is mandatory",
            why: "A sale without full commitment can become a billing dispute and a regulatory issue.",
            body: "There are no placeholder orders. If the customer says they need to ask someone first, do not place the order as if they approved it. Use a valid follow-up path instead.",
          },
          {
            id: "m2s1l3",
            title: "Do not add services by implication",
            why: "Bundling can help, but hiding an added service is cramming.",
            body: "Explain each service being added, why it helps, what it costs, and what the customer is agreeing to. Do not imply TV, voice, mobile, or equipment is mandatory unless the official offer requires it.",
          },
        ],
      },
      {
        id: "m2s2",
        title: "Audit Discipline",
        lessons: [
          {
            id: "m2s2l1",
            title: "Universal audits remove local bias",
            why: "A call may be reviewed by another site that does not know the agent or the local classroom context.",
            body: "Act as if every call will be audited by someone outside the building. Hit the required points, document correctly, and protect yourself with clean process.",
          },
          {
            id: "m2s2l2",
            title: "Official SOP controls",
            why: "Training examples are learning tools; current SOP is the authority.",
            body: "When a facilitator, top performer, old habit, or peer advice conflicts with official SOP, use official SOP. Record the conflict as a question for clarification.",
            tips: [
              "This app is a study aid, not a replacement for official policy.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "m3",
    number: 3,
    title: "Authentication & Customer Privacy",
    tag: "Trust",
    emoji: "🔐",
    summary:
      "How to protect account access, customer information, and yourself while still moving the conversation forward.",
    sections: [
      {
        id: "m3s1",
        title: "Authentication",
        lessons: [
          {
            id: "m3s1l1",
            title: "The customer provides, you confirm",
            why: "Giving information first can leak private account data.",
            body: "For sensitive details, ask the customer to provide the information. Once the account is properly authenticated, you may confirm according to approved procedure.",
          },
          {
            id: "m3s1l2",
            title: "Knowing facts is not the same as being authorized",
            why: "Family, roommates, ex-partners, and others may know account facts but still lack permission to make changes.",
            body: "Only the account holder or authorized user can make approved changes. If someone reveals they are not the account holder after authentication, stop and follow the approved path.",
          },
        ],
      },
      {
        id: "m3s2",
        title: "Privacy Boundaries",
        lessons: [
          {
            id: "m3s2l1",
            title: "No offline customer contact",
            why: "A friendly call does not make a customer a personal contact.",
            body: "Do not follow customers on social media, contact them offline, share your own profile, or use customer data for personal reasons. Keep the relationship inside approved business channels.",
          },
          {
            id: "m3s2l2",
            title: "No outside-business solicitation",
            why: "Using company time or customer access to promote another business creates a conflict.",
            body: "Do not redirect customers to your side business, another provider, real estate work, personal services, or any outside entity while conducting company business.",
          },
        ],
      },
    ],
  },
  {
    id: "m4",
    number: 4,
    title: "Product Map: Internet, TV, Mobile, Voice",
    tag: "Products",
    emoji: "📡",
    summary:
      "The product surface you need to understand before you can position offers cleanly.",
    sections: [
      {
        id: "m4s1",
        title: "Core Services",
        lessons: [
          {
            id: "m4s1l1",
            title: "Internet anchors the account",
            why: "Mobile and many employee-service workflows depend on an active internet account.",
            body: "Know whether the address has service, who owns the active account, what speed tier applies, and whether the customer is eligible for mobile or other add-ons.",
          },
          {
            id: "m4s1l2",
            title: "TV and Xumo positioning",
            why: "Customers may be attached to old boxes or old habits even when newer options reduce friction or cost.",
            body: "Frame the newer TV experience in terms of familiarity, apps, lower equipment burden, and easier use. Do not mock the old setup; show the bridge from old habit to new value.",
          },
          {
            id: "m4s1l3",
            title: "Voice as the spare tire",
            why: "Home phone can be positioned as a backup rather than an old-fashioned product.",
            body: "A clean voice pitch connects to backup access, children at home, emergencies, home systems, or secondary authentication. The value is contingency, not nostalgia.",
            tips: [
              "Use the spare-tire analogy only when it fits the customer's household.",
            ],
          },
        ],
      },
      {
        id: "m4s2",
        title: "Mobile",
        lessons: [
          {
            id: "m4s2l1",
            title: "Mobile is a savings conversation",
            why: "A customer trying to lower bills may be paying too much somewhere else.",
            body: "Ask what mobile provider they use, how many lines they have, and what they pay. Position mobile as consolidation and savings when the facts support it.",
          },
          {
            id: "m4s2l2",
            title: "Use approved network wording",
            why: "Customers need a clear explanation without unsupported claims.",
            body: "Use approved wording for coverage, partner-network facts, hotspots, and mobile-service terms. If exact wording matters, use the official article or facilitator guidance.",
          },
        ],
      },
    ],
  },
  {
    id: "m5",
    number: 5,
    title: "Systems: Spectrum.com, Copilot, Panorama, Webex",
    tag: "Navigation",
    emoji: "🧭",
    summary:
      "Where to find answers, how to move through tools, and how to avoid getting stuck on navigation noise.",
    sections: [
      {
        id: "m5s1",
        title: "Public and Internal Navigation",
        lessons: [
          {
            id: "m5s1l1",
            title: "Spectrum.com is product orientation",
            why: "You need to recognize what customers see before they call.",
            body: "Use Spectrum.com to identify product categories, package pages, top navigation, hotlinks, and offer language. Notice what a customer may have misunderstood before correcting them.",
          },
          {
            id: "m5s1l2",
            title: "Copilot Residential is the knowledge base path",
            why: "Fast article retrieval keeps the call clean and prevents guesswork.",
            body: "Search with short, specific terms. Open the article, verify article IDs or procedure details when needed, and use Copilot to support the call rather than replace judgment.",
          },
          {
            id: "m5s1l3",
            title: "Webex is operational attention",
            why: "Incentives, updates, and team signals may appear in chat before anyone repeats them aloud.",
            body: "Stay signed in, watch official chats, and read updates. Power-hour flyers, raffle instructions, and urgent changes may be distributed through Webex.",
          },
        ],
      },
      {
        id: "m5s2",
        title: "Employee Systems",
        lessons: [
          {
            id: "m5s2l1",
            title: "Panorama starts the employee-service workflow",
            why: "Address accuracy controls serviceability, employee services, and benefits access.",
            body: "Use Panorama for My Charter, Connectivity Services, personal information, address updates, and Benefit Connect. If an address was updated today, expect a waiting period before some actions reflect correctly.",
          },
          {
            id: "m5s2l2",
            title: "Serviceability scenarios matter",
            why: "No active service, service under your name, service under someone else, roommate accounts, and apartment bulk service all route differently.",
            body: "Identify the active account situation before taking action. Account takeover, disconnect and reconnect, room account, or store visit may be needed depending on the scenario.",
          },
        ],
      },
    ],
  },
  {
    id: "m6",
    number: 6,
    title: "Employee Benefits, Spark & Incentives",
    tag: "Onboarding",
    emoji: "🎯",
    summary:
      "The practical employee systems: benefits window, employee services, recognition, Sparks, and incentive attention.",
    sections: [
      {
        id: "m6s1",
        title: "Benefits and Employee Services",
        lessons: [
          {
            id: "m6s1l1",
            title: "Benefits enrollment window",
            why: "Missing the enrollment window can push decisions to open enrollment.",
            body: "Use Benefit Connect through Panorama. Track the countdown, review the blue-folder materials or benefits site, and make selections before the deadline.",
          },
          {
            id: "m6s1l2",
            title: "Basic versus enhanced dental",
            why: "Enhanced dental was specifically discussed because orthodontia coverage differs.",
            body: "Use the benefits documents for exact coverage. Treat dental, orthodontia, bridges, implants, spouse, and dependent questions as benefits-verification items, not memory guesses.",
          },
        ],
      },
      {
        id: "m6s2",
        title: "Recognition and Incentives",
        lessons: [
          {
            id: "m6s2l1",
            title: "Spark is recognition plus rewards",
            why: "Recognition behavior is part of classroom culture and incentive tracking.",
            body: "Create the profile, send meaningful weekly shout-outs, and understand that Sparks can be tied to contests, milestones, peer recognition, and leadership activity.",
          },
          {
            id: "m6s2l2",
            title: "Watch for hidden incentive prompts",
            why: "Some incentives reward people who read chat or email closely.",
            body: "Read Webex and email updates fully. If a message says to screenshot an order, visit a manager, or respond for a snack or raffle, the reward usually goes to the people who noticed.",
          },
        ],
      },
    ],
  },
  {
    id: "m7",
    number: 7,
    title: "Sales Presence & Traits",
    tag: "Performance",
    emoji: "🗣️",
    summary:
      "The human layer: empathy, confidence, coachability, tone, posture, active listening, and teamwork.",
    sections: [
      {
        id: "m7s1",
        title: "Core Traits",
        lessons: [
          {
            id: "m7s1l1",
            title: "Empathy builds temporary trust fast",
            why: "The customer is a real person, and rapport often determines whether they will hear the offer.",
            body: "Acknowledge the customer's situation before correcting, pitching, or redirecting. Empathy does not mean surrendering the call; it means making the customer feel heard while you lead.",
          },
          {
            id: "m7s1l2",
            title: "Confidence is audible",
            why: "Customers hear hesitation, stress, and uncertainty through the phone.",
            body: "Know the product, speak cleanly, keep posture open, and use steady pacing. A smile, standing posture, or relaxed lean can change how your voice lands.",
          },
          {
            id: "m7s1l3",
            title: "Coachability shortens the ramp",
            why: "Top performers improve by asking what worked, testing it, then making it their own.",
            body: "Ask for feedback with your proposed approach included: 'Here is what I wanted to try. Is that allowed here? How would you adjust it?' That gives the coach something precise to correct.",
          },
        ],
      },
      {
        id: "m7s2",
        title: "Active Listening",
        lessons: [
          {
            id: "m7s2l1",
            title: "Listen for household clues",
            why: "Background details can reveal valid needs without forcing a generic pitch.",
            body: "If the customer mentions children, work-from-home, appointments, old equipment, weak mobile coverage, or multiple bills, use those clues to guide discovery.",
          },
          {
            id: "m7s2l2",
            title: "Team communication prevents wrong work",
            why: "A group can produce a strong answer in the wrong format if nobody challenges the instruction gap.",
            body: "When task expectations are unclear, ask early. Communication is part of performance, not a distraction from performance.",
          },
        ],
      },
    ],
  },
  {
    id: "m8",
    number: 8,
    title: "A-R-M Objection Handling",
    tag: "Scenarios",
    emoji: "🔁",
    summary:
      "Acknowledge, Respond, Move forward: the classroom pattern for positive framing and forward motion.",
    sections: [
      {
        id: "m8s1",
        title: "A-R-M Pattern",
        lessons: [
          {
            id: "m8s1l1",
            title: "Acknowledge only the real concern",
            why: "Repeating the wrong phrase can create a new objection.",
            body: "If the customer asks why they have to prepay, acknowledge the payment concern. Do not introduce credit, cancellation, or another problem unless the process requires it.",
          },
          {
            id: "m8s1l2",
            title: "Respond positively before the limitation",
            why: "Customers need to hear a path forward, not a wall.",
            body: "Use positive framing: what can be done, what is available, what the next step is, and why the path protects or benefits the customer.",
          },
          {
            id: "m8s1l3",
            title: "Move forward with an assumptive but honest close",
            why: "Forward motion prevents the conversation from stalling after every concern.",
            body: "Ask for the next valid action: card, pickup option, account review, alternate address, spouse on a joined call, or plan comparison. Keep consent clear.",
          },
        ],
      },
      {
        id: "m8s2",
        title: "Common Objections",
        lessons: [
          {
            id: "m8s2l1",
            title: "New-customer pricing",
            why: "Existing customers may feel punished when they see acquisition offers.",
            body: "Acknowledge what they saw, reassure them that existing customers have options too, then review the account for eligible value. Avoid repeating 'new customers only' as the emotional center of the response.",
          },
          {
            id: "m8s2l2",
            title: "Need to talk to spouse",
            why: "This objection may be real, but it may also be hesitation.",
            body: "Clarify whether the issue is permission, information, or comfort. Offer to bring the spouse onto the line when appropriate. Do not place an order without full commitment.",
          },
        ],
      },
    ],
  },
  {
    id: "m9",
    number: 9,
    title: "Offer Positioning & Ethical Bundling",
    tag: "Closing",
    emoji: "📦",
    summary:
      "How to present value, savings, discounts, mobile, voice, and bundles without crossing consent or compliance lines.",
    sections: [
      {
        id: "m9s1",
        title: "Positioning",
        lessons: [
          {
            id: "m9s1l1",
            title: "Present the value stack",
            why: "A customer decides faster when the offer is organized instead of scattered.",
            body: "State the service, price, discount, fees, timing, and why it fits the customer. Tie each piece to what they told you during discovery.",
          },
          {
            id: "m9s1l2",
            title: "Consolidation can beat discount chasing",
            why: "A customer may save more by moving mobile than by forcing a lower internet price.",
            body: "When discovery supports it, show how internet plus mobile or another line of business changes total household cost. Keep the math clear and avoid unsupported guarantees.",
          },
          {
            id: "m9s1l3",
            title: "Payment language must stay clean",
            why: "Assumptive closing works only when it remains truthful.",
            body: "If a payment is required, say so clearly. If a payment is optional, do not imply that it is required. Explain the benefit of paying now only when that benefit is accurate.",
          },
        ],
      },
      {
        id: "m9s2",
        title: "Performance Discipline",
        lessons: [
          {
            id: "m9s2l1",
            title: "Attendance protects commission opportunity",
            why: "Missed calls are missed sales, and top performers plan around goals.",
            body: "Know where you stand in units and metrics before taking time off. Rest matters, but unplanned absence leaves money and practice reps on the table.",
          },
          {
            id: "m9s2l2",
            title: "Avoid burnout by managing the month",
            why: "High performance without breaks can become unsustainable.",
            body: "Track goals, take approved breaks, leave work at work, and plan recovery time. The target is repeatable production, not one exhausted sprint.",
          },
        ],
      },
      {
        id: "m9s3",
        title: "Gmail Product Application",
        lessons: [
          {
            id: "m9s3l1",
            title: "Separate the customer need from the offer avenue",
            why: "A useful bundle starts with fit, not with attaching every available feature.",
            body: "Identify the need first, then compare only the relevant avenues: plan fit, BYOD or device purchase, PBB, trade-in, Anytime Upgrade, protection, WiFi continuity, and TV bundle value. Verify each avenue in its controlling article and live offer before presenting it.",
          },
          {
            id: "m9s3l2",
            title: "Do not merge independent eligibility gates",
            why: "Stackable offers can still have separate qualification, timing and disclosure rules.",
            body: "For example, GEN9023 may allow PBB to stack with a device promotion or trade-in, but porting, prior-carrier history, order-entry intent and retention remain PBB gates. HOW7449 has separate plan, device-condition, timing and return gates for Anytime Upgrade.",
          },
          {
            id: "m9s3l3",
            title: "Keep exam wording and mastery reasoning distinct",
            why: "Generated scenarios improve transfer without contaminating verbatim final-exam practice.",
            body: "Run Milestone Questions, Milestone Prep and Kahoot as isolated decks when exact classroom wording matters. Use Article-linked Review for source facts and enable Mastery Lab only when practicing comparisons, bundles, upgrade avenues and ideal-solution reasoning.",
          },
        ],
      },
    ],
  },
  {
    id: "m10",
    number: 10,
    title: "Weekly Recap & Update Pipeline",
    tag: "Versioning",
    emoji: "🗂️",
    summary:
      "How this app absorbs each week's recordings, preserves provenance, and turns training into drills.",
    sections: [
      {
        id: "m10s1",
        title: "Weekly Workflow",
        lessons: [
          {
            id: "m10s1l1",
            title: "Recordings become structured study units",
            why: "Raw transcripts are too noisy; the app needs stable modules, scenarios, cards, and open questions.",
            body: "Each weekly update should extract: new terms, policy gates, tool paths, sales scenarios, action items, unresolved questions, and flashcards. The weekly ledger preserves what changed and why.",
          },
          {
            id: "m10s1l2",
            title: "Use version numbers for training state",
            why: "Weekly updates need rollback and comparison, not ad hoc edits.",
            body: "Use a release line such as v1.0.0-spectrum.0 for the first conversion, then increment weekly ingestion versions as new Otter batches are added.",
          },
          {
            id: "m10s1l3",
            title: "Unresolved items stay visible",
            why: "Training changes, mergers, benefits details, and commission rules can shift.",
            body: "Do not bury uncertainty. Put unresolved questions in the weekly ledger until confirmed by facilitator, HR, payroll, benefits, or official SOP.",
          },
        ],
      },
    ],
  },
];

export type Flashcard = {
  id: string;
  module: number;
  front: string;
  back: string;
  category: string;
  deckTags?: FlashcardDeckTag[];
  source?: FlashcardSource;
  origin?: FlashcardOrigin;
};

export type FlashcardOrigin =
  | "verbatim-assessment"
  | "verbatim-prep"
  | "source-derived"
  | "generated-mastery"
  | "legacy-supplement";

export type FlashcardDeckTag =
  "milestone" | "kahoot" | "internet" | "wifi" | "mobile" | "tv" | "voice";

export type FlashcardSourceStatus =
  | "article-verified"
  | "classroom-verified"
  | "needs-article"
  | "needs-article-title"
  | "needs-clarification";

export type FlashcardSource = {
  kind: "article" | "milestone-review" | "milestone-prep" | "kahoot";
  articleNumber: string;
  articleTitle: string;
  status: FlashcardSourceStatus;
  meetingId?: string;
  questionNumber?: number;
  recordedAt?: string;
};

export const FLASHCARDS: Flashcard[] = [
  {
    id: "fc1",
    module: 1,
    category: "Call Flow",
    front: "A customer asks for a supervisor immediately. First move?",
    back: "Do not route immediately. Ask for a brief scenario, review scope, and follow the escalation process.",
  },
  {
    id: "fc2",
    module: 1,
    category: "Call Flow",
    front: "What is the basic sales call spine?",
    back: "Greeting, discovery, present the offer, handle objections, close or route correctly.",
  },
  {
    id: "fc3",
    module: 1,
    category: "Call Flow",
    front: "What does a hold check-in protect?",
    back: "Trust, orientation, and control of the call.",
  },
  {
    id: "fc4",
    module: 1,
    category: "Scope",
    front: "When is routing appropriate?",
    back: "After the intended role is complete and the customer still needs a different department.",
  },
  {
    id: "fc5",
    module: 2,
    category: "Integrity",
    front: "Can you substitute your own identity data in a customer workflow?",
    back: "No. That is a serious integrity risk.",
  },
  {
    id: "fc6",
    module: 2,
    category: "Integrity",
    front: "What are placeholder orders?",
    back: "Invalid orders placed before full customer commitment. Do not use them.",
  },
  {
    id: "fc7",
    module: 2,
    category: "Integrity",
    front: "What is cramming in this context?",
    back: "Adding or implying services without clear customer knowledge and consent.",
  },
  {
    id: "fc8",
    module: 2,
    category: "Audit",
    front: "Why do universal audits matter?",
    back: "Another site can review the call without local bias, so process must be clean every time.",
  },
  {
    id: "fc9",
    module: 2,
    category: "SOP",
    front: "What controls if training advice conflicts with current SOP?",
    back: "Current official SOP controls.",
  },
  {
    id: "fc10",
    module: 3,
    category: "Authentication",
    front:
      "Should you give sensitive account details before the customer provides them?",
    back: "No. Have them provide information first, then confirm only under approved procedure.",
  },
  {
    id: "fc11",
    module: 3,
    category: "Authentication",
    front:
      "Someone knows all account facts. Are they automatically authorized?",
    back: "No. Only the account holder or authorized user can make approved changes.",
  },
  {
    id: "fc12",
    module: 3,
    category: "Privacy",
    front: "Can you follow a customer on social media after a friendly call?",
    back: "No. Keep customer contact inside approved business channels.",
  },
  {
    id: "fc13",
    module: 3,
    category: "Privacy",
    front: "Can you promote your side business during a call?",
    back: "No. That is outside-business solicitation and a conflict.",
  },
  {
    id: "fc14",
    module: 4,
    category: "Products",
    front: "Which service anchors many employee and mobile workflows?",
    back: "Internet service.",
  },
  {
    id: "fc15",
    module: 4,
    category: "Products",
    front: "Voice spare-tire method means what?",
    back: "Position home phone as backup access when it fits the household need.",
  },
  {
    id: "fc16",
    module: 4,
    category: "Mobile",
    front: "Why ask about the customer's mobile provider?",
    back: "Mobile may solve the real cost problem better than forcing an internet discount.",
  },
  {
    id: "fc17",
    module: 4,
    category: "Products",
    front: "How should old equipment resistance be handled?",
    back: "Bridge from familiarity to the new value without mocking the old setup.",
  },
  {
    id: "fc18",
    module: 5,
    category: "Navigation",
    front: "Where do public product pages help you?",
    back: "They show what the customer may have seen and misunderstood.",
  },
  {
    id: "fc19",
    module: 5,
    category: "Navigation",
    front: "What is Copilot Residential used for?",
    back: "Finding internal articles, product details, navigation answers, and process support.",
  },
  {
    id: "fc20",
    module: 5,
    category: "Navigation",
    front: "Why watch Webex chat?",
    back: "Updates, incentives, and instructions may appear there before being repeated aloud.",
  },
  {
    id: "fc21",
    module: 5,
    category: "Panorama",
    front: "Where does the employee service workflow start?",
    back: "Panorama, then My Charter and Connectivity Services.",
  },
  {
    id: "fc22",
    module: 5,
    category: "Panorama",
    front: "What must be accurate before employee service setup?",
    back: "The service address in the employee profile/system.",
  },
  {
    id: "fc23",
    module: 6,
    category: "Benefits",
    front: "What should you track for benefits enrollment?",
    back: "The Benefit Connect countdown and deadline.",
  },
  {
    id: "fc24",
    module: 6,
    category: "Benefits",
    front: "Enhanced dental differs mainly by what discussed area?",
    back: "Orthodontia coverage was called out; verify exact details in benefits documents.",
  },
  {
    id: "fc25",
    module: 6,
    category: "Spark",
    front: "What are Sparks?",
    back: "Recognition and reward points tied to incentives, shout-outs, contests, and milestones.",
  },
  {
    id: "fc26",
    module: 6,
    category: "Spark",
    front: "How often were shout-outs expected?",
    back: "Weekly recognitions were discussed as a recurring classroom behavior.",
  },
  {
    id: "fc27",
    module: 7,
    category: "Sales Traits",
    front: "Most emphasized sales trait in the workshop?",
    back: "Empathy.",
  },
  {
    id: "fc28",
    module: 7,
    category: "Sales Traits",
    front: "Why does posture matter on the phone?",
    back: "Posture changes tone, energy, and confidence that the customer can hear.",
  },
  {
    id: "fc29",
    module: 7,
    category: "Sales Traits",
    front: "What does coachability look like?",
    back: "Ask what to adjust, test feedback, and make the corrected method your own.",
  },
  {
    id: "fc30",
    module: 7,
    category: "Active Listening",
    front: "What can background noise reveal?",
    back: "Household size, kids, work-from-home needs, or service opportunities.",
  },
  {
    id: "fc31",
    module: 8,
    category: "A-R-M",
    front: "What does A-R-M stand for?",
    back: "Acknowledge, Respond, Move forward.",
  },
  {
    id: "fc32",
    module: 8,
    category: "A-R-M",
    front: "What should acknowledgement target?",
    back: "The customer's actual concern, not a new problem you accidentally introduce.",
  },
  {
    id: "fc33",
    module: 8,
    category: "A-R-M",
    front: "Why avoid centering 'new customers only'?",
    back: "It can make the customer feel punished; redirect to available account options.",
  },
  {
    id: "fc34",
    module: 8,
    category: "A-R-M",
    front: "Move-forward example after payment concern?",
    back: "Explain the path clearly, then ask whether they want to complete the approved next step.",
  },
  {
    id: "fc35",
    module: 9,
    category: "Closing",
    front: "Ethical assumptive close rule?",
    back: "Move forward confidently, but keep consent and payment requirements truthful.",
  },
  {
    id: "fc36",
    module: 9,
    category: "Bundling",
    front: "When is bundling clean?",
    back: "When each service, price, and reason is explained and the customer agrees.",
  },
  {
    id: "fc37",
    module: 9,
    category: "Performance",
    front: "Why does attendance affect commission opportunity?",
    back: "Missed calls mean missed sales reps and missed practice.",
  },
  {
    id: "fc38",
    module: 9,
    category: "Burnout",
    front: "Sustainable performance needs what?",
    back: "Goal tracking, approved breaks, recovery time, and clean boundaries after work.",
  },
  {
    id: "fc39",
    module: 10,
    category: "Weekly Updates",
    front: "What should every weekly Otter update extract?",
    back: "Terms, policy gates, tool paths, scenarios, flashcards, action items, and unresolved questions.",
  },
  {
    id: "fc40",
    module: 10,
    category: "Versioning",
    front: "Why version the training app weekly?",
    back: "So changes can be compared, rolled back, and audited instead of becoming ad hoc edits.",
  },
];

export const STUDY_TIPS = [
  {
    title: "One call-flow win",
    body: "Low energy day: study one objection and write one A-R-M response. That counts.",
  },
  {
    title: "Scenario before memorization",
    body: "Policy sticks better when attached to a customer situation. Convert every rule into a call example.",
  },
  {
    title: "Keep an unresolved list",
    body: "If SOP, benefits, commission, or merger details are unclear, capture the question and resolve it with an official source.",
  },
  {
    title: "Practice out loud",
    body: "Sales language is muscle memory. Say the response aloud until it sounds natural and compliant.",
  },
  {
    title: "Watch the systems",
    body: "Webex, Copilot, Panorama, and Spark are part of the work. Navigation fluency reduces call stress.",
  },
  {
    title: "Protect consent",
    body: "A confident close still needs a clear yes. Consent is the line that keeps selling clean.",
  },
];
