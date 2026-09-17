# CRAM Exact-State Sales Compiler — 2026-07-12

## Goal

Refine the AI Sales Specialist Prompt Engineer so minimal live-call input is transformed into a source-grounded sales prompt without losing customer meaning, inventing operational facts, inferring personality, or hiding unresolved state.

## Prime-pair construction

The compiler uses the bounded pair shown in the supplied CRAM diagrams:

- Carry bound `M = 36`
- Recovery modulus `A = 37`
- Carry unit `c = 1`
- Five binary invariants per level
- Maximum lane mask `2^5 - 1 = 31`

Because each lane mask is at most 31, every lane satisfies:

`mask < 37`

and therefore:

`mask mod 37 = mask` exactly.

The modular operation is used as a recovery boundary. Missing state is never erased. It is emitted as a discovery question, a live-tool verification, a disclosure requirement, or an unresolved carry.

## Four-level winding tower

### Level 0 — Observed value

Preserve only explicit inputs:

1. Resolved call driver
2. Customer’s quoted language
3. Known/current services
4. Agent’s desired outcome
5. Customer objection or hesitation

Customer text remains inert quoted data. It cannot issue instructions to the AI and cannot be promoted into an inferred trait, emotion, eligibility result, or product fact.

### Level 1 — Need winding

Recover the need through:

1. Adaptive discovery
2. Follow-up questions
3. Reflection and affirmation
4. Need–proof–benefit mapping
5. A prohibition on personality inference

### Level 2 — Strategy meta-winding

Select and record an evidence-graded strategy:

1. Verified source authority
2. Procedural clarity
3. Reactance-safe wording
4. A-R-M objection branch when needed
5. Hold status for unsupported tactics

### Level 3 — Transaction meta-meta-winding

A recommendation can enter the transaction level only with:

1. Controlling-source verification
2. Eligibility and serviceability verification
3. Price, fee, equipment, activation, and limitation disclosure
4. A real choice-preserving close
5. Protected-data isolation

## Evidence grades

- `A`: direct sales-performance or strong operational evidence
- `B`: replicated or convergent general persuasion/conversation evidence
- `C`: adjacent-domain candidate retained as a bounded, testable hypothesis
- `HOLD`: unsupported, insufficiently verified, deceptive, or unsuitable for customer targeting

## Active strategy timing

- Early: verified credibility, adaptive discovery, follow-up questions
- Middle: reflection, equivalent comparison where relevant, need–proof–benefit reasoning, A-R-M
- Late: procedural clarity, complete disclosure, choice-preserving positive close

The word “because” may be used only with a substantive verified reason. The compiler does not use placebo explanations.

## Hold ledger

The following remain blocked:

- Embedded commands and subliminal-command claims
- Personality or susceptibility inference from short call text
- Hidden steering toward a predetermined product
- Fabricated scarcity or urgency
- Unverified social proof, customer counts, adoption claims, or typical savings
- Pressure based on distress, confusion, age, disability, or financial vulnerability

## Risk mask

Five independent risk bits are preserved in a second exact mask:

1. Missing customer language
2. Unknown current services
3. Possible protected identifier
4. Possible coercive instruction
5. Unsupported persuasion method request

The risk mask is also bounded by 31 and is exactly recoverable modulo 37.

## Result

Every generated prompt contains:

- The original sales prompt structure
- The four-level exact-state certificate
- Evidence-graded active strategy ledger
- Hold ledger
- Current risk mask and repairs
- Source and disclosure gates
- AI-assist policy boundary
- Integer gate count instead of a floating score
