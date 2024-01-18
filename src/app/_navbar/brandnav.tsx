"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@@utils/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@@components/avatar";
import { Button } from "@@components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@@components/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@@components/dialog";
import { Input } from "@@components/input";
import { Label } from "@@components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@@components/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@@components/select";
import { ChevronsUpDownIcon } from "lucide-react";

const groups = [
  {
    label: "My Account",
    values: [
      {
        label: "Olivia Ponton",
        value: "personal",
      },
    ],
  },
  {
    label: "Clients",
    values: [
      {
        label: "Faith Ordway",
        value: "67890",
      },
      {
        label: "Rachel McAdams",
        value: "12345",
      },
    ],
  },
];

type Group = (typeof groups)[number]["values"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function BrandNav({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<Group | undefined>(
    groups[0]?.values[0],
  );

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn(
              "flex w-[200px] items-center justify-between",
              className,
            )}
          >
            <motion.div
              initial={{ x: -500, skewX: `${85}deg` }}
              animate={{ x: 0, skewX: `${0}deg`, opacity: 1 }}
              transition={{
                damping: 1,
                duration: 1,
                delay: 3.5,
              }}
              className="h-[28px] w-[100px] bg-[url('/logo/fi_logo_v1.svg')] bg-cover bg-center"
            />
            <ChevronsUpDownIcon className="ml-auto h-5 w-5 shrink-0 text-blue-950" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mt-4 w-[220px] bg-neutral-50 p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search client..." />
              <CommandEmpty>No client found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup
                  key={group.label}
                  heading={group.label}
                  className=""
                >
                  {group.values.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() => {
                        setSelectedValue(item);
                        setOpen(false);
                      }}
                      className={cn(
                        "text-sm",
                        selectedValue?.value === item.value
                          ? "font-medium text-blue-500"
                          : "text-stone-600",
                      )}
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${item.value}.png`}
                          alt={item.label}
                          className="grayscale"
                        />
                        <AvatarFallback>XX</AvatarFallback>
                      </Avatar>
                      {item.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedValue?.value === item.value
                            ? "text-blue-500 opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    className="font-medium"
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5 text-blue-500" />
                    Create account
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent className="bg-gradient-to-br from-orange-50 to-blue-200">
        <DialogHeader>
          <DialogTitle>Create a client account</DialogTitle>
          <DialogDescription>
            Add a new client to manage their products.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client name</Label>
              <Input id="name" placeholder="First and Last name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Product List</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="free">
                    <span className="font-medium">TPL</span> -{" "}
                    <span className="text-muted-foreground">₱ 5000.00/yr</span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">PA</span> -{" "}
                    <span className="text-muted-foreground">₱ 1000.00/yr</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="borderline"
            onClick={() => setShowNewTeamDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
