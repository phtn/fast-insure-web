import { type ActivationFormSchema } from "@/server/resource/code";
import { type FieldProps } from "../../(components)/form-types";

export const activationDefaults: ActivationFormSchema = {
  agentCode: "",
  branchCode: "",
};

export const activationFields: Omit<
  FieldProps<ActivationFormSchema>,
  "icon"
>[] = [
  {
    name: "agentCode",
    alt: "name",
    label: "Agent Code",
    placeholder: "agent code",
    type: "text",
  },
  {
    name: "branchCode",
    alt: "name",
    label: "Branch Code",
    placeholder: "branch code",
    type: "text",
  },
];
