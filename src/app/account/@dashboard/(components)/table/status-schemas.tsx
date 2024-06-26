import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { type Option } from "./types";

export const activeStates: Option[] = [
  {
    value: "false",
    label: "inactive",
    icon: MinusCircleIcon,
    color: "text-neutral-100",
    cell: "bg-neutral-100/50",
  },
  {
    value: "true",
    label: "active",
    icon: CheckCircleIcon,
    color: "text-sky-300",
    cell: "bg-sky-100",
  },
];

export const events = [
  {
    value: "payment.confirmation",
    label: "payment.confirmation",
  },
];
