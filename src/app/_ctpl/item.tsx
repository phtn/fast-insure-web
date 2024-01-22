import { Button } from "../_components/button";
import { decimal } from "@/utils/helpers";
import { type Packages } from "./data";
import { CarIcon } from "lucide-react";

export const Item = (props: Packages) => {
  const { id, title, description, price } = props;
  return (
    <div
      className="flex flex-col rounded-lg border border-blue-950/50 bg-gradient-to-br from-white to-blue-50 p-2 drop-shadow-sm transition-all duration-300 hover:scale-105 md:h-[175px]"
      key={id}
    >
      <div className="flex h-[44px] items-center justify-between border-b border-slate-500">
        <p className="font-bold tracking-tighter">{title}</p>
        <div className="flex h-[44px] w-[44px] items-center justify-center rounded border-0 border-blue-800">
          <CarIcon />
        </div>
      </div>
      <div className="h-[32px] border-0 border-orange-500 py-1">
        <p className="text-[14px]">{description}</p>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex h-[48px] w-full items-center justify-center border-0 border-blue-500">
          <p className="text-xl font-bold tracking-tighter text-blue-950">
            ₱ {decimal(price, 0)}
          </p>
        </div>
      </div>
      <div className="flex h-full items-center justify-center">
        <Button className="w-full">Select</Button>
      </div>
    </div>
  );
};
