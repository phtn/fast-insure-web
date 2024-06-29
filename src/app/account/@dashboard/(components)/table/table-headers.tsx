import { type Column } from "@tanstack/react-table";

import { Button } from "@@ui/button";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/(ui)/dropdown";
import { BeachDrop, BeachDropItem } from "./styles";
import {
  ArrowDown01Icon,
  ArrowUp10Icon,
  EyeOffIcon,
  ListFilterIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { type ReactElement } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title?: string;
  element?: ReactElement;
}

const defaultStyle =
  "flex h-full w-full items-center p-0 m-0 font-mono text-xs font-medium tracking-tight text-neutral-600/90";

export function DataTableColumnHeader<TData, TValue>({
  className,
  column,
  element,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={cn(defaultStyle, className)}>
        {title ? title : element}
      </div>
    );
  }

  return (
    <div className={cn(defaultStyle, className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="my-1.5 -mr-2.5 h-8 px-2 hover:bg-cyan-950/10"
          >
            <span className="font-mono text-xs font-medium tracking-tight text-neutral-600/90">
              {title}
            </span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown01Icon className="ml-2 size-4 text-emerald-500" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp10Icon className="ml-2 size-4 text-indigo-500" />
            ) : (
              <ListFilterIcon className="ml-2 size-3.5 text-cyan-700" />
            )}{" "}
          </Button>
        </DropdownMenuTrigger>
        <BeachDrop align={"start"}>
          <BeachDropItem
            selected={column.getIsSorted() === "asc"}
            onClick={() => column.toggleSorting(false)}
            className={column.getIsSorted() === "asc" ? `bg-cyan-700/10` : ``}
          >
            <ArrowUp10Icon className="mr-2 size-3.5 text-indigo-300" />

            <span className="text-indigo-300">Asc</span>
          </BeachDropItem>
          <BeachDropItem
            selected={column.getIsSorted() === "desc"}
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDown01Icon className="mr-2 size-3.5 text-teal-300" />
            <span className="text-teal-300">Desc</span>
          </BeachDropItem>
          <DropdownMenuSeparator />
          <BeachDropItem
            selected={column.getIsVisible() === false}
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOffIcon className="mr-2 size-3.5 text-zap" />
            <span className="text-zap">Hide</span>
          </BeachDropItem>
        </BeachDrop>
      </DropdownMenu>
    </div>
  );
}
