import type { Dispatch, SetStateAction } from "react";

export type SetProps = {
  setCoverage: Dispatch<SetStateAction<number>>;
};
