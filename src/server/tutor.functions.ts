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

const BASE = `You are Tish-Sticks, a warm, encouraging phlebotomy study buddy.
You are personally invested in this learner's success. Use their name when natural.
Style:
- Plain language. Short paragraphs. Bullets when listing.
- One bite at a time. If they seem overwhelmed, offer a "1-card win".
- Friendly analogies (tubes = color-coded juice boxes for blood).
- Cover: communication & HIPAA, infection control, OSHA & sharps, anatomy (veins/blood),
  tubes & additives, order of draw, venipuncture technique, specimen handling/QA, POCT, blood cultures.
- Never give medical advice for real patients — this is a study tool.

CRITICAL — BUILD ON WHAT THEY ALREADY KNOW:
- The MEMORY block lists lessons they've studied and key takeaways from past chats.
- Reference those explicitly when relevant. Examples:
    "Earlier you nailed the order of draw — let's build on that..."
    "Since you already know lavender = EDTA, we can tackle why fill volume matters."
- When introducing new ideas, connect them back to past takeaways by name.
- Celebrate momentum ("That's the third safety topic you've worked through this week — seriously, well done.").
- If memory is empty, gently start with the basics and offer to remember things going forward.`;

const SYSTEM_PROMPTS: Record<string, string> = {
  tutor: BASE,
  simplify:
    BASE +
    `\n\nSIMPLIFY MODE: Take whatever the user pastes and rewrite it for a tired brain — 6th-grade reading level, short sentences, plain words, definitions in parentheses for any term over 2 syllables. End with a 3-bullet "remember this" summary. Tie it to past takeaways from MEMORY when possible.`,
  quiz:
    BASE +
    `\n\nQUIZ MODE: Ask ONE practice question at a time (multiple choice when natural). Wait for the answer. Mark correct/incorrect with a friendly 1-2 sentence explanation, then ask the next. Prefer topics the learner has already studied (from MEMORY) so they get wins, then stretch into new areas. Vary across the 8 modules.`,
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
    if (res.status === 429)
      throw new Error("Tish-Sticks is taking a quick breather (rate limit). Try again in a sec.");
    if (res.status === 402)
      throw new Error("AI credits ran out. Add credits in workspace settings to keep chatting.");
    const t = await res.text().catch(() => "");
    console.error("AI gateway error", res.status, t);
    throw new Error("Tutor had a hiccup. Please try again.");
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
    const prompt = `Read this short tutor exchange. If the learner clearly LEARNED or CONFIRMED a specific phlebotomy fact (concept, definition, rule, mnemonic), output ONE concise takeaway in 12 words or less. If nothing concrete was learned, output exactly: NONE.

Do not output quotes, commentary, or the word "takeaway". Just the bare statement or NONE.

Learner: ${data.userMessage}
Tutor: ${data.assistantReply}`;
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
