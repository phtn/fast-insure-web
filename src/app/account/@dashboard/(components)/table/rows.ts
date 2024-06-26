import { TableRow } from "@/app/(ui)/table";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export const RowMotion = motion(TableRow);
export const rowStyles = {
  initial: { x: -20 },
  animate: { x: 0 },
  transition: {
    type: "inertia",
    duration: 0.2,
    ease: "linear",
    stiffness: 10,
    damping: 10,
  },
  className: cn(
    "transition-colors hover:bg-ghost hover:duration-200 hover:ease-in-out",
    "border-dyan/40 border-b-[0.33px] border-dashed",
  ),
};
