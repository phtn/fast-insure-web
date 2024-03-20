import { useCallback, useState } from "react";
import { type UserAccountType } from "./login";

export type UserSigninType = "SIGNIN" | "SIGNUP";

export const useAccountTypes = () => {
  const [accountType, setAccount] = useState<UserAccountType>("PERSONAL");
  const [signinType, setSignin] = useState<UserSigninType>("SIGNIN");

  const setAccountType = useCallback(
    (type: UserAccountType) => {
      if (type !== accountType) {
        setAccount((prev) => (prev === "PERSONAL" ? "AFFILIATE" : "PERSONAL"));
      }
    },
    [accountType],
  );

  const setSigninType = useCallback(
    (type: UserSigninType) => {
      if (type !== signinType) {
        setSignin((prev) => (prev === "SIGNIN" ? "SIGNUP" : "SIGNIN"));
      }
    },
    [signinType],
  );

  return { accountType, setAccountType, signinType, setSigninType };
};
