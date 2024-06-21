import { type AcademicCapIcon } from "@heroicons/react/24/solid";
import { type Column } from "@tanstack/react-table";
import { type LucideIcon } from "lucide-react";

export type HeroIcon = typeof AcademicCapIcon;

export type Option = {
  value: string | boolean;
  label: string;
  icon: LucideIcon | HeroIcon;
  color: string;
  cell: string;
};

export type ImageOption = {
  value: string;
  label: string;
  icon: LucideIcon | HeroIcon;
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
