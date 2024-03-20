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
import { ArrowRightIcon, Disc3Icon } from "lucide-react";
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
      return userLogin ? "Sign In" : "Create new account";
    }
  }, [loading, signinType]);

  const Submit = () => {
    return (
      <DarkTouch
        size="lg"
        type="submit"
        tail={loading ? Disc3Icon : ArrowRightIcon}
        tailClass={loading ? "animate-spin" : "animate-none"}
        disabled={!isValid || loading}
        className={cn(`w-full text-[14px]`, loading ? ` text-blue-200` : ``)}
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
