"use client";

import { Button } from "@@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@@ui/dropdown";
import { User2Icon } from "lucide-react";
import Link from "next/link";

// const Profile = () => (
//   <Avatar className="h-8 w-8">
//     <AvatarImage src="/logo/fi_logo_v1.svg" alt="@shadcn" />
//     <AvatarFallback>SC</AvatarFallback>
//   </Avatar>
// );

export function UserNav() {
  // const UserOptions = useCallback(() => {
  //   const options = opts(sign in page
  //     <p>yoyp</p>,
  //     <UserCircleIcon className="h-4 w-4 text-blue-950" />,
  //   );
  //   return (
  //     <Button variant="default" className=" relative z-50 h-8 w-8 rounded-full">
  //       {options.get(false)}
  //     </Button>
  //   );
  // }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <User2Icon className="h-5 w-5 text-blue-950" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-blue-50" align="end" forceMount>
        <Link href="/signin">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Ethan Hunt</p>
              <p className="text-muted-foreground text-xs leading-none">
                agent@email.com
              </p>
            </div>
          </DropdownMenuLabel>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
