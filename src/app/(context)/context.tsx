"use client";

import { type UserProfileSchema } from "@/server/resource/account";
import { auth, db } from "@@libs/db";
import { type User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { createContext, type ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { type Options } from "react-firebase-hooks/firestore/dist/firestore/types";

export type AuthType = {
  user: User | null | undefined;
  profile: UserProfileSchema | undefined;
  loading: boolean;
  configs: Record<string, string | number | boolean>[];
};

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const userRef = doc(db, `users`, `${user?.uid}`);
  const [snapshot] = useDocument(userRef, options);

  const profile = snapshot?.data() as UserProfileSchema;

  return (
    <AuthContext.Provider value={{ user, profile, loading, configs: [] }}>
      {children}
    </AuthContext.Provider>
  );
};

const options: Options = {
  snapshotListenOptions: { includeMetadataChanges: true },
};
