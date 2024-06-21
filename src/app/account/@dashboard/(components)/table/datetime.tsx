import { prettyDate } from "@/utils/helpers";
import type { CellContext, HeaderContext } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./col-header";

export const DateTimeCell = ({ date }: { date: string | undefined }) => {
  const timestamp = prettyDate(date);
  const datetime = timestamp.split("at");
  return (
    <div className="flex w-[140px] justify-end">
      <div className="flex w-fit flex-col items-end justify-center -space-y-0.5">
        <p className="font-sans text-xs font-medium">{datetime[0]?.trim()}</p>
        <p className="text-[10px] tracking-wide">{datetime[1]?.trim()}</p>
      </div>
    </div>
  );
};

/* eslint-disable react/display-name */
export const dateHeader =
  (title: string) =>
  <T,>({ column }: HeaderContext<T, unknown>) => (
    <DataTableColumnHeader
      column={column}
      title={title}
      className="flex w-[140px] justify-end"
    />
  );

export const dateCell =
  (prop: string) =>
  <T,>({ row }: CellContext<T, unknown>) => {
    const timestamp = prettyDate(String(row.getValue(prop)));
    const datetime = timestamp.split("at");
    return (
      <div className="flex w-[140px] justify-end">
        <div className="flex w-fit flex-col items-end justify-center -space-y-0.5">
          <p className="font-sans text-xs font-medium">{datetime[0]?.trim()}</p>
          <p className="text-[10px] tracking-wide">{datetime[1]?.trim()}</p>
        </div>
      </div>
    );
  };
