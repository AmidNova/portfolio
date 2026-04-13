import { render, act, screen } from "@testing-library/react";
import { useFadeIn } from "../hooks/useFadeIn";

// Composant de test qui expose l'état visible
let lastVisible = false;
let capturedCallback: IntersectionObserverCallback;
let disconnectSpy: ReturnType<typeof vi.fn>;

function TestComponent() {
  const { ref, visible } = useFadeIn();
  lastVisible = visible;
  return <div ref={ref} data-testid="target">{visible ? "visible" : "hidden"}</div>;
}

beforeEach(() => {
  lastVisible = false;
  disconnectSpy = vi.fn();

  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: IntersectionObserverCallback) {
        capturedCallback = cb;
      }
      observe = vi.fn();
      disconnect = disconnectSpy;
      unobserve = vi.fn();
    }
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useFadeIn", () => {
  it("démarre avec visible=false", () => {
    render(<TestComponent />);
    expect(screen.getByText("hidden")).toBeInTheDocument();
  });

  it("visible passe à true quand l'élément intersecte", () => {
    render(<TestComponent />);
    act(() => {
      capturedCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(screen.getByText("visible")).toBeInTheDocument();
  });

  it("ne change pas si isIntersecting est false", () => {
    render(<TestComponent />);
    act(() => {
      capturedCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(screen.getByText("hidden")).toBeInTheDocument();
  });

  it("déconnecte l'observer après la première intersection", () => {
    render(<TestComponent />);
    act(() => {
      capturedCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
