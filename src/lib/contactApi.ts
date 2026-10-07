// Client of the contact form API (backend/contact/app.py). The limits mirror the
// server's, so most mistakes are caught before a request is spent.

export const CONTACT_API_URL = "https://api.amidousoro.me/contact";

export const CONTACT_LIMITS = {
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 5000,
} as const;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export type ContactField = "name" | "email" | "message" | "token";

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  lang: "fr" | "en";
  token: string; // Turnstile
}

export type ContactError = "invalid" | "captcha" | "unavailable" | "network";

export type ContactResult =
  | { ok: true; id: string }
  | { ok: false; error: ContactError; fields: ContactField[] };

/** Fields the server would refuse, in form order. Empty means good to send. */
export function validateContact(msg: ContactMessage): ContactField[] {
  const name = msg.name.trim();
  const email = msg.email.trim();
  const message = msg.message.trim();
  const bad: ContactField[] = [];
  if (!name || name.length > CONTACT_LIMITS.nameMax) bad.push("name");
  if (!email || email.length > CONTACT_LIMITS.emailMax || !EMAIL_RE.test(email)) bad.push("email");
  if (message.length < CONTACT_LIMITS.messageMin || message.length > CONTACT_LIMITS.messageMax) bad.push("message");
  if (!msg.token) bad.push("token");
  return bad;
}

interface Envelope {
  success?: boolean;
  data?: { id?: string; fields?: ContactField[] } | null;
  error?: string | null;
}

export async function sendContactMessage(
  msg: ContactMessage,
  fetchImpl: typeof fetch = fetch,
): Promise<ContactResult> {
  let res: Response;
  try {
    res = await fetchImpl(CONTACT_API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(msg),
    });
  } catch {
    return { ok: false, error: "network", fields: [] };
  }

  const body: Envelope = await res.json().catch(() => ({}));
  if (res.ok && body.success && body.data?.id) return { ok: true, id: body.data.id };
  if (body.error === "invalid") return { ok: false, error: "invalid", fields: body.data?.fields ?? [] };
  if (body.error === "captcha") return { ok: false, error: "captcha", fields: [] };
  // 429 from API Gateway's throttling, 502 when the message couldn't be kept, anything else.
  return { ok: false, error: "unavailable", fields: [] };
}
