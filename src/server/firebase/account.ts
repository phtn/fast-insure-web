import { db } from "@/libs/db";
import { type NewUserPayload } from "@resource/account";
import { type FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";

export const createUserAccount = async (user: NewUserPayload) => {
  const Err = (err: FirebaseError) => {
    return [0, err.code];
  };
  const Ok = () => {
    return [1, "success"];
  };

  if (user) {
    const { email, userId, accountType } = user;
    const datestring = new Date().getTime();
    await setDoc(doc(db, "users", userId), {
      userId,
      email,
      accountType,
      displayName: null,
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
      branchCode: "0000",
      createdAt: new Date(datestring).toISOString(),
      updatedAt: new Date(datestring).toISOString(),
    }).then(Ok, Err);
  } else {
    return "Unable to read payload.";
  }
};
