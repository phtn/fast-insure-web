import {
  FormAlert,
  FormControl,
  FormField,
  FormItem,
} from "@/app/_components/form";
import { DarkTouch, Touch } from "@/app/_components/touch";
import { AuthContext } from "@/app/context";
import { cn } from "@/utils/cn";
import {
  filterAutoValues,
  withSpaces,
  type KVFields,
  opts,
} from "@/utils/helpers";
import { InputFieldName } from "@@components/input";
import {
  BadgeCheckIcon,
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
  ThumbsDown,
  ThumbsUp,
  UserIcon,
  WeightIcon,
} from "lucide-react";
import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from "react";
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FieldIndex } from "./components";
import { useWatcher } from "./hooks";

export const vehicleResource = z.record(z.string().min(1));
export type VehicleSchema = z.infer<typeof vehicleResource>;
type VehicleFormType = UseFormReturn<VehicleSchema>;

type ActiveFormProps = {
  form: VehicleFormType;
  fields: KVFields[];
  setCount: Dispatch<SetStateAction<number>>;
  loading: boolean;
  addAuto: (auto_data: VehicleSchema) => void;
  downloadURL: string;
};

export const ActiveForm = ({
  form,
  fields,
  setCount,
  loading,
  addAuto,
}: ActiveFormProps) => {
  const context = useContext(AuthContext);
  const userCreds = context?.user;
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

  const onSubmit = (values: VehicleSchema) => {
    setNewForm(false);
    const filteredPayload = filterAutoValues(values);
    if (userCreds?.uid) {
      addAuto(filteredPayload);
    }
  };

  const Submit = useCallback(() => {
    const label =
      count <= 0 && !newForm ? "Ready to Submit" : "Verify Form Values";
    const icon = count <= 0 && !newForm ? CheckCircleIcon : ListRestartIcon;
    return (
      <DarkTouch size="lg" type="submit" tail={icon} disabled={loading}>
        {label}
      </DarkTouch>
    );
  }, [count, newForm, loading]);

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
      <Actions submit={Submit} withFields={fields.length !== 0} />
    </form>
  );
};

type ActionProps = {
  submit: () => ReactElement;
  withFields: boolean;
};
const Actions = (props: ActionProps) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<boolean | undefined>();
  const handleLike = () => {
    setFeedback(true);
    setLoading(true);
  };
  const handleDislike = () => {
    setFeedback(false);
    setLoading(true);
  };

  const FeedbackOptions = useCallback(() => {
    const options = opts(
      <div className="flex items-center justify-between space-x-2">
        <div className="flex h-[54.67px] items-center rounded-lg rounded-br-none border-[0.33px] border-ash bg-white px-8 py-2 text-xs font-medium leading-none text-coal">
          <span>Results OK?</span>
        </div>
        <Touch
          icon={ThumbsUp}
          size="icon"
          onClick={handleLike}
          className={cn(feedback ? `text-blue-600` : ``)}
          disabled={loading}
        />
        <Touch
          icon={ThumbsDown}
          onClick={handleDislike}
          className={cn(
            feedback !== undefined && !feedback ? `text-blue-600` : ``,
          )}
          size="icon"
          disabled={loading}
        />
      </div>,
      <div></div>,
    );
    return <>{options.get(props.withFields)}</>;
  }, [feedback, loading, props.withFields]);

  return (
    <div className="flex h-[70px] items-end justify-between">
      <FeedbackOptions />
      <props.submit />
    </div>
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
    return BadgeCheckIcon;
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
