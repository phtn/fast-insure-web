import type { CellContext, HeaderContext } from "@tanstack/react-table";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "./table-headers";
import { type HeroIcon } from "./types";
import { TheTip } from "@/app/(ui)/just-the-tip";

export type PageLinkProps = {
  page: string;
  icon: LucideIcon | HeroIcon;
  tip?: string;
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
  (props: { icon: LucideIcon | HeroIcon }) =>
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
      <TheTip tip={props?.tip ?? "edit"}>
        <Link href={`/${props.page}/${String(info.getValue())}`}>
          <div className="flex w-8 justify-center md:active:scale-[95%]">
            <div className="h-fit w-fit border-b border-dashed border-slate-300 bg-gradient-to-t from-gray-100/50 to-transparent shadow-neutral-200 group-hover:shadow-md">
              {<props.icon className="size-4 stroke-1 text-cyan-700" />}
            </div>
          </div>
        </Link>
      </TheTip>
    );
  };
