"use client";
import { useLang } from "./LangProvider";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <button
        onClick={() => setLang("fr")}
        className={`px-2 py-1 rounded-full ${lang === "fr" ? "border" : "opacity-60 hover:opacity-100"}`}
      >
        FR
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded-full ${lang === "en" ? "border" : "opacity-60 hover:opacity-100"}`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("es")}
        className={`px-2 py-1 rounded-full ${lang === "es" ? "border" : "opacity-60 hover:opacity-100"}`}
      >
        ES
      </button>
    </div>
  );
}
