import { FormAlert, FormControl, FormField, FormItem } from "@@ui/form";
import { DarkTouch } from "@@ui/touch";
import {
  filterAutoValues,
  opts,
  withSpaces,
  type KVFields,
} from "@/utils/helpers";
import { InputFieldName } from "@@ui/input";
import {
  BadgeCheckIcon,
  CalendarDaysIcon,
  CarFrontIcon,
  CaravanIcon,
  CheckCircleIcon,
  CircleDollarSignIcon,
  CogIcon,
  CylinderIcon,
  EclipseIcon,
  FileBadge,
  FileCogIcon,
  FileDigitIcon,
  FileTypeIcon,
  FormInputIcon,
  FuelIcon,
  MapPinnedIcon,
  SplitSquareVerticalIcon,
  UserIcon,
  WeightIcon,
} from "lucide-react";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type ReactElement,
  type SetStateAction,
} from "react";
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FeedbackActions, FieldIndex } from "./components";
import { useWatcher } from "./hooks";
import { AuthContext } from "@/app/(context)/context";

export const vehicleResource = z.record(z.string().min(1));
export type VehicleSchema = z.infer<typeof vehicleResource>;
type VehicleFormType = UseFormReturn<VehicleSchema>;

type ActiveFormProps = {
  form: VehicleFormType;
  fields: KVFields[];
  setCount: Dispatch<SetStateAction<number | undefined>>;
  loading: boolean;
  addAuto: (auto_data: VehicleSchema) => void;
  downloadURL: string;
  withScan: boolean;
};

export const ActiveForm = ({
  form,
  fields,
  setCount,
  loading,
  addAuto,
  withScan,
}: ActiveFormProps) => {
  const context = useContext(AuthContext);
  const userCreds = context?.user;
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

  const onSubmit = (values: VehicleSchema) => {
    const filteredPayload = filterAutoValues(values);
    if (userCreds?.uid) {
      addAuto(filteredPayload as VehicleSchema);
    }
  };

  const Submit = useCallback(() => {
    return (
      <DarkTouch
        size="lg"
        type="submit"
        tail={CheckCircleIcon}
        disabled={loading}
      >
        Validate & Submit
      </DarkTouch>
    );
  }, [loading]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <section className="w-full rounded-lg border border-ash bg-white py-2 ">
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
                        label={withSpaces(item?.key)}
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
      <Actions submit={Submit} withScan={withScan} />
    </form>
  );
};

type ActionProps = {
  submit: () => ReactElement;
  withScan: boolean;
};
const Actions = (props: ActionProps) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<boolean | undefined>();

  const handleLike = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFeedback(true);
    setLoading(true);
  };
  const handleDislike = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFeedback(false);
    setLoading(true);
  };

  const FeedbackOptions = useCallback(() => {
    const options = opts(
      <FeedbackActions
        feedback={feedback}
        handleLike={handleLike}
        handleDislike={handleDislike}
        loading={loading}
      />,
      <div />,
    );
    return <>{options.get(props.withScan)}</>;
  }, [feedback, loading, props.withScan]);

  return (
    <div className="flex h-[70px] items-end justify-between">
      <FeedbackOptions />
      <props.submit />
    </div>
  );
};

const getIcon = (key: string) => {
  const k = key.toLowerCase();
  if (k.includes("mv") || k.includes("vin")) {
    return FileCogIcon;
  } else if (k.includes("cr")) {
    return FileBadge;
  } else if (k.includes("engine")) {
    return CogIcon;
  } else if (k.includes("chassis")) {
    return SplitSquareVerticalIcon;
  } else if (k.includes("plate")) {
    return FormInputIcon;
  } else if (k.includes("denomination")) {
    return CaravanIcon;
  } else if (k.includes("or no")) {
    return FileDigitIcon;
  } else if (k.includes("date") || k.includes("year")) {
    return CalendarDaysIcon;
  } else if (k.includes("owner")) {
    return UserIcon;
  } else if (k.includes("wt") || k.includes("net")) {
    return WeightIcon;
  } else if (k.includes("body") || k.includes("make")) {
    return CarFrontIcon;
  } else if (k.includes("cylinders")) {
    return CylinderIcon;
  } else if (k.includes("fuel")) {
    return FuelIcon;
  } else if (k.includes("amount") || k.includes("amt")) {
    return CircleDollarSignIcon;
  } else if (k.includes("contact")) {
    return MapPinnedIcon;
  } else if (k.includes("salvage")) {
    return BadgeCheckIcon;
  } else if (k.includes("piston")) {
    return EclipseIcon;
  } else {
    return FileTypeIcon;
  }
};

export const vehicleDefaults = {
  CR: "",
  DATE: "",
  "ENGINE NO": "",
  "CHASSIS NO": "",
  "MV FILE NO": "",
  "PLATE NO": "",
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
  "OR DATE": "",
  "OR NO": "",
  AMOUNT: "",
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
  { key: "OR DATE", value: "" },
  { key: "OR NO", value: "" },
  { key: "AMOUNT", value: "" },
  { key: "DATE SIGNED", value: "" },
  { key: "DOCUMENT TYPE", value: "" },
  { key: "EXPIRATION DATE", value: "" },
  { key: "IS SALVAGED?", value: "" },
];
