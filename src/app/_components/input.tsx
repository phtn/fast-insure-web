import * as React from "react";

import { cn } from "@@utils/cn";
import { AtSignIcon, BanknoteIcon, CoinsIcon, FileSpreadsheetIcon, FileTextIcon, LockKeyholeIcon, type LucideIcon, SmartphoneIcon, SquareUserIcon, UploadCloudIcon, UserCircle2Icon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border border-slate-400 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

// MODERN INPUT
//
export type IconName =
  | "user"
  | "name"
  | "file"
  | "reader"
  | "email"
  | "mobile"
  | "money"
  | "tokens"
  | "upload"
  | "password";

interface IconPrefix {
  name: IconName
  icon: LucideIcon
}

export const IconPrefixes: IconPrefix[] = [
  { name: "user", icon: UserCircle2Icon },
  { name: "name", icon: SquareUserIcon },
  { name: "file", icon: FileTextIcon },
  { name: "reader", icon: FileSpreadsheetIcon },
  { name: "email", icon: AtSignIcon },
  { name: "mobile", icon: SmartphoneIcon },
  { name: "money", icon: BanknoteIcon },
  { name: "tokens", icon: CoinsIcon },
  { name: "upload", icon: UploadCloudIcon },
  { name: "password", icon: LockKeyholeIcon },
];

export const InputField = React.forwardRef<HTMLInputElement, InputProps & IconPrefix>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "border-[0.33px] border-blue-950 focus-within:ring-ring flex h-14 items-center rounded-xl bg-white pl-3 pr-[3px] ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1 dark:bg-indigo-200/20",
          className,
        )}
      >
        <props.icon className="h-[16px] w-[20px] mr-[10px] dark:text-orange-200/80 text-blue-900" />

        <input
          {...props}
          type={type}
          ref={ref}
          className="w-full rounded bg-transparent py-3 text-[15px] placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    );
  },
);
InputField.displayName = "InputField";

export { Input };
