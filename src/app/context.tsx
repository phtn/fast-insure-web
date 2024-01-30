"use client";

import { auth } from "@@libs/db";
import { type User } from "firebase/auth";
import { createContext, type ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export type AuthType = {
  user: User | null | undefined;
  loading: boolean
  configs: Record<string, string | number | boolean>[];
};

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: {
  children: ReactNode;
}) => {
  const [user, loading] = useAuthState(auth);

  return (
    <AuthContext.Provider value={{ user, loading, configs: [] }}>
      {children}
    </AuthContext.Provider>
  );
};
