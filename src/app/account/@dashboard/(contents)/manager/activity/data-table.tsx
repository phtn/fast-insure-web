import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/(ui)/table";
import { DataTablePagination } from "../../../(components)/table/pagination";
import {
  EmptyTable,
  LoadingTable,
} from "../../../(components)/table/empty-table";
import { rowStyle } from "../../../(components)/table/rows";
import { DataTableToolbar } from "./toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // const { handleDeleteCustomer } = useCustomerController();
  // const { handleFindAllCustomers } = useFetchCustomer();
  //   await handleDeleteCustomer(id);
  //   return handleFindAllCustomers();
  // };

  return (
    <div className="border-[0.33px] border-ash bg-white font-mono text-xs font-light portrait:h-[calc(100vh-250px)] portrait:border-0">
      <div className="flex h-[64px] w-screen items-center space-x-4 overflow-x-scroll md:w-full portrait:hidden">
        <DataTableToolbar table={table} />
      </div>
      <div className="h-[calc(100vh-246px)] border-t-[0.33px] border-slate-400/60">
        <Table>
          <TableHeader className="sticky border-b-[0.33px] border-slate-600 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-cyan-200/40  via-orange-50 font-medium tracking-tight shadow-sm shadow-stone-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b-[0.33px] border-slate-400/60"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="border-r-[0.33px] border-slate-300"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  className={rowStyle(i)}
                  key={row.getValue("id")}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-r-[0.33px] border-dashed border-gray-300 bg-gradient-to-r from-zinc-900/80 to-sky-950/80 bg-clip-text font-light text-transparent "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 py-4 text-center font-mono"
                >
                  <LoadingTable />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="font-jet h-24 text-center"
                >
                  <EmptyTable loading={loading} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export const delays = [
  "animate-delay-75",
  "animate-delay-100",
  "animate-delay-[250ms]",
  "animate-delay-150",
  "animate-delay-200",
  "animate-delay-[250ms]",
  "animate-delay-300",
  "animate-delay-[250ms]",
  "animate-delay-500",
  "animate-delay-[250ms]",
  "animate-delay-700",
  "animate-delay-[250ms]",
  "animate-delay-1000",
  "animate-delay-[250ms]",
  "animate-delay-2000",
];
