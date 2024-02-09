import {
  FormAlert,
  FormControl,
  FormField,
  FormItem,
} from "@/app/_components/form";
import { type KVFields } from "@/utils/helpers";
import { Button } from "@@components/button";
import { InputFieldName } from "@@components/input";
import {
  CalendarCheckIcon,
  CarFrontIcon,
  CheckCircleIcon,
  CircleDollarSignIcon,
  DiscIcon,
  EclipseIcon,
  FileCogIcon,
  FileDigitIcon,
  FileIcon,
  FuelIcon,
  ListRestartIcon,
  MapPinnedIcon,
  ShieldCheckIcon,
  UserIcon,
  WeightIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FieldIndex } from "./components";
import { useWatcher } from "./hooks";

export const vehicleResource = z.record(z.string().min(1));
export type VehicleSchema = z.infer<typeof vehicleResource>;
type VehicleFormType = UseFormReturn<VehicleSchema>;

type AddVehicleProps = {
  form: VehicleFormType;
  fields: KVFields[];
  setCount: Dispatch<SetStateAction<number>>;
};

export const ActiveForm = ({ form, fields, setCount }: AddVehicleProps) => {
  const [newForm, setNewForm] = useState(true);
  const { control, handleSubmit, formState, setValue, watch } = form;
  const { errors } = formState;
  const { count } = useWatcher({ errors, watch });

  useEffect(() => {
    setValue("O", "8");
    setValue("NO", "0");
    setValue("TELEPHONE NO", "0");
  }, [setValue]);

  useEffect(() => {
    setCount(count);
  }, [count, setCount]);

  const onSubmit = useCallback((values: VehicleSchema) => {
    setNewForm(false);
    console.log(values);
  }, []);

  const Submit = useCallback(() => {
    const label =
      count <= 0 && !newForm ? "Ready to Submit" : "Verify Form Values";
    const icon =
      count <= 0 && !newForm ? (
        <CheckCircleIcon className="text-green-300" />
      ) : (
        <ListRestartIcon className="text-blue-300" />
      );
    return (
      <Button
        size="fat"
        type="submit"
        disabled={false}
        variant="submit"
        className="w-[300px] space-x-4 self-end md:w-[435px] md:space-x-6"
      >
        <div>{label}</div>
        <div>{icon}</div>
      </Button>
    );
  }, [count, newForm]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="w-full rounded-lg border-[0.33px] border-blue-400 bg-white py-2 ">
        <div className="my-2 h-[440px] space-y-4 overflow-y-scroll px-4 pt-1">
          {fields.map((item, index) => (
            <FormField
              name={item.key}
              key={item.key}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-full items-center space-x-4">
                      {errors[item.key] ? (
                        <FormAlert index={index} />
                      ) : (
                        <FieldIndex index={index} />
                      )}

                      <InputFieldName
                        className="w-full"
                        label={item?.key}
                        icon={getIcon(item.key)}
                        type={
                          item.key.toLowerCase().includes("telephone")
                            ? "tel"
                            : "text"
                        }
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
      </section>
      <div className="mt-8 flex items-center justify-end">
        <Submit />
      </div>
    </form>
  );
};

const getIcon = (key: string) => {
  const k = key.toLowerCase();
  if (k.includes("no") || k.includes("vin")) {
    return FileCogIcon;
  } else if (k.includes("cr") || k.includes("o.r.no")) {
    return FileDigitIcon;
  } else if (k.includes("date") || k.includes("year")) {
    return CalendarCheckIcon;
  } else if (k.includes("owner")) {
    return UserIcon;
  } else if (k.includes("wt") || k.includes("net")) {
    return WeightIcon;
  } else if (k.includes("body") || k.includes("make")) {
    return CarFrontIcon;
  } else if (k.includes("cylinders")) {
    return DiscIcon;
  } else if (k.includes("fuel")) {
    return FuelIcon;
  } else if (k.includes("amount") || k.includes("amt")) {
    return CircleDollarSignIcon;
  } else if (k.includes("contact")) {
    return MapPinnedIcon;
  } else if (k.includes("salvage")) {
    return ShieldCheckIcon;
  } else if (k.includes("piston")) {
    return EclipseIcon;
  } else {
    return FileIcon;
  }
};

export const vehicleDefaults = {
  CR: "",
  DATE: "",
  "ENGINE NO": "",
  "CHASSIS NO": "",
  "MV FILE NO": "",
  "PLATE NO": "",
  VIN: "",
  FUEL: "",
  DENOMINATION: "",
  "PISTON DISP": "",
  CYLINDERS: "",
  "YEAR MODEL": "",
  MAKE: "",
  "BODY TYPE": "",
  "GROSS WT": "",
  "NET WT": "",
  "SHIPPING WT": "",
  "NET CAPACITY": "",
  "OWNERS NAME": "",
  "CONTACT DETAILS": "",
  ENCUMBERED: "",
  "OR DATE": "",
  "OR NO": "",
  AMOUNT: "",
  REGISTRAR: "",
  OFFICE: "",
  "DOCUMENT TYPE": "",
  "EXPIRATION DATE": "",
  "IS SALVAGE?": "",
};

export type VehicleDefaults = typeof vehicleDefaults;

export const vehicleFields = [
  { key: "CR NO", value: "" },
  { key: "DATE", value: "" },
  { key: "ENGINE NO", value: "" },
  { key: "CHASSIS NO", value: "" },
  { key: "MV FILE NO", value: "" },
  { key: "PLATE NO", value: "" },
  { key: "VIN", value: "" },
  { key: "FUEL", value: "" },
  { key: "DENOMINATION", value: "" },
  { key: "PISTON DISP", value: "" },
  { key: "CYLINDERS", value: "" },
  { key: "YEAR MODEL", value: "" },
  { key: "MAKE", value: "" },
  { key: "BODY TYPE", value: "" },
  { key: "GROSS WT", value: "" },
  { key: "NET WT", value: "" },
  { key: "SHIPPING WT", value: "" },
  { key: "NET CAPACITY", value: "" },
  { key: "OWNERS NAME", value: "" },
  { key: "CONTACT DETAILS", value: "" },
  { key: "ENCUMBERED", value: "" },
  { key: "OR DATE", value: "" },
  { key: "OR NO", value: "" },
  { key: "AMOUNT", value: "" },
  { key: "REGISTRAR", value: "" },
  { key: "OFFICE", value: "" },
  { key: "DATE SIGNED", value: "" },
  { key: "DOCUMENT TYPE", value: "" },
  { key: "EXPIRATION DATE", value: "" },
  { key: "IS SALVAGED?", value: "" },
];
