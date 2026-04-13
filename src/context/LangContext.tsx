import { createContext, useContext, useEffect, useState } from "react";
import en from "../locales/en";
import fr from "../locales/fr";

type Lang = "en" | "fr";

const translations = { en, fr };

type Translations = typeof en;

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  dark: boolean;
  toggleDark: () => void;
}>({
  lang: "en",
  setLang: () => {},
  t: en,
  dark: false,
  toggleDark: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return saved === "en" || saved === "fr" ? saved : "en";
  });

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("dark") === "true";
  });

  // Apply dark class on mount
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.body.classList.toggle("dark", next);
      localStorage.setItem("dark", String(next));
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang], dark, toggleDark }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
