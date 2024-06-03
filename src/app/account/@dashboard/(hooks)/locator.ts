import { useCallback, useMemo, useState } from "react";
import usePH, { type PlaceProps } from "use-postal-ph";

export const useLocator = () => {
  const ph = usePH();
  const [locations, setLocations] = useState<
    PlaceProps[] | string[] | undefined
  >();
  const [location, setLocation] = useState<PlaceProps | undefined>();

  const locationValues = useMemo(
    () => ({
      state: location?.region,
      city: location?.location,
      line2: location?.municipality,
    }),
    [location],
  );

  const getLocation = useCallback(
    (postalCode: string) => {
      if (!postalCode) return;
      console.log(postalCode);

      const results = ph.fetchDataLists({ post_code: +postalCode, limit: 10 });
      if (results?.count === 1) {
        setLocation(results?.data[0]);
      }
      setLocations(results?.data);
    },
    [ph],
  );

  return { getLocation, location, locations, locationValues };
};
