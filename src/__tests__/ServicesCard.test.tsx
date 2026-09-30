import { render, screen, within } from "@testing-library/react";
import { ServicesCard } from "../components/HomeCards";
import { LangProvider } from "../context/LangContext";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "fr");
});

function renderCard() {
  return render(
    <LangProvider>
      <ServicesCard />
    </LangProvider>
  );
}

describe("ServicesCard", () => {
  it("nomme la carte et liste chaque service une seule fois pour les lecteurs d'écran", () => {
    renderCard();
    const card = screen.getByRole("region", { name: "Services" });
    const items = within(card).getAllByRole("listitem").map((li) => li.textContent);
    expect(items).toContain("Streaming temps réel");
    expect(items).toContain("Qualité des données");
    expect(new Set(items).size).toBe(items.length);
  });

  it("ne montre plus la carte En direct", () => {
    renderCard();
    expect(screen.queryByText("En direct")).not.toBeInTheDocument();
  });
});
