import { siteConfig } from "@/app/data/site";
import { SITE_URL } from "@/app/lib/seo";

export type CounsellingLead = {
  name: string;
  phone: string;
  email: string;
  specialization: string;
  city: string;
  enquiryId?: string;
  enquiryType?: "course" | "service";
  service?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatStamp(date = new Date()) {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function row(label: string, value: string) {
  return `
        <tr>
          <td style="padding:10px 0;font-size:12px;font-weight:600;color:#8a8a8a;letter-spacing:0.04em;text-transform:uppercase;">${label}</td>
          <td style="padding:10px 0;font-size:15px;font-weight:600;color:#111827;text-align:right;">${value}</td>
        </tr>`;
}

/**
 * Simple, clean lead-notification email.
 * One card, one headline, the details, three actions, one footer line.
 */
export function buildCounsellingEmailHtml(lead: CounsellingLead): string {
  const isServiceLead = lead.enquiryType === "service";
  const interestLabel = isServiceLead ? "Service" : "Specialization";
  const requestNoun = isServiceLead ? "Service Lead" : "New Lead";
  const name = escapeHtml(lead.name);
  const phone = escapeHtml(lead.phone);
  const email = escapeHtml(lead.email);
  const specialization = escapeHtml(lead.specialization);
  const city = escapeHtml(lead.city);
  const enquiryId = lead.enquiryId ? escapeHtml(String(lead.enquiryId)) : "";
  const stamp = formatStamp();
  const digits = lead.phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/91${digits}`;
  const mailtoUrl =
    "mailto:" +
    encodeURIComponent(lead.email) +
    "?subject=" +
    encodeURIComponent(`Re: Your ${siteConfig.name} enquiry`);
  const callUrl = `tel:+91${digits}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${requestNoun} · ${escapeHtml(siteConfig.name)}</title>
</head>
<body style="margin:0;padding:0;background:#f2f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${name} · ${specialization} · ${city} · ${phone}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px;background:#f2f2f5;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8e8ec;">

          <!-- Accent bar -->
          <tr><td style="height:5px;background:linear-gradient(90deg,#C81E3D,#ff5a3c);"></td></tr>

          <!-- Head -->
          <tr>
            <td style="padding:26px 28px 0 28px;">
              <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#C81E3D;">
                ${escapeHtml(siteConfig.shortName)} · ${isServiceLead ? "SERVICE REQUEST" : "NEW COUNSELLING"}
              </p>
              <h1 style="margin:8px 0 2px;font-size:26px;line-height:1.25;font-weight:800;color:#111827;">
                ${name}
              </h1>
              <p style="margin:0;font-size:14px;color:#475569;">
                ${isServiceLead ? "Requested a callback about our services." : "Requested free Online MBA counselling."}
              </p>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding:18px 28px 6px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eeeef2;">
                ${row("Phone", phone)}
                ${row("Email", email)}
                ${row(interestLabel, specialization)}
                ${row("City", city)}
                ${enquiryId ? row("Enquiry ID", enquiryId) : ""}
              </table>
            </td>
          </tr>

          <!-- Actions -->
          <tr>
            <td style="padding:16px 28px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:33.33%;padding-right:4px;">
                    <a href="${callUrl}" style="display:block;text-align:center;background:#C81E3D;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 0;border-radius:10px;">Call</a>
                  </td>
                  <td style="width:33.33%;padding:0 4px;">
                    <a href="${whatsappUrl}" style="display:block;text-align:center;background:#0f9f4f;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 0;border-radius:10px;">WhatsApp</a>
                  </td>
                  <td style="width:33.33%;padding-left:4px;">
                    <a href="${mailtoUrl}" style="display:block;text-align:center;background:#111827;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 0;border-radius:10px;">Email</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Foot -->
          <tr>
            <td style="padding:16px 28px 22px;border-top:1px solid #eeeef2;">
              <p style="margin:0;font-size:12px;color:#8a8a8a;">
                Submitted ${stamp} IST · <a href="${SITE_URL}" style="color:#C81E3D;text-decoration:none;">${SITE_URL.replace("https://", "")}</a>
              </p>
            </td>
          </tr>

        </table>

        <p style="margin:16px 0 0;font-size:11px;color:#9a9aa3;text-align:center;">
          ${escapeHtml(siteConfig.name)} · Reply goes to the lead's email
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildCounsellingEmailSubject(name: string, interest: string, isServiceLead = false) {
  return isServiceLead
    ? `New Service Lead: ${name} · ${interest}`
    : `New Lead: ${name} · ${interest}`;
}

export function buildCounsellingEmailText(lead: CounsellingLead) {
  const isServiceLead = lead.enquiryType === "service";
  const interestLabel = isServiceLead ? "Service" : "Specialization";
  return [
    `New ${isServiceLead ? "Service" : "Counselling"} Lead — ${siteConfig.name}`,
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `${interestLabel}: ${lead.specialization}`,
    `City: ${lead.city}`,
    lead.enquiryId ? `Enquiry ID: ${lead.enquiryId}` : "",
    "",
    `Submitted: ${formatStamp()} IST`,
  ]
    .filter(Boolean)
    .join("\n");
}
