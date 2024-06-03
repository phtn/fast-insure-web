import { AuthContext } from "@/app/(context)/context";
import { useContext } from "react";

export const useProfile = () => {
  const profile = useContext(AuthContext)?.profile;
  return { profile };
};
