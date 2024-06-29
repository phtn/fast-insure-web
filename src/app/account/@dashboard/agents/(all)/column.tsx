"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { UserCircleIcon } from "lucide-react";
import {
  pagelinkCell,
  pagelinkHeader,
} from "../../(components)/table/page-link";
import { DateTimeCell, dateHeader } from "../../(components)/table/datetime";
import { MoreOptions } from "../../(components)/table/more-options";
import { type UserProfileSchema } from "@/server/resource/account";
import {
  nameCell,
  nameCellHeaderWide,
  nameCellWithCopy,
  nameHeader,
  statusCell,
} from "../../(components)/table/name-cells";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { activeStates } from "../../(components)/table/status-schemas";

export const columns: ColumnDef<UserProfileSchema>[] = [
  {
    id: "userId",
    accessorKey: "userId",
    header: pagelinkHeader({ icon: UserCircleIcon }),
    cell: pagelinkCell({
      icon: UserCircleIcon,
      primaryRoute: "account/agent",
      id: "userId",
    }),
    enableSorting: false,
  },
  {
    id: "displayName",
    accessorKey: "displayName",
    header: nameHeader("Name"),
    cell: nameCell("displayName"),
    enableHiding: true,
    enableSorting: false,
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
    header: pagelinkHeader({ icon: Cog8ToothIcon }),
    cell: () => {
      return <MoreOptions options={[]} />;
    },
    enableSorting: false,
  },
];
