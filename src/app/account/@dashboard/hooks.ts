import { AuthContext } from "@/app/(context)/context";
import { type AccountTypeSchema } from "@/server/resource/account";
import { useContext, useEffect, useState } from "react";

export const useConnect = () => {
  const profile = useContext(AuthContext)?.profile;
  const userId = profile?.userId ?? "";

  const [userCode, setUserCode] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [linkedId, setLinkedId] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<
    AccountTypeSchema | undefined
  >();

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

  useEffect(() => {
    if (profile?.accountType) {
      setAccountType(profile.accountType);
    }
  }, [profile?.accountType]);

  return { profile, userCode, setGroup, linkedId, accountType };
};
