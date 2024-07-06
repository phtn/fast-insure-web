import { LoaderMX2 } from "@/app/(components)/loader-mx";
import { Button } from "@/app/(ui)/button";
import { TableCell, TableRow } from "@/app/(ui)/table";
import { InboxIcon } from "lucide-react";
import { useAgentTools } from "../../(users)/agent1/tools/hooks";

export const LoadingTable = (props: { colSpan: number }) => (
  <TableRow>
    <TableCell
      colSpan={props.colSpan}
      className="h-24 py-4 text-center font-mono"
    >
      <div className="flex animate-fade items-center justify-center space-x-4 portrait:justify-start portrait:px-4">
        <span className="animate-flip-up font-semibold text-cyan-700 animate-duration-700">
          Updating table
        </span>
        <LoaderMX2 />
      </div>
    </TableCell>
  </TableRow>
);

export const EmptyRequestTable = (props: {
  colSpan: number;
  loading: boolean;
}) => {
  const { handleCreateRequest } = useAgentTools();
  return (
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
            onClick={handleCreateRequest}
          >
            Create Request
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

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
