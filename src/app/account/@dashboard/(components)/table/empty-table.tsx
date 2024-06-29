import { Button } from "@/app/(ui)/button";
import { TableCell, TableRow } from "@/app/(ui)/table";
import { FocusIcon, InboxIcon } from "lucide-react";

export const LoadingTable = (props: { colSpan: number }) => (
  <TableRow>
    <TableCell
      colSpan={props.colSpan}
      className="h-24 py-4 text-center font-mono"
    >
      <div className="flex items-center justify-center space-x-4 portrait:justify-start portrait:px-4">
        <span className="animate-pulse font-semibold text-cyan-700">
          Updating table
        </span>
        <FocusIcon className="size-4 animate-spin stroke-[1px] text-dyan/50" />
      </div>
    </TableCell>
  </TableRow>
);

export const EmptyRequestTable = (props: {
  colSpan: number;
  loading: boolean;
}) => (
  <TableRow>
    <TableCell colSpan={props.colSpan} className="h-24 text-center">
      <div className="flex flex-col items-center justify-center space-x-4 space-y-8 text-xs portrait:w-[calc(100vw-36px)] portrait:space-x-2 portrait:space-y-6">
        <div className="flex items-center justify-center space-x-2 space-y-8">
          <span>{props.loading}</span>
          <InboxIcon className="size-5 stroke-[1.5px] text-opus portrait:size-4" />
          <p className="font-medium text-clay/60 portrait:tracking-tight">
            No record found.
          </p>
        </div>
        <Button
          size="sm"
          variant={"ghost"}
          className="text-xs text-cyan-600 hover:bg-cyan-300/10 hover:text-cyan-500"
        >
          Create Request
        </Button>
      </div>
    </TableCell>
  </TableRow>
);

export const EmptyTable = (props: {
  colSpan: number;
  loading: boolean;
  record?: string;
}) => (
  <TableRow>
    <TableCell colSpan={props.colSpan} className="h-24 text-center">
      <div className="flex flex-col items-center justify-center space-x-4 space-y-8 text-xs portrait:w-[calc(100vw-36px)] portrait:space-x-2 portrait:space-y-6">
        <div className="flex items-center justify-center space-x-2 space-y-8">
          <span>{props.loading}</span>
          <InboxIcon className="size-5 stroke-[1.5px] text-opus portrait:size-4" />
          <p className="font-medium text-clay/60 portrait:tracking-tight">
            No record of {props.record}.
          </p>
        </div>
      </div>
    </TableCell>
  </TableRow>
);
