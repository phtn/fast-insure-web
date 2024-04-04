import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(ui)/select";
import { db } from "@/libs/db";
import { onError } from "@/utils/toast";
import { collection } from "firebase/firestore";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export type PartnerData = {
  code: string;
  linkedId: string;
  name: string;
};

type SelectGroupProps = {
  setGroup: Dispatch<SetStateAction<string | null>>;
};

/**
 * @name SelectGroup
 * @description A component that allows users to select a group
 */
export const SelectGroup = ({ setGroup }: SelectGroupProps) => {
  const [value, loading, error] = useCollection(collection(db, "partners"));

  if (error) {
    onError("Unable to load groups at this time.", error.message);
  }

  const renderItem = useCallback(() => {
    if (value) {
      return value.docs.map((doc) => {
        const data = doc.data() as PartnerData;
        return (
          <SelectItem key={doc.id} value={data.linkedId} className="text-prime">
            {data.name}
          </SelectItem>
        );
      });
    }
  }, [value]);

  return (
    <Select onValueChange={setGroup}>
      <SelectTrigger className="h-[33px] w-fit text-sm text-coal">
        <SelectValue
          placeholder={loading ? "Loading..." : "Select Group"}
          className="bg-prime pr-3 text-sm tracking-wider text-coal"
        />
      </SelectTrigger>
      <SelectContent>{renderItem()}</SelectContent>
    </Select>
  );
};
