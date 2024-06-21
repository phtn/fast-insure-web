"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { type Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/app/(ui)/dropdown";
import { RepeatIcon, Settings2 } from "lucide-react";
import { Button } from "@/app/(ui)/button";
import { BeachCheckItem, BeachDrop } from "../../../(components)/table/styles";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="flex h-[36px] items-center space-x-1.5 rounded-md px-2 text-xs"
        >
          <Settings2 className="size-4 stroke-1 text-gray-500" />
          <p>View</p>
        </Button>
      </DropdownMenuTrigger>
      <BeachDrop align="end">
        <DropdownMenuLabel className="flex h-[45px] items-center space-x-2 px-2.5">
          <RepeatIcon className="size-3 -rotate-45 text-sky-400" />
          <p className="tracking-tighter text-sky-300">Toggle Columns</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0 h-[0.33px] bg-opus/20" />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <BeachCheckItem
                selected={!column.getIsVisible()}
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                <span className="text-sky-50">{column.id}</span>
              </BeachCheckItem>
            );
          })}
      </BeachDrop>
    </DropdownMenu>
  );
}
