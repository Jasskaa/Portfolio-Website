import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

export const SUPPORTED_LANGS = ["es", "en", "de"];

function getInitialLanguage() {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem("lang");
  if (SUPPORTED_LANGS.includes(stored)) return stored;
  const browserLang = window.navigator.language?.slice(0, 2);
  return SUPPORTED_LANGS.includes(browserLang) ? browserLang : "es";
}

// Small helper to walk a dotted path like "hero.title1" against the dict.
function resolve(dict, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), dict);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  const setLanguage = useCallback((next) => {
    setLang(next);
    try {
      window.localStorage.setItem("lang", next);
    } catch {
      // localStorage unavailable — non-fatal
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const next = SUPPORTED_LANGS[(SUPPORTED_LANGS.indexOf(lang) + 1) % SUPPORTED_LANGS.length];
    setLanguage(next);
  }, [lang, setLanguage]);

  const t = useCallback(
    (path) => {
      const value = resolve(translations[lang], path);
      if (value === undefined) return path;
      return value;
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLanguage, toggleLanguage, t }),
    [lang, setLanguage, toggleLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
