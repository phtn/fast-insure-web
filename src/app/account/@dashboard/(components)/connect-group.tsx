import {
  Disc3Icon,
  Link2OffIcon,
  MoreHorizontalIcon,
  UnplugIcon,
} from "lucide-react";
import { SelectGroup } from "./select-group";
import { useConnect } from "../hooks";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";
import { cn } from "@/utils/cn";

/**
 * @name ConnectGroup
 * @description User to Group connection module
 */
export const ConnectGroup = () => {
  const { userCode, setGroup, linkedId } = useConnect();

  const LinkOptions = useCallback(() => {
    const isLinked = linkedId !== null;
    const options = opts(
      <UnplugIcon
        className="w-fit rotate-45 text-blue-400"
        strokeWidth={1.5}
        size={28}
      />,
      <Link2OffIcon className="w-fit text-amber-500" size={18} />,
    );
    return <>{options.get(isLinked)}</>;
  }, [linkedId]);

  return (
    <div className="flex items-center space-x-2 px-4">
      <SelectGroup setGroup={setGroup} />
      <MoreHorizontalIcon
        className={cn(
          "w-fit text-ash",
          linkedId ? `animate-pulse text-blue-400` : ``,
        )}
      />
      <LinkOptions />
      <MoreHorizontalIcon
        className={cn(
          "w-fit text-ash",
          linkedId ? `animate-pulse text-blue-400` : ``,
        )}
      />
      <div className="flex h-[32px] w-[72px] items-center justify-center rounded-md bg-blue-500 font-mono text-xs font-medium uppercase tracking-widest text-zap shadow-inner">
        {userCode ?? <Disc3Icon className="h-4 w-4 animate-spin" />}
      </div>
    </div>
  );
};
