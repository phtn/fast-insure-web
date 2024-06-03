import { DropdownMenu, DropdownMenuTrigger } from "@/app/(ui)/dropdown";
import { cn } from "@/utils/cn";
import { PencilIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { ActiveOptions, BeachDrop, BeachDropItem } from "./styles";
import { useRouter } from "next/navigation";

type MoreOptionProps = {
  className?: string;
  removeItem: (id: string | undefined) => void;
  id: string | undefined;
};
export const MoreOptions = (props: MoreOptionProps) => {
  const route = useRouter();
  const handleRemoveItem = () => props.removeItem(props.id);
  const handleRoute = () => {
    route.push(`/account/request/${props.id}`);
  };
  return (
    <div className={cn("flex justify-center", props.className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ActiveOptions variant="ghost">
            <MoreHorizontalIcon className="size-4" />
          </ActiveOptions>
        </DropdownMenuTrigger>
        <BeachDrop align={"start"} className={dropContentStyle}>
          <BeachDropItem selected={false} onClick={handleRoute}>
            <div className="flex items-center space-x-4 font-medium text-indigo-300">
              <div className="rounded-[4px] p-0.5">
                <PencilIcon className="size-3.5 text-white" />
              </div>
              <span className="">Edit draft</span>
            </div>
          </BeachDropItem>
          <BeachDropItem selected={false} onClick={handleRemoveItem}>
            <div className="flex items-center space-x-4 font-medium text-rose-300">
              <div className="rounded-[4px] p-0.5">
                <Trash2Icon className="size-3.5 text-white" />
              </div>
              <span className="">Delete item</span>
            </div>
          </BeachDropItem>
        </BeachDrop>
      </DropdownMenu>
    </div>
  );
};

const dropContentStyle = `
  -mt-[28px] ml-[33.20px] w-fit rounded-tl-none shadow-md
  data-[state=open]:animate-in data-[state=closed]:animate-out
  `;
