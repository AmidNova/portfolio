import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Toolbox from "../components/Toolbox";
import { LangProvider } from "../context/LangContext";
import { TOOLBOX } from "../data/profile";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "fr");
});

function renderToolbox() {
  return render(
    <MemoryRouter>
      <LangProvider>
        <Toolbox />
      </LangProvider>
    </MemoryRouter>
  );
}

describe("Toolbox", () => {
  it("affiche chaque outil avec son nom, clouds et infra compris", () => {
    renderToolbox();
    expect(screen.getAllByRole("listitem")).toHaveLength(TOOLBOX.length);
    for (const name of ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    expect(screen.queryByText("DAX")).not.toBeInTheDocument();
  });

  it("relie un outil à la preuve qui le justifie, et pas les autres", () => {
    renderToolbox();
    expect(screen.getByRole("link", { name: "Kafka — Wikipedia Pulse" })).toHaveAttribute(
      "href",
      "/projects#project-wikipedia-pulse",
    );
    expect(screen.getByRole("link", { name: "Databricks — Certification" })).toHaveAttribute("href", "/#credentials");
    expect(screen.queryByRole("link", { name: /Azure/ })).not.toBeInTheDocument();
  });
});
