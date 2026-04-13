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

// jsdom ne supporte pas matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
