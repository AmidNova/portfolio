import { useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 767px)";
const TABLET_QUERY = "(max-width: 1023px)";

function subscribe(query: string) {
  return (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

function getSnapshot(query: string) {
  return () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };
}

const getServerSnapshot = () => false;

export function useResponsive() {
  const isMobile = useSyncExternalStore(
    subscribe(MOBILE_QUERY),
    getSnapshot(MOBILE_QUERY),
    getServerSnapshot
  );
  const isTablet = useSyncExternalStore(
    subscribe(TABLET_QUERY),
    getSnapshot(TABLET_QUERY),
    getServerSnapshot
  );

  return { isMobile, isTablet };
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe("(prefers-reduced-motion: reduce)"),
    getSnapshot("(prefers-reduced-motion: reduce)"),
    getServerSnapshot
  );
}
