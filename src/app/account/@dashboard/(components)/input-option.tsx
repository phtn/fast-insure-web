import type { FieldValues } from "react-hook-form";
import tw from "tailwind-styled-components";
import { type FieldOptionProps } from "./form-types";
import { InputFieldPayments } from "@/app/(ui)/input";

export const InputOption = <T extends FieldValues>({
  item,
  index,
  length,
  field,
}: FieldOptionProps<T>) => {
  return (
    <>
      {index === 0 ? (
        <TopText {...field} {...item} />
      ) : index === length - 1 ? (
        <BotText {...field} {...item} />
      ) : (
        <MidText {...field} {...item} />
      )}
    </>
  );
};

// export const InputAmount = <T extends FieldValues>({
//   item,
//   field,
// }: FieldOptionProps<T>) => {
//   return <TopAmount {...field} {...item} />;
// };

// export const TopAmount = tw(InputFieldAmount)`
//   bg-gray-50 h-[64px]
//   font-mono text-[10px] font-light placeholder-dyan
//   justify-end

//   border-[0.33px] border-dyan/50
//   rounded-lg
//   `;
// export const XTField = forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref) => (
//     <TopText {...props} type={type} className={className} {...ref} />
//   ),
// );
// XTField.displayName = "XTField";

// export const XMField = forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref) => (
//     <MidText {...props} type={type} className={className} {...ref} />
//   ),
// );
// XMField.displayName = "XMField";

// export const XBField = forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref) => (
//     <BotText {...props} type={type} className={className} {...ref} />
//   ),
// );
// XBField.displayName = "XBField";

export const TopText = tw(InputFieldPayments)`
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-zinc-800 via-zinc-800/75 to-yellow-500 backdrop-blur-lg
  font-mono text-[10px] font-light placeholder-dyan

  border-[0.33px] border-clay
  rounded-lg rounded-b-none
  `;

export const BotText = tw(InputFieldPayments)`
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-zinc-800/75 via-zinc-800/90 to-yellow-500 backdrop-blur-lg
  font-mono text-[10px] font-light

  border-[0.33px] border-clay
  border-t-0
  rounded-lg rounded-t-none
  `;

export const MidText = tw(InputFieldPayments)`
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-zinc-800/90 via-zinc-800/80 to-yellow-500 backdrop-blur-lg
  font-jet text-[10px] font-light placeholder-dyan

  border-[0.33px] border-clay
  border-t-0
  rounded-none
  `;
