import { CONTACT_LIMITS, sendContactMessage, validateContact } from "../lib/contactApi";

const VALID = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello, I would like to talk about an internship.",
  lang: "en" as const,
  token: "turnstile-token",
};

function reply(status: number, body: unknown) {
  return vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }));
}

describe("validateContact", () => {
  it("accepte un message complet", () => {
    expect(validateContact(VALID)).toEqual([]);
  });

  it("signale chaque champ invalide, comme le serveur", () => {
    expect(
      validateContact({ ...VALID, name: " ", email: "a@b", message: "court", token: "" }),
    ).toEqual(["name", "email", "message", "token"]);
  });

  it("respecte les longueurs maximales", () => {
    expect(validateContact({ ...VALID, name: "x".repeat(CONTACT_LIMITS.nameMax + 1) })).toEqual(["name"]);
    expect(validateContact({ ...VALID, message: "x".repeat(CONTACT_LIMITS.messageMax + 1) })).toEqual(["message"]);
  });
});

describe("sendContactMessage", () => {
  it("poste le JSON et renvoie l'identifiant du message", async () => {
    const fetchImpl = reply(200, { success: true, data: { id: "msg-1" }, error: null });

    const result = await sendContactMessage(VALID, fetchImpl);

    expect(result).toEqual({ ok: true, id: "msg-1" });
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://api.amidousoro.me/contact");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual(VALID);
  });

  it("remonte les champs refusés par le serveur", async () => {
    const fetchImpl = reply(400, { success: false, data: { fields: ["email"] }, error: "invalid" });

    expect(await sendContactMessage(VALID, fetchImpl)).toEqual({ ok: false, error: "invalid", fields: ["email"] });
  });

  it("distingue l'échec de la vérification anti-robot", async () => {
    const fetchImpl = reply(403, { success: false, data: null, error: "captcha" });

    expect(await sendContactMessage(VALID, fetchImpl)).toEqual({ ok: false, error: "captcha", fields: [] });
  });

  it("traite la limite de débit comme une indisponibilité", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('{"message":"Too Many Requests"}', { status: 429 }));

    expect(await sendContactMessage(VALID, fetchImpl)).toEqual({ ok: false, error: "unavailable", fields: [] });
  });

  it("transforme une panne réseau en erreur lisible", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));

    expect(await sendContactMessage(VALID, fetchImpl)).toEqual({ ok: false, error: "network", fields: [] });
  });
});
