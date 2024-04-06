import { CheckCircle2Icon } from "lucide-react";
import { type VehicleSchema } from "./active-form";
import { useCheckout } from "./hooks";
import { PaymentOptions } from "../(components)/payments";
// import { createCheckoutSession } from "@/server/icash/checkout";
// import { payload } from "./data";

interface AutoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  autoItem: VehicleSchema;
}

export const AutoItem = ({ autoItem, ...props }: AutoItemProps) => {
  const { handleCheckout, loading } = useCheckout({ autoItem });
  return (
    <div {...props} className="h-full">
      <div className="w-full overflow-hidden rounded-md border-[0.33px] border-clay/40 bg-ash/40 md:h-[332px]">
        <div className="object-fit h-[256px] w-full bg-[url('/icons/fast_blue.svg')] bg-cover bg-center"></div>
        <div className="border-t-[0.33px] border-ash bg-[url('/images/wc.png')] bg-cover">
          <div className="flex h-[75px] items-center justify-between bg-ash/10 p-4 backdrop-blur-md">
            <div className="space-y-1 text-sm ">
              <h3 className="font-semibold leading-none tracking-tight text-void">
                {autoItem.name}
              </h3>
              <p className="text-xs font-medium tracking-tight text-clay">
                {autoItem.make}
              </p>
            </div>
            {autoItem.isActive ? (
              <div className="flex items-center space-x-2 text-sm font-semibold tracking-tighter text-prime ">
                <p>Active</p>
                <CheckCircle2Icon className="size-4" />
              </div>
            ) : (
              <PaymentOptions handleICash={handleCheckout} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
