import { renderHook, act } from "@testing-library/react";
import { useResponsive } from "../hooks/useResponsive";

function setWindowWidth(width: number) {
  Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: width });
  window.dispatchEvent(new Event("resize"));
}

describe("useResponsive", () => {
  afterEach(() => {
    setWindowWidth(1024);
  });

  it("retourne isMobile=false et isTablet=false sur desktop (1280px)", () => {
    setWindowWidth(1280);
    const { result } = renderHook(() => useResponsive());
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
  });

  it("retourne isMobile=false et isTablet=true sur tablette (900px)", () => {
    setWindowWidth(900);
    const { result } = renderHook(() => useResponsive());
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
  });

  it("retourne isMobile=true et isTablet=true sur mobile (375px)", () => {
    setWindowWidth(375);
    const { result } = renderHook(() => useResponsive());
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(true);
  });

  it("se met à jour lors d'un resize", () => {
    setWindowWidth(1280);
    const { result } = renderHook(() => useResponsive());
    expect(result.current.isMobile).toBe(false);

    act(() => setWindowWidth(375));
    expect(result.current.isMobile).toBe(true);
  });

  it("la frontière mobile est strictement inférieure à 768px", () => {
    setWindowWidth(768);
    const { result } = renderHook(() => useResponsive());
    expect(result.current.isMobile).toBe(false);

    act(() => setWindowWidth(767));
    expect(result.current.isMobile).toBe(true);
  });
});
