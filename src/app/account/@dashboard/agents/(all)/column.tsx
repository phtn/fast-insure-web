"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { SettingsIcon, UserCircleIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  pagelinkCell,
  pagelinkHeader,
} from "../../(components)/table/page-link";
import { DateTimeCell, dateHeader } from "../../(components)/table/datetime";
import { MoreOptions } from "../../(components)/table/more-options";
import { statuses } from "../../(components)/table/agent-schemas";
import { type UserProfileSchema } from "@/server/resource/account";
import {
  nameCell,
  nameCellWithCopy,
  nameHeader,
} from "../../(components)/table/name-cells";

export const columns: ColumnDef<UserProfileSchema>[] = [
  {
    id: "userId",
    accessorKey: "userId",
    header: pagelinkHeader({ icon: UserCircleIcon }),
    cell: pagelinkCell({ icon: UserCircleIcon, page: `agent` }),
    enableSorting: false,
  },
  {
    id: "displayName",
    accessorKey: "displayName",
    header: nameHeader("Name"),
    cell: nameCell("displayName"),
    enableHiding: true,
    enableSorting: false,
    filterFn: (row, value, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(value)));
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: nameHeader("Email"),
    cell: nameCellWithCopy({ name: "Email", text: "email", limit: 16 }),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: nameHeader("Phone"),
    cell: nameCellWithCopy({ name: "Phone", text: "phone", limit: 13 }),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "active",
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-[80px] justify-center"
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (item) => item.value === String(row.getValue("active")),
      );
      return (
        <div
          className={cn(
            status?.cell,
            "flex h-6 items-center justify-center space-x-2 rounded-[8px] font-sans text-xs tracking-tight",
          )}
        >
          {status?.icon && <status.icon className={cn(status.color)} />}
          <p className={cn()}>{status?.label}</p>
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
    id: "createdAt",
    accessorKey: "createdAt",
    header: dateHeader("Joined"),
    cell: ({ row }) => {
      const joined: string = row.getValue("createdAt");
      return <DateTimeCell date={joined} />;
    },
    enableSorting: true,
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
