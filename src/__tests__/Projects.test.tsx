import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Projects from "../components/Projects";
import { LangProvider } from "../context/LangContext";

function renderProjects() {
  return render(
    <MemoryRouter>
      <LangProvider>
        <Projects />
      </LangProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1280 });
  window.dispatchEvent(new Event("resize"));
});

describe("Projects", () => {
  it("affiche le titre de section", () => {
    renderProjects();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("affiche le premier projet (Kairos) au démarrage", () => {
    renderProjects();
    expect(screen.getByText("Kairos")).toBeInTheDocument();
    expect(screen.getByText("01 / 02")).toBeInTheDocument();
  });

  it("navigue vers le projet suivant avec la flèche droite", async () => {
    const user = userEvent.setup();
    renderProjects();
    const nextBtn = screen.getAllByRole("button").find(
      (btn) => btn.querySelector("svg") && !btn.getAttribute("aria-label")
    );
    // Clique sur le 2e bouton de navigation (flèche droite)
    const navButtons = screen.getAllByRole("button").filter(
      (btn) => !btn.textContent?.trim() || btn.querySelector("svg")
    );
    // Le bouton next est le 2ème bouton de navigation flèche
    await user.click(navButtons[1]);
    expect(screen.getByText("Bozarts")).toBeInTheDocument();
    expect(screen.getByText("02 / 02")).toBeInTheDocument();
  });

  it("boucle au dernier projet puis revient au premier", async () => {
    const user = userEvent.setup();
    renderProjects();

    // Récupère les 2 boutons de navigation (ArrowLeft et ArrowRight)
    const allButtons = screen.getAllByRole("button");
    const arrowButtons = allButtons.slice(0, 2); // prev et next sont les 2 premiers

    // Next → Bozarts
    await user.click(arrowButtons[1]);
    expect(screen.getByText("Bozarts")).toBeInTheDocument();

    // Next encore → revient à Kairos
    await user.click(arrowButtons[1]);
    expect(screen.getByText("Kairos")).toBeInTheDocument();
  });

  it("navigue vers le projet précédent avec la flèche gauche", async () => {
    const user = userEvent.setup();
    renderProjects();

    const allButtons = screen.getAllByRole("button");
    const prevBtn = allButtons[0];
    const nextBtn = allButtons[1];

    // Va à Bozarts
    await user.click(nextBtn);
    expect(screen.getByText("Bozarts")).toBeInTheDocument();

    // Revient à Kairos
    await user.click(prevBtn);
    expect(screen.getByText("Kairos")).toBeInTheDocument();
  });

  it("affiche les tags tech du projet courant", () => {
    renderProjects();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
  });

  it("affiche le bouton Show All Projects", () => {
    renderProjects();
    expect(screen.getByText("Show All Projects")).toBeInTheDocument();
  });

  it("affiche le statut du projet", () => {
    renderProjects();
    expect(screen.getByText("In Development")).toBeInTheDocument();
  });
});
