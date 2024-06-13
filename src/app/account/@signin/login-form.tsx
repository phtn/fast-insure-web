import { FormControl, FormField, FormItem } from "@@ui/form";
import { InputField } from "@@ui/input";
import { DarkTouch } from "@@ui/touch";
import { type Control, type ControllerRenderProps } from "react-hook-form";
import {
  loginFields,
  type LoginField,
  type LoginFormProps,
  type LoginSchema,
} from "./schema";
import { ArrowUpRightIcon, Disc3Icon, PenLine } from "lucide-react";
import { useCallback } from "react";
import { cn } from "@/utils/cn";
import { opts } from "@/utils/helpers";

export const ActiveForm = ({
  form,
  loading,
  onSubmit,
  signinType,
}: LoginFormProps) => {
  const { handleSubmit, control, formState } = form;
  const { isValid } = formState;

  const SubmitTextOptions = useCallback(() => {
    const userSigninType = signinType === "SIGNIN";
    const options = opts(<p>Sign in</p>, <p>Create account</p>);
    return <>{options.get(userSigninType)}</>;
  }, [signinType]);

  // const submitText = useMemo(() => {
  //   const userLogin = signinType === "SIGNIN";
  //   if (loading) {
  //     return userLogin ? "Signing in..." : "Creating account...";
  //   } else {
  //     return userLogin ? "Sign in" : "Create new account";
  //   }
  // }, [loading, signinType]);

  const Submit = () => {
    return (
      <DarkTouch
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
          `h-[60px] w-full text-[16px] text-gray-400`,
          loading
            ? ` text-blue-200`
            : !isValid
              ? `text-orange-300`
              : `text-emerald-400`,
        )}
      >
        <SubmitTextOptions />
      </DarkTouch>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fields control={control} fields={loginFields} />
      <Submit />
    </form>
  );
};

type RenderProps = {
  field: ControllerRenderProps<LoginSchema>;
  item: LoginField;
};

const render = ({ field, item }: RenderProps) => (
  <FormItem className="my-5">
    <FormControl>
      <InputField
        className="w-[300px]"
        icon={item.icon}
        alt={item.alt}
        placeholder={item.placeholder}
        type={item.type}
        {...field}
      />
    </FormControl>
  </FormItem>
);

type FieldProps = {
  fields: LoginField[];
  control: Control<LoginSchema>;
};

const Fields = ({ control, fields }: FieldProps) => {
  return fields.map((item) => (
    <FormField
      key={item.name}
      control={control}
      name={item.name}
      render={({ field }) => render({ field, item })}
    />
  ));
};
