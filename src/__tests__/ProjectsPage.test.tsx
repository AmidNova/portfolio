import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectsPage from "../components/ProjectsPage";
import { LangProvider } from "../context/LangContext";
import { PROJECTS } from "../data/profile";

function renderPage(lang = "fr", url = "/projects") {
  localStorage.setItem("lang", lang);
  return render(
    <MemoryRouter initialEntries={[url]}>
      <LangProvider>
        <ProjectsPage />
      </LangProvider>
    </MemoryRouter>
  );
}

const cardTitles = () =>
  screen.getAllByRole("article").map((card) => within(card).getByRole("heading", { level: 2 }).textContent?.trim());

beforeEach(() => localStorage.clear());

describe("ProjectsPage", () => {
  it("titre la page et affiche une carte par projet, le projet phare en premier", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: "Mes projets" })).toBeInTheDocument();
    expect(cardTitles()).toHaveLength(PROJECTS.length);
    const first = screen.getAllByRole("article")[0];
    expect(within(first).getByText("Phare")).toBeInTheDocument();
    expect(screen.getAllByText("Phare")).toHaveLength(PROJECTS.filter((p) => p.featured).length);
  });

  it("donne à chaque carte son visuel et ses chiffres : capture réelle si elle existe, sinon le schéma", () => {
    renderPage();
    const pulse = screen.getByRole("article", { name: "Wikipedia Pulse" });
    expect(within(pulse).getByRole("figure", { name: "Wikipedia Pulse" }).querySelector("img")).not.toBeNull();
    expect(within(pulse).getByText("articles émergents")).toBeInTheDocument();
    const retail = screen.getByRole("article", { name: "Retail Data Pipeline" });
    expect(within(retail).getByRole("img", { name: /Flux du Retail Data Pipeline/ })).toBeInTheDocument();
  });

  it("n'a plus de filtre par techno", () => {
    renderPage();
    expect(screen.queryByRole("button", { name: "Réinitialiser" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(PROJECTS.length);
  });

  it("n'offre le code que pour les projets qui ont un dépôt public", () => {
    renderPage();
    for (const p of PROJECTS) {
      const card = screen.getByRole("article", { name: p.title });
      const code = within(card).queryByRole("link", { name: /Code/ });
      if (p.repo) {
        expect(code).toHaveAttribute("href", p.repo);
        expect(code).toHaveAttribute("target", "_blank");
      } else {
        expect(code).not.toBeInTheDocument();
        expect(within(card).getByText("Code non public")).toBeInTheDocument();
      }
    }
  });

  it("mène chaque carte à la page du projet", () => {
    renderPage("en");
    for (const p of PROJECTS) {
      const card = screen.getByRole("article", { name: p.title });
      expect(within(card).getByRole("link", { name: /^View project/ })).toHaveAttribute("href", `/projects/${p.id}`);
      expect(within(card).getByRole("link", { name: p.title })).toHaveAttribute("href", `/projects/${p.id}`);
    }
  });
});
