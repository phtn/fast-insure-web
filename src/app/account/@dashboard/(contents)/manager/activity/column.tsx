"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { SettingsIcon } from "lucide-react";

import { type IDMRequestSchema } from "@/server/resource/idm";
import {
  pagelinkCell,
  pagelinkHeader,
} from "../../../(components)/table/page-link";
import { dateCell, dateHeader } from "../../../(components)/table/datetime";
import { MoreOptions } from "../../../(components)/table/more-options";
import { statuses } from "../../../(components)/table/request-schemas";
import {
  nameCell,
  nameCellHeaderWide,
  nameCellWithCopy,
  nameHeader,
  statusCell,
} from "../../../(components)/table/name-cells";
import { PencilIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export const columns: ColumnDef<IDMRequestSchema & { updatedAt: string }>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: pagelinkHeader({ icon: PencilSquareIcon }),
    cell: pagelinkCell({
      icon: PencilIcon,
      page: "account/request",
    }),
    enableSorting: false,
  },
  {
    id: "ref",
    accessorKey: "ref",
    header: nameHeader("Request Id"),
    cell: nameCellWithCopy({ name: "Request Id", text: "id" }),
    enableSorting: false,
  },
  {
    id: "assuredName",
    accessorKey: "assuredName",
    header: nameHeader("Assured Name"),
    cell: nameCell("assuredName"),
    filterFn: (row, value, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(value)));
    },
    enableHiding: true,
    enableSorting: false,
  },
  {
    id: "agent",
    accessorKey: "agentName",
    header: nameHeader("Agent"),
    cell: nameCell("agent"),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "underwriter",
    accessorKey: "underwriterName",
    header: nameHeader("Underwriter"),
    cell: nameCell("underwriter"),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: dateHeader("Submitted on"),
    cell: dateCell("updatedAt"),
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "status",
    accessorKey: "status",
    header: nameCellHeaderWide("Status"),
    cell: statusCell({ statuses, url: "requests" }),
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
        className="flex w-8 justify-center"
        element={<SettingsIcon className="size-4 text-white/70" />}
      />
    ),
    cell: () => {
      return <MoreOptions options={[]} />;
    },
    enableSorting: false,
  },
];
