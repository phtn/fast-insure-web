import {
  CircleSlash2Icon,
  CircleSlashIcon,
  ClockIcon,
  FilePenLineIcon,
} from "lucide-react";
import { type Option } from "./types";

export const statuses: Option[] = [
  {
    value: "draft",
    label: "draft",
    icon: FilePenLineIcon,
    color: "text-gray-500",
    cell: "border-[0.33px] border-gray-500 bg-gray-100 text-gray-500 fill-gray-100/20",
  },
  {
    value: "submitted",
    label: "submitted",
    icon: ClockIcon,
    color: "text-sky-500",
    cell: "border-[0.33px] border-sky-500 bg-sky-100/40 text-sky-500",
  },
  {
    value: "received",
    label: "received",
    icon: CircleSlashIcon,
    color: "text-indigo-500",
    cell: "border-[0.33px] border-indigo-500 bg-indigo-100/30 text-indigo-500",
  },
  {
    value: "voided",
    label: "voided",
    icon: CircleSlashIcon,
    color: "text-rose-100",
    cell: "border-[0.33px] border-rose-500 bg-rose-100/30 text-rose-500",
  },
  {
    value: "completed",
    label: "completed",
    icon: CircleSlash2Icon,
    color: "text-teal-500",
    cell: "border-[0.33px] border-teal-500 bg-teal-100/30 text-teal-500",
  },
];

export const events = [
  {
    value: "payment.confirmation",
    label: "payment.confirmation",
  },
];
