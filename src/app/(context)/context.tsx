"use client";

import { type UserProfileSchema } from "@/server/resource/account";
import { auth, db } from "@@libs/db";
import { type User } from "firebase/auth";
import { doc } from "firebase/firestore";
import { createContext, useState, type ReactNode, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";

export type AuthType = {
  user: User | null | undefined;
  profile: UserProfileSchema | undefined;
  loading: boolean;
  configs: Record<string, string | number | boolean>[];
};

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const [userId, setUserId] = useState<string | undefined>();
  const [profile, setProfile] = useState<UserProfileSchema | undefined>();

  const userRef = doc(db, `users`, `${userId}`);
  const [snapshot] = useDocumentData(userRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (user?.uid) {
      setUserId(user.uid);
      if (snapshot) {
        setProfile(snapshot as UserProfileSchema);
      }
    }
  }, [user?.uid, snapshot]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, configs: [] }}>
      {children}
    </AuthContext.Provider>
  );
};
