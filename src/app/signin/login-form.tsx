import { type Control, type ControllerRenderProps } from "react-hook-form";
import { Button } from "../_components/button";
import { FormControl, FormField, FormItem } from "../_components/form";
import { InputField } from "../_components/input";
import { loginFields, type LoginField, type LoginFormProps, type LoginSchema } from "./schema";

export const ActiveForm = ({ action, form, loading, onSubmit }: LoginFormProps) => {
  const { handleSubmit, control, formState } = form;
  const { isValid } = formState;

  const Submit = () => {
    return (
      <Button
        size='fat'
        type="submit"
        disabled={!isValid}
        variant='submit'
        className="w-full text-lg"

      >{action}</Button>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fields control={control} fields={loginFields} loading={loading} />
      <Submit />
    </form>
  );
};

type RenderProps = {
  field: ControllerRenderProps<LoginSchema>;
  item: LoginField;
};

const render = ({ field, item }: RenderProps) => (
  <FormItem className="my-8">
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
  loading: boolean;
  control: Control<LoginSchema>;
};

const Fields = ({ control, fields, loading }: FieldProps) => {
  return fields.map((item) => (
    <FormField
      key={item.name}
      disabled={loading}
      control={control}
      name={item.name}
      render={({ field }) => render({ field, item })}
    />
  ));
};
