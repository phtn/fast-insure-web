import {
  CircleSlash2Icon,
  CircleSlashIcon,
  ClockIcon,
  FilePenLineIcon,
} from "lucide-react";
import { type Option } from "../../../(components)/table/types";

export const statuses: Option[] = [
  {
    value: "draft",
    label: "draft",
    icon: FilePenLineIcon,
    color: "text-gray-100 fill-gray-100/20",
    cell: "border-[0.33px] border-gray-500 bg-gray-100 text-gray-500 fill-gray-100/20",
  },
  {
    value: "submitted",
    label: "submitted",
    icon: ClockIcon,
    color: "text-sky-200",
    cell: "border-[0.33px] border-sky-500 bg-sky-100/40 text-sky-500",
  },
  {
    value: "received",
    label: "received",
    icon: CircleSlashIcon,
    color: "text-teal-100",
    cell: "border-[0.33px] border-teal-500 bg-teal-100/30 text-teal-500",
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
    color: "text-indigo-200",
    cell: "border-[0.33px] border-indigo-500 bg-indigo-100/30 text-indigo-500",
  },
];

export const events = [
  {
    value: "payment.confirmation",
    label: "payment.confirmation",
  },
];

export const colorcodes: Option[] = [
  {
    value: "0",
    label: "0",
    icon: CircleSlashIcon,
    color: "text-emerald-400",
    cell: "border-[0.0px] border-teal-500 bg-teal-300/70 text-emerald-400",
  },
  {
    value: "1",
    label: "1",
    icon: CircleSlashIcon,
    color: "text-cyan-400",
    cell: "border-[0.0px] border-cyan-500 bg-cyan-300/70 text-cyan-400",
  },
  {
    value: "2",
    label: "2",
    icon: FilePenLineIcon,
    color: "text-zinc-400",
    cell: "border-[0.0px] border-slate-500 bg-slate3100 text-zinc-400",
  },
  {
    value: "3",
    label: "3",
    icon: ClockIcon,
    color: "text-yellow-400",
    cell: "border-[0.0px] border-sky-500 bg-sky-300/70 text-yellow-500",
  },
  {
    value: "4",
    label: "4",
    icon: CircleSlashIcon,
    color: "text-yellow-400",
    cell: "border-[0.0px] border-teal-300 bg-teal-300/70 text-teal-500",
  },
  {
    value: "5",
    label: "5",
    icon: CircleSlashIcon,
    color: "text-rose-400",
    cell: "border-[0.0px] border-rose-300 bg-rose-300/70 text-rose-500",
  },
  {
    value: "6",
    label: "6",
    icon: CircleSlash2Icon,
    color: "text-indigo-200",
    cell: "border-[0.0px] border-indigo-500 bg-indigo-300/70 text-indigo-500",
  },
  {
    value: "7",
    label: "7",
    icon: CircleSlash2Icon,
    color: "text-pink-200",
    cell: "border-[0.0px] border-pink-300 bg-pink-300/70 text-pink-500",
  },
  {
    value: "8",
    label: "8",
    icon: CircleSlash2Icon,
    color: "text-amber-200",
    cell: "border-[0.0px] border-amber-300 bg-amber-300/70 text-amber-500",
  },
  {
    value: "9",
    label: "9",
    icon: CircleSlash2Icon,
    color: "text-violet-200",
    cell: "border-[0.0px] border-violet-300 bg-violet-300/70 text-violet-500",
  },
];
