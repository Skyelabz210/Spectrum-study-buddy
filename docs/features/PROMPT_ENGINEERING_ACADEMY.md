# Prompt Engineering Academy

**Release:** `v1.5.0-spectrum.0`  
**Route:** `/prompt-academy`  
**Audience:** Spectrum inbound sales agents, from first-time AI users through advanced power users and developers.

## Purpose

The academy teaches agents how to use approved AI assistance as a language, organization, retrieval and practice tool without treating it as the biller, serviceability system, offer engine or policy authority.

The governing formula is:

> **TASK + FACTS + LIMITS + FORMAT + VERIFY**

The academy complements, rather than replaces, the live `/sales-prompts` Prompt Engineer:

- **Prompt Academy** teaches the skill.
- **Prompt Engineer** generates a live paste-ready prompt from minimal call context.
- **Quick Lookup** retrieves product facts.
- **Across the Spectrum** rehearses spoken execution.

## Learning path

The curriculum contains 20 lessons across six levels:

1. **First contact** — what AI is, what it is not, and safe context abstraction.
2. **Clean prompting** — task definition, examples, delimiters and output control.
3. **Call-floor formats** — tables, talk tracks, checklists, pricing-safe plan fit and A-R-M.
4. **Repeatable workflows** — prompt chains, rubrics, source packets and conflict reconciliation.
5. **Advanced reasoning and context** — long context, prompt injection, decision records and tool boundaries.
6. **Programmatic optimization** — structured outputs, evaluations, CI/CD, DSPy, TextGrad and OPRO.

Every lesson includes:

- a layperson explanation;
- a precise objective;
- Spectrum-specific examples;
- a practice exercise;
- a completion condition;
- browser-local completion tracking.

## Pricing-safe plan workflow

The master pricing template requires the model to use only a supplied approved source packet. It must:

- copy prices, terms, speeds, equipment and requirements exactly;
- write `NOT PROVIDED` when a value is absent;
- avoid claiming serviceability, eligibility or availability;
- separate highest capability, most logical fit and value alternative;
- show source ID and date;
- end with Agent OS, biller, serviceability and current-offer verification.

This architecture is designed to prevent a fluent model from filling missing commercial details with plausible but unsupported values.

## Output-format lab

The academy includes reusable instructions for:

- three-bullet live call help;
- Markdown comparison tables;
- spoken need–proof–benefit talk tracks;
- execution checklists;
- IF/THEN decision trees;
- source-cited answers;
- red/yellow/green readiness matrices;
- JSON developer outputs;
- post-call coaching cards;
- one-screen manager summaries.

## Template library

The initial library includes:

- fast call assist;
- pricing-safe plan shortlist;
- three-option comparison;
- adaptive discovery;
- A-R-M objection practice;
- technical-to-plain-language translation;
- de-identified call-state compression;
- QA evidence audit;
- source-conflict reconciliation;
- training-quiz generation.

Templates are copyable and preserve explicit unknown, privacy, source and consent behavior.

## Workflows

Six job-specific workflows cover:

- live call micro-prompts;
- product-update ingestion;
- scenario-to-simulator conversion;
- competitor comparison;
- post-call improvement;
- manager/coaching briefs.

The workflow design favors multiple small, checkable prompts over one oversized prompt that performs discovery, recommendation, writing and audit simultaneously.

## Advanced deep dive

The user-provided **Prompt Engineering Mastery** report was adapted into an advanced tutorial track covering:

- tokens and context windows;
- roles, system instructions and examples;
- structured outputs;
- branching analysis and critique loops;
- retrieval-augmented generation;
- positional bias and context compression;
- multimodal prompting;
- function calling and agent orchestration;
- prompt injection defenses;
- caching and compute selection;
- LLM-based evaluation;
- DSPy, TextGrad and OPRO.

The academy modernizes one important point: it does not teach agents to demand private chain-of-thought. It teaches concise decision records containing the recommendation, criteria, evidence, assumptions, unknowns and required verification.

## Privacy and operational authority

Never include:

- names;
- addresses;
- account or telephone numbers;
- payment data;
- PINs or security answers;
- credentials or authentication codes;
- customer screenshots;
- employee secrets.

Current Agent OS, biller, serviceability, approved product articles and live offers control operational decisions. Prompt output is advisory language support.

## Integrity checks

`scripts/audit-callflow.mjs` verifies:

- the route and data files exist;
- `/prompt-academy` is in the generated route tree;
- sidebar and home navigation are wired;
- at least 20 lesson IDs and 10 template IDs are unique;
- pricing-safe, advanced, privacy and formatting markers remain present;
- the active surface contains no legacy app content or committed corporate email.

## Acceptance checklist

Before private-preview acceptance:

- run `npm run audit`;
- run `npm run typecheck`;
- run `npm run build`;
- confirm route regeneration retains `/prompt-academy`;
- test all six tabs;
- test copy controls in a secure context;
- complete and reset lesson progress;
- confirm the pricing template returns `NOT PROVIDED` for missing prices;
- confirm navigation to Prompt Engineer;
- test desktop and mobile layouts.

## Remaining refinements

- Add audio narration to lessons using the existing speech utility.
- Add knowledge checks and mastery scoring.
- Add a safe prompt sandbox that grades a learner prompt against the five-part formula.
- Add approved internal-source retrieval when the sanctioned Agent OS interface is defined.
- Add a prompt regression dataset and evaluation dashboard before automated optimization is used.
