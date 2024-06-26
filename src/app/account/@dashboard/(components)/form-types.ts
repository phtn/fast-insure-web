import { type DualIcon } from "@/app/types.index";
import { type IDMRequestFormSchema } from "@/server/resource/request";
import { type HTMLInputTypeAttribute } from "react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

export type FieldProps<T> = {
  name: keyof T;
  alt: string;
  icon?: DualIcon;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  disabled?: boolean;
};

export type FieldOptionProps<S extends FieldValues> = {
  item: FieldProps<IDMRequestFormSchema>;
  index: number;
  length: number;
  field?: ControllerRenderProps<S>;
  isValid?: boolean;
};
