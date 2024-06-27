"use client";

import type { LoginSchema } from "@/server/resource/account";
import { LoginResource } from "@/server/resource/account";
import { onError, onInfo, onPromise, onSuccess } from "@/utils/toast";
import { Form } from "@@ui/form";
import { auth } from "@@libs/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FirebaseError } from "firebase/app";
import { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useProfile } from "./hooks";
import { ActiveForm } from "./login-form";
import { loginDefaults } from "./schema";
import { type LoginProps } from "./types";
import { useRouter } from "next/navigation";

export const Login = ({ signinType }: LoginProps) => {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginResource),
    defaultValues: loginDefaults,
  });

  const [
    createUserWithEmailAndPassword,
    userCreate,
    createUserLoading,
    createUserError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword, user, signInLoading, error] =
    useSignInWithEmailAndPassword(auth);

  const { handleCreateAccount } = useProfile();

  const Err = (err: Error) => onError(err.name, err.message);

  useEffect(() => {
    loginErrorHandler(error);
    loginErrorHandler(createUserError);
  }, [error, createUserError]);

  const loginType = signinType === "SIGNIN";

  const handleSignin = (email: string, password: string) => {
    const signinPromise = new Promise((resolve) => {
      return resolve(
        signInWithEmailAndPassword(email, password)
          .then((creds) => {
            if (creds) {
              return creds;
            } else {
              onError("Error", "Unable to sign in.");
              if (user) {
              }
            }
          })
          .catch(Err),
      );
    });
    onPromise(
      signinPromise,
      "Signing in...",
      "signin",
      "Sign in successful!",
      error,
    );

    router.push("/account/overview");
  };

  const handleCreateUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(email, password)
      .then((creds) => {
        if (creds) {
          handleCreateAccount({
            userId: creds.user.uid,
            email: creds.user.email!,
            accountType: "AGENT2",
          })
            .then(() => {
              onSuccess("Account created.", userCreate?.user?.email ?? "");
            })
            .then(() => {
              onInfo("Logging in...", userCreate?.user?.email ?? email);
              handleSignin(email, password);
            })
            .catch(Err);
        }
      })
      .catch(Err);
  };

  const onSubmit = (values: LoginSchema) => {
    const { email, password } = values;
    if (loginType) {
      handleSignin(email, password);
    } else {
      handleCreateUser(email, password);
    }
  };

  return (
    <Form {...form}>
      <ActiveForm
        signinType={signinType}
        form={form}
        loading={
          !!signInLoading
            ? signInLoading
            : !!createUserLoading
              ? createUserLoading
              : false
        }
        onSubmit={onSubmit}
      />
    </Form>
  );
};

const loginErrorHandler = (error: FirebaseError | undefined) => {
  if (error) {
    if (error.code.includes("invalid-credential")) {
      return onError("Unable to login.", "Invalid Credentials");
    }
    onError("error", error.code);
  }
};
