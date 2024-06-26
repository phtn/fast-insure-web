"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/utils/cn";

/**
 * (ui) - Checkbox
 *
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "focus-visible:ring-ring peer h-4 w-4 shrink-0 rounded-md border border-ash shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-void data-[state=checked]:text-cyan-500 data-[state=checked]:animate-in data-[state=unchecked]:animate-out data-[state=checked]:zoom-in-100 data-[state=unchecked]:zoom-out-0",
      className,
    )}
    {...props}
  ></CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export const CheckBx = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "focus-visible:ring-ring peer flex size-5 shrink-0 items-center justify-center rounded-md border focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-sky-500 data-[state=unchecked]:border-neutral-400 data-[state=checked]:bg-sky-500 data-[state=checked]:animate-in data-[state=unchecked]:animate-out",
      className,
    )}
    {...props}
  ></CheckboxPrimitive.Root>
));

CheckBx.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
