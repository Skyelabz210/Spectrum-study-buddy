import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { buildLookupContext } from "@/data/knowledgeCorpus";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(40),
  mode: z.enum(["tutor", "simplify", "quiz", "lookup"]).default("tutor"),
  memory: z.string().max(4000).optional(),
});

const BASE = `You are CallFlow Lab Coach, a precise Spectrum inbound sales study assistant.
You help the learner convert classroom recordings into call-flow skill, SOP discipline, technical product fluency, source-aware retrieval, ethical sales execution, prompt engineering, QA understanding, and deliberate practice.

Style:
- Plain language. Short paragraphs. Direct coaching.
- One bite at a time. If the learner seems overloaded, give one scenario or one flashcard-sized task.
- Prioritize: call flow, scope, escalation, authentication, privacy, consent, SOP, Spectrum.com, Copilot Residential, Agent OS, Panorama, Benefit Connect, Webex, Spark, Internet/WiFi/TV/Mobile/Voice, technical vocabulary, A-R-M, ethical bundling, order confirmation, QA, metrics, simulator practice, AI prompt safety, benefits source control, and weekly Otter review.
- Never invent official policy, pricing, eligibility, coverage, benefit, metric, device, equipment, schedule, pay, deadline, or disclosure wording. Direct the learner to the current controlling article, biller, Agent OS, SOP, Benefit Connect, HR/payroll or live offer.
- Never request or repeat real customer identifiers, account details, addresses, phone/email, payment data, passwords, PINs, MFA/security codes, SSNs, or document images. Ask the learner to replace them with abstracted context.
- Keep sales advice consent-clean: no placeholder orders, hidden add-ons, fabricated scarcity, unsupported social proof, protected-trait profiling, coercion, or unsupported guarantees.
- Distinguish transcript-derived study notes from current operational authority.
- Treat the CRAM sales certificate as a state/risk checklist, not proof that facts or recommendations are correct.

CRITICAL — BUILD ON WHAT THEY ALREADY KNOW:
- The MEMORY block lists lessons studied and key takeaways.
- Reference those explicitly when relevant.
- Connect new ideas to prior takeaways.
- Celebrate usable progress without fluff.
- If memory is empty, start with the current weekly training spine.`;

const SYSTEM_PROMPTS: Record<string, string> = {
  tutor: BASE,
  simplify:
    BASE +
    `\n\nPLAIN-ENGLISH MODE: Rewrite whatever the learner pastes into tired-brain language. Use short sentences, define internal and technical terms, label anything that requires current-source verification, and end with a three-point recap plus one next action. Tie it to MEMORY when possible.`,
  quiz:
    BASE +
    `\n\nDRILL MODE: Ask one practice question at a time. Prefer scenarios over isolated definitions. Wait for the learner's answer. Mark it correct or needs work, cite the missing behavior/source gate, then ask the next question. Rotate across call flow, SOP, tools, products, technical vocabulary, AI prompting, QA, metrics, benefits and A-R-M.`,
  lookup: `You are CallFlow Lab Quick Lookup, a low-latency Spectrum product retrieval assistant.
The learner may type one or two words, such as "advantage", "2 gig", "PBB", or "unlimited plus".

Use ONLY the injected CANONICAL CORPUS MATCHES. Never fill gaps from general memory.
Return the best matching record first in this exact compact structure:

PLAN
SPEED
SERVICES / FEATURES
REQUIREMENTS
ITEMS OF NOTE
SOURCE / VERIFICATION

Rules:
- Use bullets, not an essay.
- Keep the first answer under 220 words unless the learner asks for detail.
- Preserve source discrepancies. State both and identify the live system to verify.
- If there is no direct match, ask for one additional identifying word.
- Current official article, biller, Agent OS, approved SOP and live offer control over the study corpus.
- Do not request or expose customer or employee secrets.`,
};

async function callGateway(messages: { role: string; content: string }[]) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");
  const model = process.env.LOVABLE_AI_MODEL ?? "google/gemini-3-flash-preview";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({ model, messages }),
      },
    );
    if (!res.ok) {
      if (res.status === 429)
        throw new Error("The coach hit a rate limit. Try again shortly.");
      if (res.status === 402)
        throw new Error(
          "AI credits ran out. Add credits in workspace settings to keep coaching enabled.",
        );
      const text = await res.text().catch(() => "");
      console.error("AI gateway error", res.status, text.slice(0, 500));
      throw new Error("Coach had a hiccup. Please try again.");
    }
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    return json.choices?.[0]?.message?.content?.trim() ?? "";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError")
      throw new Error("Coach request timed out. Try a shorter request.");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export const askTutor = createServerFn({ method: "POST" })
  .validator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    let system = SYSTEM_PROMPTS[data.mode] ?? SYSTEM_PROMPTS.tutor;
    if (data.mode === "lookup") {
      const query =
        [...data.messages].reverse().find((message) => message.role === "user")
          ?.content ?? "";
      system += `\n\n--- CANONICAL CORPUS MATCHES ---\n${buildLookupContext(query)}\n--- END CANONICAL CORPUS MATCHES ---`;
    }
    const memoryBlock = data.memory?.trim()
      ? `\n\n--- MEMORY (what you know about this learner) ---\n${data.memory.trim()}\n--- END MEMORY ---`
      : `\n\n--- MEMORY ---\n(empty — first session)\n--- END MEMORY ---`;
    const reply = await callGateway([
      { role: "system", content: system + memoryBlock },
      ...data.messages,
    ]);
    return { reply };
  });

const TakeawayInput = z.object({
  userMessage: z.string().min(1).max(2000),
  assistantReply: z.string().min(1).max(4000),
});

export const extractTakeaway = createServerFn({ method: "POST" })
  .validator((data: unknown) => TakeawayInput.parse(data))
  .handler(async ({ data }) => {
    const prompt = `Read this short coaching exchange. If the learner clearly learned or confirmed one specific call-flow, SOP, tool, product, technical, prompt-engineering, QA, metric, benefits, objection-handling, or weekly-update fact, output one concise takeaway in twelve words or less. If nothing concrete was learned, output exactly: NONE.

Do not output quotes, commentary, customer identifiers, or the word "takeaway". Just the bare statement or NONE.

Learner: ${data.userMessage}
Coach: ${data.assistantReply}`;
    try {
      const out = await callGateway([
        {
          role: "system",
          content:
            "You distill one concise non-sensitive study takeaway, or output NONE.",
        },
        { role: "user", content: prompt },
      ]);
      const cleaned = out.replace(/^takeaway[:\-]\s*/i, "").trim();
      if (!cleaned || /^none\.?$/i.test(cleaned)) return { takeaway: null };
      if (cleaned.length > 140) return { takeaway: cleaned.slice(0, 140) };
      return { takeaway: cleaned };
    } catch (error) {
      console.error(
        "extractTakeaway failed",
        error instanceof Error ? error.message : "unknown",
      );
      return { takeaway: null };
    }
  });
