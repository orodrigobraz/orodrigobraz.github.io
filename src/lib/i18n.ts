import { createContext, useContext } from "react";

export type Lang = "pt" | "en";

export const LangContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: "pt", toggle: () => {} });

export const useLang = () => useContext(LangContext);

export type T = { pt: string; en: string };
export const t = (val: T, lang: Lang) => val[lang];
