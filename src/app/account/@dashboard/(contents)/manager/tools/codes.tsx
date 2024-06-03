import {
  Link2Icon,
  LoaderIcon,
  MoreVerticalIcon,
  PlusIcon,
} from "lucide-react";
import { Card } from "../../../(components)/card";
import { Button } from "@/app/(ui)/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/(ui)/popover";
import { cn } from "@/utils/cn";

type AgentCodeProps = {
  onClick: () => void;
  code: string | undefined;
  storingCode: boolean;
};
export const AgentCodes = (props: AgentCodeProps) => {
  return (
    <Card
      title="Generate Agent Codes"
      description="Generate & activate codes for agents."
      onClick={props.onClick}
      icon={props.storingCode ? LoaderIcon : Link2Icon}
      iconStyle={cn(props.storingCode ? `animate-spin stroke-1` : `-rotate-45`)}
      actionIcon={PlusIcon}
      actionLabel="Generate"
      style="bg-gradient-to-r from-indigo-500 to-cyan-400 text-white"
      extra={props.code?.substring(0, 6)}
      loading={props.storingCode}
    >
      <MoreOptions />
    </Card>
  );
};

const MoreOptions = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="group p-0">
          <div className="flex size-[32px] items-center justify-center rounded-full group-hover:bg-fast/5">
            <MoreVerticalIcon
              size={24}
              className=" text-zap group-hover:text-white"
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-24 w-[120px] rounded-md border-0 bg-void p-0 shadow-fast/20">
        <Button
          variant={"ghost"}
          className="flex h-8 w-full items-center justify-center border-0 p-0"
        >
          <p className="text-xs text-blue-100">View All Codes</p>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
