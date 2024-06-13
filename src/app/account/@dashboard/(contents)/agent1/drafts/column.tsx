"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import Link from "next/link";
import { FilePenLineIcon, PencilLineIcon, SettingsIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { PageLink } from "../../../(components)/table/page-link";
import { DateTimeCell } from "../../../(components)/table/datetime";
import { MoreOptions } from "../../../(components)/table/more-options";
import { type IDMRequestSchema } from "@/server/resource/idm";
import { statuses } from "../../../(components)/table/request-schemas";

export const columns: ColumnDef<IDMRequestSchema>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="flex w-full justify-center"
        element={<PencilLineIcon className="size-4 text-ghost/70" />}
      />
    ),
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return (
        <Link href={`/account/request/${id}`} className="group">
          <PageLink page="request" id={id}>
            <FilePenLineIcon className={"size-4 stroke-1 text-sky-700"} />
          </PageLink>
        </Link>
      );
    },
    enableSorting: false,
  },
  {
    id: "requestId",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="w-full whitespace-nowrap"
        title="Request Id"
      />
    ),
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return <p className="text-xs">{id.substring(0, 8)}</p>;
    },
    enableSorting: false,
  },
  {
    id: "assuredName",
    accessorKey: "assuredName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Assured Name"
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
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created"
        className="m-0 flex justify-center"
      />
    ),
    cell: ({ row }) => {
      const createdAt: string | undefined = row.getValue("createdAt");
      return <DateTimeCell date={createdAt} />;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-[72px] justify-center"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (item) => item.value === String(row.getValue("status")),
      );

      return (
        <div
          className={cn(
            status?.cell,
            "flex w-[72px] items-center justify-center space-x-2 rounded-[8px] px-1 py-1.5 font-sans font-medium tracking-tight",
          )}
        >
          {status?.icon && <status.icon className="size-3" />}
          <p className={cn(status?.color)}>{status?.label}</p>
        </div>
      );
    },
    filterFn: (row, value, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(value)));
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
        className="flex justify-center"
        element={<SettingsIcon className="size-4 text-ghost/70" />}
      />
    ),

    cell: () => {
      return (
        <MoreOptions
          options={[
            {
              name: "update",
              label: "Edit draft",
              action: () => {
                console.log("");
              },
            },
          ]}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
