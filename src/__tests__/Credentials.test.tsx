import { render, screen, within } from "@testing-library/react";
import Credentials from "../components/Credentials";
import { LangProvider } from "../context/LangContext";
import { CERTIFICATIONS } from "../data/profile";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "fr");
});

function renderCard() {
  return render(
    <LangProvider>
      <Credentials />
    </LangProvider>
  );
}

describe("Credentials", () => {
  it("montre chaque certification par son badge, nommé par l'intitulé officiel", () => {
    renderCard();
    const list = screen.getByRole("list", { name: "Certifications" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(CERTIFICATIONS.length);
    for (const cert of CERTIFICATIONS) {
      expect(within(list).getByRole("img", { name: cert.name })).toBeInTheDocument();
    }
  });

  it("légende chaque badge d'un titre court, du niveau et de l'émetteur", () => {
    renderCard();
    const list = screen.getByRole("list", { name: "Certifications" });
    expect(within(list).getByText("Solutions Architect")).toBeInTheDocument();
    expect(within(list).getByText("Associate · AWS")).toBeInTheDocument();
    expect(within(list).getByText("Scrimba")).toBeInTheDocument();
  });

  it("liste toujours les langues de travail", () => {
    renderCard();
    expect(screen.getByText("Français")).toBeInTheDocument();
    expect(screen.getByText("Anglais")).toBeInTheDocument();
  });
});
