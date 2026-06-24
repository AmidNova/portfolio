import "@testing-library/jest-dom";

// jsdom ne supporte pas IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// jsdom ne supporte pas matchMedia.
// Mock qui dérive `matches` de window.innerWidth et émet "change" sur "resize",
// pour rester compatible avec useResponsive (matchMedia + useSyncExternalStore).
type ChangeListener = (event: MediaQueryListEvent) => void;

function evaluateQuery(query: string): boolean {
  const width = window.innerWidth;
  const max = query.match(/max-width:\s*(\d+)px/);
  if (max && width > Number(max[1])) return false;
  const min = query.match(/min-width:\s*(\d+)px/);
  if (min && width < Number(min[1])) return false;
  return Boolean(max || min);
}

const mediaQueryLists = new Set<{ recompute: () => void }>();

Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: (query: string) => {
    const listeners = new Set<ChangeListener>();
    let matches = evaluateQuery(query);

    const mql = {
      get matches() {
        return matches;
      },
      media: query,
      onchange: null,
      addListener: (cb: ChangeListener) => listeners.add(cb),
      removeListener: (cb: ChangeListener) => listeners.delete(cb),
      addEventListener: (_type: string, cb: ChangeListener) => listeners.add(cb),
      removeEventListener: (_type: string, cb: ChangeListener) => listeners.delete(cb),
      dispatchEvent: () => false,
      recompute: () => {
        const next = evaluateQuery(query);
        if (next !== matches) {
          matches = next;
          listeners.forEach((cb) => cb({ matches } as MediaQueryListEvent));
        }
      },
    };

    mediaQueryLists.add(mql);
    return mql;
  },
});

window.addEventListener("resize", () => {
  mediaQueryLists.forEach((mql) => mql.recompute());
});
