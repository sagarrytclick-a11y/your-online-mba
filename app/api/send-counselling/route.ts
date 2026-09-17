import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Enquiry } from "@/app/models/Enquiry";
import { counsellingSchema } from "@/app/lib/validation";
import { getMailRecipients, sendMail } from "@/app/lib/mail";
import { COUNSELLING_LIMITS, getClientIp, rateLimit } from "@/app/lib/rate-limit";
import {
  buildCounsellingEmailHtml,
  buildCounsellingEmailSubject,
  buildCounsellingEmailText,
} from "@/app/lib/email-templates";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const ipLimit = rateLimit(`counselling:ip:${ip}`, [...COUNSELLING_LIMITS]);

    if (!ipLimit.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(ipLimit.retryAfterSec) },
        }
      );
    }

    const body = await req.json();

    // Honeypot — bots fill hidden fields
    if (body.website || body.url || body.company) {
      return NextResponse.json({ success: true, message: "Request received" });
    }

    const result = counsellingSchema.safeParse(body);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0] ?? "");
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      return NextResponse.json(
        { error: "Please fix the highlighted fields", fieldErrors },
        { status: 400 }
      );
    }

    const { name, phone, email, specialization, city } = result.data;

    const emailLimit = rateLimit(`counselling:email:${email}`, [
      { limit: 10, windowMs: 60 * 60 * 1000 }, // 10 / hour
      { limit: 30, windowMs: 24 * 60 * 60 * 1000 }, // 30 / day
    ]);
    if (!emailLimit.success) {
      return NextResponse.json(
        { error: "Too many submissions from this email. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(emailLimit.retryAfterSec) },
        }
      );
    }

    await connectDB();
    const enquiry = await Enquiry.create({ name, phone, email, specialization, city });

    const recipients = getMailRecipients();
    if (recipients.to.length === 0) {
      console.error("EMAIL_TO is missing or invalid in .env");
    } else {
      const lead = {
        name,
        phone,
        email,
        specialization,
        city,
        enquiryId: String(enquiry._id),
      };

      try {
        await sendMail({
          replyTo: email,
          subject: buildCounsellingEmailSubject(name, specialization),
          html: buildCounsellingEmailHtml(lead),
          text: buildCounsellingEmailText(lead),
        });
      } catch (mailErr) {
        console.error("Nodemailer Error (Entry saved in DB but email failed):", mailErr);
      }
    }

    return NextResponse.json({ success: true, id: enquiry._id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
