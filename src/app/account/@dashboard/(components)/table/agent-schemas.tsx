import { MinusCircleIcon, ZapIcon } from "lucide-react";
import { type Option } from "./types";

export const statuses: Option[] = [
  {
    value: String(false),
    label: "inactive",
    icon: MinusCircleIcon,
    color: "text-gray-500",
    cell: "border-[0.33px] border-gray-500 bg-gray-100 text-gray-500 fill-gray-100/20",
  },
  {
    value: "true",
    label: "active",
    icon: ZapIcon,
    color: "text-cyan-500 stroke-0 size-4 fill-white",
    cell: "border-[0.33px] border-cyan-500 bg-cyan-600 text-white",
  },

  // {
  //   value: "received",
  //   label: "received",
  //   icon: CircleSlashIcon,
  //   color: "text-indigo-500",
  //   cell: "border-[0.33px] border-indigo-500 bg-indigo-100/30 text-indigo-500",
  // },
  // {
  //   value: "voided",
  //   label: "voided",
  //   icon: CircleSlashIcon,
  //   color: "text-rose-100",
  //   cell: "border-[0.33px] border-rose-500 bg-rose-100/30 text-rose-500",
  // },
  // {
  //   value: "completed",
  //   label: "completed",
  //   icon: CircleSlash2Icon,
  //   color: "text-teal-500",
  //   cell: "border-[0.33px] border-teal-500 bg-teal-100/30 text-teal-500",
  // },
];

// export const events = [
//   {
//     value: "payment.confirmation",
//     label: "payment.confirmation",
//   },
// ];
type ColorOption = {
  value: string;
  color: string;
};
export const colorcodes: ColorOption[] = [
  {
    value: "0",
    color: "text-emerald-400",
  },
  {
    value: "1",
    color: "text-cyan-400",
  },
  {
    value: "2",
    color: "text-zinc-400",
  },
  {
    value: "3",
    color: "text-yellow-400",
  },
  {
    value: "4",
    color: "text-yellow-400",
  },
  {
    value: "5",
    color: "text-rose-400",
  },
  {
    value: "6",
    color: "text-indigo-200",
  },
  {
    value: "7",
    color: "text-pink-200",
  },
  {
    value: "8",
    color: "text-amber-200",
  },
  {
    value: "9",
    color: "text-violet-200",
  },
];
