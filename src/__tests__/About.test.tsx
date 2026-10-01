import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import About from "../components/About";
import { LangProvider } from "../context/LangContext";
import fr from "../locales/fr";

function renderAbout() {
  localStorage.setItem("lang", "fr");
  return render(
    <MemoryRouter initialEntries={["/about"]}>
      <LangProvider>
        <About />
      </LangProvider>
    </MemoryRouter>
  );
}

beforeEach(() => localStorage.clear());

describe("About", () => {
  it("garde le retour vers l'accueil et un seul titre de page", () => {
    renderAbout();
    expect(screen.getByRole("link", { name: /Retour/ })).toHaveAttribute("href", "/");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("raconte chaque chapitre avec sa photo légendée", () => {
    renderAbout();
    for (const chapter of fr.story.chapters) {
      const section = screen.getByRole("region", { name: chapter.title });
      expect(within(section).getByRole("img", { name: chapter.caption })).toBeInTheDocument();
    }
  });

  it("liste ce qui occupe le temps libre", () => {
    renderAbout();
    const section = screen.getByRole("region", { name: fr.story.offClock.title });
    for (const item of fr.story.offClock.items) {
      expect(within(section).getByText(item.title)).toBeInTheDocument();
    }
  });
});
