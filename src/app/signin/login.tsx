'use client'

import {
  Form,
} from "@@components/form";
import { auth } from "@@libs/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  useForm,
} from "react-hook-form";
import { ActiveForm } from "./login-form";
import {
  loginDefaults,
  loginSchema,
  type LoginSchema,
} from "./schema";


export const Login = ({ action }: { action: string }) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaults,
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSignin = (email: string, password: string) => {
    signInWithEmailAndPassword(email, password).then(creds => {
      if (loading) {
        console.log('Loading')
      }
      if (error) {
        console.log(error.name, error.message)
      }
      console.log(creds?.user, user)
    }).catch(err => {
      console.log(err)
    })
  }

  const onSubmit = (values: LoginSchema) => {
    const { email, password } = values;
    handleSignin(email, password)
  };

  return (
    <Form {...form}>
      <ActiveForm action={action} form={form} loading={loading} onSubmit={onSubmit} />
    </Form>
  )

};
