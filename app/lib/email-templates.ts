import { siteConfig } from "@/app/data/site";
import { SITE_URL } from "@/app/lib/seo";

export type CounsellingLead = {
  name: string;
  phone: string;
  email: string;
  specialization: string;
  city: string;
  enquiryId?: string;
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

function detailRow(label: string, value: string, isLast = false) {
  const border = isLast ? "" : "border-bottom:1px solid #F1F5F9;";
  return `
    <tr>
      <td style="padding:14px 4px 14px 0;${border}width:38%;vertical-align:top;">
        <span style="display:block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94A3B8;">${label}</span>
      </td>
      <td style="padding:14px 0;${border}vertical-align:top;">
        <span style="display:block;font-size:15px;font-weight:600;color:#0F172A;line-height:1.45;">${value}</span>
      </td>
    </tr>
  `;
}

/** Premium HTML email for new counselling leads */
export function buildCounsellingEmailHtml(lead: CounsellingLead): string {
  const name = escapeHtml(lead.name);
  const firstName = escapeHtml(lead.name.trim().split(/\s+/)[0] || lead.name);
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
    encodeURIComponent(`Re: Your Online MBA Counselling – ${lead.name}`);
  const callUrl = `tel:+91${digits}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>New Counselling Lead</title>
</head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    New lead: ${name} · ${specialization} · ${city} · Call ${phone}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,0.08);">

          <!-- Brand bar -->
          <tr>
            <td style="background:linear-gradient(135deg,#C81E3D 0%,#9F1239 100%);padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.75);">
                      ${escapeHtml(siteConfig.shortName)} · Lead Alert
                    </p>
                    <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:800;color:#FFFFFF;">
                      New Counselling Request
                    </h1>
                  </td>
                  <td align="right" valign="middle" style="padding-left:16px;">
                    <span style="display:inline-block;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.28);color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:8px 12px;border-radius:999px;">
                      Priority
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#475569;">
                A new aspirant requested free Online MBA counselling on
                <strong style="color:#0F172A;">${escapeHtml(siteConfig.name)}</strong>.
                Reach out within <strong style="color:#C81E3D;">15 minutes</strong> for best conversion.
              </p>
            </td>
          </tr>

          <!-- Meta chips -->
          <tr>
            <td style="padding:16px 32px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 8px 8px 0;">
                    <span style="display:inline-block;background:#FFF1F2;color:#C81E3D;font-size:12px;font-weight:700;padding:8px 12px;border-radius:10px;">
                      ${specialization}
                    </span>
                  </td>
                  <td style="padding:0 8px 8px 0;">
                    <span style="display:inline-block;background:#F8FAFC;color:#334155;font-size:12px;font-weight:700;padding:8px 12px;border-radius:10px;border:1px solid #E2E8F0;">
                      ${city}
                    </span>
                  </td>
                  <td style="padding:0 0 8px 0;">
                    <span style="display:inline-block;background:#F8FAFC;color:#64748B;font-size:12px;font-weight:600;padding:8px 12px;border-radius:10px;border:1px solid #E2E8F0;">
                      ${stamp} IST
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead card -->
          <tr>
            <td style="padding:12px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:16px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94A3B8;">
                      Lead Details
                    </p>
                    <p style="margin:0 0 18px;font-size:22px;font-weight:800;color:#0F172A;line-height:1.2;">
                      ${name}
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${detailRow("Phone", phone)}
                      ${detailRow("Email", email)}
                      ${detailRow("Specialization", specialization)}
                      ${detailRow("City", city, !enquiryId)}
                      ${enquiryId ? detailRow("Enquiry ID", enquiryId, true) : ""}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA buttons -->
          <tr>
            <td style="padding:20px 32px 8px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 6px 10px 0;">
                    <a href="${callUrl}" style="display:inline-block;background:#C81E3D;color:#FFFFFF;text-decoration:none;font-size:13px;font-weight:700;padding:14px 22px;border-radius:12px;letter-spacing:0.02em;">
                      Call Now
                    </a>
                  </td>
                  <td style="padding:0 6px 10px 0;">
                    <a href="${whatsappUrl}" style="display:inline-block;background:#059669;color:#FFFFFF;text-decoration:none;font-size:13px;font-weight:700;padding:14px 22px;border-radius:12px;letter-spacing:0.02em;">
                      WhatsApp
                    </a>
                  </td>
                  <td style="padding:0 0 10px 0;">
                    <a href="${mailtoUrl}" style="display:inline-block;background:#FFFFFF;color:#0F172A;text-decoration:none;font-size:13px;font-weight:700;padding:13px 20px;border-radius:12px;border:1px solid #E2E8F0;">
                      Reply Email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tip -->
          <tr>
            <td style="padding:8px 32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:12px;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p style="margin:0;font-size:13px;line-height:1.55;color:#92400E;">
                      <strong>Counsellor tip:</strong> Open with their city + specialization
                      (“Hi ${firstName}, saw you’re exploring <em>${specialization}</em> from ${city}…”) for a warmer first call.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0F172A;padding:24px 32px;">
              <p style="margin:0 0 6px;font-size:14px;font-weight:800;color:#FFFFFF;">
                ${escapeHtml(siteConfig.name)}
              </p>
              <p style="margin:0 0 12px;font-size:12px;line-height:1.5;color:#94A3B8;">
                ${escapeHtml(siteConfig.tagline)} · ${escapeHtml(siteConfig.city)}, ${escapeHtml(siteConfig.state)}
              </p>
              <p style="margin:0;font-size:12px;color:#64748B;">
                <a href="${SITE_URL}" style="color:#FCA5A5;text-decoration:none;font-weight:600;">${SITE_URL.replace("https://", "")}</a>
                &nbsp;·&nbsp;
                <a href="tel:${escapeHtml(siteConfig.phone)}" style="color:#CBD5E1;text-decoration:none;">${escapeHtml(siteConfig.phoneDisplay)}</a>
              </p>
              <p style="margin:16px 0 0;font-size:11px;line-height:1.5;color:#64748B;">
                This alert was generated automatically from the counselling form. Reply goes to the lead’s email.
              </p>
            </td>
          </tr>
        </table>

        <p style="margin:20px 0 0;font-size:11px;color:#94A3B8;text-align:center;">
          © ${siteConfig.year} ${escapeHtml(siteConfig.name)}. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildCounsellingEmailSubject(name: string, specialization: string) {
  return `🎯 New Lead · ${name} · ${specialization}`;
}

export function buildCounsellingEmailText(lead: CounsellingLead) {
  return [
    "New Counselling Request — Your Online MBA",
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Specialization: ${lead.specialization}`,
    `City: ${lead.city}`,
    lead.enquiryId ? `Enquiry ID: ${lead.enquiryId}` : "",
    "",
    `Submitted: ${formatStamp()} IST`,
  ]
    .filter(Boolean)
    .join("\n");
}
