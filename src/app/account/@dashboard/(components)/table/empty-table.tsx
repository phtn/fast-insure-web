import { Button } from "@/app/(ui)/button";
import { FocusIcon, InboxIcon } from "lucide-react";

export const LoadingTable = () => (
  <div className="flex items-center justify-center space-x-4 portrait:justify-start portrait:px-4">
    <span className="animate-pulse font-semibold text-cyan-700">
      Updating table
    </span>
    <FocusIcon className="text-dyan/50 size-4 animate-spin stroke-[1px]" />
  </div>
);

export const EmptyTable = (props: { loading: boolean }) => (
  <div className="flex flex-col items-center justify-center space-x-4 space-y-8 text-xs portrait:w-[calc(100vw-36px)] portrait:space-x-2 portrait:space-y-6">
    <div className="flex items-center justify-center space-x-2 space-y-8">
      <span>{props.loading}</span>
      <InboxIcon className="size-5 stroke-[1.5px] text-opus portrait:size-4" />
      <p className="font-medium text-clay/60 portrait:tracking-tight">
        No record found.
      </p>
    </div>
    <Button
      variant={"ghost"}
      size="sm"
      className="text-xs text-cyan-600 hover:bg-cyan-300/10 hover:text-cyan-500"
    >
      Create Request
    </Button>
  </div>
);

export const EmptyAgentTable = (props: { loading: boolean }) => (
  <div className="flex flex-col items-center justify-center space-x-4 space-y-8 text-xs portrait:w-[calc(100vw-36px)] portrait:space-x-2 portrait:space-y-6">
    <div className="flex items-center justify-center space-x-2 space-y-8">
      <span>{props.loading}</span>
      <InboxIcon className="size-5 stroke-[1.5px] text-opus portrait:size-4" />
      <p className="font-medium text-clay/60 portrait:tracking-tight">
        No record of agents.
      </p>
    </div>
    {/* <Button
      variant={"ghost"}
      size="sm"
      className="text-xs text-cyan-600 hover:bg-cyan-300/10 hover:text-cyan-500"
    >
      Create Request
    </Button> */}
  </div>
);
