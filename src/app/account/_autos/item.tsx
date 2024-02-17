import Image from "next/image";

import { cn } from "@/utils/cn";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@@components/context-menu";

import { type PrimaryAutoInfo, playlists } from "./data";
import { ArrowRightIcon, PlusCircleIcon } from "lucide-react";
import { type VehicleSchema } from "./active-form";
import { Touch } from "@/app/_components/touch";

interface AccountItemProps extends React.HTMLAttributes<HTMLDivElement> {
  vehicleItem: PrimaryAutoInfo & VehicleSchema;
  aspectRatio?: "landscape" | "square";
  width?: number;
  height?: number;
}

export function AccountItem({
  vehicleItem,
  aspectRatio = "landscape",
  width,
  height,
  className,
  ...props
}: AccountItemProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden">
            <Image
              src={"/icons/icon_metal_512.png"}
              alt={"alt"}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "landscape" ? "aspect-[3/4]" : "aspect-square",
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>View details</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Edit</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                New Image
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>One</ContextMenuItem>
          <ContextMenuItem>Two</ContextMenuItem>
          <ContextMenuItem>Three</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Four</ContextMenuItem>
          <ContextMenuItem>Five</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="flex items-center justify-between">
        <div className="space-y-1 text-sm">
          <h3 className="font-semibold leading-none text-coal">
            {vehicleItem.auto_name}
          </h3>
          <p className="text-xs text-clay">{vehicleItem.make}</p>
        </div>
        {vehicleItem.isActive ? (
          <Touch size="sm">View Status</Touch>
        ) : (
          <Touch size="md" tail={ArrowRightIcon} variant="primary">
            Activate
          </Touch>
        )}
      </div>
    </div>
  );
}
