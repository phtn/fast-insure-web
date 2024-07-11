import { cn } from "@/utils/cn";
import {
  FormCardTitle,
  FormSeparator,
  NeutralCard0,
} from "../../(components)/form-card";
import { DropdownMenu, DropdownMenuTrigger } from "@/app/(ui)/dropdown";
import { BeachDrop, BeachDropItem } from "../../(components)/table/styles";
import {
  ChevronDoubleDownIcon,
  CogIcon,
  ArrowUpTrayIcon,
  BellIcon,
  UserIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftIcon,
  ClockIcon,
  CursorArrowRippleIcon,
  DocumentCheckIcon,
  MinusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import type { DualIcon, ClassName } from "@/app/types.index";
import { HistoryIcon } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "@/app/(ui)/button";
import { onSuccess } from "@/utils/toast";

export const UnderwriterForm = () => {
  return (
    <div className="py-20">
      <NeutralCard0>
        <div className="flex items-center justify-between">
          <FormCardTitle>Underwriter Panel</FormCardTitle>
          <UpdateStatus options={statusOptions} />
        </div>
        <FormSeparator className="my-3" />
        <div className="grid h-[200px] grid-cols-5 gap-4 p-5">
          <PanelCard icon={UserIcon} title="Agent">
            <div className="grid grid-cols-4 gap-2">
              <Button
                className="h-[32px] w-[32px] rounded-xl bg-teal-500 p-0 shadow-md"
                size={`icon`}
                variant={`ghost`}
              >
                <ChatBubbleLeftIcon className="size-[18px] text-white" />
              </Button>
            </div>
          </PanelCard>
          <PanelCard icon={BellIcon} title="Recent updates" />
          <PanelCard icon={ArrowUpTrayIcon} title="Submit Files" />
          <PanelCard icon={HistoryIcon} title="Timeline" />
          <PanelCard icon={TableCellsIcon} title="Reports" />
        </div>
      </NeutralCard0>

      <div className="h-[400px]"></div>
    </div>
  );
};

const PanelCard = (props: {
  title: string;
  icon: DualIcon;
  className?: ClassName;
  children?: ReactNode;
}) => {
  return (
    <div className="flex h-[120px] flex-col rounded-xl border-[0.33px] border-dyan/50 bg-zap p-4 text-coal shadow-md">
      <div className="flex h-full w-full justify-between">
        <div className="font-mono text-xs opacity-80">{props.title}</div>
        <div>
          <props.icon className="size-4" />
        </div>
      </div>

      <div className="self-baseline">{props.children}</div>
    </div>
  );
};

type OptionName =
  | "received"
  | "processing"
  | "completed"
  | "voided"
  | "canceled";

const textColors: Record<OptionName, ClassName> = {
  received: "text-cyan-200",
  processing: "text-sky-400",
  completed: "text-teal-300",
  voided: "text-rose-300",
  canceled: "text-indigo-300",
};
const statusOptions: StatusOption[] = [
  {
    name: "received",
    label: "Received",
    action: () => onSuccess("Status update!", "status changed to received."),
  },
  {
    name: "processing",
    label: "Processing",
    action: () => onSuccess("Status update!", "status changed to processing."),
  },
  {
    name: "completed",
    label: "Completed",
    action: () => onSuccess("Status update!", "status changed to completed."),
  },
  {
    name: "voided",
    label: "Voided",
    action: () => onSuccess("Status update!", "status changed to voided."),
  },
  {
    name: "canceled",
    label: "Canceled",
    action: () => onSuccess("Status update!", "status changed to canceled."),
  },
];
const UpdateStatus = (props: { options: StatusOption[] }) => {
  const Icon = (props: { name: OptionName }) => iconSelector(props.name);
  return (
    <div className={cn("flex justify-center px-6")}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={`lg`}
            className="flex items-center space-x-3 rounded-2xl border border-dyan/60 bg-white px-2 py-5 text-sm font-semibold tracking-tight text-dyan opacity-100 drop-shadow-sm hover:bg-white hover:drop-shadow-md"
          >
            <div className="flex size-[28px] items-center justify-center rounded-xl bg-teal-500">
              <CursorArrowRippleIcon className="size-5 text-white" />
            </div>
            <div>Update status</div>
          </Button>
        </DropdownMenuTrigger>
        <BeachDrop align={"end"} className={dropContentStyle}>
          {props.options.map((option) => (
            <BeachDropItem
              key={option.name}
              selected={false}
              onClick={option.action}
              className="group"
            >
              <div className="flex items-center space-x-4 font-medium capitalize tracking-tight">
                <Icon name={option.name} />
                <p className={cn(`text-xs`, textColors[option.name])}>
                  {option.label}
                </p>
              </div>
            </BeachDropItem>
          ))}
        </BeachDrop>
      </DropdownMenu>
    </div>
  );
};

interface StatusOption {
  name: OptionName;
  label: string;
  action: VoidFunction;
}

const iconSelector = (option: OptionName) => {
  const iconStyle =
    "size-3.5 stroke-[1.5px] text-neutral-200 scale-[85%] group-hover:scale-100 transition-transform duration-200 ease-out";
  switch (option) {
    case "received":
      return <ChevronDoubleDownIcon className={cn(iconStyle)} />;
    case "processing":
      return <CogIcon className={cn(iconStyle, "")} />;
    case "completed":
      return <DocumentCheckIcon className={cn(iconStyle, "")} />;
    case "voided":
      return <MinusCircleIcon className={cn(iconStyle, "")} />;
    case "canceled":
      return <XCircleIcon className={cn(iconStyle, "")} />;
    default:
      return <ClockIcon className={cn(iconStyle, "")} />;
  }
};
const dropContentStyle = `
   portrait:mt-0.5 px-0 portrait:ml-0 portrait:mr-[17px] py-1 w-[150px] rounded-md shadow-md
  `;
