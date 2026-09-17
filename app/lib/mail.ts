import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Parse comma / semicolon separated emails from env */
export function parseEmailList(raw?: string | null): string[] {
  if (!raw?.trim()) return [];
  const seen = new Set<string>();
  const list: string[] = [];

  for (const part of raw.split(/[,;]+/)) {
    const email = part.trim().toLowerCase();
    if (!email || !EMAIL_RE.test(email) || seen.has(email)) continue;
    seen.add(email);
    list.push(email);
  }

  return list;
}

export type MailRecipients = {
  to: string[];
  cc: string[];
  bcc: string[];
};

/**
 * Recipients from .env:
 *   EMAIL_TO=primary@mail.com,second@mail.com
 *   EMAIL_CC=cc1@mail.com,cc2@mail.com
 *   EMAIL_BCC=bcc@mail.com
 *
 * Same address in TO + CC is kept only in TO.
 */
export function getMailRecipients(): MailRecipients {
  const to = parseEmailList(process.env.EMAIL_TO);
  const ccRaw = parseEmailList(process.env.EMAIL_CC);
  const bccRaw = parseEmailList(process.env.EMAIL_BCC);

  const toSet = new Set(to);
  const cc = ccRaw.filter((e) => !toSet.has(e));
  const ccSet = new Set([...toSet, ...cc]);
  const bcc = bccRaw.filter((e) => !ccSet.has(e));

  return { to, cc, bcc };
}

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("EMAIL_USER or EMAIL_PASS is missing in .env");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendMail(options: {
  to?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  const user = process.env.EMAIL_USER!;
  const defaults = getMailRecipients();

  const to = options.to
    ? Array.isArray(options.to)
      ? options.to
      : parseEmailList(options.to)
    : defaults.to;
  const cc = options.cc
    ? Array.isArray(options.cc)
      ? options.cc
      : parseEmailList(options.cc)
    : defaults.cc;
  const bcc = options.bcc
    ? Array.isArray(options.bcc)
      ? options.bcc
      : parseEmailList(options.bcc)
    : defaults.bcc;

  if (to.length === 0) {
    throw new Error("No EMAIL_TO recipients configured");
  }

  const transporter = getTransporter();

  const info = await transporter.sendMail({
    from: `"Your Online MBA" <${user}>`,
    to,
    ...(cc.length ? { cc } : {}),
    ...(bcc.length ? { bcc } : {}),
    subject: options.subject,
    html: options.html,
    ...(options.text ? { text: options.text } : {}),
    replyTo: options.replyTo,
  });

  console.log("Email sent:", {
    to,
    cc,
    bcc,
    messageId: info.messageId,
    response: info.response,
    accepted: info.accepted,
    rejected: info.rejected,
  });

  return info;
}
