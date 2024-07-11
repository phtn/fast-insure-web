"use client";

import { type Table } from "@tanstack/react-table";
import { Button } from "@@ui/button";
import { InputLight } from "@/app/(ui)/input";
import { DataTableFacetedFilter } from "../../../(components)/table/filter-facets";
import { SpaceX } from "../../../(components)/table/styles";
import { statuses } from "../../../(components)/table/request-schemas";
import { DataTableViewOptions } from "../../../(components)/table/views";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  hiddenColumns: ["agentId"];
  toolbarActions: [boolean, VoidFunction];
}

export function DataTableToolbar<TData>({
  table,
  hiddenColumns,
  toolbarActions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex h-[64px] w-full items-center justify-between px-4 portrait:hidden">
      <div className="flex flex-1 items-center space-x-2 text-opus md:space-x-4 md:pr-0">
        <div className="flex h-10 items-center justify-center rounded-lg bg-amber-200/40 px-4 text-xs font-medium tracking-tight text-void">
          Drafts
        </div>
        <InputLight
          placeholder="filter assured name"
          value={
            (table.getColumn("assuredName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("assuredName")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[230px] font-mono font-light"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="group flex h-[40px] items-center justify-center rounded-[4px] border border-sky-400 px-2 text-sky-400 hover:border-sky-400 hover:bg-sky-400 lg:px-3"
          >
            <p className="font-jet text-xs uppercase group-hover:text-white">
              Reset
            </p>
            <SpaceX />
          </Button>
        )}
      </div>
      <DataTableViewOptions
        table={table}
        hiddenColumns={hiddenColumns}
        toolbarActions={toolbarActions}
      />
    </div>
  );
}
