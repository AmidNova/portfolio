import { useEffect, useState } from "react";
import { LangContext, type Lang } from "../hooks/useLang";
import { frenchSpacing, mapStrings } from "../lib/typography";
import en from "../locales/en";
import fr from "../locales/fr";

// French copy gets its no-break spaces once, at load, so the locale file stays readable.
const translations = { en, fr: mapStrings(fr, frenchSpacing) };

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "fr") return saved;
    // First visit: English browsers get English, everyone else French.
    return navigator.language?.toLowerCase().startsWith("en") ? "en" : "fr";
  });

  const [dark, setDark] = useState(() => {
    // Dark is the default look; only an explicit choice of light turns it off.
    return localStorage.getItem("dark") !== "false";
  });

  // The body class and the saved choice follow the state (index.html applies it before first paint).
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("dark", String(dark));
  }, [dark]);

  // Keep <html lang> in sync with current language for a11y and SEO
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const toggleDark = () => setDark((d) => !d);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang], dark, toggleDark }}>
      {children}
    </LangContext.Provider>
  );
}
