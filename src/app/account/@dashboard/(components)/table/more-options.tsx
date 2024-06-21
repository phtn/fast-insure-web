import { DropdownMenu, DropdownMenuTrigger } from "@/app/(ui)/dropdown";
import { cn } from "@/utils/cn";
import {
  MoreHorizontalIcon,
  Trash2Icon,
  PlusIcon,
  MousePointerSquareIcon,
  ArrowUpLeftIcon,
  PencilLineIcon,
  MinusCircleIcon,
} from "lucide-react";
import { ActiveOptions, BeachDrop, BeachDropItem } from "./styles";

type OptionName = "create" | "read" | "update" | "delete" | "disable";
type MoreOption = {
  name: OptionName;
  label: string;
  action: VoidFunction;
};

type MoreOptionProps = {
  options: MoreOption[];
  className?: string;
};
export const MoreOptions = (props: MoreOptionProps) => {
  const { options } = props;

  const Icon = (props: { name: OptionName }) => iconSelector(props.name);

  return (
    <div className={cn("flex justify-center", props?.className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ActiveOptions variant="ghost">
            <MoreHorizontalIcon className="size-4" />
          </ActiveOptions>
        </DropdownMenuTrigger>
        <BeachDrop align={"start"} className={dropContentStyle}>
          {options.map((option) => (
            <BeachDropItem
              key={option.name}
              selected={false}
              onClick={option.action}
              className="group "
            >
              <div className="flex items-center space-x-4 font-medium tracking-tight">
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

const textColors = {
  create: "text-cyan-100",
  read: "text-cyan-100",
  update: "text-cyan-100",
  delete: "text-rose-300",
  disable: "text-indigo-300",
};

const iconSelector = (option: OptionName) => {
  const iconStyle =
    "size-3.5 stroke-[1.5px] text-ghost scale-[85%] group-hover:scale-100 transition-transform duration-200 ease-out";
  switch (option) {
    case "create":
      return <PlusIcon className={cn(iconStyle)} />;
    case "read":
      return <MousePointerSquareIcon className={cn(iconStyle, "")} />;
    case "update":
      return <PencilLineIcon className={cn(iconStyle, "")} />;
    case "delete":
      return <Trash2Icon className={cn(iconStyle, "")} />;
    case "disable":
      return <MinusCircleIcon className={cn(iconStyle, "")} />;
    default:
      return <ArrowUpLeftIcon className={cn(iconStyle, "")} />;
  }
};

const dropContentStyle = `
   portrait:mt-0.5 portrait:ml-0 portrait:mr-[17px] w-fit rounded-md shadow-md
  `;
//-mt-[22px] ml-[35.20px]
