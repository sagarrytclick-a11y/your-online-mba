import { NextRequest, NextResponse } from "next/server";
import { CHAT_LIMITS, getClientIp, rateLimit } from "@/app/lib/rate-limit";
import { SITE_URL } from "@/app/lib/seo";

const SYSTEM_PROMPT = `You are CourseMate AI, a helpful assistant for Your Online MBA platform. Your role is to answer questions about Online MBA programs, courses, specializations, career outcomes, admissions, and related topics.

## Your Identity
- Name: CourseMate AI
- Platform: YourOnlineMba — Online MBA guidance platform
- Contact: For issues or escalations, contact Abhishek at 9839865347 or Abhishek@vidyavriddhi.com

## Guidelines
1. Only answer questions related to Online MBA, higher education, career guidance, and Your Online MBA platform services.
2. ALWAYS include the contact info at the end of EVERY response: "Call/WhatsApp 9839865347 or email Abhishek@vidyavriddhi.com"
3. Be friendly, concise, and helpful. Use simple language.
4. If asked about something outside your scope, politely say you can only help with Online MBA related queries.
5. Do not make up specific fees, dates, or promises — direct users to consult with Your Online MBA counsellors for exact details.
6. Encourage users to fill the counselling form for personalised guidance.
7. Never share sensitive or fake information.
8. Keep responses under 150 words unless the user asks for detailed information.
9. When mentioning contact, use: Call/WhatsApp 9839865347 or email Abhishek@vidyavriddhi.com`;

/** OpenRouter model id — override with OPENROUTER_MODEL in .env */
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL?.trim() || "openai/gpt-4o-mini";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(req: NextRequest) {
  const API_KEY = (process.env.OPENROUTER_API_KEY || "").trim();

  const ip = getClientIp(req);
  const limited = rateLimit(`chat:ip:${ip}`, [...CHAT_LIMITS]);
  if (!limited.success) {
    return NextResponse.json(
      { error: "Chat limit reached for this hour. Please try again later or contact us directly." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      }
    );
  }

  if (!API_KEY) {
    return NextResponse.json(
      {
        error:
          "OPENROUTER_API_KEY is not set in .env. Get one at https://openrouter.ai/keys",
      },
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Keep payload small — last 12 turns max
    const recentMessages = messages.slice(-12);

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": SITE_URL,
        "X-Title": "Your Online MBA - CourseMate",
        "X-OpenRouter-Title": "Your Online MBA - CourseMate",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...recentMessages],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("OpenRouter error:", response.status, errorBody);

      if (response.status === 429) {
        return NextResponse.json({
          message: {
            role: "assistant",
            content:
              "I'm currently busy with too many requests. Please reach out to us directly at **9839865347** or email **Abhishek@vidyavriddhi.com** for any Online MBA queries.",
          },
        });
      }

      return NextResponse.json(
        { error: `AI service error (${response.status})` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const message = data?.choices?.[0]?.message;

    if (!message?.content) {
      console.error("OpenRouter empty response:", data);
      return NextResponse.json(
        { error: "AI returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message });
  } catch (err) {
    console.error("CourseMate error:", err);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
