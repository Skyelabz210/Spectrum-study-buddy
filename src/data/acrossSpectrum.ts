export type SimulatorDifficulty = "guided" | "balanced" | "floor";

export type SimulatorMarker = {
  id: string;
  label: string;
  description: string;
  positiveCue: string;
  keywords: string[];
};

export type CallerPersona = {
  id: string;
  title: string;
  voice: string;
  temperament: string;
  salesGoal: string;
  openingLine: string;
  context: string;
  callerTurns: string[];
  coachingTips: string[];
  rebuttalHints: Record<SimulatorDifficulty, string[]>;
};

export const SIMULATOR_MARKERS: SimulatorMarker[] = [
  {
    id: "proper-greeting",
    label: "Proper greeting",
    description: "Open with a clear greeting, name, and willingness to help.",
    positiveCue: "Greeting landed",
    keywords: ["thank you for calling", "my name", "how can i help", "happy to help", "appreciate you calling"],
  },
  {
    id: "discovery",
    label: "Discovery",
    description: "Ask about household need, devices, usage, provider, bill, or service goal.",
    positiveCue: "Discovery question asked",
    keywords: ["how many", "what do you use", "who do you use", "devices", "stream", "gaming", "work from home", "what matters", "current provider", "monthly bill"],
  },
  {
    id: "empathy",
    label: "Empathy",
    description: "Acknowledge the caller's frustration, concern, confusion, or urgency before pitching.",
    positiveCue: "Empathy recognized",
    keywords: ["i understand", "i get", "that makes sense", "i can see", "frustrating", "important", "absolutely"],
  },
  {
    id: "value-fit",
    label: "Value fit",
    description: "Tie the offer to the caller's stated need instead of dumping features.",
    positiveCue: "Need tied to value",
    keywords: ["based on", "because you", "best fit", "that fits", "for your household", "value", "save", "total cost"],
  },
  {
    id: "upsell-attach",
    label: "Attach / upsell",
    description: "Explore mobile, TV, WiFi, voice, or higher speed only when it fits the caller's need.",
    positiveCue: "Attach explored cleanly",
    keywords: ["mobile", "phone lines", "tv", "xumo", "voice", "wifi", "advanced wifi", "gig", "bundle", "internet plus"],
  },
  {
    id: "objection-arm",
    label: "A-R-M objection",
    description: "Acknowledge, respond positively, and move forward with the next valid step.",
    positiveCue: "A-R-M pattern used",
    keywords: ["i understand", "what i can do", "the next step", "let me check", "we can", "move forward", "from here"],
  },
  {
    id: "verification",
    label: "Verify before quote",
    description: "Avoid final claims until address, availability, pricing, eligibility, and account details are checked.",
    positiveCue: "Verification protected",
    keywords: ["verify", "check availability", "check your address", "final pricing", "eligibility", "serviceability", "before i quote", "let me confirm"],
  },
  {
    id: "clean-close",
    label: "Clean close",
    description: "Ask for the next consent-clean action without forcing or implying approval.",
    positiveCue: "Clean close attempted",
    keywords: ["would you like", "are you ready", "does that work", "next step", "with your approval", "if that sounds good", "we can get started"],
  },
];

export const CALLER_PERSONAS: CallerPersona[] = [
  {
    id: "budget-defender",
    title: "Budget Defender",
    voice: "direct, cost-focused, skeptical of add-ons",
    temperament: "Guarded but practical",
    salesGoal: "Lower total household telecom cost without underpowering the home.",
    openingLine: "I need my bill lower. I don't want to add a bunch of stuff. I just need cheaper internet.",
    context: "The caller is price-sensitive and may be overpaying across internet and mobile, but they will resist anything that sounds like an upsell.",
    callerTurns: [
      "I already said I want it cheaper, not more complicated.",
      "How does adding mobile help if I called about internet?",
      "I don't want surprises on the bill.",
      "So what exactly would you check first?",
    ],
    coachingTips: [
      "Start with budget respect, then ask usage and household-size discovery.",
      "Position mobile or bundle only as total-cost math, not as a forced add-on.",
      "Use verification language before quoting final price.",
    ],
    rebuttalHints: {
      guided: ["I understand keeping the bill low is the priority.", "Let me first check what you actually use so I don't recommend too much.", "If mobile does not reduce the total bill, we do not need to force it."],
      balanced: ["Acknowledge price concern → ask devices/usage → compare total household cost."],
      floor: ["Keep it concise. Do not over-explain. Earn permission to compare."],
    },
  },
  {
    id: "fiber-loyalist",
    title: "Fiber Loyalist",
    voice: "confident, comparison-shopping, speed-literate",
    temperament: "Analytical and impatient",
    salesGoal: "Respond to a fiber competitor without attacking fiber; compare actual address availability and total value.",
    openingLine: "Google Fiber says I can get faster upload speeds. Why would I stay with Spectrum?",
    context: "The caller knows enough to mention symmetrical speeds and may be testing whether the agent will make unsupported claims.",
    callerTurns: [
      "They say no data caps and no extra fees.",
      "Upload speed matters because I work from home.",
      "I don't want a sales pitch. I want a real comparison.",
      "What can Spectrum actually do for me?",
    ],
    coachingTips: [
      "Do not deny fiber advantages where they are real.",
      "Use address availability, install timing, mobile savings, TV/sports/streaming, and total bill as the comparison frame.",
      "Avoid final pricing until verified.",
    ],
    rebuttalHints: {
      guided: ["Fiber can be a strong option where it is live.", "Let's compare the full household package, not just upload speed.", "I'll verify your address and current options before quoting."],
      balanced: ["Acknowledge fiber → compare full household value → verify address/pricing."],
      floor: ["Respect the competitor. Win on fit, not denial."],
    },
  },
  {
    id: "mobile-skeptic",
    title: "Mobile Skeptic",
    voice: "cautious, burned by carrier promos, asks for details",
    temperament: "Suspicious but open if the math is clean",
    salesGoal: "Explore Spectrum Mobile as a valid attach only after checking internet eligibility and line/device needs.",
    openingLine: "Every phone company says they'll save me money, then the fees show up later.",
    context: "The caller might benefit from mobile consolidation but needs transparency around eligibility, line count, device compatibility, and buyout rules.",
    callerTurns: [
      "I still owe money on two phones.",
      "Do I have to change phones?",
      "Is this actually unlimited or is there a catch?",
      "What do you need from me to check it?",
    ],
    coachingTips: [
      "Ask current carrier, line count, bill, device payoff, and unlock/compatibility status.",
      "Mention phone-balance buyout only with eligibility caveats.",
      "Use no-surprise language: terms, verification, and consent.",
    ],
    rebuttalHints: {
      guided: ["I understand why you'd want the fees clear first.", "Let me check line count, device status, and whether the buyout path fits.", "We verify eligibility before treating it as final."],
      balanced: ["Clarify carrier/lines/payoff → explain verification → move to eligibility check."],
      floor: ["Precision beats hype. No vague promises."],
    },
  },
  {
    id: "old-box-loyalist",
    title: "Old Box Loyalist",
    voice: "attached to familiar equipment, worried about change",
    temperament: "Reluctant but not hostile",
    salesGoal: "Bridge from old equipment habits to Xumo/TV app value without mocking the caller's current setup.",
    openingLine: "I don't want one of those new boxes. I know how my old cable box works.",
    context: "The caller fears losing familiar navigation, channels, remotes, or simple TV behavior.",
    callerTurns: [
      "I don't want apps. I just want TV.",
      "What if my spouse can't use it?",
      "Are my channels still there?",
      "I don't want to pay more for equipment.",
    ],
    coachingTips: [
      "Validate habit before explaining the new experience.",
      "Use familiarity, fewer boxes, app access, and guided setup as value points.",
      "Verify channel/package and equipment terms before final claims.",
    ],
    rebuttalHints: {
      guided: ["That makes sense; familiar TV matters.", "Let me explain what stays familiar and what changes.", "We'll verify channels and equipment before changing anything."],
      balanced: ["Acknowledge habit → bridge to familiar controls/value → verify package/equipment."],
      floor: ["Do not mock the old setup. Make the bridge safe."],
    },
  },
  {
    id: "spouse-gate",
    title: "Spouse Gate",
    voice: "interested but hesitant to decide alone",
    temperament: "Cooperative but noncommittal",
    salesGoal: "Handle the spouse objection without placing an order or losing momentum.",
    openingLine: "This sounds okay, but I need to talk to my spouse before I say yes.",
    context: "The caller may genuinely need agreement, or they may be using the spouse as a soft objection.",
    callerTurns: [
      "They handle the bills, so I can't decide right now.",
      "Can you just set it up and I'll cancel if they say no?",
      "What should I tell them?",
      "Can we call them together?",
    ],
    coachingTips: [
      "Clarify whether the blocker is permission, information, or comfort.",
      "Offer to include the spouse if appropriate.",
      "Do not place placeholder orders.",
    ],
    rebuttalHints: {
      guided: ["Absolutely, it's smart to include the person who manages the bill.", "Would it help if we brought them on the line or summarized the exact numbers?", "I won't place anything without full approval."],
      balanced: ["Validate → identify blocker → offer joined call or clean follow-up."],
      floor: ["Consent line is non-negotiable."],
    },
  },
  {
    id: "availability-frustrated",
    title: "Serviceability Frustrated",
    voice: "annoyed, feels blocked by address systems",
    temperament: "Frustrated and time-sensitive",
    salesGoal: "Keep control when address/serviceability appears blocked; verify before promising service.",
    openingLine: "The website says service isn't available, but my neighbor has Spectrum. This makes no sense.",
    context: "The caller may have address formatting, MDU/bulk, new construction, or database mismatch issues.",
    callerTurns: [
      "I know the address. Your system is wrong.",
      "Can you just use my neighbor's address?",
      "I need internet this week.",
      "What are you going to check?",
    ],
    coachingTips: [
      "Do not use another address to force eligibility.",
      "Verify exact address, unit, ZIP, serviceability, and escalation path.",
      "Explain what can be checked without promising availability.",
    ],
    rebuttalHints: {
      guided: ["I understand why that is frustrating, especially if a neighbor has service.", "I need to verify your exact address and unit so we don't set up the wrong location.", "Let me check serviceability and the correct next path."],
      balanced: ["Empathy → exact address verification → serviceability path."],
      floor: ["Never substitute another address."],
    },
  },
];

export const DIFFICULTY_COPY: Record<SimulatorDifficulty, { label: string; description: string }> = {
  guided: {
    label: "Guided",
    description: "Full scripting, rebuttal hints, and stronger real-time coaching.",
  },
  balanced: {
    label: "Balanced",
    description: "Short prompts and strategy hints without giving every line.",
  },
  floor: {
    label: "Floor-ready",
    description: "Minimal hints. Use this when you want the simulator to feel closest to a live call.",
  },
};

