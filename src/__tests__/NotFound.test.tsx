import { render, screen } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "fr");
});

describe("NotFound", () => {
  it("répond à une adresse inconnue par une page 404 qui ramène à l'accueil et aux projets", () => {
    window.history.pushState({}, "", "/cette-page-n-existe-pas");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Page introuvable" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Retour à l'accueil/ })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Voir les projets/ })).toHaveAttribute("href", "/projects");
    window.history.pushState({}, "", "/");
  });
});
