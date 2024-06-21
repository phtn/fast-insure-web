import { db } from "@/libs/db";
import type {
  NewUserPayload,
  UpdateUserProfileSchema,
  UserProfileSchema,
} from "@resource/account";
import { type FirebaseError } from "firebase/app";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const createUserAccount = async (user: NewUserPayload) => {
  const usersPath = String(process.env.NEXT_PUBLIC_LIVE_USERS);
  const Err = (err: FirebaseError) => {
    return [0, err.code];
  };
  const Ok = () => {
    return [1, "success"];
  };

  if (user) {
    const { email, userId, accountType } = user;
    const datestring = new Date().getTime();
    const data: UserProfileSchema = {
      userId,
      email,
      accountType,
      agentCode: "",
      branchCode: "X0000X",
      displayName: "",
      userData: {
        id: userId,
        firstName: null,
        middleName: null,
        lastName: null,
        email,
        phone: null,
        address: {
          line1: null,
          line2: null,
          city: null,
          state: null,
          country: null,
          postalCode: null,
        },
        updatedAt: new Date(datestring).toISOString(),
      },
      isVerified: false,
      setupComplete: false,
      setupProgress: 0,
      createdAt: new Date(datestring).toISOString(),
      updatedAt: new Date(datestring).toISOString(),
    };
    await setDoc(doc(db, usersPath, userId), data).then(Ok, Err);
  } else {
    return "Unable to read payload.";
  }
};

export const updateUserProfile = async (params: UpdateUserProfileSchema) => {
  const usersPath = String(process.env.NEXT_PUBLIC_LIVE_USERS);

  if (!params.userId) return;

  const docRef = doc(db, `${usersPath}/${params.userId}`);
  const datestring = new Date().getTime();
  await updateDoc(docRef, {
    ...params.payload,
    updatedAt: new Date(datestring).toISOString(),
  });
};
