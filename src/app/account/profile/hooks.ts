import { AuthContext, type Address, type ProfileProps } from "@/app/context";
import { getMonthAndYear } from "@/utils/helpers";
import { type DocumentData } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

export const useUserProfile = () => {
  const userProfile = useContext(AuthContext)?.profile;
  const [profile, setProfile] = useState<DocumentData>({} as ProfileProps);
  const [joinDate, setJoinDate] = useState("");
  const [address, setAddress] = useState<Address | undefined>();

  useEffect(() => {
    if (userProfile) {
      setProfile(profile);
      const { month, year } = getMonthAndYear(
        (profile.createdAt as number) ?? new Date().getTime(),
      );
      setJoinDate(`Joined ${month} ${year}`);
      setAddress(profile.address as Address);
    }
  }, [userProfile, profile]);

  return { profile, joinDate, address };
};
