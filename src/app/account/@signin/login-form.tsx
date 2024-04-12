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
import { ArrowUpRightIcon, Disc3Icon, LogInIcon } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/utils/cn";

export const ActiveForm = ({
  form,
  loading,
  onSubmit,
  signinType,
}: LoginFormProps) => {
  const { handleSubmit, control, formState } = form;
  const { isValid } = formState;

  const submitText = useMemo(() => {
    const userLogin = signinType === "SIGNIN";
    if (loading) {
      return userLogin ? "Signing in..." : "Creating account...";
    } else {
      return userLogin ? "Sign in" : "Create new account";
    }
  }, [loading, signinType]);

  const Submit = () => {
    const userLogin = signinType === "SIGNIN";
    return (
      <DarkTouch
        size="lg"
        type="submit"
        tail={loading ? Disc3Icon : userLogin ? LogInIcon : ArrowUpRightIcon}
        tailClass={loading ? "animate-spin" : "animate-none stroke-width-[1px]"}
        disabled={!isValid || loading}
        className={cn(
          `h-[60px] w-full text-[16px]`,
          loading ? ` text-blue-200` : isValid ? `text-zap` : ``,
        )}
      >
        {submitText}
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
