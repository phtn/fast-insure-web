import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@@ui/button";
import { Select, SelectTrigger, SelectValue } from "@@ui/select";
import { BeachSelect, BeachSelectItem } from "./styles";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

const sizes = [10, 20, 30, 40, 50];

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex h-[46px] w-full items-center border-y-[0.33px] bg-white/10 px-4 text-xs">
      {/* <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex w-full items-center justify-between lg:space-x-8">
        <div className="flex items-center space-x-4 portrait:space-x-2 ">
          <p className="font-sans text-xs text-opus">Rows</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: string) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="bg-dyan/5 h-[36px] w-[64px] rounded-md border-[0.0px] px-2 text-cyan-700 portrait:w-fit">
              <SelectValue
                className="font-jet"
                placeholder={table.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <BeachSelect side="top">
              {sizes.map((pageSize) => (
                <BeachSelectItem
                  selected={pageSize === table.getState().pagination.pageSize}
                  key={pageSize}
                  value={`${pageSize}`}
                  className="text-sky-50"
                >
                  {pageSize}
                </BeachSelectItem>
              ))}
            </BeachSelect>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center font-mono text-[11px] font-light text-opus">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2 px-4 sm:px-0 md:space-x-4">
          <Button
            variant="ghost"
            className="hidden size-7 bg-transparent p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="size-4 stroke-2 text-sky-700" />
          </Button>
          <Button
            variant="ghost"
            className="size-7 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="size-4 stroke-2 text-cyan-700" />
          </Button>
          <Button
            variant="ghost"
            className="size-7 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="size-4 stroke-2 text-cyan-700" />
          </Button>
          <Button
            variant="ghost"
            className="hidden w-[36px] p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="size-4 stroke-2 text-cyan-700" />
          </Button>
        </div>
      </div>
    </div>
  );
}
