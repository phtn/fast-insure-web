import { AuthContext } from "@/app/(context)/context";
import type {
  LoginTypeSchema,
  NewUserPayload,
  NewUserPayloadFromGoogle,
  UpdateUserProfileSchema,
} from "@/server/resource/account";
import { auth } from "@@libs/db";
import {
  type UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  createNewUser,
  createNewUserFromGoogle,
  updateUserProfile,
} from "@/trpc/account/user-profile";
import { errHandler } from "@/utils/helpers";
import { useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";

export const useProfile = () => {
  const handleCreateAccount = async (params: NewUserPayload) => {
    await createNewUser(params);
  };

  const handleUpdateProfile = async (params: UpdateUserProfileSchema) => {
    await updateUserProfile(params);
  };

  return { handleCreateAccount, handleUpdateProfile };
};

export const useAccountTypes = () => {
  const [loginType, setLoginType] = useState<LoginTypeSchema>("SIGNIN");

  const set = useCallback(
    (type: LoginTypeSchema) => {
      if (type !== loginType) {
        setLoginType((prev) => (prev === "SIGNIN" ? "SIGNUP" : "SIGNIN"));
      }
    },
    [loginType],
  );

  return { loginType, set };
};

export const useGoogleSignin = () => {
  const provider = new GoogleAuthProvider();

  const router = useRouter();

  const profile = useContext(AuthContext)?.profile;

  const handleSigninWithGoogle = () => {
    const datetime = new Date().getTime();
    signInWithPopup(auth, provider)
      .then((creds) => {
        if (!profile?.existing) {
          const payload = generateGooglePayload(creds);
          createNewUserFromGoogle(payload!).then().catch(errHandler);
        } else {
          updateUserProfile({
            userId: profile?.userId,
            payload: { lastLogin: new Date(datetime).toISOString() },
          })
            .then()
            .catch(errHandler);
        }
        router.push("/account/overview");
      })
      .catch((e) => console.log(e));
  };

  return { handleSigninWithGoogle };
};

const generateGooglePayload = (creds: UserCredential | null) => {
  if (!creds) return;
  const user = creds.user;
  const payload: NewUserPayloadFromGoogle = {
    accountType: "AGENT2",
    displayName: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    userId: user.uid,
  };
  return payload;
};
