"use client";

import { Coordinates, MapLanguages, NaverMap } from "@/types/map";
import { useCallback, useEffect, useRef } from "react";
import useGeolocation from "../../hooks/useGeolocation";
import smokeZoneDummyData from "../../constant/smokeZoneData";

const MAP_ID = "naver-map";
const DEFAULT_LOC_GANGNAM_STATION: Coordinates = [127.028, 37.498];
const markers: naver.maps.Marker[] = [];

/* 
  현재 위치 반경 흡연구역만 로드?
*/

export default function Map({
  language = "ko",
}: {
  language?: keyof MapLanguages;
}) {
  const mapRef = useRef<NaverMap>(undefined);

  const generateMarkers = useCallback(() => {
    smokeZoneDummyData.forEach(({ latitude, longitude }) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng([longitude, latitude]),
        map: mapRef.current,
        /*       icon: {
          url: "",
          size: new naver.maps.Size(43, 43),
          scaledSize: new naver.maps.Size(43, 43),
        },
        zIndex: 999, */
      });
    });

    console.log("generateMarkers 실행됨");
  }, [language]);

  const { location, updateLocation } = useGeolocation({
    onError: () => alert("위치 정보 얻어오기 실패!"),
    onUpdateLocation: (position) => {
      if (!mapRef.current) {
        return;
      }

      /* 
        사용자 현재 위치 갱신시 지도 중심 갱신
      */
      mapRef.current.setCenter(
        new naver.maps.LatLng([
          position.coords.longitude,
          position.coords.latitude,
        ])
      );
    },
  });

  const initializeMap = useCallback(() => {
    const mapOptions = {
      zoom: 17,
      scaleControl: true,
      mapDataControl: true,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };
    const map = new naver.maps.Map(MAP_ID, mapOptions);
    mapRef.current = map;
  }, [location, language]);

  const removeMap = () => {
    const currentMapScript = document.querySelector(
      'script[src^="https://openapi.map.naver.com/openapi/v3/maps.js"]'
    );
    currentMapScript?.remove();

    mapRef.current?.destroy();
    mapRef.current = undefined;

    delete (window as any).naver;
  };

  const addMap = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&language=${language}`;
    document.body.appendChild(script);
    script.onload = () => {
      console.log("naver map script loaded");
      initializeMap();
      generateMarkers();
    };
  };

  useEffect(() => {
    if (mapRef.current) {
      removeMap();
    }

    addMap();
  }, [language]);

  return (
    <>
      <div id={MAP_ID} className="w-screen h-screen" />
      <button
        disabled={location.isLoading}
        className={`absolute flex items-center justify-center top-2 right-2 border text-3xl leading-none  bg-white text-black rounded-full border-black size-8
          ${
            location.isLoading
              ? "opacity-60 cursor-not-allowed animate-spin"
              : ""
          }
          `}
        onClick={updateLocation}
      >
        + {/* 현재 위치 업데이트 버튼 */}
      </button>
    </>
  );
}
