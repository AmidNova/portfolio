import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("donne à chaque carte son schéma, ses chiffres et un ancre pour les liens de l'accueil", () => {
    renderPage();
    const pulse = screen.getByRole("article", { name: "Wikipedia Pulse" });
    expect(pulse).toHaveAttribute("id", "project-wikipedia-pulse");
    expect(within(pulse).getByRole("img", { name: /Architecture de Wikipedia Pulse/ })).toBeInTheDocument();
    expect(within(pulse).getByText("articles émergents")).toBeInTheDocument();
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

  it("filtre par techno, compte les résultats et se réinitialise", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByRole("button", { name: "Power BI" }));
    expect(screen.getByRole("button", { name: "Power BI" })).toHaveAttribute("aria-pressed", "true");
    expect(cardTitles()).toEqual(["Healthcare BI"]);
    expect(screen.getByRole("status")).toHaveTextContent("1 projet affiché");

    await user.click(screen.getByRole("button", { name: "Réinitialiser" }));
    expect(cardTitles()).toHaveLength(PROJECTS.length);
  });

  it("lit le filtre depuis l'URL et explique quand rien ne correspond", () => {
    renderPage("fr", "/projects?tech=Kafka,Power%20BI");
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.getByText(/Aucun projet ne combine/)).toBeInTheDocument();
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
