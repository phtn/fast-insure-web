import { TheTip } from "@/app/(ui)/just-the-tip";
import { cn } from "@/utils/cn";
import { charlimit, copyFn, getInitials } from "@/utils/helpers";
import type { CellContext, HeaderContext } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableColumnHeader } from "./table-headers";
import type { Option } from "./types";

/* eslint-disable react/display-name */
export const nameHeader =
  (title: string, narrow?: boolean) =>
  <T,>({ column }: HeaderContext<T, unknown>) => (
    <DataTableColumnHeader
      column={column}
      title={title}
      className={cn("flex justify-start", narrow ? " w-[80px]" : " w-[140px]")}
    />
  );

export const nameHeaderFit =
  (title: string) =>
  <T,>({ column }: HeaderContext<T, unknown>) => (
    <DataTableColumnHeader
      column={column}
      title={title}
      className="flex w-[100px] justify-start"
    />
  );

export const nameCellHeaderWide =
  (title: string) =>
  <T,>({ column }: HeaderContext<T, unknown>) => (
    <DataTableColumnHeader
      column={column}
      title={title}
      className="flex w-[120px] items-center  justify-center"
    />
  );

export const nameCell =
  (prop: string) =>
  <T,>({ row }: CellContext<T, unknown>) => (
    <div className="flex items-center justify-start">
      <p
        className={cn(
          "font-sans text-[13px] font-medium uppercase tracking-tight",
          row.getValue(prop) ? "text-coal" : "text-ash",
        )}
      >
        {charlimit(row.getValue(prop) ?? "------", 16)}
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
          className="flex w-[56px] cursor-pointer items-center justify-start border-dashed border-cyan-700 py-0.5 hover:border-b-[0.5px] hover:text-black"
        >
          <p className={"font-mono text-xs"}>{charlimit(copyText, limit)}</p>
        </div>
      </TheTip>
    );
  };

export const nameCellWithInitials =
  (prop: string) =>
  <T,>({ row }: CellContext<T, unknown>) => (
    <div className="flex flex-col items-start justify-center -space-y-1 text-xs">
      <div
        className={cn(
          `flex max-w-[10ch] items-center space-x-2 whitespace-nowrap portrait:tracking-tight`,
          row.getValue(prop)
            ? `font-sans font-medium text-void`
            : `font-mono font-light text-clay`,
        )}
      >
        {row.getValue(prop) ? (
          <div className="flex items-center justify-center rounded bg-dyan p-1.5 text-xs font-bold uppercase text-zap">
            {getInitials(row.getValue(prop))}
          </div>
        ) : null}
        <div>{row.getValue(prop) ?? "unassigned"}</div>
      </div>
    </div>
  );

export const statusCell =
  (props: { id: string; schema: Option[]; url?: string }) =>
  <T,>({ row }: CellContext<T, unknown>) => {
    const { id, schema, url } = props;
    const status = schema.find(
      (item) => item.value === String(row.getValue(id)),
    );
    return (
      <Link
        href={`/${url}/${String(row.getValue(id))}`}
        className="group flex w-[120px] justify-center"
      >
        <div
          className={cn(
            status?.cell,
            "grid h-9 w-full grid-cols-4 gap-x-2 rounded-[8px] px-2",
          )}
        >
          <div className="col-span-1 flex items-center">
            {status?.icon && (
              <status.icon className="size-5 stroke-[1.5px] text-dyan/40" />
            )}
          </div>
          <div
            className={cn(
              `col-span-3 flex w-full items-center justify-start font-sans text-[11px] font-normal uppercase text-dyan/80`,
            )}
          >
            {status?.label}
          </div>
        </div>
      </Link>
    );
  };
