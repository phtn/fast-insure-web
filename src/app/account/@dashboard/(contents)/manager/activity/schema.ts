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
    color: "text-gray-100 fill-gray-100/20",
    cell: "border-[0.33px] border-gray-500 bg-gray-100 text-gray-500 fill-gray-100/20",
  },
  {
    value: "anal",
    label: "anal",
    icon: ClockIcon,
    color: "text-sky-200",
    cell: "border-[0.33px] border-sky-500 bg-sky-100/40 text-sky-500",
  },
  {
    value: "paid",
    label: "paid",
    icon: CircleSlashIcon,
    color: "text-teal-100",
    cell: "border-[0.33px] border-teal-500 bg-teal-100/30 text-teal-500",
  },
  {
    value: "void",
    label: "voided",
    icon: CircleSlashIcon,
    color: "text-rose-100",
    cell: "border-[0.33px] border-rose-500 bg-rose-100/30 text-rose-500",
  },
  {
    value: "uncollectible",
    label: "unpaid",
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
    status: "anal",
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
    status: "anal",
  },
];
