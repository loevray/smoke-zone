"use client";
import { ChangeEvent, useState } from "react";
import Map from "./_map/map";
import { MapLanguages } from "../types/map";
import { mappedLanguage } from "../constant/map";

export default function Home() {
  const [language, setLanguage] = useState<keyof MapLanguages>("ko");

  const handleLanguageChange = (lang: keyof MapLanguages) => {
    console.log(lang);
    setLanguage(lang);
  };

  return (
    <div className="w-screen h-screen">
      <select
        className="absolute top-2 left-2 z-10 h-8 w-xl border border-black"
        value={language}
        name="mapLanguages"
        onChange={(
          e: ChangeEvent<HTMLSelectElement> & {
            target: { value: keyof MapLanguages };
          }
        ) => handleLanguageChange(e.target.value)}
      >
        {Object.entries(mappedLanguage).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <Map language={language} />
    </div>
  );
}
