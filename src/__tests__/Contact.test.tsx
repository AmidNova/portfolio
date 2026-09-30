import { render, screen } from "@testing-library/react";
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
        <Contact />
      </LangProvider>
    );

    await user.click(screen.getByRole("button", { name: `Copier ${EMAIL}` }));

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(await screen.findByText("Copié")).toBeInTheDocument();
  });
});
