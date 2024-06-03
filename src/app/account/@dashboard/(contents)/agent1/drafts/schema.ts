import {
  CircleSlash2Icon,
  CircleSlashIcon,
  ClockIcon,
  FilePenLineIcon,
} from "lucide-react";
import { type Option } from "../../../(components)/table/types";
import { type IDMAgentCreateSchema } from "@/server/resource/idm";

export const statuses: Option[] = [
  {
    value: "draft",
    label: "draft",
    icon: FilePenLineIcon,
    color: "text-gray-500 fill-gray-100/20",
    cell: "border-[0.33px] text-xs bg-gray-100 text-gray-500 fill-gray-100/20",
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
    color: "text-teal-500",
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

const datestring = new Date();

export const exampleData: IDMAgentCreateSchema[] = [
  {
    id: "69-420",
    policyNumber: "OLIVIA-BUTT",
    policyType: "CTPL",
    agentId: "0000",
    agentName: "orange",
    customerId: "ANALFUN",
    customerName: "HADAWAY",
    createdAt: datestring.toISOString(),
    underwriterId: "BUTT-SUCKING",
    underwriterName: "Mikako",
    submittedAt: datestring.toISOString(),
    submittedItemsCount: 3,
    status: "draft",
  },
  {
    id: "69-421",
    policyNumber: "OLIVIA-BUTT",
    policyType: "CTPL",
    agentId: "0000",
    agentName: "orange",
    customerId: "ANALFUN",
    customerName: "HADAWAY",
    createdAt: datestring.toISOString(),
    underwriterId: "BUTT-SUCKING",
    underwriterName: "Mikako",
    submittedAt: datestring.toISOString(),
    submittedItemsCount: 3,
    status: "draft",
  },
];
