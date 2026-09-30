import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useWikiPulse } from "../hooks/useWikiPulse";

class FakeEventSource {
  static CLOSED = 2;
  static instances: FakeEventSource[] = [];
  readyState = 1;
  onmessage: ((e: MessageEvent) => void) | null = null;
  onerror: (() => void) | null = null;
  closed = false;
  constructor(public url: string) {
    FakeEventSource.instances.push(this);
  }
  emit(payload: unknown) {
    this.onmessage?.({ data: JSON.stringify(payload) } as MessageEvent);
  }
  emitRaw(data: string) {
    this.onmessage?.({ data } as MessageEvent);
  }
  close() {
    this.closed = true;
    this.readyState = FakeEventSource.CLOSED;
  }
}

const wikiEdit = { type: "edit", server_name: "fr.wikipedia.org" };
const latest = () => FakeEventSource.instances[FakeEventSource.instances.length - 1];

beforeEach(() => {
  vi.useFakeTimers();
  FakeEventSource.instances = [];
  vi.stubGlobal("EventSource", FakeEventSource);
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("useWikiPulse", () => {
  it("stays idle and opens no connection while disabled", () => {
    const { result } = renderHook(() => useWikiPulse(false));
    expect(result.current.status).toBe("idle");
    expect(FakeEventSource.instances).toHaveLength(0);
  });

  it("counts Wikipedia edits per second and goes live once there is a line to draw", () => {
    const { result } = renderHook(() => useWikiPulse(true));
    expect(result.current.status).toBe("connecting");
    expect(latest().url).toContain("stream.wikimedia.org");

    act(() => {
      latest().emit(wikiEdit);
      latest().emit(wikiEdit);
      latest().emit({ type: "edit", server_name: "www.wikidata.org" });
      latest().emitRaw("not json");
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      latest().emit(wikiEdit);
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.series).toEqual([2, 1]);
    expect(result.current.status).toBe("live");
    expect(result.current.perMinute).toBe(90);
  });

  it("closes the stream when disabled or unmounted", () => {
    const { rerender, unmount } = renderHook(({ on }) => useWikiPulse(on), { initialProps: { on: true } });
    const first = latest();
    rerender({ on: false });
    expect(first.closed).toBe(true);

    rerender({ on: true });
    unmount();
    expect(latest().closed).toBe(true);
  });

  it("gives up when the stream stalls", () => {
    const { result } = renderHook(() => useWikiPulse(true));
    act(() => {
      vi.advanceTimersByTime(11_000);
    });
    expect(result.current.status).toBe("error");
    expect(latest().closed).toBe(true);
  });

  it("reports an error when the browser has no EventSource", () => {
    vi.stubGlobal("EventSource", undefined);
    const { result } = renderHook(() => useWikiPulse(true));
    expect(result.current.status).toBe("error");
  });
});
