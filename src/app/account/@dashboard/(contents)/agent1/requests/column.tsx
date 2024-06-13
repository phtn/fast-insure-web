"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { copyFn } from "@/utils/helpers";
import Link from "next/link";
import { FileTextIcon, SettingsIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { type IDMRequestSchema } from "@/server/resource/idm";
import { PageLink } from "../../../(components)/table/page-link";
import { DateTimeCell } from "../../../(components)/table/datetime";
import { MoreOptions } from "../../../(components)/table/more-options";
import { statuses } from "../../../(components)/table/request-schemas";

export const columns: ColumnDef<IDMRequestSchema & { updatedAt: string }>[] = [
  {
    id: "pagelink",
    accessorKey: "pagelink",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="flex w-full justify-center"
      />
    ),
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return (
        <Link href={`/account/ctpl/${id}`} className="group">
          <PageLink page="ctpl" id={id}>
            <FileTextIcon className={"size-4 stroke-1 text-sky-600"} />
          </PageLink>
        </Link>
      );
    },
    enableSorting: false,
  },

  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Request Id"
        className="flex w-fit justify-end whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const id: string | undefined = row.getValue("id");

      const handleCopy = async () => {
        await copyFn({ name: "Request ID", text: id! });
      };
      return (
        <div
          onClick={handleCopy}
          className="group flex w-fit items-center justify-center text-xs"
        >
          <span className="cursor-pointer tracking-wide decoration-dashed underline-offset-4 group-hover:underline">
            {id?.substring(0, 8)}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "assuredName",
    accessorKey: "assuredName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Assured"
        className="flex justify-start"
      />
    ),
    cell: ({ row }) => {
      const assuredName: string = row.getValue("assuredName");

      return (
        <div className="flex items-center justify-start">
          <p className={"font-sans text-xs font-medium uppercase"}>
            {assuredName}
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
    id: "agent",
    accessorKey: "agentName",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-fit" column={column} title="Agent" />
    ),
    cell: (info) => {
      const agentName = info.getValue() as string;
      return (
        <div className="flex items-center justify-start">
          <p className={"font-sans text-xs font-normal tracking-tight"}>
            {agentName}
          </p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex justify-center"
        column={column}
        title="Submitted on"
      />
    ),
    cell: ({ row }) => {
      const submitted: string = row.getValue("updatedAt");

      return <DateTimeCell date={submitted} />;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "underwriter",
    accessorKey: "underwriterName",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex justify-center"
        column={column}
        title="Underwriter"
      />
    ),
    cell: (info) => {
      const underwriter = info.getValue() as string;
      return (
        <div className="flex items-center justify-center">
          <p className={"font-sans text-xs font-normal tracking-tight"}>
            {underwriter}
          </p>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-full justify-center"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (item) => item.value === String(row.getValue("status")),
      );

      const id: string = row.getValue("id");

      return (
        <Link
          href={`/account/activity/customers/${id}`}
          className="group flex justify-center"
        >
          <div
            className={cn(
              status?.cell,
              "flex h-8 w-fit items-center justify-center space-x-2 rounded-[8px] px-2 font-sans text-xs font-medium tracking-tight",
            )}
          >
            {status?.icon && <status.icon className="size-4 opacity-70" />}
            <p className={cn(status?.color)}>{status?.label}</p>
          </div>
        </Link>
      );
    },
    filterFn: (row, value, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(value)));
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
    cell: () => {
      return <MoreOptions options={[]} />;
    },
    enableSorting: false,
  },
];
