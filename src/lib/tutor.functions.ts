import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(40),
  mode: z.enum(["tutor", "simplify", "quiz"]).default("tutor"),
  memory: z.string().max(4000).optional(),
});

const BASE = `You are CallFlow Lab Coach, a precise Spectrum inbound sales study assistant.
You help the learner convert classroom recordings into call-flow skill, SOP discipline, product navigation, and ethical sales execution.

Style:
- Plain language. Short paragraphs. Direct coaching.
- One bite at a time. If the learner seems overloaded, give one scenario or one flashcard-sized task.
- Prioritize: call flow, scope of support, escalation, authentication, customer privacy, consent, SOP gates, Spectrum.com navigation, Copilot Residential, Panorama, Benefit Connect, Webex, Spark, product positioning, mobile consolidation, voice backup positioning, A-R-M objection handling, ethical bundling, and weekly Otter update review.
- Never invent official policy. If exact SOP, benefits, payroll, pricing, merger, or disclosure wording matters, say to verify with official SOP, facilitator, HR, payroll, benefits, or current system article.
- Keep sales advice consent-clean: no placeholder orders, no hidden add-ons, no false urgency, no unsupported guarantees, no private customer contact.

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
    `\n\nPLAIN-ENGLISH MODE: Rewrite whatever the learner pastes into tired-brain language. Use short sentences, define internal terms, and end with a three-point recap plus one next action. Tie it to MEMORY when possible.`,
  quiz:
    BASE +
    `\n\nDRILL MODE: Ask one practice question at a time. Prefer scenario questions over definitions. Wait for the learner's answer. Mark it correct or needs work, explain the fix in one or two sentences, then ask the next question. Rotate across call flow, SOP, tools, products, and A-R-M.`,
};

async function callGateway(messages: { role: string; content: string }[]) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages,
    }),
  });
  if (!res.ok) {
    if (res.status === 429) throw new Error("The coach hit a rate limit. Try again shortly.");
    if (res.status === 402) throw new Error("AI credits ran out. Add credits in workspace settings to keep coaching enabled.");
    const t = await res.text().catch(() => "");
    console.error("AI gateway error", res.status, t);
    throw new Error("Coach had a hiccup. Please try again.");
  }
  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return json.choices?.[0]?.message?.content?.trim() ?? "";
}

export const askTutor = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const system = SYSTEM_PROMPTS[data.mode] ?? SYSTEM_PROMPTS.tutor;
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
  .inputValidator((data: unknown) => TakeawayInput.parse(data))
  .handler(async ({ data }) => {
    const prompt = `Read this short coaching exchange. If the learner clearly learned or confirmed one specific call-flow, SOP, tool, product, objection-handling, or weekly-update fact, output one concise takeaway in twelve words or less. If nothing concrete was learned, output exactly: NONE.

Do not output quotes, commentary, or the word "takeaway". Just the bare statement or NONE.

Learner: ${data.userMessage}
Coach: ${data.assistantReply}`;
    try {
      const out = await callGateway([
        { role: "system", content: "You distill one concise study takeaway, or output NONE." },
        { role: "user", content: prompt },
      ]);
      const cleaned = out.replace(/^takeaway[:\-]\s*/i, "").trim();
      if (!cleaned || /^none\.?$/i.test(cleaned)) return { takeaway: null };
      if (cleaned.length > 140) return { takeaway: cleaned.slice(0, 140) };
      return { takeaway: cleaned };
    } catch (e) {
      console.error("extractTakeaway failed", e);
      return { takeaway: null };
    }
  });
