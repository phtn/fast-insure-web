import { AuthContext, type ProfileProps } from "@/app/(context)/context";
import { useCallback, useContext, useEffect, useState } from "react";

export const useConnect = () => {
  const profile = useContext(AuthContext)?.profile as ProfileProps;
  const userId = profile?.userId ?? "";

  const [userCode, setUserCode] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [linkedId, setLinkedId] = useState<string | null>(null);

  useEffect(() => {
    if (group) {
      setLinkedId(group);
    }
  }, [group]);

  useEffect(() => {
    if (userId) {
      setUserCode(userId.slice(-5) ?? "");
    }
  }, [userId]);

  const getAccoutType = useCallback(() => {
    if (profile) {
      return profile.accountType;
    }
  }, [profile]);

  return { userCode, setGroup, linkedId, getAccoutType };
};
