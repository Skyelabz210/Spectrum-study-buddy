export type Scenario = {
  id: string;
  weekId: string;
  title: string;
  module: number;
  customerStatement: string;
  context: string;
  pattern: "A-R-M" | "Policy Gate" | "Navigation";
  acknowledge: string;
  respond: string;
  moveForward: string;
  coachNotes: string[];
  riskFlags: string[];
  tags: string[];
};

export const SCENARIOS: Scenario[] = [
  {
    id: "sc-2026w27-001",
    weekId: "2026-W27",
    title: "Supervisor request at opening",
    module: 1,
    customerStatement: "I need a supervisor. I do not want to explain this again.",
    context: "Opening escalation. The learner must not surrender the call before scope is checked.",
    pattern: "Policy Gate",
    acknowledge: "I understand you want this handled by the right person, and I do not want you repeating yourself more than necessary.",
    respond: "Let me get a brief version of what happened so I can either fix what is inside my scope or get the next person accurate context.",
    moveForward: "What is the main issue on the account today?",
    coachNotes: [
      "Do not transfer on the first demand unless the approved process says to do so.",
      "The bridge protects the customer from repeating the whole story and protects the agent's process.",
    ],
    riskFlags: ["premature transfer", "failure to follow escalation process"],
    tags: ["escalation", "scope", "opening"],
  },
  {
    id: "sc-2026w27-002",
    weekId: "2026-W27",
    title: "Lower my bill",
    module: 1,
    customerStatement: "I am struggling and need to lower my bill. What can you do?",
    context: "Discovery needs to find total household cost, not only the current line item.",
    pattern: "A-R-M",
    acknowledge: "I understand why lowering monthly costs is important right now.",
    respond: "Let me review the account and also check whether another service you already pay for somewhere else can be consolidated for savings.",
    moveForward: "Who do you currently use for mobile, and about how much are those lines each month?",
    coachNotes: [
      "Lowering cost can mean downgrading, but it can also mean replacing a more expensive provider.",
      "Do not pitch an unrelated add-on. Tie discovery to the stated financial concern.",
    ],
    riskFlags: ["irrelevant pitch", "ignoring financial concern"],
    tags: ["bill", "mobile", "discovery"],
  },
  {
    id: "sc-2026w27-003",
    weekId: "2026-W27",
    title: "New-customer pricing objection",
    module: 8,
    customerStatement: "I saw internet advertised for a lower price. I have been loyal for years, so why do new people get the better deal?",
    context: "Existing customer feels devalued by acquisition pricing.",
    pattern: "A-R-M",
    acknowledge: "I get why that would feel frustrating, especially when you have already been with us.",
    respond: "We do value existing customers, and the best path is to review what is available on your actual account instead of stopping at the advertised page.",
    moveForward: "Let me look at your current services and see where we can improve the value or total monthly cost.",
    coachNotes: [
      "Do not make 'new customers only' the emotional center of the response.",
      "Reassurance plus account review is stronger than a blunt denial.",
    ],
    riskFlags: ["negative framing", "loyalty objection"],
    tags: ["pricing", "existing customer", "A-R-M"],
  },
  {
    id: "sc-2026w27-004",
    weekId: "2026-W27",
    title: "Payment before service",
    module: 8,
    customerStatement: "Why do I have to pay before the service even starts?",
    context: "Customer reacts to an upfront payment requirement or payment request.",
    pattern: "A-R-M",
    acknowledge: "That is a fair question. I understand wanting to know what you are paying for before moving forward.",
    respond: "This payment gets the account started under the approved setup path and shows exactly what is due today before the service begins.",
    moveForward: "I can review the total with you line by line, then we can complete the payment using your preferred approved method.",
    coachNotes: [
      "Acknowledge the payment concern only; do not introduce unrelated concerns.",
      "If payment is optional in the actual workflow, do not imply that it is required.",
    ],
    riskFlags: ["payment wording", "truthfulness", "new objection creation"],
    tags: ["prepay", "payment", "A-R-M"],
  },
  {
    id: "sc-2026w27-005",
    weekId: "2026-W27",
    title: "Service unavailable at address",
    module: 5,
    customerStatement: "So you just do not provide service here? That is ridiculous.",
    context: "Serviceability limitation. The learner must avoid blunt wall language.",
    pattern: "A-R-M",
    acknowledge: "I understand that is disappointing, especially when you were trying to get this set up today.",
    respond: "Let me verify the address and check what options are showing, because sometimes the path depends on the exact location, existing service, or address record.",
    moveForward: "Can we confirm the full service address exactly as it appears on your lease or mail?",
    coachNotes: [
      "Verify before final denial.",
      "Move toward address validation, alternate path, store visit, or official serviceability result.",
    ],
    riskFlags: ["blunt denial", "address mismatch"],
    tags: ["serviceability", "address", "navigation"],
  },
  {
    id: "sc-2026w27-006",
    weekId: "2026-W27",
    title: "Need to talk to spouse",
    module: 9,
    customerStatement: "This sounds good, but I need to talk to my spouse first.",
    context: "Common hesitation. The learner must clarify without creating an unauthorized order.",
    pattern: "A-R-M",
    acknowledge: "Absolutely, I understand wanting everyone involved to feel good about the decision.",
    respond: "Since we already have the details in front of us, we can make that conversation easier by reviewing the key points together or bringing them onto the call if they are available.",
    moveForward: "Would you like to call them in now so I can answer both of your questions at once?",
    coachNotes: [
      "Do not place a placeholder order.",
      "Clarify whether this is permission, information, or comfort.",
    ],
    riskFlags: ["placeholder order", "consent"],
    tags: ["spouse", "objection", "close"],
  },
  {
    id: "sc-2026w27-007",
    weekId: "2026-W27",
    title: "Service under another name",
    module: 5,
    customerStatement: "The internet is at my address, but it is not under my name. I need my employee services set up.",
    context: "Panorama/Connectivity Services scenario. The learner must identify account takeover, disconnect, or room-account paths.",
    pattern: "Navigation",
    acknowledge: "That makes sense. The setup path depends on who owns the active account and whether they can authorize changes.",
    respond: "If the current account holder can cooperate, an account takeover may be possible. If not, the path may require a disconnect and new setup or another approved account option.",
    moveForward: "Do you have access to the account holder and the current account information?",
    coachNotes: [
      "Do not assume the account can simply be changed online.",
      "Some scenarios may require both people to visit a store with valid documentation.",
    ],
    riskFlags: ["unauthorized account change", "address mismatch"],
    tags: ["Panorama", "Connectivity Services", "account takeover"],
  },
  {
    id: "sc-2026w27-008",
    weekId: "2026-W27",
    title: "Old box resistance",
    module: 4,
    customerStatement: "I like my old setup. I do not want to switch boxes or learn a new system.",
    context: "Customer prefers familiar equipment despite possible savings or simpler setup.",
    pattern: "A-R-M",
    acknowledge: "I understand that. When something already feels familiar, changing it can sound like a headache.",
    respond: "The goal is not to make things harder; it is to keep the experience familiar while reducing equipment burden and giving you app access in one place.",
    moveForward: "Let me compare what you have now against the newer setup so you can see the difference before deciding.",
    coachNotes: [
      "Respect habit first, then bridge to value.",
      "Do not insult old equipment or older customers' preferences.",
    ],
    riskFlags: ["dismissive tone", "change resistance"],
    tags: ["TV", "Xumo", "equipment"],
  },
];

