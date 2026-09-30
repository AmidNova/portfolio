import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LangProvider, useLang } from "../context/LangContext";

function LangDisplay() {
  const { lang, setLang, t, dark, toggleDark } = useLang();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="greeting">{t.hero.status}</span>
      <span data-testid="dark">{String(dark)}</span>
      <button onClick={() => setLang("fr")}>set fr</button>
      <button onClick={() => setLang("en")}>set en</button>
      <button onClick={toggleDark}>toggle dark</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <LangProvider>
      <LangDisplay />
    </LangProvider>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.body.classList.remove("dark");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("LangContext", () => {
  it("suit la langue du navigateur au premier passage (anglais)", () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("en-US");
    renderWithProvider();
    expect(screen.getByTestId("lang").textContent).toBe("en");
    expect(screen.getByTestId("greeting").textContent).toBe("Looking for a Data Engineering internship");
  });

  it("démarre en français pour tout navigateur non anglophone", () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("fr-FR");
    renderWithProvider();
    expect(screen.getByTestId("lang").textContent).toBe("fr");
    expect(screen.getByTestId("greeting").textContent).toBe("Recherche un stage en Data Engineering");
  });

  it("restaure la langue depuis localStorage", () => {
    localStorage.setItem("lang", "fr");
    renderWithProvider();
    expect(screen.getByTestId("lang").textContent).toBe("fr");
  });

  it("change la langue et met à jour les traductions", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByText("set fr"));
    expect(screen.getByTestId("lang").textContent).toBe("fr");
    expect(localStorage.getItem("lang")).toBe("fr");
  });

  it("le mode sombre démarre à false par défaut", () => {
    renderWithProvider();
    expect(screen.getByTestId("dark").textContent).toBe("false");
    expect(document.body.classList.contains("dark")).toBe(false);
  });

  it("restaure le mode sombre depuis localStorage", () => {
    localStorage.setItem("dark", "true");
    renderWithProvider();
    expect(screen.getByTestId("dark").textContent).toBe("true");
  });

  it("toggleDark bascule le mode sombre et persiste", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByText("toggle dark"));
    expect(screen.getByTestId("dark").textContent).toBe("true");
    expect(document.body.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("dark")).toBe("true");
    await user.click(screen.getByText("toggle dark"));
    expect(screen.getByTestId("dark").textContent).toBe("false");
    expect(document.body.classList.contains("dark")).toBe(false);
  });
});
