"use client";

import { type AccountType } from "@/server/resource/account";
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
import { type z } from "zod";
import { type UserSigninType } from "./hooks";
import { ActiveForm } from "./login-form";
import { loginDefaults, loginSchema, type LoginSchema } from "./schema";
import { createUser } from "./serverOnly";

export type UserAccountType = z.infer<typeof AccountType>;

export type LoginProps = {
  signinType: UserSigninType;
  accountType: UserAccountType;
};

export const Login = ({ signinType, accountType }: LoginProps) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
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
  };

  const handleCreateUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(email, password)
      .then((creds) => {
        if (creds) {
          createUser({
            userId: creds.user.uid,
            email: creds.user.email!,
            accountType,
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
        loading={signInLoading || createUserLoading}
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
