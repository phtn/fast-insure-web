import type { CellContext, HeaderContext } from "@tanstack/react-table";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "./col-header";

export type PageLinkProps = {
  // id: string | undefined;
  page: string;
  icon: LucideIcon;
};

export const PageLink = (props: PageLinkProps) => {
  return (
    <Link href={`/${props.page}`}>
      <div className="flex w-8 justify-center md:active:scale-[95%]">
        <div className="h-fit w-fit rounded-lg bg-white p-1 shadow-neutral-200 group-hover:shadow-md">
          {<props.icon className="size-4 stroke-1 text-sky-600" />}
        </div>
      </div>
    </Link>
  );
};

/* eslint-disable react/display-name */
export const pagelinkHeader =
  (props: { icon: LucideIcon }) =>
  <T,>({ column }: HeaderContext<T, unknown>) => (
    <DataTableColumnHeader
      column={column}
      element={<props.icon className="size-4 text-white/70" />}
      className="flex w-full justify-center"
    />
  );

/* eslint-disable react/display-name */
export const pagelinkCell =
  (props: PageLinkProps) =>
  <T,>(info: CellContext<T, unknown>) => {
    return (
      <Link href={`/${props.page}/${String(info.getValue())}`}>
        <div className="flex w-8 justify-center md:active:scale-[95%]">
          <div className="h-fit w-fit shadow-neutral-200 group-hover:shadow-md">
            {<props.icon className="size-5 fill-white stroke-1 text-sky-600" />}
          </div>
        </div>
      </Link>
    );
  };
