import { cn } from "@/utils/cn";
import { FileSymlinkIcon, LoaderIcon, PlusIcon } from "lucide-react";
import { Card } from "../../../(components)/card";

type CTPLRequestProps = {
  onClick: () => void;
  loading: boolean;
};
export const CTPLRequest = (props: CTPLRequestProps) => {
  return (
    <Card
      title="Requests"
      description={`Create & submit a request.`}
      onClick={props.onClick}
      icon={props.loading ? LoaderIcon : FileSymlinkIcon}
      iconStyle={cn(
        props.loading ? `animate-spin stroke-1` : ``,
        `stroke-[1.5px]`,
      )}
      actionIcon={PlusIcon}
      actionLabel="Create"
      style="bg-gradient-to-r from-indigo-500 to-cyan-400 text-white"
      loading={props.loading}
    />
  );
};
