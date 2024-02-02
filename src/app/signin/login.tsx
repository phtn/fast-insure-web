'use client'

import { type AccountType } from "@/server/resource/account";
import { onError, onSuccess } from "@/utils/toast";
import {
  Form,
} from "@@components/form";
import { auth } from "@@libs/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  useForm,
} from "react-hook-form";
import { type z } from "zod";
import { ActiveForm } from "./login-form";
import {
  loginDefaults,
  loginSchema,
  type LoginSchema,
} from "./schema";
import { createUser } from "./serverOnly";

export type UserType = z.infer<typeof AccountType>

type LoginProps = {
  action: string
  newAccount: boolean
  accountType: UserType
}


export const Login = ({ action, newAccount, accountType }: LoginProps) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaults,
  });

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)
  const [signInWithEmailAndPassword, _user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleCreateUser = (email: string, password: string) => {
    createUserWithEmailAndPassword(email, password).then(creds => {
      if (creds) {
        createUser({ userId: creds.user.uid, email: creds.user.email!, accountType }).then((res) => {
          console.log(res)
          onSuccess('Account created.', creds.user.email!)
        }).catch((err: Error) => {
          onError(err.name, err.message)
        })
      }
    }).catch((err: Error) => {
      onError('Sign up error!', err.message)
    })
  }

  const handleSignin = (email: string, password: string) => {
    signInWithEmailAndPassword(email, password).then(creds => {
      if (loading) {
        console.log('Loading')
      }
      if (error) {
        console.log(error.name, error.message)
      }
      if (creds) {
        onSuccess("Login succcessful.")
      }
    }).catch((err: Error) => {
      onError('Login error!', err.message)
    })
  }

  const onSubmit = (values: LoginSchema) => {
    const { email, password } = values;
    if (newAccount) {
      handleCreateUser(email, password)
    } else {
      handleSignin(email, password)
    }
  };

  return (
    <Form {...form}>
      <ActiveForm action={action} form={form} loading={loading} onSubmit={onSubmit} />
    </Form>
  )

};
