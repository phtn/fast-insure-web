import type { Cell, Row } from "@tanstack/react-table";

// type AdditionalProps<T extends RowData, TValue> = Record<
//   string,
//   (row: T) => Record<string, TValue>
// >;

// function getCellProps<TData extends RowData, TValue>(
//   cell: CellContext<TData, TValue>,
//   row: TData,
//   propConfig: AdditionalProps<TData, TValue>,
// ): CellContext<TData, TValue> {
//   const baseProps: CellContext<TData, TValue> = {
//     ...cell,
//     data: row,
//   };
//   const additionalProps = Object.keys(propConfig).reduce((acc, key) => {
//     if (cell.column.id === key) {
//       return { ...acc, ...(propConfig?.[key](row) ?? {}) };
//     }
//     return acc;
//   }, {});
//   return { ...baseProps, ...additionalProps };
// }

// type CellPropsConfig<TData, TValue> = Record<
//   string,
//   (cell: Cell<TData, TValue>) => Cell<TData, TValue>
// >;

// // Define a utility function to get cell props with enhanced type safety.
// function cellProps<TData, TValue>(
//   cell: Cell<TData, TValue>,
//   propConfig: CellPropsConfig<TData, TValue>,
// ): Record<string, TValue> {
//   const { column } = cell;
//   const baseProps: Record<string, TValue> = column.getProps
//     ? column.getProps()
//     : {};

//   const additionalProps = propConfig[column.id];
//   if (!additionalProps) return baseProps;
//   return { ...baseProps, ...additionalProps(cell) };
// }

// Phind
type AdditionalPropsConfig = Record<
  string,
  <TData, TValue>(cell: Cell<TData, TValue>) => Record<string, unknown>
>;
export function getMergedProps<TData, TValue>(
  cell: Cell<TData, TValue>,
  row: Row<TData>,
  additionalPropsConfig: AdditionalPropsConfig,
): Record<string, unknown> {
  const baseProps: Record<string, unknown> = {};
  const additionalProps = additionalPropsConfig[cell.column.id];
  return additionalProps
    ? { ...baseProps, ...row, ...additionalProps(cell) }
    : baseProps;
}
