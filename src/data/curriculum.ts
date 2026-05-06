// Phlebotomy curriculum derived from the deep-research report.
// 8 modules → sections → lessons. Plain-language, "why it matters" first.

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
    title: "Communication & Professionalism",
    tag: "Soft skills",
    emoji: "🗣️",
    summary:
      "How you talk, listen, and carry yourself with patients. Sets the tone before a needle ever comes out.",
    sections: [
      {
        id: "m1s1",
        title: "Patient Introduction & ID",
        lessons: [
          {
            id: "m1s1l1",
            title: "Two-identifier rule",
            why: "Wrong patient = wrong results = real harm. Always confirm two identifiers (name + DOB).",
            body: "Greet, state your name and role, ask the patient to state their full name and date of birth, then match against the wristband and requisition.",
            tips: [
              "Never read the name to the patient — make them say it.",
              "If anything mismatches: stop, verify, document.",
            ],
          },
          {
            id: "m1s1l2",
            title: "Handling fear & refusal",
            why: "Many patients hate needles. Calm, honest words = a smoother draw.",
            body: "Acknowledge the fear, never say 'this won't hurt'. Offer choices (which arm, sit/lie down). If refused, respect, document, notify provider.",
            tips: ["Empathy first, technique second."],
          },
        ],
      },
      {
        id: "m1s2",
        title: "HIPAA & Ethics",
        lessons: [
          {
            id: "m1s2l1",
            title: "HIPAA basics",
            why: "Patient info is private. Leaks = fines and lost trust.",
            body: "Only discuss patient info with the care team, in private spaces. Never on social media. Lock screens.",
          },
        ],
      },
    ],
  },
  {
    id: "m2",
    number: 2,
    title: "Infection Prevention & Control",
    tag: "Safety",
    emoji: "🧼",
    summary: "Hand hygiene, PPE, and the chain of infection.",
    sections: [
      {
        id: "m2s1",
        title: "Standard Precautions",
        lessons: [
          {
            id: "m2s1l1",
            title: "Treat every patient as infectious",
            why: "You can't tell who carries HBV, HCV, or HIV by looking.",
            body: "Standard precautions = gloves for every draw, hand hygiene before & after, eye protection if splash risk.",
          },
          {
            id: "m2s1l2",
            title: "Hand hygiene technique",
            why: "Hands are the #1 way germs move between patients.",
            body: "Alcohol-based hand rub: cover all surfaces, rub until dry (~20s). Soap & water if visibly soiled or after C. diff exposure.",
          },
        ],
      },
    ],
  },
  {
    id: "m3",
    number: 3,
    title: "Safety & OSHA",
    tag: "Safety",
    emoji: "⚠️",
    summary: "Sharps safety, exposure response, biohazards.",
    sections: [
      {
        id: "m3s1",
        title: "Sharps & Needlesticks",
        lessons: [
          {
            id: "m3s1l1",
            title: "Activate safety device immediately",
            why: "Most needlesticks happen AFTER the draw, before disposal.",
            body: "As soon as the needle is out: activate the safety shield with one hand, drop directly into the sharps container. Never recap.",
            tips: ["Sharps container ≤ ¾ full. Replace it.", "Never reach into a sharps bin."],
          },
          {
            id: "m3s1l2",
            title: "Exposure incident steps",
            why: "Fast action lowers infection risk.",
            body: "1) Wash with soap & water (or flush mucous membranes). 2) Report to supervisor immediately. 3) Source & exposed labs per facility policy. 4) Document.",
          },
        ],
      },
    ],
  },
  {
    id: "m4",
    number: 4,
    title: "Anatomy & Physiology",
    tag: "Body basics",
    emoji: "🫀",
    summary: "Vessels, blood components, the circulatory system.",
    sections: [
      {
        id: "m4s1",
        title: "Vascular System",
        lessons: [
          {
            id: "m4s1l1",
            title: "Veins vs arteries vs capillaries",
            why: "You only want veins. Arteries pulse and bleed fast.",
            body: "Veins: low pressure, no pulse, carry blood TO the heart. Arteries: high pressure, palpable pulse — avoid. Capillaries: tiny, used for fingersticks.",
          },
          {
            id: "m4s1l2",
            title: "Antecubital veins",
            why: "Your go-to draw site.",
            body: "Median cubital (1st choice — most stable), cephalic (2nd, lateral), basilic (last — near brachial artery & median nerve).",
          },
        ],
      },
      {
        id: "m4s2",
        title: "Blood Composition",
        lessons: [
          {
            id: "m4s2l1",
            title: "Plasma, serum, formed elements",
            why: "Different tests need different parts.",
            body: "Plasma = liquid with anticoagulant. Serum = liquid after clotting. Formed elements = RBC, WBC, platelets.",
          },
        ],
      },
    ],
  },
  {
    id: "m5",
    number: 5,
    title: "Equipment & Pre-Collection",
    tag: "Tools",
    emoji: "🧪",
    summary: "Tubes, additives, needles, tourniquet, site prep.",
    sections: [
      {
        id: "m5s1",
        title: "Tubes & Additives",
        lessons: [
          {
            id: "m5s1l1",
            title: "Tube color cheat sheet",
            why: "Wrong tube = rejected specimen = redraw.",
            body: "Light blue: sodium citrate (coag/PT/PTT). Red: no additive (serum). Gold/SST: clot activator + gel. Green: heparin (chemistry stat). Lavender: EDTA (CBC). Gray: fluoride/oxalate (glucose, lactate).",
          },
        ],
      },
    ],
  },
  {
    id: "m6",
    number: 6,
    title: "Venipuncture Technique",
    tag: "The draw",
    emoji: "💉",
    summary: "Step-by-step draw, order of draw, troubleshooting.",
    sections: [
      {
        id: "m6s1",
        title: "Order of Draw (CLSI)",
        lessons: [
          {
            id: "m6s1l1",
            title: "Order of draw — memorize",
            why: "Wrong order = additive carryover = wrong results.",
            body: "1. Blood culture (yellow) → 2. Light blue (citrate) → 3. Red/Gold (serum) → 4. Green (heparin) → 5. Lavender (EDTA) → 6. Gray (fluoride).",
            tips: ["Mnemonic: 'Stop Light Red Stay Put Going'."],
          },
        ],
      },
      {
        id: "m6s2",
        title: "Troubleshooting",
        lessons: [
          {
            id: "m6s2l1",
            title: "No flash / no flow",
            why: "Wasted stick = unhappy patient.",
            body: "Anchor the vein. Check needle depth — slightly advance or pull back. If still nothing, release tourniquet, remove needle, try other arm. Max 2 attempts per phlebotomist.",
          },
          {
            id: "m6s2l2",
            title: "Hematoma forming",
            why: "Means blood is leaking under the skin.",
            body: "Stop immediately, remove needle, apply firm pressure 3–5 minutes, elevate arm.",
          },
        ],
      },
    ],
  },
  {
    id: "m7",
    number: 7,
    title: "Specimen Handling & QA",
    tag: "After the draw",
    emoji: "🧫",
    summary: "Labeling, transport, centrifugation, rejection.",
    sections: [
      {
        id: "m7s1",
        title: "Labeling",
        lessons: [
          {
            id: "m7s1l1",
            title: "Label at the bedside",
            why: "Labeling later = mix-ups = patient harm.",
            body: "Label in front of the patient: full name, DOB, date/time, your initials. Match to requisition before leaving the room.",
          },
        ],
      },
      {
        id: "m7s2",
        title: "Rejection criteria",
        lessons: [
          {
            id: "m7s2l1",
            title: "Why specimens get rejected",
            why: "Knowing this prevents redraws.",
            body: "Common: hemolysis, clotting in anticoagulant tubes, mislabeled, wrong tube, underfilled (especially blue tops), expired tube.",
          },
        ],
      },
    ],
  },
  {
    id: "m8",
    number: 8,
    title: "Special Collections & POCT",
    tag: "Beyond basics",
    emoji: "🩸",
    summary: "Blood cultures, glucose POCT, urine, chain of custody.",
    sections: [
      {
        id: "m8s1",
        title: "Blood Cultures",
        lessons: [
          {
            id: "m8s1l1",
            title: "Aseptic technique",
            why: "Contaminated cultures = wrong antibiotics.",
            body: "Scrub site with chlorhexidine 30s, let dry. Scrub bottle tops with alcohol. Aerobic first when using butterfly + adapter (to avoid air in anaerobic bottle).",
          },
        ],
      },
      {
        id: "m8s2",
        title: "Point of Care Testing",
        lessons: [
          {
            id: "m8s2l1",
            title: "Glucose fingerstick",
            why: "Quick result at bedside; QC matters.",
            body: "Run QC per shift, warm hand, wipe first drop (tissue fluid), use second drop, document.",
          },
        ],
      },
    ],
  },
];

// Flashcards — quick recall, use as cheatsheet
export type Flashcard = {
  id: string;
  module: number;
  front: string;
  back: string;
  category: string;
};

export const FLASHCARDS: Flashcard[] = [
  // Order of draw
  { id: "fc1", module: 6, category: "Order of Draw", front: "What's the 1st tube in the order of draw?", back: "Blood culture bottles (yellow SPS)." },
  { id: "fc2", module: 6, category: "Order of Draw", front: "Order of draw mnemonic", back: "Stop Light Red Stay Put Going → Yellow, Light Blue, Red/Gold, Green, Lavender, Gray." },
  { id: "fc3", module: 6, category: "Order of Draw", front: "Why does order of draw matter?", back: "Prevents additive carryover that skews results (esp. EDTA → Ca, K)." },
  // Tubes
  { id: "fc4", module: 5, category: "Tubes", front: "Lavender top — additive & use?", back: "EDTA. Hematology / CBC." },
  { id: "fc5", module: 5, category: "Tubes", front: "Light blue top — additive & use?", back: "Sodium citrate. Coagulation (PT/PTT). MUST be filled to line — 9:1 ratio." },
  { id: "fc6", module: 5, category: "Tubes", front: "Gold/SST top?", back: "Clot activator + separator gel. Chemistry, serology." },
  { id: "fc7", module: 5, category: "Tubes", front: "Green top?", back: "Heparin. Stat chemistry (plasma)." },
  { id: "fc8", module: 5, category: "Tubes", front: "Gray top?", back: "Sodium fluoride / potassium oxalate. Glucose, lactate, alcohol." },
  // Anatomy
  { id: "fc9", module: 4, category: "Anatomy", front: "First-choice antecubital vein?", back: "Median cubital — most stable, least nerve/artery risk." },
  { id: "fc10", module: 4, category: "Anatomy", front: "Which AC vein has highest risk (artery + nerve)?", back: "Basilic vein — use last." },
  { id: "fc11", module: 4, category: "Anatomy", front: "Veins vs arteries — quick check?", back: "Veins don't pulse. Arteries pulse and feel deep/firm." },
  // Safety
  { id: "fc12", module: 3, category: "Safety", front: "First action after needlestick?", back: "Wash with soap & water immediately, then report to supervisor." },
  { id: "fc13", module: 3, category: "Safety", front: "Can you recap a used needle?", back: "No. Activate safety device one-handed, drop in sharps container." },
  { id: "fc14", module: 3, category: "Safety", front: "Sharps container — when to replace?", back: "When ¾ full." },
  // Infection
  { id: "fc15", module: 2, category: "Infection", front: "When do you do hand hygiene?", back: "Before & after every patient, before gloves, after gloves." },
  { id: "fc16", module: 2, category: "Infection", front: "Soap & water vs alcohol rub?", back: "Soap if visibly soiled or after C. diff. Otherwise alcohol rub is fine." },
  // Procedure
  { id: "fc17", module: 6, category: "Procedure", front: "Max attempts per phlebotomist?", back: "Two. Then get help." },
  { id: "fc18", module: 6, category: "Procedure", front: "Tourniquet max time?", back: "1 minute — longer causes hemoconcentration." },
  { id: "fc19", module: 6, category: "Procedure", front: "Needle angle for venipuncture?", back: "15–30 degrees, bevel up." },
  // Communication
  { id: "fc20", module: 1, category: "Communication", front: "Two patient identifiers — examples?", back: "Full name + DOB (preferred). Or MRN." },
  { id: "fc21", module: 1, category: "Communication", front: "Patient refuses draw — what now?", back: "Respect refusal, document, notify ordering provider." },
  // Handling
  { id: "fc22", module: 7, category: "Handling", front: "Top causes of specimen rejection?", back: "Hemolysis, clotting, mislabel, wrong tube, underfill, expired." },
  { id: "fc23", module: 7, category: "Handling", front: "When do you label tubes?", back: "At the bedside, in front of the patient." },
  { id: "fc24", module: 8, category: "POCT", front: "Glucose fingerstick — wipe which drop?", back: "Wipe the first drop (tissue fluid), use the second." },
];

export const STUDY_TIPS = [
  {
    title: "One card, one win",
    body: "Stuck or low energy? Just flip ONE flashcard. That's the whole task. Often you'll do five.",
  },
  {
    title: "Body doubling with the tutor",
    body: "Open the AI tutor and just chat through what you remember out loud. It will fill the gaps.",
  },
  {
    title: "Chunk by color",
    body: "Don't 'study tubes'. Study the lavender tube today. Tomorrow, blue. Brain handles small bites better.",
  },
  {
    title: "Teach it back",
    body: "After a lesson, explain it to a pet, plant, or pillow. If you stumble, that's where to re-read.",
  },
  {
    title: "Spaced reviews beat cramming",
    body: "5 minutes today, 5 tomorrow, 10 on the weekend. Way stronger than 1 hour the night before.",
  },
  {
    title: "Movement helps memory",
    body: "Pace while reviewing flashcards. Walking + reciting cements recall.",
  },
];
