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
    expect(screen.getByText("./projects")).toBeInTheDocument();
  });

  it("affiche le premier projet (Wikipedia Pulse) au démarrage", () => {
    renderProjects();
    expect(screen.getByText("Wikipedia Pulse")).toBeInTheDocument();
    expect(screen.getByText("01 / 03")).toBeInTheDocument();
  });

  it("navigue vers le projet suivant avec la flèche droite", async () => {
    const user = userEvent.setup();
    renderProjects();
    const arrowButtons = screen.getAllByRole("button").slice(0, 2);
    await user.click(arrowButtons[1]);
    expect(screen.getByText("Kairos")).toBeInTheDocument();
    expect(screen.getByText("02 / 03")).toBeInTheDocument();
  });

  it("boucle sur tous les projets puis revient au premier", async () => {
    const user = userEvent.setup();
    renderProjects();

    const arrowButtons = screen.getAllByRole("button").slice(0, 2); // prev et next

    await user.click(arrowButtons[1]); // → Kairos
    expect(screen.getByText("Kairos")).toBeInTheDocument();

    await user.click(arrowButtons[1]); // → Bozarts
    expect(screen.getByText("Bozarts")).toBeInTheDocument();

    await user.click(arrowButtons[1]); // → revient à Wikipedia Pulse
    expect(screen.getByText("Wikipedia Pulse")).toBeInTheDocument();
  });

  it("navigue vers le projet précédent avec la flèche gauche", async () => {
    const user = userEvent.setup();
    renderProjects();

    const arrowButtons = screen.getAllByRole("button").slice(0, 2);
    const prevBtn = arrowButtons[0];
    const nextBtn = arrowButtons[1];

    await user.click(nextBtn); // → Kairos
    expect(screen.getByText("Kairos")).toBeInTheDocument();

    await user.click(prevBtn); // ← revient à Wikipedia Pulse
    expect(screen.getByText("Wikipedia Pulse")).toBeInTheDocument();
  });

  it("affiche les tags tech du projet courant", () => {
    renderProjects();
    expect(screen.getByText("Apache Kafka")).toBeInTheDocument();
    expect(screen.getByText("Airflow")).toBeInTheDocument();
  });

  it("ouvre l'étude de cas du projet média", async () => {
    const user = userEvent.setup();
    renderProjects();
    await user.click(screen.getByText("Case study"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Full documentation (PDF)")).toBeInTheDocument();
  });

  it("affiche le bouton Show All Projects", () => {
    renderProjects();
    expect(screen.getByText("Show All Projects")).toBeInTheDocument();
  });

  it("affiche le statut du projet", () => {
    renderProjects();
    expect(screen.getByText("Personal Project")).toBeInTheDocument();
  });
});
