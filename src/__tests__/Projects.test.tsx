import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Projects from "../components/Projects";
import { LangProvider } from "../context/LangContext";

function renderProjects(lang = "fr") {
  localStorage.setItem("lang", lang);
  return render(
    <LangProvider>
      <Projects />
    </LangProvider>
  );
}

beforeEach(() => localStorage.clear());

describe("Projects", () => {
  it("affiche les trois projets", () => {
    renderProjects();
    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(["Wikipedia Pulse", "Retail Data Pipeline", "Healthcare BI"]);
  });

  it("illustre chaque projet par son schéma et chiffre le projet phare", () => {
    renderProjects();
    const pulse = screen.getByRole("article", { name: "Wikipedia Pulse" });
    expect(within(pulse).getByRole("img", { name: /Architecture de Wikipedia Pulse/ })).toBeInTheDocument();
    expect(within(pulse).getByText("événements pré-viraux")).toBeInTheDocument();
    const retail = screen.getByRole("article", { name: "Retail Data Pipeline" });
    expect(within(retail).getByRole("img", { name: /Flux du Retail Data Pipeline/ })).toBeInTheDocument();
    const bi = screen.getByRole("article", { name: "Healthcare BI" });
    expect(within(bi).getByRole("img", { name: /Schéma en étoile/ })).toBeInTheDocument();
  });

  it("chiffre aussi le projet BI", () => {
    renderProjects("en");
    const bi = screen.getByRole("article", { name: "Healthcare BI" });
    expect(within(bi).getByText("$25.6M")).toBeInTheDocument();
    expect(within(bi).getByText("hospitals")).toBeInTheDocument();
  });

  it("n'offre l'étude de cas qu'aux projets documentés", () => {
    renderProjects();
    const retail = screen.getByRole("article", { name: "Retail Data Pipeline" });
    expect(within(retail).queryByRole("button")).not.toBeInTheDocument();
  });

  it("ouvre et ferme l'étude de cas au clavier", async () => {
    const user = userEvent.setup();
    renderProjects("en");
    await user.click(screen.getByRole("button", { name: /^Case study$/ }));
    const dialog = screen.getByRole("dialog", { name: "Wikipedia Pulse" });
    expect(within(dialog).getByText("Technical documentation (PDF)")).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Close" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("agrandit une capture, navigue aux flèches et Échap ne ferme que la lightbox", async () => {
    const user = userEvent.setup();
    renderProjects("en");
    await user.click(screen.getByRole("button", { name: /^Case study$/ }));
    await user.click(screen.getByRole("button", { name: /^Enlarge image — Real-time KPIs/ }));

    expect(screen.getByRole("dialog", { name: "Real-time KPIs on the live edit stream" })).toBeInTheDocument();
    expect(screen.getByText("1 / 8")).toBeInTheDocument();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("dialog", { name: "Trending articles — surfacing spikes" })).toBeInTheDocument();

    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(screen.getByText("8 / 8")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("8 / 8")).not.toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Wikipedia Pulse" })).toBeInTheDocument();
  });
});
