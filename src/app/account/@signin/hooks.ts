import type {
  NewUserPayload,
  UpdateUserProfileSchema,
} from "@/server/resource/account";
import { createNewUser, updateUserProfile } from "@/trpc/account/user-profile";
import { useCallback, useState } from "react";

export const useProfile = () => {
  const handleCreateAccount = async (params: NewUserPayload) => {
    await createNewUser(params);
  };

  const handleUpdateProfile = async (params: UpdateUserProfileSchema) => {
    await updateUserProfile(params);
  };

  return { handleCreateAccount, handleUpdateProfile };
};

export type UserSigninType = "SIGNIN" | "SIGNUP";

export const useAccountTypes = () => {
  const [signinType, setSignin] = useState<UserSigninType>("SIGNIN");

  const setSigninType = useCallback(
    (type: UserSigninType) => {
      if (type !== signinType) {
        setSignin((prev) => (prev === "SIGNIN" ? "SIGNUP" : "SIGNIN"));
      }
    },
    [signinType],
  );

  return { signinType, setSigninType };
};
