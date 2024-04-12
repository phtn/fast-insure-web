import { CheckCircle2Icon, ChevronRightIcon, Disc3Icon } from "lucide-react";
import { type VehicleSchema } from "./active-form";
import { DarkTouch } from "@/app/(ui)/touch";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useState } from "react";

// import { payload } from "./data";

interface AutoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  autoItem: VehicleSchema;
}

export const AutoItem = ({ autoItem, ...props }: AutoItemProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <div {...props} className="h-full">
      <div className="w-full overflow-hidden rounded-md border-[0.33px] border-clay/40 bg-ash/40">
        <div className="object-fit h-[200px] w-full bg-[url('/icons/fast_blue.svg')] bg-cover bg-center" />
        <div className="border-t-[0.33px] border-ash bg-[url('/images/wc.png')] bg-cover">
          <div className="flex h-[75px] items-center justify-between bg-ash/10 p-4 backdrop-blur-md">
            <ItemInfo title={autoItem.name} subtext={autoItem.make} />
            {autoItem.isActive ? (
              <div className="flex items-center space-x-2 text-sm font-semibold tracking-tighter text-prime ">
                <p>Active</p>
                <CheckCircle2Icon className="size-4" />
              </div>
            ) : (
              <Link href={`/account/${autoItem.id}`}>
                <DarkTouch
                  size="md"
                  tail={loading ? Disc3Icon : ChevronRightIcon}
                  className="group transition-all duration-300 ease-out"
                  onClick={() => setLoading(true)}
                  tailClass={cn(
                    loading
                      ? `animate-spin`
                      : `h-0 w-0 group-hover:size-5 text-blue-400 transition-all duration-300 ease-out`,
                  )}
                >
                  Get Insurance
                </DarkTouch>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type ItemInfoProps = {
  title: string | undefined;
  subtext: string | undefined;
};
const ItemInfo = ({ title, subtext }: ItemInfoProps) => (
  <div className="space-y-1 text-sm">
    <h3 className="font-semibold leading-none tracking-tight text-void">
      {title}
    </h3>
    <p className="text-xs font-medium tracking-tight text-clay">{subtext}</p>
  </div>
);
