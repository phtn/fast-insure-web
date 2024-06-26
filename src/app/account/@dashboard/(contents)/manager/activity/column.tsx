"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { type IDMRequestSchema } from "@/server/resource/idm";
import {
  pagelinkCell,
  pagelinkHeader,
} from "../../../(components)/table/page-link";
import { dateCell, dateHeader } from "../../../(components)/table/datetime";
import { activityOptions } from "../../../(components)/table/more-options";
import { statuses } from "../../../(components)/table/request-schemas";
import {
  nameCell,
  nameCellHeaderWide,
  nameCellWithCopy,
  nameHeader,
  statusCell,
} from "../../../(components)/table/name-cells";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Cog8ToothIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export const columns: ColumnDef<IDMRequestSchema & { updatedAt: string }>[] = [
  {
    id: "Edit",
    accessorKey: "id",
    header: pagelinkHeader({ icon: DocumentTextIcon }),
    cell: pagelinkCell({
      icon: PencilIcon,
      page: "account/request",
    }),
    enableSorting: false,
  },
  {
    id: "id",
    accessorKey: "id",
    header: nameHeader("Request Id", true),
    cell: nameCellWithCopy({ name: "Request Id", text: "id", limit: 9 }),
    enableSorting: false,
  },
  {
    id: "assuredName",
    accessorKey: "assuredName",
    header: nameHeader("Assured Name"),
    cell: nameCell("assuredName"),
    enableHiding: true,
    enableSorting: false,
  },
  {
    id: "agentName",
    accessorKey: "agentName",
    header: nameHeader("Agent"),
    cell: nameCell("agentName"),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "Underwriter",
    accessorKey: "underwriterName",
    header: nameHeader("Underwriter"),
    cell: nameCell("Underwriter"),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "Updated",
    accessorKey: "updatedAt",
    header: dateHeader("Submitted on"),
    cell: dateCell("Updated"),
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "status",
    accessorKey: "status",
    header: nameCellHeaderWide("Status"),
    cell: statusCell({
      id: "status",
      schema: statuses,
      url: "account/requests",
    }),
    filterFn: (row, value, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(value)));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "more",
    accessorKey: "more",
    header: pagelinkHeader({ icon: Cog8ToothIcon }),
    cell: activityOptions("id"),
    enableSorting: false,
  },
];
