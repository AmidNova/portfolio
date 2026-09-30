import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LangProvider } from "../context/LangContext";

function renderNavbar(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <LangProvider>
        <Navbar />
      </LangProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "fr");
  document.body.classList.remove("dark");
});

describe("Navbar", () => {
  it("affiche le nom et les liens de navigation", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: "Soro Amidou" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Projets" })).toHaveAttribute("href", "/#projects");
    expect(screen.getByRole("link", { name: "Parcours" })).toHaveAttribute("href", "/#experience");
    expect(screen.getByRole("link", { name: "À propos" })).toHaveAttribute("href", "/about");
  });

  it("marque la page courante", () => {
    renderNavbar("/about");
    expect(screen.getByRole("link", { name: "À propos" })).toHaveAttribute("aria-current", "page");
  });

  it("bascule FR → EN et traduit les liens", async () => {
    const user = userEvent.setup();
    renderNavbar();
    expect(screen.getByRole("button", { name: "fr" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "en" }));
    expect(localStorage.getItem("lang")).toBe("en");
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
  });

  it("part du mode sombre et bascule en clair", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByLabelText("Passer en mode clair"));
    expect(document.body.classList.contains("dark")).toBe(false);
    expect(screen.getByLabelText("Passer en mode sombre")).toBeInTheDocument();
  });
  it("ouvre un menu mobile avec les liens, et le referme au choix d'un lien ou avec Échap", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    const menu = screen.getByRole("navigation", { name: "Menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.click(within(menu).getByRole("link", { name: "Parcours" }));
    expect(screen.queryByRole("navigation", { name: "Menu" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Menu" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toHaveFocus();
  });
});
