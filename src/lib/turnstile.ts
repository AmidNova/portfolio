// Cloudflare Turnstile, loaded only on the page that needs it (/contact).
// Explicit rendering: the widget is created when the form mounts and removed after.
import { useEffect, useRef, useState, type RefObject } from "react";

// Public by design: Turnstile site keys ship in the page. The secret lives in the Lambda.
export const TURNSTILE_SITE_KEY = "0x4AAAAAAFQrFOp4SpXAHfQc";
const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface RenderOptions {
  sitekey: string;
  language: string;
  theme: "light" | "dark";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
}

export interface TurnstileApi {
  render: (el: HTMLElement, options: RenderOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("no turnstile")));
    script.onerror = () => {
      loading = null; // let a later mount try again
      reject(new Error("turnstile script failed"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

/** Renders the widget into `ref`; `token` is "" until the visitor passes the check. */
export function useTurnstile(ref: RefObject<HTMLElement | null>, language: string, dark: boolean) {
  const [token, setToken] = useState("");
  const [failed, setFailed] = useState(false);
  const widget = useRef<{ api: TurnstileApi; id: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !ref.current) return;
        const id = api.render(ref.current, {
          sitekey: TURNSTILE_SITE_KEY,
          language,
          theme: dark ? "dark" : "light",
          callback: (t) => setToken(t),
          "expired-callback": () => setToken(""),
          "error-callback": () => setFailed(true),
        });
        widget.current = { api, id };
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
      if (widget.current) widget.current.api.remove(widget.current.id);
      widget.current = null;
      setToken("");
    };
  }, [ref, language, dark]);

  /** A token is single-use: after each submission, ask for a fresh one. */
  const reset = () => {
    setToken("");
    if (widget.current) widget.current.api.reset(widget.current.id);
  };

  return { token, failed, reset };
}
