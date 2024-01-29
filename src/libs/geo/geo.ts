import { useEffect, useState } from "react";
import { type Coordinates } from "./types";

export const getCoords = async () => {
  return navigator?.geolocation?.getCurrentPosition((position) => position);
};

export const useGeolocator = async () => {
  const [coords, setCoords] = useState<Coordinates>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => setCoords(coords));
  }, []);

  return { coords };
};
