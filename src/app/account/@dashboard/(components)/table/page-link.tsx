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
      element={<props.icon className="size-4 text-neutral-600/90" />}
      className="flex w-full justify-center"
    />
  );

/* eslint-disable react/display-name */
export const pagelinkCell =
  (props: PageLinkProps) =>
  <T,>(info: CellContext<T, unknown>) => {
    return (
      <TheTip tip={props?.tip ?? "edit"}>
        <Link
          href={`/${props.page}/${String(info.getValue())}`}
          className="group"
        >
          <div className="flex w-6 justify-center group-hover:scale-[110%]">
            <div className="h-fit w-fit rounded-br-md border-b-[0.33px] border-dotted border-slate-400/80 bg-gradient-to-tl from-slate-100/60 to-transparent transition-all duration-300 ease-out group-hover:border-slate-500/80">
              {<props.icon className="size-4 stroke-1 text-cyan-700" />}
            </div>
          </div>
        </Link>
      </TheTip>
    );
  };
