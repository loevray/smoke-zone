import { useEffect, useState } from "react";
import { Coordinates } from "../types/map";

interface I_UseGeolocation {
  onUpdateLocation?: (location: GeolocationPosition) => void;
  onError?: (error: GeolocationPositionError) => void;
  defaultLocation: Coordinates;
}

export default function ({
  onUpdateLocation,
  onError,
  defaultLocation,
}: I_UseGeolocation) {
  const [location, setLocation] = useState<Coordinates>(defaultLocation);

  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation([position.coords.longitude, position.coords.latitude]);
      onUpdateLocation?.(position);
    }, onError);
  };

  useEffect(() => {
    updateLocation();
  }, []);

  return { updateLocation, location };
}
