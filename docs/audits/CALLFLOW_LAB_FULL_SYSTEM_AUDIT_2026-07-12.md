# CallFlow Lab / Spectrum Study Buddy
## Comprehensive System, Subsystem, Corpus, Training and Release Audit

**Audit date:** 2026-07-12  
**Repository:** `Skyelabz210/tish-s-phlebotomy-pal`  
**Audited branch:** `main`  
**App identity:** `callflow-lab`  
**Audited package version at start:** `1.1.0-spectrum.4`  
**Scope:** complete Spectrum sales-agent study application, including implemented routes, data systems, AI systems, study accommodations, Otter ingestion, operational source controls, privacy boundaries, testing, deployment, missing capabilities and prioritized repairs.

---

## 1. Executive assessment

CallFlow Lab is no longer a renamed flashcard shell. It is an integrated private sales-learning workspace with four distinct operating modes:

1. **Retrieval:** deterministic Quick Lookup plus corpus-grounded AI retrieval.
2. **Learning:** curriculum, flashcards, tips, study planning, autoplay and memory.
3. **Practice:** static scenarios, AI sales-prompt generation and the Across the Spectrum mock-call simulator.
4. **Operations support:** private employee setup, weekly ingestion ledger, source conflict preservation and employee-benefits study material.

The strongest architectural decision is the separation between:

- company/product knowledge;
- employee-private profile values;
- current operational authority; and
- transcript-derived training claims.

The highest-priority engineering risks are:

- no automated CI release gate;
- no configured lint, typecheck or test scripts;
- a hand-maintained generated route tree with `@ts-nocheck`;
- simulator scoring based on keywords rather than semantic QA;
- source facts stored in static TypeScript without automatic expiration or freshness checks;
- AI dependence on Lovable gateway configuration and credits;
- localStorage used for private profile and learning memory without encryption or cross-device controls;
- Supabase scaffolding present but not yet tied to a documented data model, RLS policy set or feature contract;
- employee-benefit numbers and operational metrics that can change and therefore require visible source date/status labels.

**Overall status:** strong prototype / internal learning application; not yet production-certified for broad agent deployment.

---

## 2. Source hierarchy and evidence policy

Every system that displays Spectrum product, process, pricing, eligibility, policy or benefit information must follow this authority order:

1. Current approved internal article or SOP.
2. Live Agent OS/biller/serviceability/offer screen.
3. Current approved product, Competitive Edge or operational tool content.
4. Dated internal training material.
5. Otter transcript extraction.
6. Public Spectrum page.
7. Third-party/public comparison source.
8. App memory or general model knowledge.

The app must never flatten a conflict between levels 1–7. It must retain:

- source identifier;
- effective or observed date;
- exact disputed field;
- confidence/status;
- required verification destination.

Known conflict classes already present:

- public versus PR223 mobile threshold wording;
- advertised, promotional and standard pricing;
- “free” versus approved “complimentary” language;
- classroom shorthand versus official product definitions;
- evolving device, buyout, trade-in and activation rules;
- employee-benefit/pay/schedule figures that are date-, market- or employee-specific.

---

## 3. Top-level application architecture

### 3.1 Runtime and framework

| Item | Current state | Audit finding | Required action |
|---|---|---|---|
| Runtime | React 19 + TanStack Start/Router + Vite | Modern stack; versions are not fully aligned across Start, Router and router-plugin | Pin compatible versions and run a clean install/build matrix |
| Styling | Tailwind CSS 4, Radix UI, shadcn-style components | Consistent dark/neon study workspace | Add contrast, reduced-motion and focus-state audit |
| Server functions | TanStack `createServerFn` | Correct place for AI gateway secrets | Add request logging policy, timeout and structured error telemetry |
| Deployment | Lovable/TanStack/Cloudflare tooling | Existing Lovable project; private editor preview desired | Keep production URL disabled until privacy/build gates pass |
| Package privacy | `private: true` | Correct for internal app | Preserve |
| Route generation | manually compacted `routeTree.gen.ts` with `@ts-nocheck` | Major release risk; generated types are bypassed | Regenerate automatically during dev/build and remove manual ownership |

TanStack file-based routing is designed to have the router plugin generate route configuration during development/build. The current manual route-tree workflow should be treated as temporary migration debt.

### 3.2 Global shell

**Responsibilities**

- global metadata;
- QueryClient provider;
- sidebar and responsive navigation;
- not-found and error recovery;
- route outlet;
- global stylesheet and scripts.

**Wiring checks**

- Every first-class route must appear in the filesystem, route tree, sidebar and relevant home shortcut.
- Error boundary must not disclose stack traces to the user.
- Header and sidebar must remain keyboard reachable.
- Current app title must never regress to the former phlebotomy identity.

**Recommended tests**

- render every route from a cold start;
- verify active-navigation state;
- verify 404 route;
- inject component exception and verify recovery;
- viewport checks at 320, 768, 1024 and 1440 px.

---

## 4. Route and feature technical sheets

### 4.1 Home `/`

**Purpose:** private launchpad, current version/week display, local PID title, feature navigation and corpus-size indicators.

**Inputs:** `MODULES`, `ALL_FLASHCARDS`, `SCENARIOS`, `CALLER_PERSONAS`, weekly update, private local profile.

**State/storage:** reads PID/work email from localStorage; copy-to-clipboard for PID.

**Strengths:** direct access to high-frequency tools; product corpus remains separate from private profile.

**Risks:** corporate email/PID remain visible to anyone using the same browser profile; localStorage is origin-scoped, persistent and readable by scripts running on the origin.

**Optimal configuration:** provide a one-click “private mode / clear local identity” control, inactivity lock and visible storage-status badge.

**Tutorial:** enter PID/email in My Setup once; use Quick Lookup during study; use Curriculum for structured study; use Across for practice.

---

### 4.2 Quick Lookup `/lookup`

**Purpose:** retrieve plan, speed, service, requirements, caveats and source-control information from one or two terms.

**Subsystems:**

- deterministic local search;
- canonical `KnowledgeRecord` corpus;
- score/rank function;
- AI lookup mode with injected corpus matches;
- source-discrepancy presentation.

**Inputs:** query string; canonical corpus records.

**Outputs:** compact plan/spec response and verification instruction.

**Strengths:** low latency; avoids unrestricted general-model answers; preserves disagreements.

**Risks:** static records become stale; ranking can miss aliases; AI mode can still summarize poorly; source text has no automatic expiration.

**Required refinements:**

- add `effectiveDate`, `expiresAt`, `lastVerifiedBy`, `marketScope`, `customerFacing`, and `operationalAuthority` fields;
- display stale badge after configurable age;
- exact alias tests for every plan/article ID;
- zero-result and ambiguous-result analytics;
- one-click open/copy source ID.

**Acceptance tests:** every canonical record must be reachable by ID, name and common alias; no record may omit verification guidance.

---

### 4.3 Canonical knowledge corpus

**Purpose:** single structured product truth layer for retrieval and AI grounding.

**Current domains:** Internet tiers, affordability, Mobile plans, BYOD, Phone Balance Buyout, trade-in, repair/replacement, Invincible WiFi, launch notes and shallow business context.

**Required invariant:** a record is not “true because it is in the corpus”; it is a dated study representation with an authority pointer.

**Missing capabilities:**

- schema validation at build time;
- automated duplicate/source-ID detection;
- per-field provenance;
- supersession graph;
- market/address scoping;
- article-diff ingestion;
- redaction policy enforcement;
- review queue for contradictions.

---

### 4.4 Curriculum `/curriculum` and `/curriculum/$moduleId`

**Purpose:** structured progression from call foundation through products, systems, objections, sales execution and weekly source control.

**Learning accommodations:**

- short lessons;
- “why it matters” context;
- tips;
- speech autoplay;
- variable speech rate;
- skip/stop controls;
- saved takeaways and coach memory.

**Strengths:** low cognitive load and explicit operational relevance.

**Risks:** no prerequisites, mastery gate, spaced repetition or source-date badge at lesson level.

**Additions required by this audit:**

- technical product fluency and vocabulary;
- Agent OS AI/prompt engineering;
- QA/performance metrics and floor readiness;
- benefits/support resources and source caution;
- simulator operating procedure and post-call review;
- approved-language distinctions such as “complimentary” versus unsupported “free.”

---

### 4.5 Flashcards `/flashcards`

**Purpose:** rapid recall, cheatsheet review and autoplay.

**Current systems:** base cards + supplemental cards + dated product pack.

**Strengths:** deterministic deck; grouped cheatsheet; speech rate; shuffle/reset; learner-memory tracking.

**Risks:** no due-date scheduler, mastery state, source date, confidence level, retirement/supersession status or card-version migration.

**Required refinements:**

- spaced repetition (Again/Hard/Good/Easy);
- card source and effective date;
- “transcript-derived—verify” badge;
- automatic duplicate-front and duplicate-ID tests;
- card coverage report mapping every curriculum lesson and corpus record to at least one card;
- archive superseded cards without deleting provenance.

---

### 4.6 Static Scenario Trainer `/scenarios`

**Purpose:** written A-R-M and policy-gate rehearsal.

**Inputs:** scenario dataset.

**Outputs:** learner response, coach model, risk flags.

**Strengths:** compares learner formulation against structured Acknowledge/Respond/Move Forward model.

**Risks:** comparison is self-directed, not semantic; no scoring, attempt history or randomized facts.

**Refinements:** AI rubric mode grounded in scenario fields; hide model until response minimum; score consent, source verification, disclosure and forward motion separately.

---

### 4.7 Spectrum Across the Spectrum `/across-spectrum`

**Purpose:** live mock sales-call comfort training across caller behaviors and call drivers.

**Implemented:**

- Ready button;
- Web Audio start beep;
- active timer;
- stop-to-wrap control;
- six personas;
- guided/balanced/floor-ready difficulty;
- typed transcript;
- QA achievements;
- scripting/rebuttal panel;
- wrap score and missing-marker coaching.

**Current QA markers:** greeting, discovery, empathy, value fit, attach/upsell, A-R-M, verification and clean close.

**Current limitation:** marker detection is substring/keyword matching. It can reward a phrase used incorrectly and miss semantically correct language.

**Required next architecture:**

1. microphone permission and explicit privacy notice;
2. local or approved speech-to-text adapter;
3. text-to-speech caller voice with selectable voice profile, not demographic stereotyping;
4. server-side persona agent using only approved scenario/corpus context;
5. semantic QA rubric with evidence spans;
6. event timeline and turn latency;
7. deterministic scenario seed and replay;
8. post-call scorecard, transcript redaction and export;
9. no real customer/account data;
10. accessible status announcements for achievements and timer state.

**Persona caution:** vary communication style, pace, technical fluency, emotional state, hearing/clarity needs and decision context. Do not infer protected traits or train agents to discriminate by gender, race, age, disability, accent or socioeconomic status.

**Accessibility:** achievements need programmatic status messages; timer-based interactions need pause/stop controls; beep must have visual equivalent; reduced-motion and non-audio mode are required.

---

### 4.8 AI Sales Specialist Prompt Engineer `/sales-prompts`

**Purpose:** generate paste-ready prompts for Spectrum’s internal AI from minimal live-call context.

**Inputs:** call driver, exact customer words, known services, desired outcome, objection, tone and output depth.

**Implemented methods:** adaptive discovery, OARS, A-R-M, need–proof–benefit, source verification and choice-preserving close.

**Guardrails:** untrusted customer text is serialized as quoted data; sensitive-data and coercion patterns are flagged; unsupported persuasion methods remain on hold.

**Strengths:** explicit missing-state recovery, source hints and risk display.

**Critical audit finding:** CRAM mask/certificate logic is deterministic bookkeeping, not independent proof that a sales recommendation is correct or compliant. “Exact” means the small integer mask is recovered exactly under the configured modulus—not that source facts, psychology or offer eligibility are true.

**Required UI wording:** rename “CRAM-certified sales prompt” to “CRAM state-check prompt” or display an adjacent disclaimer explaining certificate scope.

**Required refinements:**

- source content injection rather than only source names;
- PII redaction before prompt creation;
- prompt length/token estimate;
- clipboard expiration/clear control;
- audit log stored locally only unless an approved backend exists;
- test cases for prompt injection, coercion, fabricated scarcity and unsupported certainty.

---

### 4.9 CRAM sales compiler

**Purpose:** encode five binary checks per level, select evidence-graded strategies and surface hold/risk state.

**Configuration:** carry bound 36; recovery modulus 37; four levels; five bits per level; maximum mask 31.

**Correct mathematical statement:** every 5-bit mask is below 32 and therefore below modulus 37; reducing the mask modulo 37 returns the same mask with zero carry.

**What it does not establish:** correctness of product facts, effectiveness of a persuasion theory, customer eligibility, legal compliance or outcome quality.

**Recommended tests:** exhaustive masks 0–31; all risk combinations; sensitive-data patterns; false-positive email/number checks; strategy-selection snapshots; no mutation of customer input.

---

### 4.10 Sales Coach `/tutor`

**Purpose:** tutor, simplify, quiz and corpus lookup modes.

**Backend:** server function calls Lovable AI Gateway; current model string is `google/gemini-3-flash-preview`.

**Controls:** Zod bounds messages and memory; lookup injects canonical matches; API key remains server-side.

**Failure modes:** missing key, rate limit, credit exhaustion, gateway failure, model retirement and prompt/corpus mismatch.

**Required refinements:** timeout/abort controller, retry policy, model configurable through environment, structured JSON response for lookup, citations to record IDs, telemetry without customer content and offline deterministic fallback.

**Privacy:** never paste real customer information into coach/prompt tools. Add client-side redaction warning and server-side DLP patterns.

---

### 4.11 Tutor memory and study progress

**Purpose:** remember studied modules, lessons, cards and short takeaways.

**Storage:** browser-local.

**Strength:** personalization without backend account.

**Risks:** origin scripts can read it; no encryption, expiration, export/import or multi-device sync; extracted takeaways can be wrong.

**Optimal configuration:** keep only learning-state IDs and user-written notes; no customer data; add clear/export/delete controls and schema version migration.

---

### 4.12 Speech and autoplay subsystem

**Purpose:** reduce reading load and support tired-brain/accessibility study.

**Current use:** flashcards and curriculum speech synthesis; simulator beep through Web Audio.

**Required checks:** browser support, voice availability, speech cancellation, page unmount cleanup, rate bounds, screen-reader interaction and audio-disabled fallback.

**Future:** optional microphone mode must be opt-in, visibly active, easy to stop and never silently persist audio.

---

### 4.13 My Setup `/setup` and private profile

**Purpose:** employee onboarding checklist and local PID/work-email convenience.

**Private profile rule:** PID and work email stay in browser localStorage and are excluded from product corpus.

**Prohibited storage:** passwords, MFA/security codes, activation PINs, SSNs, account numbers, payroll documents and identity-document images.

**Required refinement:** add “Clear private profile,” shared-device warning, optional masked display and automatic lock.

---

### 4.14 Benefits, perks and employee support

**Current domains:** Benefit Connect window, spouse/dependent preparation, dental, vision, employee connectivity services, Spark, IGS/EAP and employee-service perks.

**Source caution:** benefits, payroll, schedules, premiums and eligibility change. Benefit Connect, HR, plan documents and current employee systems control.

**Otter-derived study items added by this audit:**

- basic versus enhanced dental and orthodontia distinction;
- annual/lifetime maximum concepts;
- annual vision-exam benefit discussed in class;
- IGS/EAP confidential support and six-session-per-issue classroom description;
- life/medical plan comparison concepts;
- benefits deadline and edit-before-deadline workflow.

Exact premiums and limits must show date/source status and must not be treated as permanent.

---

### 4.15 Weekly Ledger `/corner`

**Purpose:** provenance, ingestion history, action items and unresolved questions.

**Strengths:** prevents silent replacement of uncertain facts.

**Missing:** per-change commit link, source coverage count, resolved-question workflow, supersession record and automated date range.

**Recommended ledger event schema:** event ID, source system, source ID, observed date, affected records/cards/lessons, redactions, conflicts, reviewer, commit and validation status.

---

### 4.16 Plan and Tips

**Purpose:** reduce cognitive overload and convert the corpus into manageable study actions.

**Refinements:** generate adaptive plan from due cards, weak QA markers, recent source changes and simulator results; include short-session mode, audio-only mode and high-contrast/reduced-motion preference.

---

### 4.17 Supabase/auth scaffolding

**Current state:** lazy client creation with Vite/server environment fallbacks, persisted auth sessions and generated types.

**Audit finding:** the app’s primary features are local/static and no documented production database contract was identified. Supabase should be considered dormant infrastructure until a data model, threat model and RLS policies are committed.

**Do not store in Supabase without explicit approval:** customer calls, real customer transcripts, customer identifiers, passwords/codes, employee identity documents or payroll material.

**Before activation:**

- define tables and retention;
- enable RLS on every exposed table;
- write least-privilege policies;
- test anonymous/authenticated/cross-user access;
- rotate keys and document environment ownership;
- separate private learner progress from source corpus;
- document deletion/export.

---

## 5. Otter corpus ingestion audit

### 5.1 Substantive sessions represented

| Meeting ID | Date | Primary content | Integration target |
|---|---|---|---|
| `1jaYdigiIkoS9OgdZl-WjGTBisE` | Jul 1 | SOP, escalation, integrity, authentication, benefits | Modules 1–3, 6; QA cards |
| `zS3QHLvtKI4gaH4ItmENf-1xFms` | Jul 1 | Spectrum.com, onboarding docs, employee services | Modules 5–6 |
| `dTGsD_ZbFIDoeIpriwjmpyOAQdE` | Jul 1 | Copilot, Webex, Spark, incentives | Modules 5–6 |
| `cW5-dr7jMuPE1Z1EehvLZWSMueI` | Jul 1 | Panorama, Connectivity Services, Benefit Connect | Modules 5–6 |
| `3xZydAdBv7Q485ZVUqZVyi1L8MU` | Jul 2 | sales strategy, mobile, confidence, commission | Modules 7–9 |
| `-xGVzRhvmJac5Nbq-X4pEjDSa7s` | Jul 2 | empathy, active listening, coachability | Modules 7–8 |
| `tP5ndPiy6Be9bItLBfNIdlS8S28` | Jul 3 | A-R-M and positive framing | Module 8 |
| `fSG8doS5LFTnlPrnQ2KC8n4mlD4` | Jul 7 | Internet, TV, Mobile, Voice, terminology | Product/technical module and cards |
| `bpDk0AWumETBC0USnmkgW_VTjgE` | Jul 7 | Advanced versus Invincible WiFi | Product/technical module and cards |
| `FiSlRobPwbs4Gw_HEPXBIgmLEDc` | Jul 8 | employee services, benefits, pay/schedules | Benefits module with HR gates |
| `vVGfW3-iX2oIexYwdMgPXUurwMc` | Jul 8 | dental, vision, IGS and plan comparison | Benefits/support module and cards |
| `XLiNBWFE89MY6LqZzMSAYpP2gjs` | Jul 11 | Agent OS AI and prompt engineering | AI/prompt module and cards |
| `gXrvWYNGrCI8V4tU4dSpUAmMRLw` | Jul 11 | AI-assisted sales pitches | AI/prompt module and cards |
| `YM2VW-EKU_wkFYS_pe4FWwWrpbY` | Jul 11 | pitch review, LTE/5G, modem/router | Technical/pitch cards |
| `ji8g731_S4evJ6VSmCkSk24kK9g` | Jul 11 | mobile practical, order confirmation, metrics | QA/metrics module and cards |

### 5.2 Failed source retrieval

The July 8 mobile-device session `CuSNAbcEs3RlZNKmvjxUnIFi_iw` was found by search but the Otter fetch action returned a parsing failure. Its metadata/summary can be retained as pending, but it must not be represented as fully transcribed until the source can be fetched successfully.

### 5.3 Redaction policy

Ingestion must remove or exclude:

- customer and employee passwords;
- security/MFA codes;
- activation PINs;
- SSNs;
- account/payment identifiers;
- document images;
- unrelated payroll documents;
- real customer call content unless formally approved and de-identified.

---

## 6. Product and terminology coverage added

The curriculum/card additions cover:

- modem versus router;
- Mbps versus Gbps;
- WiFi 7;
- DOCSIS;
- ONT and FTTH;
- MVNO;
- SIM/eSIM;
- eMTA;
- PBX;
- hotspot;
- Cloud DVR;
- Advanced WiFi controls;
- Invincible WiFi resilience and limitations;
- extender/pod placement as a diagnostic process, not a universal distance guarantee;
- Xumo and TV packaging concepts;
- IMEI and `*#06#` device lookup;
- Mobile eligibility and same-account gates;
- order confirmation and complete monthly estimate;
- complimentary-language discipline;
- Agent OS AI prompting and source verification;
- AHT, ACW, talk, hold, conversion, APC, product mix and yield as operational metrics requiring official definitions.

---

## 7. Testing and release audit

### 7.1 Tests that can be performed statically in the repository

- required files/routes exist;
- route-tree entries exist;
- duplicate flashcard/module/persona IDs;
- forbidden legacy terms;
- committed sensitive identifiers;
- corpus records missing source/verification fields;
- required source IDs and aliases;
- CRAM masks 0–31 recover exactly modulo 37;
- no feature removal in route inventory.

### 7.2 Tests requiring executable environment

- clean install;
- TypeScript typecheck;
- Vite production build;
- TanStack route generation;
- server function invocation;
- AI gateway key/rate/credit behavior;
- Web Audio and speech browser matrix;
- localStorage migration;
- responsive and keyboard testing;
- screen-reader live announcements;
- Supabase auth/RLS if activated;
- Lovable private preview deployment.

### 7.3 Required release gate

A release is blocked unless all are true:

1. generated route tree matches route files;
2. audit script passes;
3. typecheck passes;
4. production build passes;
5. no unresolved P0 privacy issue;
6. no customer-facing source conflict presented without verification text;
7. private preview verified on mobile and desktop;
8. no real employee/customer secrets in repository or client bundle.

---

## 8. Accessibility and study accommodations

Implemented accommodations:

- short modular lessons;
- plain-language explanations;
- audio autoplay;
- adjustable speech rate;
- flashcard and cheatsheet modes;
- scenario rehearsal;
- guided/balanced/floor-ready simulation difficulty;
- private progress memory;
- one-word lookup.

Required accommodations:

- visible focus on all interactive controls;
- skip-to-content;
- ARIA live region for unlocked QA markers and call status;
- reduced-motion preference;
- visual alternative to beep;
- pause/extend timer support;
- captions/transcript for all audio;
- text-only mode;
- larger-font/high-contrast mode;
- keyboard shortcuts that can be disabled;
- dyslexia-friendly spacing option;
- exportable study notes;
- spaced repetition and weak-area plan.

---

## 9. Security and privacy audit

### P0 controls

- Keep all secrets server-side.
- Never expose Lovable API key or Supabase service-role key to client.
- Never put customer identifiers into AI, simulator or prompt builder.
- Treat localStorage as convenience storage, not secure storage.
- Keep deployment private until access control is verified.
- Add content security policy and dependency scanning.
- Add PII/secret scan to CI.

### Prompt-injection boundary

All customer-entered text must be treated as inert data. It cannot override system instructions, source hierarchy, disclosure rules or prohibited-tactic holds.

### Simulator privacy

Future audio must be ephemeral by default. Recording/storage requires explicit consent, retention policy, approved backend and deletion path.

---

## 10. Prioritized roadmap

### P0 — before broad deployment

- automated route generation;
- typecheck/build/audit scripts and CI;
- private-access verification;
- remove or clearly scope “certified” language in CRAM prompt UI;
- client/server PII redaction tests;
- source freshness/status fields;
- accessible simulator status announcements;
- verify all current product/benefit numbers in controlling systems.

### P1 — high-value next features

- semantic QA simulator scoring with evidence spans;
- voice caller/agent mode with explicit privacy controls;
- spaced repetition;
- curriculum/card coverage matrix;
- source supersession and expiration;
- adaptive study plan based on weak areas;
- post-call score history stored locally;
- integrated audit/status page;
- approved deep links to source IDs.

### P2 — scale and administration

- authenticated learner profiles;
- Supabase-backed progress with RLS;
- instructor/admin corpus review queue;
- cohort analytics using de-identified learning events;
- scenario authoring tool;
- feature flags and environment separation;
- export/import and offline/PWA support.

---

## 11. Final audit conclusion

CallFlow Lab has a coherent product direction: a private, source-aware Spectrum sales-agent learning environment that joins retrieval, study, practice, simulation and prompt assistance. Its educational architecture is stronger than its release engineering. The next maturity step is not another isolated screen; it is a verified platform layer: generated routes, automated integrity checks, source freshness, accessibility, semantic QA and privacy-controlled deployment.

All existing features should remain additive. New corpus material should enter through the weekly ledger, receive source/status metadata, map to curriculum and flashcards, pass integrity checks, and only then become active study content.

