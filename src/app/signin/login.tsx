'use client'

import { onError, onSuccess } from "@/utils/toast";
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
  type LoginFormProps,
  type LoginSchema,
} from "./schema";

const LoginForm = (props: LoginFormProps) => {
  const { action, form, loading, onSubmit } = props;
  return (
    <Form {...form}>
      <ActiveForm action={action} form={form} loading={loading} onSubmit={onSubmit} />
    </Form>
  );
};

export const Login = ({ action }: { action: string }) => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaults,
  });

  const [signInWithEmailAndPassword, user, loading] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (values: LoginSchema) => {
    const { email, password } = values;
    signInWithEmailAndPassword(email, password).then((user) => {
      if (user) {
        onSuccess("Signed in!");
      } else {
        onError("Error", "Unable to authenticate.");
      }
    }).catch((err: Error) => {
      console.log(typeof user?.toString()[0])
      console.log(err.name, err.message)
      onError(err.name, err.message);
    });
  };

  return <LoginForm action={action} form={form} onSubmit={onSubmit} loading={loading} />;
};
