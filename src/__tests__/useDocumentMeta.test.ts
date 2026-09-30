import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const description = () => document.querySelector('meta[name="description"]')?.getAttribute("content");

afterEach(() => {
  document.head.innerHTML = "";
  document.title = "";
});

describe("useDocumentMeta", () => {
  it("sets the title and creates the description tag when missing", () => {
    renderHook(() => useDocumentMeta("Soro Amidou — Data Engineer", "Stage en Data Engineering"));
    expect(document.title).toBe("Soro Amidou — Data Engineer");
    expect(description()).toBe("Stage en Data Engineering");
  });

  it("updates both when the language changes", () => {
    const { rerender } = renderHook(({ title, desc }) => useDocumentMeta(title, desc), {
      initialProps: { title: "FR", desc: "Bonjour" },
    });
    rerender({ title: "EN", desc: "Hello" });
    expect(document.title).toBe("EN");
    expect(description()).toBe("Hello");
    expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
  });
});
