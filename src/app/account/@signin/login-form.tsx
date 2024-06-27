import { cn } from "@/utils/cn";
import { opts } from "@/utils/helpers";
import { Form, FormControl, FormField, FormItem } from "@@ui/form";
import { InputField } from "@@ui/input";
import { DarkTouch } from "@@ui/touch";
import { ArrowUpRightIcon, Disc3Icon, PenLine } from "lucide-react";
import { useCallback } from "react";
import { loginFields } from "./schema";
import type {
  FormFieldProps,
  LoginField,
  LoginFormProps,
  SubmitButtonProps,
  TField,
} from "./types";

export const ActiveForm = ({
  form,
  loading,
  onSubmit,
  signinType,
}: LoginFormProps) => {
  const { handleSubmit, control, formState } = form;
  const { isValid } = formState;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fields control={control} fields={loginFields} />
        <SubmitButton
          isValid={isValid}
          loading={loading}
          signinType={signinType}
        />
      </form>
    </Form>
  );
};

const SubmitButton = (props: SubmitButtonProps) => {
  const { isValid, loading, signinType } = props;

  const SubmitTextOptions = useCallback(() => {
    const userSigninType = signinType === "SIGNIN";
    const options = opts(<p>Sign in</p>, <p>Create account</p>);
    return <>{options.get(userSigninType)}</>;
  }, [signinType]);

  return (
    <DarkTouch
      disabled={!isValid}
      size="lg"
      type="submit"
      tail={loading ? Disc3Icon : !isValid ? PenLine : ArrowUpRightIcon}
      tailClass={
        loading
          ? "animate-spin"
          : !isValid
            ? "animate-none stroke-width-[1px]"
            : "hidden"
      }
      className={cn(
        `h-[60px] w-full rounded-xl text-[16px] text-gray-400`,
        loading
          ? ` text-blue-200`
          : !isValid
            ? `size-4 text-orange-300`
            : `text-emerald-400`,
      )}
    >
      <SubmitTextOptions />
    </DarkTouch>
  );
};

/* eslint-disable react/display-name */
const render =
  (item: LoginField) =>
  ({ field }: TField) => (
    <FormItem className="my-5">
      <FormControl>
        <InputField
          alt={item.alt}
          className="w-[320px]"
          icon={item.icon}
          placeholder={item.placeholder}
          type={item.type}
          {...field}
        />
      </FormControl>
    </FormItem>
  );

const Fields = ({ control, fields }: FormFieldProps) => {
  return fields.map((item) => (
    <FormField
      key={item.name}
      control={control}
      name={item.name}
      render={render(item)}
    />
  ));
};
