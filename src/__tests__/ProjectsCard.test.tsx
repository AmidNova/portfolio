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
  it("liste chaque projet avec son chiffre clé, chacun menant à sa page", () => {
    renderCard();
    const card = screen.getByRole("region", { name: "Projets" });
    const links = within(card).getAllByRole("link").filter((l) => l.getAttribute("href")?.startsWith("/projects/"));
    expect(links.map((l) => l.getAttribute("href"))).toEqual(PROJECTS.map((p) => `/projects/${p.id}`));
    const pulse = links[0];
    expect(pulse).toHaveTextContent("Wikipedia Pulse");
    expect(pulse).toHaveTextContent("212 788");
  });

  it("ne fait rien défiler tout seul", () => {
    renderCard();
    expect(screen.queryByRole("button", { name: /défilement/ })).not.toBeInTheDocument();
  });

  it("résume seulement : le détail est derrière « Voir tous les projets »", () => {
    renderCard();
    expect(screen.getByRole("link", { name: "Voir tous les projets" })).toHaveAttribute("href", "/projects");
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});
