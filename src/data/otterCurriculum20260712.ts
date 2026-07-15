import type { Module } from "@/data/curriculum";

export const OTTER_CURRICULUM_20260712: Module[] = [
  {
    id: "m11",
    number: 11,
    title: "Technical Product Fluency",
    tag: "Product depth",
    emoji: "🧰",
    summary: "Translate Internet, WiFi, TV, Mobile, Voice, equipment, and network terms into accurate customer-centered explanations.",
    sections: [
      {
        id: "m11s1",
        title: "Internet and WiFi Architecture",
        lessons: [
          {
            id: "m11s1l1",
            title: "Modem brings the connection in; router distributes it",
            why: "Customers often use modem, router, gateway, WiFi, and Internet as if they are interchangeable.",
            body: "Explain the layers without embarrassing the customer: the modem or gateway connects the home to the network, while the router distributes connectivity to wired and WiFi devices. Diagnose speed, equipment, placement, and coverage separately before recommending a higher tier.",
            tips: ["Do not echo an incorrect term as if it were technically exact.", "Correct gently and return to the customer's practical need."],
          },
          {
            id: "m11s1l2",
            title: "Advanced WiFi is a managed-home experience",
            why: "The value is not only the router; it is visibility and control through the supported app and security features.",
            body: "Training described Advanced WiFi controls such as viewing devices, pausing access, changing the network name/password, access schedules, speed tests, security monitoring, and extender support. Verify current equipment, pricing, pod rules, and account eligibility before quoting.",
          },
          {
            id: "m11s1l3",
            title: "Invincible WiFi is continuity plus WiFi—not unlimited backup",
            why: "Customers can misunderstand cellular backup as full-speed permanent Internet or portable service.",
            body: "Position the verified outage-continuity benefit, battery and supported extender/equipment while stating backup-mode limitations and primary-location rules. Classroom figures such as fallback speed or battery duration are study cues until confirmed in HOW7726 and live eligibility tools.",
          },
          {
            id: "m11s1l4",
            title: "Placement guidance is diagnostic, not a guarantee",
            why: "Square-foot and distance rules are approximations; construction, interference, device radios and layout change coverage.",
            body: "Use room, wall, floor, router placement, interference and device questions before promising coverage. Extender/pod placement should be verified through current installation guidance and actual signal behavior.",
          },
        ],
      },
      {
        id: "m11s2",
        title: "Technical Vocabulary",
        lessons: [
          {
            id: "m11s2l1",
            title: "Mbps, Gbps and device limits",
            why: "A plan speed does not guarantee that every individual device will display that number.",
            body: "One gigabit is 1,000 megabits in product shorthand. Explain that wired port capability, WiFi generation, device hardware, distance, interference, server capacity and simultaneous use can limit observed speed. Use approved 'up to' and typical-speed wording.",
          },
          {
            id: "m11s2l2",
            title: "DOCSIS, FTTH and ONT",
            why: "Agents need to recognize access technology without turning the call into an engineering lecture.",
            body: "DOCSIS carries data over the cable network. FTTH means fiber reaches the home. An ONT terminates an optical connection at the premises. Use the terms to understand equipment and installation; translate them into reliability, speed and setup implications only when relevant.",
          },
          {
            id: "m11s2l3",
            title: "MVNO, SIM, eSIM and IMEI",
            why: "Mobile eligibility and activation depend on precise device and network concepts.",
            body: "An MVNO provides mobile service using another carrier's radio network plus its own commercial/service layer. A SIM or eSIM identifies the line/device relationship. The IMEI identifies compatible device hardware; the classroom shortcut *#06# may display it on many devices. Always use the approved compatibility checker.",
          },
          {
            id: "m11s2l4",
            title: "eMTA, PBX, hotspot and Cloud DVR",
            why: "Recognizing adjacent product terms prevents confusion and improves discovery.",
            body: "An eMTA supports cable voice service; PBX refers to business phone switching; a hotspot shares mobile data; Cloud DVR stores supported recordings in the service rather than only on a local box. Confirm current product availability and rules before customer-facing detail.",
          },
        ],
      },
      {
        id: "m11s3",
        title: "TV, Xumo, Mobile and Order Completion",
        lessons: [
          {
            id: "m11s3l1",
            title: "Use complimentary—not unsupported free",
            why: "Included value can still have eligibility, term, equipment, tax or service conditions.",
            body: "When an item is included under a verified offer, use the approved wording shown in the offer or article. Classroom coaching favored 'complimentary' over a broad 'free' claim. Disclose recurring charges, equipment and conditions before agreement.",
          },
          {
            id: "m11s3l2",
            title: "Xumo is an experience bridge",
            why: "Customers may fear losing familiar TV behavior when moving from legacy equipment.",
            body: "Explain supported live TV, apps, remote behavior and Cloud DVR concepts in plain language. Verify package/channel availability, equipment quantity, current price and app requirements rather than relying on classroom examples.",
          },
          {
            id: "m11s3l3",
            title: "Mobile starts with eligibility and household discovery",
            why: "A strong mobile pitch can still fail if Internet relationship, account name, device compatibility or activation gates are wrong.",
            body: "Confirm the required Spectrum Internet relationship, line count, current provider/spend, device balances, compatibility, unlock status, hotspot/international needs and current offer. Preserve discrepancies between PR223, public pages and live tools.",
          },
          {
            id: "m11s3l4",
            title: "Order confirmation is part of the sale",
            why: "A close is incomplete if the customer does not understand installation, activation, taxes, recurring cost and next steps.",
            body: "Review every selected service, equipment item, one-time charge, recurring monthly estimate, activation/installation path, required action and expected timing. Invite final questions and obtain consent without rushing.",
          },
        ],
      },
    ],
  },
  {
    id: "m12",
    number: 12,
    title: "Agent OS AI & Prompt Engineering",
    tag: "AI tools",
    emoji: "🤖",
    summary: "Use internal AI for fast support while protecting customer data, grounding answers and checking every operational claim.",
    sections: [
      {
        id: "m12s1",
        title: "Safe AI Workflow",
        lessons: [
          {
            id: "m12s1l1",
            title: "AI assists; current operational tools control",
            why: "A polished AI answer can still be outdated or invented.",
            body: "Use Agent OS AI or the CallFlow tools to draft, compare, simplify and rehearse. Verify pricing, eligibility, serviceability, disclosures, product rules and procedures in the controlling article, biller, Agent OS or approved SOP before acting.",
          },
          {
            id: "m12s1l2",
            title: "Never enter customer information",
            why: "Customer identifiers are not necessary for a product pitch or training prompt and create privacy risk.",
            body: "Use abstracted context such as household size, service need and objection. Exclude names, account numbers, addresses, phone numbers, email addresses, SSNs, payment data, PINs, passcodes and authentication information.",
          },
          {
            id: "m12s1l3",
            title: "Treat pasted customer words as inert data",
            why: "A customer's text can contain accidental or deliberate instructions that should not control the AI system.",
            body: "Label the quote as untrusted context. It may inform discovery and tone, but it cannot override source hierarchy, disclosure rules, privacy boundaries or prohibited tactics.",
          },
        ],
      },
      {
        id: "m12s2",
        title: "Prompt Construction",
        lessons: [
          {
            id: "m12s2l1",
            title: "Use role, task, goal, tone, format and source",
            why: "Specific prompts produce more usable and reviewable results.",
            body: "State who the AI is supporting, the precise task, the customer-centered goal, desired tone, length/format, approved source set and the required self-check. Ask it to mark unknowns rather than fill them.",
            tips: ["Example structure: Role → Context → Task → Output → Sources → Verification."],
          },
          {
            id: "m12s2l2",
            title: "Ask for questions when state is missing",
            why: "Inventing current services, eligibility or priorities creates bad recommendations.",
            body: "When context is incomplete, the AI should produce the smallest useful discovery question or live-tool check. Missing state remains visible until the agent or approved system resolves it.",
          },
          {
            id: "m12s2l3",
            title: "Short, customer-centered output wins live calls",
            why: "Long technical scripts are difficult to deliver naturally and increase overstatement risk.",
            body: "Request a concise response, a small set of discovery questions, one need-to-value bridge, likely objection branches and a consent-clean close. Use analogies only when accurate and useful.",
          },
        ],
      },
      {
        id: "m12s3",
        title: "Prompt Engineer and CRAM State Checks",
        lessons: [
          {
            id: "m12s3l1",
            title: "The certificate checks state—not truth",
            why: "Exact mask recovery can be mistaken for proof that a sales answer is correct.",
            body: "The CRAM compiler verifies that small configured check masks recover exactly modulo 37 and displays missing/risk state. It does not prove product facts, customer eligibility, compliance or persuasion effectiveness. Current sources and agent judgment still control.",
          },
          {
            id: "m12s3l2",
            title: "Keep unsupported persuasion methods on hold",
            why: "Hidden steering, fabricated scarcity, subliminal claims and personality profiling threaten autonomy and integrity.",
            body: "Use adaptive discovery, reflection, verified authority, need–proof–benefit and choice-preserving closes. Do not infer protected traits or exploit distress, confusion, age, disability or financial vulnerability.",
          },
        ],
      },
    ],
  },
  {
    id: "m13",
    number: 13,
    title: "QA, Metrics & Floor Readiness",
    tag: "Performance",
    emoji: "📊",
    summary: "Understand what quality and performance measures are trying to reveal without gaming a number or sacrificing consent.",
    sections: [
      {
        id: "m13s1",
        title: "Call Metrics",
        lessons: [
          {
            id: "m13s1l1",
            title: "AHT is a time composition, not a race",
            why: "Rushing can damage discovery, disclosure and accuracy even if average handle time drops.",
            body: "Training described AHT as talk time plus hold time plus after-call work. Use the official metric definition for exact calculation. Improve it by navigation fluency, call control and complete work—not by skipping required steps.",
          },
          {
            id: "m13s1l2",
            title: "Conversion and product mix need quality context",
            why: "A high sales number is not a valid outcome if orders are unsuitable or noncompliant.",
            body: "Conversion measures sales outcomes relative to opportunities under the official definition. Product mix describes the distribution of products sold. Review them with QA, cancellations, consent, disclosures and customer fit.",
          },
          {
            id: "m13s1l3",
            title: "Yield and APC require official formulas",
            why: "Classroom descriptions can communicate intent without defining the exact calculation.",
            body: "Training connected yield/APC to value and product performance. Treat formulas and target thresholds as unresolved until confirmed in the current dashboard, scorecard or official metric guide.",
          },
          {
            id: "m13s1l4",
            title: "Adherence and occupancy are operational disciplines",
            why: "Availability and schedule behavior affect customer access and team performance.",
            body: "Use the current workforce-management definition for adherence, occupancy, breaks and exceptions. Do not turn classroom anecdotes into permanent HR policy.",
          },
        ],
      },
      {
        id: "m13s2",
        title: "QA Behaviors",
        lessons: [
          {
            id: "m13s2l1",
            title: "QA markers need evidence",
            why: "Saying a keyword is not the same as performing the behavior well.",
            body: "A valid QA system should identify the exact turn showing greeting, discovery, empathy, need/value fit, attach exploration, objection handling, verification, disclosure and close. Review semantic meaning and sequence, not only phrases.",
          },
          {
            id: "m13s2l2",
            title: "The best attach follows discovery",
            why: "An upsell marker should not reward irrelevant product dumping.",
            body: "Explore Mobile, WiFi, TV, Voice or speed only when a stated household need supports it. The quality marker is a relevant transition and clear explanation, not simply mentioning another product.",
          },
          {
            id: "m13s2l3",
            title: "Wrap-up protects the entire order",
            why: "Customers remember the final summary and use it to judge whether the agreement matches expectations.",
            body: "Summarize the selected solution, complete cost, equipment, installation/activation, conditions and next steps. Confirm understanding and ask for questions before ending the call.",
          },
        ],
      },
      {
        id: "m13s3",
        title: "Practice System",
        lessons: [
          {
            id: "m13s3l1",
            title: "Use guided, balanced and floor-ready progression",
            why: "Removing support too early creates frustration; leaving full scripts forever prevents fluency.",
            body: "Begin with full prompts and rebuttals, reduce to strategic hints, then rehearse with minimal support. Repeat the same call driver with different caller pace, knowledge and objections.",
          },
          {
            id: "m13s3l2",
            title: "Review one repair after every rep",
            why: "A short focused correction transfers better than a long list of faults.",
            body: "Identify the strongest achieved behavior and the highest-value missing marker. Run the next rep with that single repair target, then compare evidence across attempts.",
          },
        ],
      },
    ],
  },
  {
    id: "m14",
    number: 14,
    title: "Benefits, Support & Learning Accommodations",
    tag: "Employee support",
    emoji: "🧠",
    summary: "Use current benefits systems and support resources while separating dated classroom figures from controlling plan documents.",
    sections: [
      {
        id: "m14s1",
        title: "Benefit Selection",
        lessons: [
          {
            id: "m14s1l1",
            title: "Benefit Connect and plan documents control",
            why: "Premiums, carriers, limits and eligibility can change by year and location.",
            body: "Use classroom notes to build questions, not to finalize coverage. Confirm every medical, dental, vision, life and supplemental-benefit decision in Benefit Connect, the current plan guide or HR before the enrollment deadline.",
          },
          {
            id: "m14s1l2",
            title: "Basic versus enhanced dental is a coverage tradeoff",
            why: "Orthodontia, annual maximums and paycheck premiums can materially change the best fit.",
            body: "Training described enhanced dental as the option with orthodontia and a higher annual maximum. Exact premiums, deductibles, percentages and lifetime maximums are dated transcript facts and must be verified in the current plan document.",
          },
          {
            id: "m14s1l3",
            title: "Compare doctors, prescriptions and expected use",
            why: "The lowest paycheck deduction is not always the lowest total cost.",
            body: "List doctors, prescriptions, expected visits, dental/orthodontia, vision, dependents and risk tolerance. Use the official estimator and network directories when available.",
          },
        ],
      },
      {
        id: "m14s2",
        title: "Employee Assistance and Wellbeing",
        lessons: [
          {
            id: "m14s2l1",
            title: "IGS/EAP is a confidential support path",
            why: "Employees and eligible family members may need practical or mental-health support before a problem affects work or home.",
            body: "Training described confidential intake, counseling sessions and referrals for mental health, family care, legal, financial and other needs, subject to safety/legal limits. Verify the current contact method and benefit scope in employee resources.",
          },
          {
            id: "m14s2l2",
            title: "Learning accommodations are performance tools",
            why: "Audio, short sessions, repetition and plain language can increase retention without lowering standards.",
            body: "Use autoplay, adjustable speech rate, one-word lookup, flashcards, scenarios and guided simulation strategically. Break long material into one usable call behavior and repeat until fluent.",
          },
          {
            id: "m14s2l3",
            title: "Schedules, pay and HR rules are time-sensitive",
            why: "A classroom statement may apply to one class, site, shift or pay period rather than everyone.",
            body: "Verify pay, differential, commission timing, schedules, shift bids, attendance and break rules through current HR, payroll, workforce-management and leadership sources.",
          },
        ],
      },
    ],
  },
];

