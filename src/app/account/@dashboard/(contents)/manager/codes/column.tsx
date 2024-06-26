"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { copyFn } from "@/utils/helpers";
import { SettingsIcon } from "lucide-react";
import { colorcodes } from "./schema";
import { cn } from "@/utils/cn";
import { dateCell, dateHeader } from "../../../(components)/table/datetime";
import { MoreOptions } from "../../../(components)/table/more-options";
import type { CodeDataSchema } from "@/server/resource/code";
import {
  nameCellHeaderWide,
  nameCellWithCopy,
  nameCellWithInitials,
  nameHeader,
  nameHeaderFit,
  statusCell,
} from "../../../(components)/table/name-cells";
import { pagelinkHeader } from "../../../(components)/table/page-link";
import { activeStates } from "../../../(components)/table/status-schemas";

export const columns: ColumnDef<CodeDataSchema>[] = [
  {
    id: "code",
    accessorKey: "code",
    header: nameHeaderFit("Codes"),
    cell: ({ row }) => {
      const createdAt = String(row.getValue("createdAt"));
      const color = colorcodes.find(
        (item) => item.value === createdAt?.slice(-1),
      );
      const code: string = row.getValue("code");

      const handleCopy = async () => {
        await copyFn({
          name: "Code",
          text: code.substring(0, 6).toUpperCase(),
        });
      };
      return (
        <div
          onClick={handleCopy}
          className="group flex w-fit items-center justify-center font-k2d text-[16px] font-semibold"
        >
          <p className={cn(`rounded`, color?.cell)}>
            <span
              className={cn(
                "cursor-pointer p-0.5 uppercase tracking-wider text-black",
                color?.color,
              )}
            >
              {code}
            </span>
          </p>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "assignedName",
    accessorKey: "assignedName",
    header: nameHeader("Agent"),
    cell: nameCellWithInitials("assignedName"),
    enableHiding: true,
    enableSorting: false,
  },
  {
    id: "active",
    accessorKey: "active",
    header: nameCellHeaderWide("Status"),
    cell: statusCell({ id: "active", schema: activeStates }),
    filterFn: (row, value, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(value)));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: dateHeader("Created"),
    cell: dateCell("createdAt"),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "dateAssigned",
    accessorKey: "dateAssigned",
    header: dateHeader("Activation"),
    cell: dateCell("dateAssigned"),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "createdBy",
    accessorKey: "createdBy",
    header: nameHeader("Created by"),
    cell: nameCellWithCopy({ name: "Created by", text: "createdBy" }),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "id",
    accessorKey: "id",
    header: pagelinkHeader({ icon: SettingsIcon }),
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <MoreOptions
          options={[
            {
              action: () => console.log(id),
              label: "Copy",
              name: "update",
            },
            {
              action: () => console.log(id),
              label: "Disable",
              name: "disable",
            },
            {
              action: () => console.log(id),
              label: "Revoke",
              name: "delete",
            },
          ]}
        />
      );
    },
    enableSorting: false,
  },
];
