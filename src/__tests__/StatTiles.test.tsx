import { render, screen } from "@testing-library/react";
import StatTiles from "../components/StatTiles";
import { LangProvider } from "../context/LangContext";
import { CERTIFICATIONS, LINKS } from "../data/profile";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "fr");
});

function renderTiles() {
  return render(
    <LangProvider>
      <StatTiles />
    </LangProvider>
  );
}

describe("StatTiles", () => {
  it("relie le nombre de projets au GitHub", () => {
    renderTiles();
    const link = screen.getByRole("link", { name: /12\+ projets sur github/i });
    expect(link).toHaveAttribute("href", LINKS.github);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("compte les certifications depuis la liste réelle, sans les gonfler", () => {
    renderTiles();
    const link = screen.getByRole("link", { name: new RegExp(`^${CERTIFICATIONS.length} certifications$`, "i") });
    expect(link).toHaveAttribute("href", "#credentials");
    expect(CERTIFICATIONS.map((c) => c.issuer)).toContain("Scrimba");
  });

  it("garde une troisième tuile vide, invisible pour les lecteurs d'écran", () => {
    renderTiles();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
