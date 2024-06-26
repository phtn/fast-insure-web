"use client";

import { type Table } from "@tanstack/react-table";

import { Button } from "@@ui/button";

import { InputLight } from "@/app/(ui)/input";
import { DataTableFacetedFilter } from "../../(components)/table/filter-facets";
import { SpaceX } from "../../(components)/table/styles";
import { DataTableViewOptions } from "../../(components)/table/views";
import { type ChangeEvent } from "react";
import { activeStates } from "../../(components)/table/status-schemas";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const filterValues =
    // (table.getColumn("assuredName")?.getFilterValue() as string) ||
    table.getColumn("displayName")?.getFilterValue() as string;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(filterValues);
    return (
      // table.getColumn("assuredName")?.setFilterValue(e.target.value) ??
      table.getColumn("displayName")?.setFilterValue(e.target.value)
    );
  };

  return (
    <div className="flex h-[64px] w-full items-center justify-between px-4 portrait:hidden">
      <div className="flex flex-1 items-center space-x-2 text-opus md:space-x-4 md:pr-0">
        <InputLight
          placeholder="filter by agent"
          // value={filterValues}
          onChange={handleChange}
          className="h-10 w-[230px] font-mono font-light"
        />
        {table.getColumn("active") && (
          <DataTableFacetedFilter
            column={table.getColumn("active")}
            options={activeStates}
            title="Status"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="group flex h-[35px] items-center justify-center rounded-md bg-red-400/80 px-2 text-dyan/80"
          >
            <p className="text-xs text-white">Reset</p>
            <SpaceX />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
