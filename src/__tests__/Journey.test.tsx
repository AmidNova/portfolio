import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Journey from "../components/Journey";
import { LangProvider } from "../context/LangContext";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "fr");
});

describe("Journey", () => {
  it("montre l'expérience par défaut puis bascule sur la formation", async () => {
    const user = userEvent.setup();
    render(
      <LangProvider>
        <Journey />
      </LangProvider>
    );

    expect(screen.getByRole("heading", { level: 2, name: "Parcours" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Expérience" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("ARTCI")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Formation" }));

    expect(screen.getByRole("tab", { name: "Formation" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("ISEP Paris");
    expect(screen.queryByText("ARTCI")).not.toBeInTheDocument();
  });
});
