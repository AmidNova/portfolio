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
    expect(within(pulse).getByText("événements pré-viraux")).toBeInTheDocument();
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

  it("ouvre et ferme l'étude de cas au clavier, seulement pour les projets documentés", async () => {
    const user = userEvent.setup();
    renderPage("en");
    const retail = screen.getByRole("article", { name: "Retail Data Pipeline" });
    expect(within(retail).queryByRole("button", { name: /Case study/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^Case study$/ }));
    const dialog = screen.getByRole("dialog", { name: "Wikipedia Pulse" });
    expect(within(dialog).getByText("Technical documentation (PDF)")).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Close" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("agrandit une capture, navigue aux flèches et Échap ne ferme que la lightbox", async () => {
    const user = userEvent.setup();
    renderPage("en");
    await user.click(screen.getByRole("button", { name: /^Case study$/ }));
    await user.click(screen.getByRole("button", { name: /^Enlarge image — Real-time KPIs/ }));

    expect(screen.getByRole("dialog", { name: "Real-time KPIs on the live edit stream" })).toBeInTheDocument();
    expect(screen.getByText("1 / 8")).toBeInTheDocument();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("dialog", { name: "Trending articles: surfacing spikes" })).toBeInTheDocument();

    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(screen.getByText("8 / 8")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("8 / 8")).not.toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Wikipedia Pulse" })).toBeInTheDocument();
  });
});
