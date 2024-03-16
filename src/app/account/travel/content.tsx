"use client";

import { DarkTouch } from "@/app/_components/touch";
import { ArrowRightIcon } from "lucide-react";

export const ProtectionContent = () => {
  return (
    <div className="h-fit px-8 md:px-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="grid h-[300px] grid-cols-3 overflow-clip rounded-xl bg-white">
          <div className="flex justify-end">
            <div className="flex flex-col items-start justify-center bg-gradient-to-br from-sky-400 to-indigo-600 bg-clip-text p-4 text-transparent">
              <h3 className="text-3xl font-extrabold">International</h3>
              <h3 className="text-3xl font-medium tracking-tight">
                Protection
              </h3>
              <div className="mt-4">
                <DarkTouch size="lg" tail={ArrowRightIcon} className="z-50">
                  Get Protected
                </DarkTouch>
              </div>
            </div>
          </div>
          <div
            className={`col-span-2 bg-[url('/svg/world.svg')] bg-cover transition-all duration-500 hover:scale-[150%]`}
          ></div>
        </div>

        <div className="grid h-[300px] grid-cols-3 overflow-clip rounded-xl bg-white">
          <div className="flex justify-end">
            <div className="flex flex-col items-start justify-center bg-gradient-to-br from-indigo-500 to-rose-500 bg-clip-text p-4 text-transparent">
              <h3 className="text-3xl font-extrabold">Domestic</h3>
              <h3 className="text-3xl font-medium tracking-tight">
                Protection
              </h3>
              <div className="mt-4">
                <DarkTouch size="lg" tail={ArrowRightIcon} className="z-50">
                  Get Protected
                </DarkTouch>
              </div>
            </div>
          </div>
          <div
            className={`col-span-2 scale-[110%] bg-[url('/svg/ph.svg')] bg-cover transition-all duration-500 hover:scale-[150%]`}
          ></div>
        </div>
      </div>
    </div>
  );
};
