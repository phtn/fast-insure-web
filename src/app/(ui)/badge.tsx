import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@@utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-ash/80 text-clay hover:text-blue-500",
        dark: "border-transparent bg-void text-blue-100 hover:text-blue-400 shadow-i-br-dk-hv",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-clay",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
