import { render, screen } from "@testing-library/react";
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
  document.body.classList.remove("dark");
  Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1280 });
  window.dispatchEvent(new Event("resize"));
});

describe("Navbar", () => {
  it("affiche le logo avec le nom", () => {
    renderNavbar();
    expect(screen.getByText("SA")).toBeInTheDocument();
    expect(screen.getByText("Soro Amidou")).toBeInTheDocument();
  });

  it("affiche les liens de navigation Home et About", () => {
    renderNavbar();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("affiche les liens sociaux (GitHub, LinkedIn, email)", () => {
    renderNavbar();
    expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Envoyer un email")).toBeInTheDocument();
  });

  it("le bouton dark mode est présent", () => {
    renderNavbar();
    expect(screen.getByLabelText("Passer en mode sombre")).toBeInTheDocument();
  });

  it("bascule en mode sombre au clic sur le toggle", async () => {
    const user = userEvent.setup();
    renderNavbar();
    const toggle = screen.getByLabelText("Passer en mode sombre");
    await user.click(toggle);
    expect(document.body.classList.contains("dark")).toBe(true);
    expect(screen.getByLabelText("Passer en mode clair")).toBeInTheDocument();
  });

  it("le dropdown de langue affiche EN par défaut", () => {
    renderNavbar();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("ouvre le dropdown et permet de choisir FR", async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(screen.getByText("EN"));
    const frButtons = screen.getAllByText("FR");
    expect(frButtons.length).toBeGreaterThan(0);
    await user.click(frButtons[frButtons.length - 1]);
    expect(localStorage.getItem("lang")).toBe("fr");
  });

  it("affiche le menu hamburger sur mobile", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 375 });
    window.dispatchEvent(new Event("resize"));
    renderNavbar();
    expect(screen.getByLabelText("Ouvrir le menu")).toBeInTheDocument();
  });
});
