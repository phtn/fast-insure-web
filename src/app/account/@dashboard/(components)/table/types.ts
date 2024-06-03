import { type Column } from "@tanstack/react-table";
import { type LucideIcon } from "lucide-react";

export type Option = {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
  cell: string;
};

export type ImageOption = {
  value: string;
  label: string;
  icon: LucideIcon;
  color: string;
  cell: string;
  url: string;
  complete: string;
};

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options?: Option[];
}
