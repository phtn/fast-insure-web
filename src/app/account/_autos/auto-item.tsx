import { DarkTouch, Touch } from "@/app/_components/touch";
import { type VehicleSchema } from "./active-form";
import { ArrowRightIcon } from "lucide-react";

interface AutoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  autoItem: VehicleSchema;
}

export const AutoItem = ({ autoItem, ...props }: AutoItemProps) => {
  return (
    <div
      className="h-[350px] w-[350px] space-y-2 rounded-xl border p-[8px]"
      {...props}
    >
      <div className="object-fit h-[256px] w-full rounded-lg border-[1px] border-ash/[30%] bg-[url('/icons/fast_blue.svg')] bg-cover bg-center shadow-i-br-li"></div>
      <div className="flex h-[75px] items-center justify-between">
        <div className="space-y-1 text-sm">
          <h3 className="font-semibold leading-none text-coal">
            {autoItem.auto_name}
          </h3>
          <p className="text-xs text-clay">{autoItem.make}</p>
        </div>
        {autoItem.isActive ? (
          <Touch size="sm">View Status</Touch>
        ) : (
          <DarkTouch size="md" tail={ArrowRightIcon}>
            Activate
          </DarkTouch>
        )}
      </div>
    </div>
  );
};
