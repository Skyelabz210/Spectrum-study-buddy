export type SetupTask = {
  id: string;
  title: string;
  system: string;
  priority: "now" | "next" | "verify";
  steps: string[];
  needed?: string[];
  warning?: string;
};

export type SignInItem = {
  id: string;
  label: string;
  path: string;
  useFor: string;
  credentialNote: string;
};

export type SpouseInfoItem = {
  id: string;
  label: string;
  reason: string;
};

export const WORK_PROFILE = {
  preferredNameLabel: "Your name",
  pidLabel: "Spectrum PID",
  workEmailLabel: "Spectrum work email",
  localStorageKey: "callflowlab.privateProfile.v1",
  authorityNote:
    "Personal work identity is isolated from the company product corpus. Keep passwords, PINs, authenticator codes, SSNs, and document images out of this app.",
};

export const SETUP_TASKS: SetupTask[] = [
  {
    id: "confirm-login",
    title: "Confirm work login and authentication",
    system: "IDM / Windows / Webex",
    priority: "now",
    steps: [
      "Confirm the exact work email from the IDM or onboarding email.",
      "Confirm PID and keep it in the private profile for rapid reference.",
      "Confirm the phone security-code/authenticator app still works.",
      "Open Webex from Start Menu and sign in.",
    ],
    needed: ["Work email", "PID", "phone authenticator/security-code app"],
    warning: "Never store or share your Spectrum password, activation PIN, authenticator code, or employee-system secret.",
  },
  {
    id: "employee-services",
    title: "Start employee connectivity services",
    system: "Panorama → My Charter → Connectivity Services",
    priority: "now",
    steps: [
      "Open Panorama.",
      "Go to My Charter at the top of the page.",
      "Open Connectivity Services.",
      "Click the get-started link for core employee services.",
      "Confirm the home/service address shown before submitting anything.",
      "Use Check Serviceability after the address is correct.",
    ],
    needed: ["current service address", "lease/account details if applicable", "photo ID if store/account takeover is needed"],
    warning: "If the address is updated today, wait for the update to process before assuming serviceability will work.",
  },
  {
    id: "home-scenario",
    title: "Identify the home-service scenario",
    system: "Connectivity Services",
    priority: "now",
    steps: [
      "If nobody at the home has Spectrum, start as a new employee-service setup.",
      "If service is already under your name, continue the employee-service workflow.",
      "If service is active under someone else's name, check account takeover or store/ID path.",
      "If renting or sharing service, ask whether room account, account takeover, or disconnect/new setup applies.",
      "If internet is bundled through an apartment complex, verify whether missing employee services can be added under your lease/name.",
    ],
    needed: ["service address", "current account holder name if different", "lease/rental context", "store visit readiness if required"],
  },
  {
    id: "mobile-after-internet",
    title: "Set up employee mobile after internet is active",
    system: "Employee Services / Mobile setup class",
    priority: "next",
    steps: [
      "Do not start employee mobile before the internet account is active.",
      "After internet activation, follow the mobile setup path or ask the facilitator to walk you to the correct setup group.",
      "Confirm employee mobile line pricing, eligible line count, device compatibility, and whether the discount applies to service only.",
    ],
    needed: ["active Spectrum internet account", "phones/tablets/watches to add", "unlock/BYOD status if bringing devices"],
    warning: "The transcript says service discounts apply; do not assume special device purchase pricing unless official Employee Services confirms it.",
  },
  {
    id: "benefit-connect",
    title: "Enroll in insurance and benefits before the deadline",
    system: "Panorama → nine-dot launcher → Benefit Connect",
    priority: "now",
    steps: [
      "Open Panorama.",
      "Click the nine-dot app launcher in the top right.",
      "Open Benefit Connect.",
      "Use the countdown box to track the deadline.",
      "Click Enroll Now, or Continue if already started.",
      "Review medical, dental, vision, and other benefit options.",
      "Use the blue folder and Claire's benefits website before finalizing.",
      "Save elections if needed, but return before the countdown expires.",
    ],
    needed: ["blue folder", "Claire's benefits website", "spouse/dependent details", "doctor/prescription/dental/vision needs"],
    warning: "New-hire enrollment was described as a 30-day window. Missing it may push changes to open enrollment.",
  },
  {
    id: "dependent-verification",
    title: "Prepare spouse/dependent verification",
    system: "Benefit Connect / HR / Claire",
    priority: "next",
    steps: [
      "Collect spouse legal name, DOB, SSN, and contact details if adding family coverage.",
      "Prepare marriage certificate if spouse verification is requested.",
      "Collect child/dependent legal names, DOBs, SSNs, and birth certificates or relationship documents if needed.",
      "Ask Claire or Benefit Connect what documents are required before uploading or submitting anything uncertain.",
    ],
    needed: ["marriage certificate if requested", "birth certificates/dependent documents if requested", "current coverage info", "doctor and prescription list"],
    warning: "Do not upload sensitive documents to the wrong system. Use the official Benefit Connect or HR path only.",
  },
  {
    id: "spark-profile",
    title: "Create Spark rewards profile",
    system: "All Apps → Spark",
    priority: "next",
    steps: [
      "Open All Apps.",
      "Find Spark.",
      "Create or complete the profile.",
      "Browse rewards and gift cards during downtime.",
      "Send meaningful weekly shout-outs to classmates or teammates.",
      "Watch for power hours, recognition contests, and leadership reward prompts.",
    ],
    needed: ["profile answers", "wishlist items if desired"],
    warning: "Cash out Sparks before leaving the company; transcript notes unredeemed Sparks can be lost after termination.",
  },
  {
    id: "watch-comms",
    title: "Watch Webex and email for hidden incentives",
    system: "Webex / Outlook",
    priority: "next",
    steps: [
      "Stay signed into Webex.",
      "Read team chats and incentive flyers.",
      "Read emails fully for reward prompts or snack/raffle instructions.",
      "Screenshot or submit sales exactly as instructed when a power-hour flyer requires it.",
    ],
    needed: ["Webex access", "Outlook access", "attention to official chats"],
  },
];

export const SIGN_IN_ITEMS: SignInItem[] = [
  {
    id: "pid",
    label: "PID",
    path: "Private profile on this device",
    useFor: "Fast employee-login reference. This is personal/admin data, not a Spectrum product fact.",
    credentialNote: "A PID is an identifier, not a password. Never pair it with a password, activation PIN, or authenticator code in the app.",
  },
  {
    id: "work-email",
    label: "Work email",
    path: "Private profile on this device",
    useFor: "Primary work sign-in identity from IDM/onboarding. It remains separate from the product corpus.",
    credentialNote: "Store password only in a password manager or private secure note.",
  },
  {
    id: "panorama",
    label: "Panorama",
    path: "Open from work computer/app portal",
    useFor: "Main hub for My Charter, Connectivity Services, Benefit Connect, Copilot Residential, and employee systems.",
    credentialNote: "Use work credentials and authenticator if prompted.",
  },
  {
    id: "connectivity",
    label: "Connectivity Services",
    path: "Panorama → My Charter → Connectivity Services",
    useFor: "Employee internet, TV, voice, serviceability, address validation, and setup paths.",
    credentialNote: "Verify address before submitting service changes.",
  },
  {
    id: "benefit-connect",
    label: "Benefit Connect",
    path: "Panorama → nine-dot launcher → Benefit Connect",
    useFor: "Medical, dental, vision, spouse/dependent coverage, and benefits enrollment countdown.",
    credentialNote: "Use Enroll Now or Continue and finish before the deadline.",
  },
  {
    id: "webex",
    label: "Webex",
    path: "Start Menu → Webex",
    useFor: "Class/team chats, links, incentive flyers, power hours, and official updates.",
    credentialNote: "May require phone security code/authenticator.",
  },
  {
    id: "spark",
    label: "Spark",
    path: "All Apps → Spark",
    useFor: "Recognition, shout-outs, Sparks rewards, gift cards, wishlist, and incentive redemption.",
    credentialNote: "Complete profile and cash out rewards before leaving the company.",
  },
  {
    id: "copilot-residential",
    label: "Copilot Residential",
    path: "Panorama → All Apps → Copilot Residential",
    useFor: "Internal articles, product/process research, and training questions.",
    credentialNote: "Use official article guidance over memory when rules conflict.",
  },
];

export const SPOUSE_INFO_LIST: SpouseInfoItem[] = [
  { id: "spouse-name", label: "Full legal name", reason: "Needed if adding spouse to medical, dental, vision, or other dependent benefits." },
  { id: "spouse-dob", label: "Date of birth", reason: "Benefit Connect may require it for dependent enrollment." },
  { id: "spouse-ssn", label: "Social Security number", reason: "May be required for benefits/dependent verification. Do not store it in this app." },
  { id: "marriage-cert", label: "Marriage certificate", reason: "Prepare if spouse verification is requested." },
  { id: "current-coverage", label: "Current insurance coverage", reason: "Compare whether adding spouse/dependents makes financial sense." },
  { id: "doctors-rx", label: "Doctors, prescriptions, dental, vision, orthodontia needs", reason: "Use this to choose medical, dental, and vision options accurately." },
  { id: "children-docs", label: "Children/dependent names, DOBs, SSNs, birth certificates if applicable", reason: "Needed only if adding children/dependents." },
  { id: "mobile-lines", label: "Current mobile carrier, phone numbers, device balances, unlock status", reason: "Useful if moving family mobile lines after employee internet is active." },
  { id: "streaming", label: "Current paid streaming services", reason: "Compare against employee TV/premium access before paying for duplicate subscriptions." },
];

export const EMPLOYEE_PERKS = [
  "Standard employee internet was described as free, with standard speed discussed as 500 Mbps.",
  "1 Gig upgrade was discussed as a $20/month differential; 2 Gig as $30/month where available. Verify in Employee Services.",
  "Employee TV was described as every channel and premium included, with up to two Xumo boxes.",
  "Landline/home phone was described as free, up to two lines.",
  "Employee mobile was discussed as discounted service, up to 10 lines, but internet must be active first.",
  "HBO/Max, Peacock, ESPN, and Paramount access were discussed as employee TV/premium benefits; verify exact login path.",
  "Spark rewards were described as dollar-for-dollar recognition points redeemable for gift cards or catalog items.",
];

