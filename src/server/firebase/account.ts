import { db } from "@/libs/db";
import type {
  CountUpdateSchema,
  NewUserPayload,
  NewUserPayloadFromGoogle,
  UpdateUserProfileSchema,
  UserProfileSchema,
} from "@resource/account";
import { type FirebaseError } from "firebase/app";
import { doc, increment, setDoc, updateDoc } from "firebase/firestore";

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
      branchCode: "XX",
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
      phoneNumber: null,
      photoURL: null,
      setupComplete: false,
      setupProgress: 0,
      draftCount: 0,
      submittedCount: 0,
      completedCount: 0,
      fastPoints: 0,
      createdAt: new Date(datestring).toISOString(),
      updatedAt: new Date(datestring).toISOString(),
      lastLogin: new Date(datestring).toISOString(),
      recentActivities: [{}],
    };
    await setDoc(doc(db, usersPath, userId), data).then(Ok, Err);
  } else {
    return "Unable to read payload.";
  }
};

export const createUserAccountFromGoogle = async (
  user: NewUserPayloadFromGoogle,
) => {
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
      branchCode: "XX",
      displayName: user.displayName,
      existing: true,
      userData: {
        id: userId,
        firstName: null,
        middleName: null,
        lastName: null,
        email,
        phone: user.phoneNumber,
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
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      setupComplete: false,
      setupProgress: 0,
      createdAt: new Date(datestring).toISOString(),
      updatedAt: new Date(datestring).toISOString(),
      lastLogin: new Date(datestring).toISOString(),
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

export const countUpdate = async (params: CountUpdateSchema) => {
  const usersPath = String(process.env.NEXT_PUBLIC_LIVE_USERS);
  const { fieldName, incrementBy, userId } = params;
  if (!userId) return;

  const docRef = doc(db, `${usersPath}/${userId}`);
  const datestring = new Date().getTime();

  const updatedData = {
    [fieldName]: increment(incrementBy),
  } as Pick<
    UserProfileSchema,
    "draftCount" | "submittedCount" | "completedCount" | "fastPoints"
  >;

  await updateDoc(docRef, {
    ...updatedData,
    updatedAt: new Date(datestring).toISOString(),
  });
};
