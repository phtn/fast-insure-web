import { DarkTouch } from "@/app/_components/touch";
import { CheckCircle2Icon, ZapIcon } from "lucide-react";
import { type VehicleSchema } from "./active-form";

interface AutoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  autoItem: VehicleSchema;
}

export const AutoItem = ({ autoItem, ...props }: AutoItemProps) => {
  return (
    <div
      className="h-[350px] w-[350px] space-y-2 overflow-clip rounded-xl border"
      {...props}
    >
      <div className="object-fit h-[256px] w-full border-[1px] border-ash/[30%] bg-[url('/icons/fast_blue.svg')] bg-cover bg-center shadow-i-br-li"></div>
      <div className="flex h-[75px] items-center justify-between p-4">
        <div className="space-y-1 text-sm">
          <h3 className="font-semibold leading-none tracking-tight text-coal">
            {autoItem.name}
          </h3>
          <p className="text-xs text-clay">{autoItem.make}</p>
        </div>
        {autoItem.isActive ? (
          <DarkTouch
            size="md"
            variant="secondary"
            className="h-[52px] "
            tail={CheckCircle2Icon}
          >
            Active
          </DarkTouch>
        ) : (
          <DarkTouch size="md" tail={ZapIcon}>
            Activate
          </DarkTouch>
        )}
      </div>
    </div>
  );
};
