"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { copyFn } from "@/utils/helpers";
import { SettingsIcon } from "lucide-react";
import { colorcodes } from "./schema";
import { cn } from "@/utils/cn";
import { DateTimeCell } from "../../../(components)/table/datetime";
import { MoreOptions } from "../../../(components)/table/more-options";
import { type AgentCodeSchema } from "@/server/resource/account";

export const columns: ColumnDef<AgentCodeSchema>[] = [
  {
    id: "code",
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Code"
        className="flex w-fit justify-end"
      />
    ),
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
                "cursor-pointer p-0.5 uppercase tracking-wider",
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
    id: "agentAssigned",
    accessorKey: "agentAssigned",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Assigned to"
        className="flex justify-start"
      />
    ),
    cell: ({ row }) => {
      const agentAssigned: string = row.getValue("agentAssigned");

      return (
        <div className="flex items-center justify-start">
          <p className={"font-sans text-xs text-gray-500"}>
            {agentAssigned ?? `unassigned`}
          </p>
        </div>
      );
    },
    filterFn: (row, value, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(value)));
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    id: "active",
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-fit" column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: boolean = row.getValue("active");
      return (
        <div className="flex items-center justify-start">
          <p
            className={cn(
              "rounded-lg border p-1.5 font-sans text-xs tracking-tight",
              status
                ? `border-blue-300 font-normal text-blue-400 shadow-sm`
                : `text-gray-400`,
            )}
          >
            {status ? "active" : "inactive"}
          </p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex justify-center"
        column={column}
        title="Created on"
      />
    ),
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");

      return <DateTimeCell date={createdAt} />;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "createdBy",
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex justify-center"
        column={column}
        title="Created by"
      />
    ),
    cell: (info) => {
      const createdBy = info.getValue() as string;
      return (
        <div className="flex items-center justify-center">
          <p
            className={"font-mono text-xs font-medium uppercase tracking-wider"}
          >
            {createdBy.substring(0, 10)}
          </p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "more",
    accessorKey: "more",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="flex justify-center"
        element={<SettingsIcon className="size-4 text-white/70" />}
      />
    ),
    cell: ({ row }) => {
      return (
        <MoreOptions
          id={row.getValue("id")}
          removeItem={() => console.log("removed")}
        />
      );
    },
    enableSorting: false,
  },
];
