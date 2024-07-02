"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { PencilLineIcon } from "lucide-react";
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
  nameCellWithCopy,
  nameHeader,
  statusCell,
} from "../../../(components)/table/name-cells";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

export const columns: ColumnDef<IDMRequestSchema & { updatedAt: string }>[] = [
  {
    id: "edit",
    accessorKey: "edit",
    header: pagelinkHeader({ icon: PencilLineIcon }),
    cell: pagelinkCell({
      icon: PencilLineIcon,
      primaryRoute: "account/request",
      extraKey: "agentId",
      id: "id",
    }),
    enableSorting: false,
  },
  {
    id: "requestId",
    accessorKey: "id",
    header: nameHeader("Request Id"),
    cell: nameCellWithCopy({ name: "Request Id", text: "id" }),
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
    id: "agentId",
    accessorKey: "agentId",
    header: nameHeader("Agent Id"),
    cell: nameCell("agentId"),
    enableHiding: true,
    enableSorting: false,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: dateHeader("Created at"),
    cell: dateCell("createdAt"),
  },
  {
    id: "status",
    accessorKey: "status",
    header: nameHeader("Status"),
    cell: statusCell({ id: "status", schema: statuses }),
    filterFn: (row, value, selectedValues: string[]) => {
      return selectedValues.includes(String(row.getValue(value)));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "id",
    accessorKey: "id",
    header: pagelinkHeader({ icon: Cog8ToothIcon }),
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
