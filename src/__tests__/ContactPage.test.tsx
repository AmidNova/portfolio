import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "../components/ContactPage";
import { LangProvider } from "../context/LangContext";
import { EMAIL } from "../data/profile";
import type { TurnstileApi } from "../lib/turnstile";

// A Turnstile that passes at once: the real one is an iframe from Cloudflare.
function fakeTurnstile(): TurnstileApi {
  return {
    render: vi.fn((_el, options) => {
      setTimeout(() => options.callback("tok-1"), 0);
      return "w1";
    }),
    reset: vi.fn(),
    remove: vi.fn(),
  };
}

function setup() {
  render(
    <LangProvider>
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    </LangProvider>,
  );
  return userEvent.setup();
}

async function fill(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Nom"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Message"), "Bonjour, parlons d'un stage en janvier.");
}

function respond(status: number, body: unknown) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify(body), { status }));
}

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "fr");
  window.turnstile = fakeTurnstile();
});

afterEach(() => {
  vi.restoreAllMocks();
  delete window.turnstile;
});

describe("ContactPage", () => {
  it("envoie le message et confirme l'envoi", async () => {
    const fetchSpy = respond(200, { success: true, data: { id: "msg-1" }, error: null });
    const user = setup();

    await fill(user);
    await user.click(await screen.findByRole("button", { name: "Envoyer" }));

    expect(await screen.findByRole("heading", { name: "Message envoyé" })).toBeInTheDocument();
    const sent = JSON.parse(fetchSpy.mock.calls[0][1]!.body as string);
    expect(sent).toMatchObject({ name: "Ada Lovelace", email: "ada@example.com", lang: "fr", token: "tok-1" });
  });

  it("signale les champs invalides sans rien envoyer", async () => {
    const fetchSpy = respond(200, {});
    const user = setup();

    await user.type(screen.getByLabelText("Email"), "pas-une-adresse");
    await user.click(await screen.findByRole("button", { name: "Envoyer" }));

    expect(screen.getByLabelText("Nom")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(/adresse email valide/);
    expect(screen.getByLabelText("Message")).toHaveAttribute("aria-invalid", "true");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("propose l'adresse email quand l'envoi échoue", async () => {
    respond(502, { success: false, data: null, error: "unavailable" });
    const user = setup();

    await fill(user);
    await user.click(await screen.findByRole("button", { name: "Envoyer" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("n'a pas pu être envoyé");
    expect(screen.getByRole("link", { name: EMAIL })).toHaveAttribute("href", `mailto:${EMAIL}`);
  });

  it("redemande la vérification anti-robot quand le serveur la refuse", async () => {
    respond(403, { success: false, data: null, error: "captcha" });
    const user = setup();

    await fill(user);
    await user.click(await screen.findByRole("button", { name: "Envoyer" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("vérification anti-robot a échoué");
    expect(window.turnstile!.reset).toHaveBeenCalledWith("w1");
  });

  it("dit quand la vérification anti-robot ne peut pas se charger", async () => {
    window.turnstile = { ...fakeTurnstile(), render: vi.fn((_el, o) => (setTimeout(() => o["error-callback"](), 0), "w1")) };
    setup();

    expect(await screen.findByText(/n'a pas pu se charger/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: EMAIL })).toBeInTheDocument();
  });
});
