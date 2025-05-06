"use client";
import { ChangeEvent, useState } from "react";
import Map from "./_map/map";
import { MapLanguages } from "./types/map";

export default function Home() {
  const [language, setLanguage] = useState<MapLanguages>("ko");

  const handleLanguageChange = (lang: MapLanguages) => {
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
            target: { value: MapLanguages };
          }
        ) => handleLanguageChange(e.target.value)}
      >
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
        <option value="zh">Deutsch</option>
      </select>
      <Map language={language} />
    </div>
  );
}
