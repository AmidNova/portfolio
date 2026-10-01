import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("laisse mettre le défilement en pause, puis le reprendre", async () => {
    const user = userEvent.setup();
    const { container } = renderCard();
    const toggle = screen.getByRole("button", { name: "Mettre le défilement en pause" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    for (const marquee of container.querySelectorAll(".marquee")) {
      expect(marquee).toHaveAttribute("data-paused");
    }

    await user.click(toggle);
    expect(container.querySelector(".marquee[data-paused]")).toBeNull();
  });
});
