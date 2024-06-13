"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./header";
import { charlimit, copyFn } from "@/utils/helpers";
import Link from "next/link";
import { SettingsIcon, UserCircleIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { PageLink } from "../../(components)/table/page-link";
import { DateTimeCell, dateHeader } from "../../(components)/table/datetime";
import { MoreOptions } from "../../(components)/table/more-options";
import { statuses } from "../../(components)/table/agent-schemas";
import { type UserProfileSchema } from "@/server/resource/account";
import { TheTip } from "@/app/(ui)/just-the-tip";

export const columns: ColumnDef<UserProfileSchema>[] = [
  {
    id: "userId",
    accessorKey: "userId",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="flex w-full justify-center"
        element={<UserCircleIcon className="size-4 text-white/70" />}
      />
    ),
    cell: ({ row }) => {
      const id: string = row.getValue("userId");
      return (
        <Link href={`/account/agents/${id}`} className="group">
          <PageLink page="agents" id={id}>
            <UserCircleIcon className={"size-4 stroke-1 text-sky-600"} />
          </PageLink>
        </Link>
      );
    },
    enableSorting: false,
  },
  // {
  //   id: "id",
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Request Id"
  //       className="flex w-fit justify-end whitespace-nowrap"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     const id: string | undefined = row.getValue("id");

  //     const handleCopy = async () => {
  //       await copyFn({ name: "Request ID", text: id! });
  //     };
  //     return (
  //       <div
  //         onClick={handleCopy}
  //         className="group flex w-fit items-center justify-center text-xs"
  //       >
  //         <span className="cursor-pointer tracking-wide decoration-dashed underline-offset-4 group-hover:underline">
  //           {id?.substring(0, 8)}
  //         </span>
  //       </div>
  //     );
  //   },
  //   enableSorting: false,
  // },
  {
    id: "displayName",
    accessorKey: "displayName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className="flex justify-start"
      />
    ),
    cell: ({ row }) => {
      const agentName: string = row.getValue("displayName");

      return (
        <div className="flex w-fit items-center justify-start">
          <p
            className={
              "whitespace-nowrap font-sans text-xs font-medium uppercase"
            }
          >
            {charlimit(agentName)}
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
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-fit" column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email: string = row.getValue("email");
      const handleCopy = async () => {
        await copyFn({ name: "Email", text: email });
      };
      return (
        <TheTip>
          <div
            onClick={handleCopy}
            className="flex cursor-pointer items-center justify-start border-dashed border-cyan-700 py-0.5 hover:border-b-[0.5px]"
          >
            <p className={"font-sans text-xs font-normal tracking-tight"}>
              {charlimit(email, 30)}
            </p>
          </div>
        </TheTip>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "phone",
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-fit" column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      const phone: string = row.getValue("phone");
      const handleCopy = async () => {
        await copyFn({ name: "Email", text: phone });
      };
      return (
        <TheTip>
          <div
            onClick={handleCopy}
            className="flex cursor-pointer items-center justify-start border-dashed border-cyan-700 py-0.5 hover:border-b-[0.5px]"
          >
            <p className={"font-sans text-xs font-normal tracking-tight"}>
              {charlimit(phone, 13)}
            </p>
          </div>
        </TheTip>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "active",
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="flex w-full justify-center"
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
