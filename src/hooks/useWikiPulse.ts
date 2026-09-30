import { useEffect, useState } from "react";
import { isWikipediaEdit, pushSample, ratePerMinute } from "../lib/pulse";

const STREAM_URL = "https://stream.wikimedia.org/v2/stream/recentchange";
const TICK_MS = 1000;
/** No event for this long means the stream is dead, not just quiet (it carries ~50 events/s). */
const STALL_MS = 10_000;

export type PulseStatus = "idle" | "connecting" | "live" | "error";

export interface WikiPulse {
  status: PulseStatus;
  /** Wikipedia edits per second, oldest first. */
  series: number[];
  perMinute: number;
}

/**
 * Live Wikipedia edit rate from the public Wikimedia event stream.
 * Connects only while `enabled`; gives up for the session if the stream fails or stalls.
 */
export function useWikiPulse(enabled: boolean): WikiPulse {
  const [series, setSeries] = useState<number[]>([]);
  const [failed, setFailed] = useState(false);
  const supported = typeof EventSource !== "undefined";

  useEffect(() => {
    if (!enabled || !supported || failed) return;

    const source = new EventSource(STREAM_URL);
    let count = 0;
    let receiving = false;
    let fresh = true;
    let lastMessageAt = Date.now();

    source.onmessage = (event: MessageEvent<string>) => {
      lastMessageAt = Date.now();
      receiving = true;
      try {
        if (isWikipediaEdit(JSON.parse(event.data))) count += 1;
      } catch {
        // A malformed event is dropped on purpose: one bad line must not stop the pulse.
      }
    };

    const fail = () => {
      clearInterval(timer);
      source.close();
      setFailed(true);
    };
    source.onerror = () => {
      // EventSource retries transient errors itself; CLOSED means it gave up.
      if (source.readyState === EventSource.CLOSED) fail();
    };

    const timer = setInterval(() => {
      if (Date.now() - lastMessageAt > STALL_MS) {
        fail();
        return;
      }
      if (!receiving) return;
      const sample = count;
      const reset = fresh;
      count = 0;
      fresh = false;
      // A new connection starts a new line rather than joining across the gap.
      setSeries((prev) => (reset ? [sample] : pushSample(prev, sample)));
    }, TICK_MS);

    return () => {
      clearInterval(timer);
      source.close();
    };
  }, [enabled, supported, failed]);

  let status: PulseStatus = "idle";
  if (!supported || failed) status = "error";
  else if (series.length >= 2) status = "live";
  else if (enabled) status = "connecting";

  return { status, series, perMinute: ratePerMinute(series) };
}
