import type { IDMRequestFormSchema } from "@/server/resource/request";
import { useEffect } from "react";
import type { UseFormReset } from "react-hook-form";
import usePH, { type PlaceProps } from "use-postal-ph";

type LocatorHookParams = {
  reset: UseFormReset<IDMRequestFormSchema>;
  postalField: string | undefined;
};
export const useLocator = (params: LocatorHookParams) => {
  const { reset, postalField } = params;

  const ph = usePH();

  useEffect(() => {
    if (postalField && postalField.length >= 4) {
      const results = ph.fetchDataLists({
        post_code: +postalField,
        limit: 10,
      });
      // console.log(results?.data);
      // if (results?.count === 1) {
      //   const locationValues = assignLocationValues(results?.data[0]);
      //   reset(assignLocationValues(results?.data[0]));
      // }
      reset(assignLocationValues(results?.data[0]));
    }
  }, [ph, postalField, reset]);
};

const assignLocationValues = (data: PlaceProps | undefined) => ({
  city: data?.location,
  line2: data?.municipality,
  state: data?.region,
});
