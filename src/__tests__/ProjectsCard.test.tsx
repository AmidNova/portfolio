import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProjectsCard } from "../components/HomeCards";
import { LangProvider } from "../context/LangContext";
import { PROJECTS } from "../data/profile";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "fr");
});

function renderCard() {
  return render(
    <MemoryRouter>
      <LangProvider>
        <ProjectsCard />
      </LangProvider>
    </MemoryRouter>
  );
}

describe("ProjectsCard", () => {
  it("fait défiler une vignette par projet, chacune annoncée une seule fois", () => {
    renderCard();
    const card = screen.getByRole("region", { name: "Projets" });
    expect(within(card).getAllByRole("figure")).toHaveLength(PROJECTS.length);
    for (const p of PROJECTS) {
      expect(within(card).getByRole("figure", { name: p.title })).toBeInTheDocument();
    }
  });

  it("résume seulement : le détail est derrière « Voir tous les projets »", () => {
    renderCard();
    expect(screen.getByRole("link", { name: "Voir tous les projets" })).toHaveAttribute("href", "/projects");
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
