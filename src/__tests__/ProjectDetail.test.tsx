import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProjectDetail from "../components/ProjectDetail";
import { LangProvider } from "../context/LangContext";
import { PROJECTS } from "../data/profile";

function renderProject(id: string, lang = "en") {
  localStorage.setItem("lang", lang);
  return render(
    <MemoryRouter initialEntries={[`/projects/${id}`]}>
      <LangProvider>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </LangProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => localStorage.clear());

describe("ProjectDetail", () => {
  it("titre la page du projet et met son résumé en description", () => {
    renderProject("wikipedia-pulse");
    expect(screen.getByRole("heading", { level: 1, name: "Wikipedia Pulse" })).toBeInTheDocument();
    expect(document.title).toBe("Wikipedia Pulse · Soro Amidou");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      expect.stringContaining("editors react to an event hours before readers"),
    );
  });

  it("donne le contexte : cadre, période, source des données liée, stack", () => {
    renderProject("retail-pipeline", "fr");
    const context = screen.getByRole("region", { name: "Contexte du projet" });
    expect(within(context).getByText("Projet personnel · seul")).toBeInTheDocument();
    expect(within(context).getByRole("link", { name: /Online Retail II/ })).toHaveAttribute(
      "href",
      "https://archive.ics.uci.edu/dataset/502/online+retail+ii",
    );
    expect(within(context).getByText("dbt")).toBeInTheDocument();
  });

  it("raconte le pipeline Retail étape par étape, ses choix, ses limites et renvoie au code", () => {
    renderProject("retail-pipeline");
    const steps = within(screen.getByRole("list", { name: "Pipeline" })).getAllByRole("listitem");
    expect(steps[0]).toHaveTextContent("Raw CSV");
    expect(steps.at(-1)).toHaveTextContent("Metabase");
    expect(screen.getByRole("heading", { name: "Technical choices" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Limits" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View the code/ })).toHaveAttribute(
      "href",
      "https://github.com/AmidNova/retail-gcp-pipeline",
    );
  });

  it("dit que les données Healthcare sont synthétiques et n'invente pas de lien de code", () => {
    renderProject("healthcare-bi");
    expect(screen.getByText("admissions (synthetic)")).toBeInTheDocument();
    expect(screen.getByText("Synthetic dataset provided by the course")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /View the code/ })).not.toBeInTheDocument();
    expect(screen.getByText("Code not public")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^Enlarge image/ })).toHaveLength(6);
  });

  it("agrandit une capture, navigue aux flèches et Échap ferme la lightbox", async () => {
    const user = userEvent.setup();
    renderProject("wikipedia-pulse");
    await user.click(screen.getByRole("button", { name: /^Enlarge image — Kibana dashboard/ }));
    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("dialog", { name: /October 7 run in Airflow 3/ })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("mène au projet suivant, et du dernier revient au premier", () => {
    renderProject(PROJECTS.at(-1)!.id);
    const next = screen.getByRole("navigation", { name: "Next project" });
    expect(within(next).getByRole("link")).toHaveAttribute("href", `/projects/${PROJECTS[0].id}`);
  });

  it("affiche la page 404 pour un projet inconnu", () => {
    renderProject("nope", "fr");
    expect(screen.getByRole("heading", { level: 1, name: "Page introuvable" })).toBeInTheDocument();
  });
});
