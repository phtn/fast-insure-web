import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/app/(ui)/dropdown";
import { PopoverContent } from "@/app/(ui)/popover";
import { CommandItem } from "@/app/(ui)/command";
import { SelectContent, SelectItem } from "@@ui/select";

import tw from "tailwind-styled-components";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/app/(ui)/button";

export const content = `
  rounded-md border-[0.0px] border-opus p-0
  bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  from-slate-900 via-zinc-800/80 to-yellow-500 backdrop-blur-lg
  overflow-clip

  `;

const item = `
  h-[36px] rounded-none cursor-pointer
  font-jet text-xs text-void/80 font-medium
  transition-colors duration-200 ease-in-out
  hover:bg-slate-900/50
  `;

type SelectedItem = {
  selected: boolean;
};

export const Beach = tw(PopoverContent)`
  ${(_) => content}
  `;

export const BeachItem = tw(CommandItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-slate-900/20" : "")}
  `;

export const BeachDrop = tw(DropdownMenuContent)`
  ${(_) => content}
  -mr-[2px] mt-[10.33px] w-[200px]
  `;

export const BeachDropItem = tw(DropdownMenuItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-slate-900/20" : "")}
  `;

export const BeachCheckItem = tw(DropdownMenuCheckboxItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-cyan-700/5" : "")}
  `;

export const BeachSelect = tw(SelectContent)`
  ${(_) => content}
  `;

export const BeachSelectItem = tw(SelectItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-cyan-700/5" : "")}
  `;

export const SpaceX = tw(Cross2Icon)`
  size-0 -rotate-45 text-white hidden animate-in
  transition-all duration-300 ease-in-out
  group-hover:ml-2 group-hover:size-4
  group-hover:rotate-90 group-hover:flex
  `;

export const ActiveOptions = tw(Button)`
  hover:bg-neutral-300/20
  h-[24px] border-[0.33px] border-transparent px-2 text-xs text-coal/50
  data-[state=open]:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
  data-[state=open]:backdrop-blur-lg

  data-[state=open]:from-slate-900
  data-[state=open]:via-zinc-800/80
  data-[state=open]:to-yellow-500

  data-[state=open]:rounded-s-full data-[state=open]:border-slate-800
  data-[state=open]:shadow-inner data-[state=open]:shadow-neutral-700

  data-[state=open]:text-blue-200
  `;
