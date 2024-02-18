import { FormControl, FormField, FormItem } from "@@components/form";
import { InputField } from "@@components/input";
import { DarkTouch } from "@@components/touch";
import { type Control, type ControllerRenderProps } from "react-hook-form";
import {
  loginFields,
  type LoginField,
  type LoginFormProps,
  type LoginSchema,
} from "./schema";

export const ActiveForm = ({
  action,
  form,
  loading,
  onSubmit,
}: LoginFormProps) => {
  const { handleSubmit, control, formState } = form;
  const { isValid } = formState;

  const Submit = () => {
    return (
      <DarkTouch
        size="lg"
        type="submit"
        disabled={!isValid || loading}
        className="w-full text-[14px]"
      >
        {action}
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
  <FormItem className="my-4">
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
