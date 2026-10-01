import { render, screen } from "@testing-library/react";
import StatTiles from "../components/StatTiles";
import { LangProvider } from "../context/LangContext";
import { CERTIFICATIONS, EXPERIENCE, LINKS, PROJECT_COUNT } from "../data/profile";

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
    const link = screen.getByRole("link", { name: new RegExp(`^${PROJECT_COUNT}\\+ projets sur github`, "i") });
    expect(link).toHaveAttribute("href", LINKS.github);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("compte les certifications depuis la liste réelle, sans les gonfler", () => {
    renderTiles();
    const link = screen.getByRole("link", { name: new RegExp(`^${CERTIFICATIONS.length} certifications$`, "i") });
    expect(link).toHaveAttribute("href", "#credentials");
    expect(CERTIFICATIONS.map((c) => c.issuer)).toContain("Scrimba");
  });

  it("compte les expériences professionnelles et renvoie au parcours", () => {
    renderTiles();
    const link = screen.getByRole("link", { name: new RegExp(`^${EXPERIENCE.length} expériences$`, "i") });
    expect(link).toHaveAttribute("href", "#experience");
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
