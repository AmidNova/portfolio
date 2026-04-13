import { render, screen, act } from "@testing-library/react";
import FadeIn from "../components/FadeIn";

let capturedCallback: IntersectionObserverCallback;

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: IntersectionObserverCallback) {
        capturedCallback = cb;
      }
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
    }
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("FadeIn", () => {
  it("rend ses enfants", () => {
    render(<FadeIn><p>Contenu</p></FadeIn>);
    expect(screen.getByText("Contenu")).toBeInTheDocument();
  });

  it("commence avec opacity 0 et translateY(28px)", () => {
    const { container } = render(<FadeIn><span>test</span></FadeIn>);
    const div = container.firstChild as HTMLElement;
    expect(div.style.opacity).toBe("0");
    expect(div.style.transform).toBe("translateY(28px)");
  });

  it("devient visible (opacity 1) après intersection", () => {
    const { container } = render(<FadeIn><span>test</span></FadeIn>);
    act(() => {
      capturedCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    const div = container.firstChild as HTMLElement;
    expect(div.style.opacity).toBe("1");
    expect(div.style.transform).toBe("translateY(0)");
  });

  it("applique le delay dans la transition", () => {
    const { container } = render(<FadeIn delay={200}><span>test</span></FadeIn>);
    const div = container.firstChild as HTMLElement;
    expect(div.style.transition).toContain("200ms");
  });

  it("transition sans delay par défaut à 0ms", () => {
    const { container } = render(<FadeIn><span>test</span></FadeIn>);
    const div = container.firstChild as HTMLElement;
    expect(div.style.transition).toContain("0ms");
  });
});
