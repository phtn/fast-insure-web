import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@@utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-500 font-bold text-white hover:bg-blue-950",
        submit: "bg-slate-900 font-bold text-white rounded-xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-blue-400 hover:border-blue-50 font-bold hover:bg-blue-500 bg-white text-blue-500 hover:text-blue-50 transition-color duration-300",
        borderline:
          "border border-blue-400 hover:border-2 hover:text-blue-200 text-blue-600 transition-all duration-300",
        goldline:
          "border border-blue-400 hover:border-blue-600 font-bold hover:bg-blue-50 bg-transparent text-blue-500 hover:text-blue-500 transition-all duration-300",
        iconline:
          "border-[0.25px] border-paper hover:ring-offset-4 hover:ring-offset-blue-400 hover:ring-ring hover:shadow-i-br-md rounded-[12px] font-bold shadow-inner-bl bg-white text-clay/80 hover:text-blue-400 transition-all duration-700 ease-in-out",

        secondary: "bg-zinc-500 font-bold text-white hover:bg-blue-950",
        tertiary:
          "bg-blue-500/10 text-blue-900 hover:bg-blue-500 hover:text-white",
        ghost: "text-blue-600 hover:text-blue-600",
        casper: "text-clay/50 hover:text-clay",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        fat: "h-14 px-4 py-2",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-[50px] rounded-md px-8",
        icon: "h-10 w-10",
        ficon: "h-[50px] w-[50px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
