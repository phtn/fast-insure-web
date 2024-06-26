import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@@ui/command";
import { Popover, PopoverTrigger } from "@@ui/popover";
import { Checkbox } from "@/app/(ui)/checkbox";
import { cn } from "@/utils/cn";
import { type Column } from "@tanstack/react-table";
import { CheckIcon, MessageCirclePlusIcon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { Beach, BeachItem, SpaceX } from "./styles";
import type { DataTableFacetedFilterProps, ImageOption } from "./types";
import { Button } from "@/app/(ui)/button";

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="group flex h-[36px] items-center space-x-1.5 rounded-md px-2 text-xs hover:border-cyan-600 hover:bg-cyan-600 hover:text-white"
        >
          <PlusCircleIcon className="size-4 stroke-1 text-gray-500 group-hover:text-white/80" />
          <p>{title}</p>
        </Button>
      </PopoverTrigger>
      <Beach
        className={cn(
          "-mr-[3px] mt-[10.33px]",
          title === "customer" ? "w-[100px]" : "w-[240px]",
        )}
        align="end"
      >
        <Command>
          <CommandInput
            placeholder={title}
            iconStyle="text-paper"
            className="font-mono text-xs text-paper"
          />
          <CommandList>
            <CommandEmpty className="font-jet flex items-center space-x-2 border-t-[0.33px] border-ash p-3 text-xs text-opus">
              <MessageCirclePlusIcon className="size-4" />
              <p>No results found.</p>
            </CommandEmpty>
            <CommandSeparator className="h-[0.33px] bg-opus/20" />
            <CommandGroup>
              {options?.map((option) => {
                const isSelected =
                  typeof option.value === "string"
                    ? selectedValues.has(option.value)
                    : option.value;
                return (
                  <BeachItem
                    selected={isSelected}
                    key={option.value.toString()}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }

                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                      // console.log(selectedValues);
                    }}
                  >
                    <Checkbox
                      className={cn(
                        `group mr-3 border-sky-50/50`,
                        isSelected ? "border-void bg-void" : "",
                      )}
                    >
                      <CheckIcon
                        className={cn(
                          "size-4 scale-50 stroke-[0.33px] text-sky-300 transition-all duration-300",
                          isSelected
                            ? `scale-100 stroke-[3px]`
                            : `scale-0 stroke-1`,
                        )}
                      />
                    </Checkbox>
                    <div
                      className={cn(
                        option.color,
                        "flex items-center rounded p-1",
                      )}
                    >
                      {option.icon && (
                        <option.icon
                          className={cn("mr-2 size-3.5 stroke-[1.5px]")}
                        />
                      )}
                      <span className={cn("text-xs font-normal capitalize")}>
                        {option.label}
                      </span>
                    </div>
                    {facets?.get(option.value) && (
                      <span
                        className={cn(
                          option.color,
                          "ml-auto flex size-4 items-center justify-center font-normal",
                        )}
                      >
                        {facets.get(option.value)}
                      </span>
                    )}
                  </BeachItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator className="h-[1px] bg-neutral-300/20" />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="group flex h-[36px] items-center justify-center rounded-md bg-void "
                  >
                    <p className="font-jet text-xs font-light uppercase text-paper group-hover:text-orange-50">
                      Clear filters
                    </p>
                    <SpaceX />
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </Beach>
    </Popover>
  );
}

export interface DataTableImageFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options?: ImageOption[];
}

export function DataTableImageFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableImageFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="group flex h-[36px] items-center space-x-1.5 rounded-md px-2 text-xs hover:border-cyan-600 hover:bg-cyan-600 hover:text-white"
        >
          <PlusCircleIcon className="size-4 stroke-1 text-gray-500 group-hover:text-white/80" />
          <p>{title}</p>
        </Button>
      </PopoverTrigger>
      <Beach
        className={cn(
          "-mr-[3px] mt-[10.33px]",
          title === "customer" ? "w-[100px]" : "w-[200px]",
        )}
        align="end"
      >
        <Command>
          <CommandInput
            placeholder={title}
            iconStyle="text-paper"
            className="font-mono text-xs text-paper"
          />
          <CommandList>
            <CommandEmpty className="font-jet flex items-center space-x-2 border-t-[0.33px] border-ash p-3 text-xs text-opus">
              <MessageCirclePlusIcon className="size-4" />
              <p>No results found.</p>
            </CommandEmpty>
            <CommandSeparator className="h-[0.33px] bg-opus/20" />
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <BeachItem
                    selected={isSelected}
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }

                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
                      // console.log(selectedValues);
                    }}
                  >
                    <Checkbox
                      className={cn(
                        `group mr-3 border-sky-50/50`,
                        isSelected ? "border-void bg-void" : "",
                      )}
                    >
                      <CheckIcon
                        className={cn(
                          "size-4 scale-50 stroke-[0.33px] text-sky-300 transition-all duration-300",
                          isSelected
                            ? `scale-100 stroke-[3px]`
                            : `scale-0 stroke-1`,
                        )}
                      />
                    </Checkbox>
                    <div
                      className={cn(
                        "flex items-center space-x-2 rounded text-white",
                      )}
                    >
                      {option.url && (
                        <Image
                          alt={option.complete}
                          src={option.url}
                          width={0}
                          height={0}
                          className={cn(
                            option.value === "tfi"
                              ? "flex h-[20px] items-center justify-center rounded-full border-[0.33px] border-amber-400 bg-sky-50 p-0.5"
                              : "h-[18px]",
                            "w-auto",
                          )}
                          unoptimized
                        />
                      )}
                      <span className={cn("font-mono text-xs text-gray-100")}>
                        {option.label}
                      </span>
                    </div>
                    {facets?.get(option.value) && (
                      <span
                        className={cn(
                          "ml-auto flex size-4 items-center justify-center text-sky-100",
                        )}
                      >
                        {facets.get(option.value)}
                      </span>
                    )}
                  </BeachItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator className="h-[1px] bg-neutral-300/20" />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="group flex h-[36px] items-center justify-center rounded-md bg-void "
                  >
                    <p className="font-jet text-xs font-light uppercase text-paper group-hover:text-orange-50">
                      Clear filters
                    </p>
                    <SpaceX />
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </Beach>
    </Popover>
  );
}
