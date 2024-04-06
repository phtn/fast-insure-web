import { type Auth } from "firebase/auth";

/**
 * @name checkAuth
 * @description A hook that returns auth state
 * @location lib/checkAuth.ts
 */
export const checkAuth = (auth: Auth) => {
  const currentUser = () => auth.currentUser;
  return !!currentUser()?.uid ? true : false;
};
