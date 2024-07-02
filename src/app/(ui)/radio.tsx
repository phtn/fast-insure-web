"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "@/utils/cn";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "border-primary text-primary ring-offset-background focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export const RadioButton = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    description?: string;
  }
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "w-full rounded-full transition-all duration-300 ease-in-out hover:scale-[103%] disabled:cursor-not-allowed disabled:opacity-50",
        className,
        props.checked ? "scale-[103%]" : "",
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full rounded-xl border bg-white text-coal shadow-md",
          props.checked
            ? "border-sky-600 bg-gradient-to-b from-sky-600 to-sky-400"
            : "border-neutral-200 ",
        )}
      >
        <div
          className={cn(
            "m-[6px] flex h-[50px] justify-between rounded-md p-4",
            props.checked
              ? ""
              : "border-0 border-sky-500/50 bg-gradient-to-br from-sky-500/20 to-white",
          )}
        >
          <p
            className={cn(
              "text-xl font-bold uppercase tracking-tight",
              props.checked ? "text-white" : "text-dyan/80",
            )}
          >
            {props.value}
          </p>
          <RadioGroupPrimitive.Indicator className="">
            <CheckCircleIcon className="size-6 rotate-6 fill-white" />
          </RadioGroupPrimitive.Indicator>
        </div>
        <div className="h-[100px] w-full px-4">
          <p
            className={cn(
              "text-left text-sm",
              props.checked ? " text-white" : " text-dyan/80",
            )}
          >
            {props.description}
          </p>
        </div>
      </div>
    </RadioGroupPrimitive.Item>
  );
});
RadioButton.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
