"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { copyFn, getInitials } from "@/utils/helpers";
import { SettingsIcon } from "lucide-react";
import { colorcodes } from "./schema";
import { cn } from "@/utils/cn";
import { DateTimeCell, dateHeader } from "../../../(components)/table/datetime";
import { MoreOptions } from "../../../(components)/table/more-options";
import type { CodeDataSchema } from "@/server/resource/code";

export const columns: ColumnDef<CodeDataSchema>[] = [
  {
    id: "code",
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Codes"
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
          className="group flex w-fit items-center justify-center font-k2d text-[16px] font-semibold blur-[3px]"
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
    accessorKey: "assignedName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Agent"
        className="flex justify-start"
      />
    ),
    cell: ({ row }) => {
      const agentName: string | undefined = row.getValue("assignedName");

      return (
        <div className="flex flex-col items-start justify-center -space-y-1 text-xs">
          <p
            className={cn(
              `max-w-[10ch] whitespace-nowrap portrait:tracking-tight`,
              agentName
                ? `font-sans font-medium text-void`
                : `font-light text-clay`,
            )}
          >
            {agentName ? (
              <span className="mr-2 rounded bg-fast p-0.5 font-bold uppercase text-zap">
                {getInitials(agentName)}
              </span>
            ) : null}
            {agentName ?? "unassigned"}
          </p>
          {/* <p className="text-[9px]">{agentId?.substring(0, 14)}</p> */}
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
              "rounded-lg border p-1 font-sans text-xs tracking-tight",
              status
                ? `border-blue-300 font-normal text-blue-500 shadow-sm`
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
    header: dateHeader("Created"),
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      return <DateTimeCell date={createdAt} />;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "dateAssigned",
    accessorKey: "dateAssigned",
    header: dateHeader("Activation"),
    cell: ({ row }) => {
      const activation: string = row.getValue("dateAssigned");
      return <DateTimeCell date={activation} />;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "createdBy",
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-fit justify-center"
        column={column}
        title="Created by"
      />
    ),
    cell: (info) => {
      const createdBy = info.getValue() as string;
      return (
        <div className="flex w-fit items-center justify-center">
          <p
            className={"font-mono text-xs font-medium uppercase tracking-wider"}
          >
            {createdBy.substring(0, 8)}
          </p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="flex w-full justify-center"
        element={<SettingsIcon className="size-4 text-white/70" />}
      />
    ),
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
