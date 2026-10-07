import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Contact from "../components/Contact";
import { LangProvider } from "../context/LangContext";
import { EMAIL } from "../data/profile";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "fr");
});

describe("Contact", () => {
  it("copie l'adresse email et le confirme", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    render(
      <LangProvider>
        <MemoryRouter>
          <Contact />
        </MemoryRouter>
      </LangProvider>
    );

    await user.click(screen.getByRole("button", { name: `Copier ${EMAIL}` }));

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(await screen.findByText("Copié")).toBeInTheDocument();
  });

  it("mène au formulaire de contact", () => {
    render(
      <LangProvider>
        <MemoryRouter>
          <Contact />
        </MemoryRouter>
      </LangProvider>
    );

    expect(screen.getByRole("link", { name: "Écrire un message" })).toHaveAttribute("href", "/contact");
  });
});
