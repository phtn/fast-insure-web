import * as React from "react";
import {
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

import { Table, TableBody, TableHead, TableRow } from "@/app/(ui)/table";
import { DataTablePagination } from "../../(components)/table/pagination";
import { EmptyTable, LoadingTable } from "../../(components)/table/empty-table";
import { RowMotion, rowStyles } from "../../(components)/table/rows";
import {
  PhCell,
  PhHeader,
  TableContainer,
  TableInner,
} from "../../(components)/styles";
import { DataTableToolbar } from "./toolbar";
import type { DataTableProps } from "../../(components)/table/types";

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
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-r-[0.33px] border-dashed border-dyan/40"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
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
                  key={row.getValue("userId")}
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
                record="agents"
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
