import { createContext, useContext } from "react";
import en from "../locales/en";

export type Lang = "en" | "fr";

export type Translations = typeof en;

export interface LangValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  dark: boolean;
  toggleDark: () => void;
}

/** Filled by LangProvider (src/context/LangContext.tsx); kept here so that file only exports a component. */
export const LangContext = createContext<LangValue>({
  lang: "en",
  setLang: () => {},
  t: en,
  dark: false,
  toggleDark: () => {},
});

export function useLang(): LangValue {
  return useContext(LangContext);
}
