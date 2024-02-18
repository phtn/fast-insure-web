"use client";

import { type AccountType } from "@/server/resource/account";
import { onError, onSuccess } from "@/utils/toast";
import { Form } from "@@components/form";
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
import { ActiveForm } from "./login-form";
import { loginDefaults, loginSchema, type LoginSchema } from "./schema";
import { createUser } from "./serverOnly";

export type UserType = z.infer<typeof AccountType>;

type LoginProps = {
  action: string;
  newAccount: boolean;
  accountType: UserType;
};

export const Login = ({ action, newAccount, accountType }: LoginProps) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaults,
  });

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const Err = (err: Error) => onError(err.name, err.message);

  useEffect(() => {
    loginErrorHandler(error);
  }, [error]);

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
              onSuccess(
                "Account created.",
                user?.providerId ?? creds.user.providerId,
              );
            })
            .catch(Err);
        }
      })
      .catch(Err);
  };

  const handleSignin = (email: string, password: string) => {
    signInWithEmailAndPassword(email, password)
      .then((creds) => {
        if (creds) {
          onSuccess("Login succcessful.");
        }
      })
      .catch(Err);
  };

  const onSubmit = (values: LoginSchema) => {
    const { email, password } = values;
    if (newAccount) {
      handleCreateUser(email, password);
    } else {
      console.log("Signing in...");
      handleSignin(email, password);
    }
  };

  return (
    <Form {...form}>
      <ActiveForm
        action={action}
        form={form}
        loading={loading}
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
