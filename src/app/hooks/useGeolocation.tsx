import { useState } from "react";
import { Coordinates } from "../types/map";

interface I_UseGeolocation {
  onUpdateLocation?: (location: GeolocationPosition) => void;
  onError?: (error: GeolocationPositionError) => void;
}

type LocationType = {
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
};

export default function ({ onUpdateLocation, onError }: I_UseGeolocation) {
  const [location, setLocation] = useState<LocationType>({
    latitude: null,
    longitude: null,
    isLoading: false,
  });

  const updateLocation = () => {
    setLocation((prev) => ({
      ...prev,
      isLoading: true,
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isLoading: false,
        }));
        onUpdateLocation?.(position);
      },
      onError,
      {
        enableHighAccuracy: true,
      }
    );
  };

  return { updateLocation, location };
}
