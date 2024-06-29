import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import { Table, TableBody, TableHead, TableRow } from "@/app/(ui)/table";
import {
  PhCell,
  PhHeader,
  TableContainer,
  TableInner,
} from "../../../(components)/styles";
import {
  EmptyTable,
  LoadingTable,
} from "../../../(components)/table/empty-table";
import { DataTablePagination } from "../../../(components)/table/pagination";
import { RowMotion, rowStyles } from "../../../(components)/table/rows";
import { DataTableToolbar } from "./toolbar";
import type { DataTableProps } from "../../../(components)/table/types";

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

  return (
    <TableContainer>
      <DataTableToolbar table={table} />
      <TableInner>
        <Table>
          <PhHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b-[0.33px] border-dyan/40"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="border-r-[0.33px] border-dashed border-dyan/40"
                    >
                      <div className="flex items-center justify-between">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {header.id === "code" ? (
                          <div className="flex size-5 items-center justify-center rounded-md bg-dyan/10 text-[10px] text-dyan/80">
                            {data.length}
                          </div>
                        ) : null}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </PhHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <RowMotion
                  {...rowStyles}
                  transition={{
                    delay: Math.random() / 8,
                  }}
                  key={row.getValue("id")}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <PhCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </PhCell>
                  ))}
                </RowMotion>
              ))
            ) : loading ? (
              <LoadingTable colSpan={columns.length} />
            ) : (
              <EmptyTable
                record="codes"
                colSpan={columns.length}
                loading={loading}
              />
            )}
          </TableBody>
        </Table>
      </TableInner>
      <DataTablePagination table={table} />
    </TableContainer>
  );
}
