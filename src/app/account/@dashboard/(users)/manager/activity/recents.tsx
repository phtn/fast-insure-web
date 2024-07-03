"use client";

import { Button } from "@/app/(ui)/button";
import { cn } from "@/utils/cn";
import { ChevronRightIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { HistoryIcon } from "lucide-react";

export const Recents = (props: {
  visible: boolean;
  onToggle: VoidFunction;
}) => {
  return (
    <div
      className={cn(
        "flex h-full overflow-x-clip border-t-[0.33px] border-dyan/20 bg-gradient-to-b from-white via-white to-transparent py-3 transition-all duration-500 ease-out portrait:hidden",
        props.visible ? "w-full" : "w-[0px]",
      )}
    >
      <div className="h-[calc(100vh-230px)] w-full space-y-3">
        <div className="flex w-full justify-between px-4">
          <div className="flex items-center space-x-2 text-teal-600">
            <HistoryIcon className="size-4 stroke-1" />
            <p className="font-sans text-xs tracking-tight">Timeline</p>
          </div>
          <Button size={`icon`} variant={`ghost`} onClick={props.onToggle}>
            <ChevronRightIcon className="size-4" />
          </Button>
        </div>

        <div className="flex h-[calc(100vh-200px)] w-full flex-col overflow-y-scroll p-2">
          {/*  */}
          <div className="flex w-full">
            <div className="-ml-[2.5px] flex flex-col">
              <QrCodeIcon className="size-4 shrink-0 stroke-[1.5px] text-indigo-500" />
              <div className="mx-[6.5px] my-[4px] h-full w-[2.5px] rounded-sm bg-neutral-200" />
            </div>
            <div className="-mt-2 mb-6 ml-2 w-full space-y-2 rounded border-[0.33px] border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-white p-2 shadow-sm shadow-indigo-50">
              <div className="flex w-full justify-between text-[10px]">
                <div className="tracking-tighter opacity-70">
                  Agent code created
                </div>
                <div className="text-mono text-[9px] text-dyan/50">1hr ago</div>
              </div>
              <div className="text-xs font-medium text-indigo-800">
                RE-WHDMKX
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex w-full">
            <div className="-ml-[2.5px] flex flex-col">
              <div className="mx-[3.5px] size-2 shrink-0 rounded-sm bg-neutral-200 stroke-[1.5px] text-amber-400" />
              <div className="mx-[6.5px] my-[4px] h-full w-[2.5px] rounded-sm bg-neutral-200" />
            </div>
            <div className="-mt-2 mb-6 ml-2 w-full p-1">
              <div className="flex w-full items-end justify-between text-[11px]">
                <div className="italic tracking-tight opacity-70">
                  Draft updated
                </div>
                <div className="text-mono text-[9px] text-dyan/50">
                  2hrs ago
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex w-full">
            <div className="-ml-[2.5px] flex flex-col">
              <DocumentTextIcon className="size-4 shrink-0 stroke-[1.5px] text-amber-400" />
              <div className="mx-[6.5px] my-[4px] h-full w-[2.5px] rounded-sm bg-neutral-200" />
            </div>
            <div className="-mt-2 mb-6 ml-2 w-full space-y-2 rounded border-[0.33px] border-neutral-200 bg-gradient-to-br from-neutral-50 via-white to-white p-2 shadow-sm shadow-neutral-50">
              <div className="flex w-full justify-between text-[10px]">
                <div className="tracking-tighter opacity-70">Draft created</div>
                <div className="text-mono text-[9px] text-dyan/50">
                  3hrs ago
                </div>
              </div>
              <div className="text-xs text-amber-950">Assured: Test</div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};
