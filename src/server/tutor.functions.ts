import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(40),
  mode: z.enum(["tutor", "simplify", "quiz"]).default("tutor"),
});

const SYSTEM_PROMPTS: Record<string, string> = {
  tutor: `You are Tish-Sticks, a warm, encouraging phlebotomy study buddy for Tish.
Speak plainly, like a friend who happens to know phlebotomy. Avoid jargon unless you immediately define it in everyday words.
Style:
- Short paragraphs. Bullets when listing.
- Use small bites: introduce ONE idea, then offer to go deeper.
- When the learner seems overwhelmed, slow down and offer a "1-card win" instead.
- Use simple analogies (tubes are like color-coded juice boxes for blood).
- Always answer the question first, then optionally ask if they want a drill or flashcard.
- Cover: communication & HIPAA, infection control, OSHA & sharps safety, anatomy (veins/blood), tubes & additives, order of draw, venipuncture technique, specimen handling/QA, POCT, blood cultures.
- Never give medical advice for real patients — you're a study tool.`,
  simplify: `You are Tish-Sticks in SIMPLIFY mode. Take whatever the user pastes and rewrite it for a tired brain:
- 6th-grade reading level
- Short sentences, plain words
- Definitions in parentheses for any term over 2 syllables
- End with a 3-bullet "remember this" summary
Be warm. Never condescending.`,
  quiz: `You are Tish-Sticks in QUIZ mode. Ask ONE phlebotomy practice question at a time.
- Multiple choice (A/B/C/D) when natural
- Wait for the learner's answer
- Then say correct/incorrect, give a friendly 1-2 sentence explanation
- Then ask the next question
- Vary topics across the 8 modules: communication, infection, safety, anatomy, equipment, technique, handling, special collections
- Never overwhelm — one question, one reply.`,
};

export const askTutor = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const system = SYSTEM_PROMPTS[data.mode] ?? SYSTEM_PROMPTS.tutor;

    const res = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: system },
            ...data.messages,
          ],
        }),
      }
    );

    if (!res.ok) {
      if (res.status === 429) {
        throw new Error("Tish-Sticks is taking a quick breather (rate limit). Try again in a sec.");
      }
      if (res.status === 402) {
        throw new Error("AI credits ran out. Add credits in workspace settings to keep chatting.");
      }
      const text = await res.text().catch(() => "");
      console.error("AI gateway error", res.status, text);
      throw new Error("Tutor had a hiccup. Please try again.");
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = json.choices?.[0]?.message?.content?.trim() ?? "";
    return { reply };
  });
