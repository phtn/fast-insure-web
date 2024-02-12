import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { LucideIcon } from "lucide-react";
import tw from "tailwind-styled-components";

const touchDefaultClass = `
  text-xs font-medium border-[0.33px] cursor-pointer rounded-[8px] space-x-4
  inline-flex items-center justify-center whitespace-nowrap   
  focus-visible:outline-none focus-visible:ring-1  
  focus-visible:ring-ring focus-visible:ring-offset-4
  disabled:pointer-events-none disabled:opacity-50
  transition-all duration-300 ring-offset-background
`;
const defaultClass = `
  bg-white text-clay/80 border-ash/[30%]
  hover:shadow-i-br-li-hv shadow-i-tl-li
  hover:text-blue-400 disabled:hover:text-clay/60
`;
const primaryClass = `
  bg-white text-blue-500/80 border-ash/[30%]
  hover:shadow-i-br-li-hv shadow-i-tl-li
  hover:text-blue-500
`;
const darkClass = `
  bg-void text-blue-300 border-clay/60
  hover:shadow-i-br-dk-hv shadow-i-br-dk-hv
  hover:text-blue-200 pointer-events-auto
`;
const destroyClass = `
  bg-white text-red-500/80 border-ash/[30%]
  hover:shadow-i-br-md-hv shadow-i-tl-li
  hover:text-red-500
`;

const tv = cva(touchDefaultClass, {
  variants: {
    variant: {
      default: defaultClass,
      dark: darkClass,
      destroy: destroyClass,
      primary: primaryClass,
    },
    size: {
      sm: "h-[32px] px-[10px]",
      md: "h-[48px] px-[14px]",
      lg: "h-[50px] px-[16px]",
      icon: "h-[50px] w-[50px] px-[16px]",
      default: "h-[42px] px-[12px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ReUpButtonProps {
  icon?: LucideIcon;
  tail?: LucideIcon;
}

interface TouchProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tv> {
  asChild?: boolean;
}
export const Touch = forwardRef<
  HTMLButtonElement,
  TouchProps & ReUpButtonProps
>(({ asChild, className, size, variant, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Case>
      <Comp
        className={cn(tv({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.icon ? <props.icon strokeWidth={1} className="h-4 w-4" /> : null}

        {children ? <div>{children}</div> : null}
        {props.tail ? <props.tail strokeWidth={1} className="h-4 w-4" /> : null}
      </Comp>
    </Case>
  );
});

Touch.displayName = "Touch";

const Case = tw.div`
  flex items-center justify-center bg-white p-[2px]
  rounded-[10.33px] border-[0.33px] border-ash 
  shadow-i-br-li
  transition-all duration-300 
  hover:shadow-i-tl-li-hv
  drop-shadow-sm
  active:scale-[95%] active:border-ash
`;

export const DarkTouch = forwardRef<
  HTMLButtonElement,
  TouchProps & ReUpButtonProps
>(({ asChild, className, size, variant = "dark", children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <DarkCase>
      <Comp
        className={cn(tv({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.icon ? <props.icon strokeWidth={1} className="h-4 w-4" /> : null}

        {children ? <div>{children}</div> : null}
        {props.tail ? <props.tail strokeWidth={1} className="h-4 w-4" /> : null}
      </Comp>
    </DarkCase>
  );
});

const DarkCase = tw.div`
  flex items-center justify-center bg-void p-[2px]
  rounded-[10.33px] border-[0.33px] border-clay
  shadow-i-tl-dk-hv
  transition-all duration-300 
  drop-shadow-sm
  active:scale-[95%] active:border-ash
`;