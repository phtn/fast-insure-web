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
import { type CellContext } from "@tanstack/react-table";
import { useUpdateService } from "../../(hooks)/useUpdateService";

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
        <BeachDrop align={"end"} className={dropContentStyle}>
          {options.map((option) => (
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

const textColors = {
  create: "text-cyan-100",
  read: "text-cyan-100",
  update: "text-amber-100",
  delete: "text-rose-400",
  disable: "text-indigo-300",
};

const iconSelector = (option: OptionName) => {
  const iconStyle =
    "size-3.5 stroke-[1.5px] text-neutral-300 scale-[85%] group-hover:scale-100 transition-transform duration-200 ease-out";
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
   portrait:mt-0.5 px-0 portrait:ml-0 portrait:mr-[17px] py-1 w-fit rounded-md shadow-md
  `;

/* eslint-disable react/display-name */
export const activityOptions =
  (prop: string) =>
  <T,>({ row }: CellContext<T, unknown>) => {
    const id: string | undefined = row.getValue(prop);
    const { handleUpdateRequest } = useUpdateService();
    return (
      <MoreOptions
        options={[
          {
            action: handleUpdateRequest({
              id,
              payload: { active: false },
              message: "Item deleted.",
            }),
            label: "delete",
            name: "delete",
          },
        ]}
      />
    );
  };

/* eslint-disable react/display-name */
export const codesOptions =
  (prop: string) =>
  <T,>({ row }: CellContext<T, unknown>) => {
    const { handleUpdateCode } = useUpdateService();
    const id: string | undefined = row.getValue(prop);
    const status: string | undefined = row.getValue("active");
    const disableOption: MoreOption = !!status
      ? {
          action: handleUpdateCode({
            id,
            payload: { active: false },
            message: `Code: ${id?.substring(0, 9).toUpperCase()} deactivated.`,
          }),
          label: "Deactivate",
          name: "disable",
        }
      : {
          action: handleUpdateCode({
            id,
            payload: { active: true },
            message: `Code: ${id?.substring(0, 9).toUpperCase()} activated.`,
          }),
          label: "Activate",
          name: "read",
        };
    return (
      <MoreOptions
        options={[
          disableOption,
          {
            action: handleUpdateCode({
              id,
              payload: { active: false },
              message: `Code: ${id?.substring(0, 9).toUpperCase()} deleted.`,
            }),
            label: "delete",
            name: "delete",
          },
        ]}
      />
    );
  };
