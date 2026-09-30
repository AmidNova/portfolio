import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Hero from "../components/Hero";
import { AboutCard } from "../components/HomeCards";
import Timeline from "../components/Timeline";
import { LangProvider } from "../context/LangContext";
import { EDUCATION, EXPERIENCE } from "../data/profile";

function renderWith(ui: React.ReactElement, lang = "fr") {
  localStorage.setItem("lang", lang);
  return render(
    <MemoryRouter>
      <LangProvider>{ui}</LangProvider>
    </MemoryRouter>
  );
}

beforeEach(() => localStorage.clear());

describe("Hero", () => {
  it("présente le nom, le statut de recherche de stage et les liens", () => {
    renderWith(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: "Soro Amidou" })).toBeInTheDocument();
    expect(screen.getByText("Recherche un stage en Data Engineering")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /CV/ })).toHaveAttribute("download");
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute("href", "https://github.com/AmidNova");
    expect(screen.getByRole("link", { name: /Email/ })).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
  });

  it("est traduit en anglais", () => {
    renderWith(<Hero />, "en");
    expect(screen.getByText("Looking for a Data Engineering internship")).toBeInTheDocument();
  });
});

describe("Timeline", () => {
  it("affiche rôle et période localisée", () => {
    renderWith(<Timeline entries={EXPERIENCE} />);
    const items = screen.getAllByRole("listitem").filter((li) => li.querySelector("h3"));
    const artci = items.find((li) => within(li).queryByText("ARTCI"))!;
    expect(within(artci).getByText("Stagiaire développeur web")).toBeInTheDocument();
    expect(within(artci).getByText("juin 2023 – sept 2023")).toBeInTheDocument();
  });

  it("donne le site officiel, LinkedIn et X de chaque organisation quand ils existent", () => {
    renderWith(<Timeline entries={EDUCATION} />);
    expect(screen.getByRole("link", { name: "ISEP Paris — Site officiel" })).toHaveAttribute("href", "https://www.isep.fr");
    expect(screen.getByRole("link", { name: "ISEP Paris — LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/school/isep-paris/",
    );
    expect(screen.getByRole("link", { name: "ISEP Paris — X (Twitter)" })).toHaveAttribute("target", "_blank");
    expect(screen.queryByRole("link", { name: "ESTM Casablanca — X (Twitter)" })).not.toBeInTheDocument();
  });
});

describe("AboutCard", () => {
  it("résume l'histoire, montre la personne et mène à la version longue", () => {
    renderWith(<AboutCard />);
    const card = screen.getByRole("region", { name: "À propos" });
    expect(within(card).getByRole("heading", { name: "En dehors du travail" })).toBeInTheDocument();
    for (const hobby of ["Lecture", "Échecs", "Course à pied"]) {
      expect(within(card).getByText(hobby)).toBeInTheDocument();
    }
    expect(within(card).getByRole("link", { name: /L'histoire complète/ })).toHaveAttribute("href", "/about");
  });
});
