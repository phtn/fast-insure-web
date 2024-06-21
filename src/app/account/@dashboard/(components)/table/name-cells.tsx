import { TheTip } from "@/app/(ui)/just-the-tip";
import { cn } from "@/utils/cn";
import { charlimit, copyFn } from "@/utils/helpers";
import type { CellContext, HeaderContext } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableColumnHeader } from "./table-headers";
import type { Option } from "./types";

/* eslint-disable react/display-name */
export const nameHeader =
  (title: string) =>
  <T,>({ column }: HeaderContext<T, unknown>) => (
    <DataTableColumnHeader
      column={column}
      title={title}
      className="flex w-[140px] justify-start"
    />
  );

export const nameCell =
  (prop: string) =>
  <T,>({ row }: CellContext<T, unknown>) => (
    <div className="flex items-center justify-start">
      <p
        className={
          "font-sans text-[13px] font-medium uppercase tracking-tight text-coal"
        }
      >
        {charlimit(String(row.getValue(prop)), 16)}
      </p>
    </div>
  );

export const nameCellWithCopy =
  (props: { name: string; text: string; limit?: number }) =>
  <T,>({ row }: CellContext<T, unknown>) => {
    const { name, text, limit } = props;
    const copyText: string = row.getValue(text);
    const handleCopy = async () => {
      await copyFn({ name, text: copyText });
    };
    return (
      <TheTip>
        <div
          onClick={handleCopy}
          className="flex cursor-pointer items-center justify-start border-dashed border-cyan-700 py-0.5 hover:border-b-[0.5px] hover:text-black"
        >
          <p className={"font-mono text-xs"}>{charlimit(copyText, limit)}</p>
        </div>
      </TheTip>
    );
  };

export const nameCellHeaderWide =
  (title: string) =>
  <T,>({ column }: HeaderContext<T, unknown>) => (
    <DataTableColumnHeader
      column={column}
      title={title}
      className="flex w-[150px] items-center  justify-center"
    />
  );

export const statusCell =
  (props: { statuses: Option[]; url: string }) =>
  <T,>({ row }: CellContext<T, unknown>) => {
    const { statuses, url } = props;
    const status = statuses.find(
      (item) => item.value === String(row.getValue("status")),
    );
    return (
      <Link
        href={`/${url}/${String(row.getValue("id"))}`}
        className="group flex justify-center"
      >
        <div
          className={cn(
            status?.cell,
            "grid h-9 w-full grid-cols-4 gap-x-1 rounded-[8px] font-sans text-xs",
          )}
        >
          <div className="col-span-1 flex items-center px-2">
            {status?.icon && <status.icon className="size-5 stroke-1" />}
          </div>
          <div
            className={cn(
              status?.color,
              `col-span-3 flex w-full items-center justify-start uppercase`,
            )}
          >
            {status?.label}
          </div>
        </div>
      </Link>
    );
  };
