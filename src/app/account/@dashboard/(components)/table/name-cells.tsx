import { TheTip } from "@/app/(ui)/just-the-tip";
import { cn } from "@/utils/cn";
import { charlimit, copyFn, getInitials } from "@/utils/helpers";
import type { CellContext, HeaderContext } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./table-headers";
import type { Option } from "./types";
import { IdentificationIcon } from "@heroicons/react/24/outline";

/* eslint-disable react/display-name */
export const nameHeader =
  (title: string, narrow?: boolean) =>
    <T,>({ column }: HeaderContext<T, unknown>) => (
      <DataTableColumnHeader
        column={column}
        title={title}
        className={cn(
          "flex justify-start whitespace-nowrap",
          narrow ? " w-fit" : " w-[140px]",
        )}
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
        className="flex w-full min-w-[110px] items-center justify-center"
      />
    );

export const nameCell =
  (prop: string) =>
    <T,>({ row }: CellContext<T, unknown>) => (
      <div className="flex items-center justify-start">
        <p
          className={cn(
            "font-sans text-[13px] font-medium uppercase tracking-tight blur-sm",
            row.getValue(prop) ? "text-coal" : "text-ash",
          )}
        >
          {charlimit(row.getValue(prop) ?? "------", 25)}
        </p>
      </div>
    );

export const nameCellWithSubtext =
  (props: { primaryKey: string; secondaryKey: string }) =>
    <T,>({ row }: CellContext<T, unknown>) => {
      const { primaryKey, secondaryKey } = props;
      const text: string | undefined = row.getValue(primaryKey);
      const subtext: string | undefined = row.getValue(secondaryKey);
      return (
        <div className="flex flex-col items-start justify-start space-y-[3px] leading-none blur-sm">
          <p
            className={cn(
              "font-sans text-[12px] font-medium uppercase tracking-tight",
              row.getValue(props.primaryKey) ? "text-coal" : "text-ash",
            )}
          >
            {charlimit(text ?? "------", 16)}
          </p>
          <p className="font-mono text-[8px] font-light tracking-wider text-cyan-200/10">
            {charlimit(subtext, 8)}
          </p>
        </div>
      );
    };

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
            className="flex w-fit cursor-pointer items-center justify-start border-dashed border-cyan-700 py-0.5 hover:border-b-[0.5px] hover:text-black"
          >
            <p className={"font-mono text-xs"}>{charlimit(copyText, limit)}</p>
          </div>
        </TheTip>
      );
    };

export const nameCellID =
  (props: { name: string }) =>
    <T,>({ row }: CellContext<T, unknown>) => {
      const { name } = props;
      const text: string = row.getValue("id");
      const handleCopy = async () => {
        await copyFn({ name, text });
      };
      return (
        <TheTip tip={charlimit(text)} icon={IdentificationIcon}>
          <div
            onClick={handleCopy}
            className="flex w-fit cursor-pointer items-center justify-start border-dashed border-cyan-700 py-0.5 hover:border-b-[0.5px] hover:text-black"
          >
            <IdentificationIcon
              className={"size-5 stroke-[0.75] text-cyan-800"}
            />
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
              : `font-mono font-light text-ash`,
          )}
        >
          {row.getValue(prop) ? (
            <div className="flex items-center justify-center rounded bg-dyan p-1.5 text-xs font-bold uppercase text-zap">
              {getInitials(row.getValue(prop))}
            </div>
          ) : (
            <p className="font-mono font-light text-neutral-400">-unassigned-</p>
          )}
          <div>{row.getValue(prop)}</div>
        </div>
      </div>
    );

export const statusCell =
  (props: { id: string; schema: Option[]; url?: string }) =>
    <T,>({ row }: CellContext<T, unknown>) => {
      const { id, schema } = props;
      const status = schema.find(
        (item) => item.value === String(row.getValue(id)),
      );
      return (
        <div
          className={cn(
            "group flex w-full justify-start rounded-[8px] px-2",
            status?.cell,
          )}
        >
          <div className={cn("grid h-9 w-full grid-cols-4 gap-x-1")}>
            <div className="col-span-1 flex items-center">
              {status?.icon && (
                <status.icon className="size-4 stroke-[1.5px] text-dyan/50" />
              )}
            </div>
            <div
              className={cn(
                `col-span-3 flex w-fit items-center justify-start font-sans text-[11px] font-normal uppercase text-dyan/80`,
              )}
            >
              {status?.label}
            </div>
          </div>
        </div>
      );
    };
