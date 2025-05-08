"use client";

import { Coordinates, MapLanguages, NaverMap } from "@/app/types/map";
import { useCallback, useEffect, useRef } from "react";
import useGeolocation from "../hooks/useGeolocation";

const mapId = "naver-map";
const DEFAULT_LOC_GANGNAM_STATION: Coordinates = [127.028, 37.498];
const markers: naver.maps.Marker[] = [];

/* 
  1. 현재 위도/경도를 이용해 현재 어떤 자치행정구역인지 알아낸다.
  2. 해당 자치행정구역의 흡연구역 정보를 로딩한다.
*/

export default function Map({
  language = "ko",
}: {
  language?: keyof MapLanguages;
}) {
  const mapRef = useRef<NaverMap>(undefined);

  const generateMarkers = useCallback(() => {
    new naver.maps.Marker({
      position: new naver.maps.LatLng([127.0513664, 37.7421824]),
      map: mapRef.current,
      /*       icon: {
        url: "",
        size: new naver.maps.Size(43, 43),
        scaledSize: new naver.maps.Size(43, 43),
      },
      zIndex: 999, */
    });
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
    const map = new naver.maps.Map(mapId, mapOptions);
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
      <div id={mapId} className="w-screen h-screen" />
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
