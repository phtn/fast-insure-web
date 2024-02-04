import { cn } from '@/utils/cn';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@@components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@@components/popover";
import { ClipboardPenLineIcon, DotIcon, Wallet2Icon, type LucideIcon, UserCircle2Icon, GiftIcon, FilesIcon, HelpCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';
import { Button } from '../_components/button';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/libs/db';
import { onPromise } from '@/utils/toast';
import { AuthContext } from '../context';
import { opts } from '@/utils/helpers';
import { type User } from 'firebase/auth';

type Item = {
  label: string
  desc: string
  value: string
  icon: LucideIcon
  href?: string
}

type GroupItem = {
  label: string
  values: Item[]
}

const notAuthedGroup: GroupItem[] = [
  {
    label: "NotAuthed",
    values: [
      {
        label: "Sign in",
        desc: "Check coverage status",
        value: "0",
        icon: UserCircle2Icon,
        href: '/signin'
      },
    ]
  }
]

const groups: GroupItem[] = [
  {
    label: "Menu",
    values: [
      {
        label: "15,000",
        desc: "Account Balance",
        value: "0",
        icon: Wallet2Icon,
        href: '/products'
      },
      {
        label: "Insurance",
        desc: "View all coverage",
        value: "3",
        icon: FilesIcon,
        href: '/autoloans'
      },
      {
        label: "Gifts",
        desc: "Claim your gifts.",
        value: "2",
        icon: GiftIcon,
        href: '/autoloans'
      },
      {
        label: "Claims",
        desc: "File a claim",
        value: "1",
        icon: ClipboardPenLineIcon,
        href: '/products'
      },


    ],
  },
  {
    label: "Misc",
    values: [
      {
        label: "Customer Support",
        desc: "Customize your profile.",
        value: "67890",
        icon: HelpCircleIcon,
        href: '#'
      },
    ],
  },
];

type SignOptionProps = {
  onSelect: () => void
}

const LogoutOption = ({ onSelect }: SignOptionProps) => (
  <CommandItem
    className="pt-2 py-2 border border-slate-300 w-full bg-slate-200 rounded-md"
    onSelect={onSelect}
  >
    <div className='flex items-center justify-between w-full'>
      <p className='text-sm font-bold text-blue-950 tracking-tight'>Logout</p>
      <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border text-slate-500 px-1.5 py-1.5 font-mono text-[16px] font-medium opacity-100'>
        <span className=''>⌘</span><span className='text-sm'>Q</span>
      </kbd>
    </div>

  </CommandItem>
)

const SignInOption = () => (
  <Link href='/signin'>
    <CommandItem
      className="pt-2 py-2 border border-slate-300 w-full bg-slate-200 rounded-md"
    >
      <div className='flex items-center justify-between w-full'>
        <p className='text-sm font-bold text-blue-950 tracking-tight'>Sign in</p>
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border text-slate-500 px-1.5 py-1.5 font-mono text-[16px] font-medium opacity-100'>
          <span className=''>⌘</span><span className='text-sm'>S</span>
        </kbd>
      </div>

    </CommandItem>
  </Link>
)

type Group = (typeof groups)[number]["values"][number];



export const UserMenu = () => {
  const [open, setOpen] = useState(false)
  const [signOut, loading, error] = useSignOut(auth)
  const [selectedValue, setSelectedValue] = useState<Group | undefined>();

  const creds = useContext(AuthContext)

  const SignOptions = useCallback(() => {
    const logout = () => {
      onPromise(signOut(), 'Logging out...', error)
    }
    const isAuthed = creds?.user !== null
    const options = opts(<LogoutOption onSelect={logout} />, <SignInOption />)
    return <>{options.get(isAuthed)}</>
  }, [creds, error, signOut])

  const MenuOptions = useCallback(() => {
    const handleSelect = (item: Item) => {
      console.log(loading ? 'Pending...' : 'Complete.')
      setSelectedValue(item);
      setOpen(false);
    }
    const isAuthed = creds?.user !== null
    const options = opts(<AuthedContent onSelect={handleSelect} selectedValue={selectedValue} user={creds?.user} />, <NotAuthedContent selectedValue={selectedValue} onSelect={handleSelect} />)
    return <>{options.get(isAuthed)}</>
  }, [creds, selectedValue, loading])



  return (
    <Popover open={open} onOpenChange={setOpen}>

      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <UserCircle2Icon className="h-5 w-5 text-blue-950" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="mt-3 mr-1 w-[220px] border-blue-100 p-0">
        <Command>
          <MenuOptions />
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <SignOptions />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

  )
};


type NotAuthedContentProps = {
  onSelect: (item: Item) => void
  selectedValue: Group | undefined
}

const NotAuthedContent = ({ onSelect, selectedValue }: NotAuthedContentProps) => {
  return (
    <CommandList>
      {notAuthedGroup.map((group) => (
        <CommandGroup
          key={group.label}
        >
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`}>
              <CommandItem
                key={item.value}
                onSelect={() => onSelect(item)}
                className={cn(
                  `py-3 font-bold text-sm items-center`,
                  selectedValue?.value === item.value
                    ? "text-blue-500"
                    : "text-blue-950",
                )}
              >
                <item.icon className={cn(`mr-4 h-[28px] w-[28px] rounded p-[6px] group-hover:bg-blue-950 group-hover:text-blue-100 transition-all duration-300`, selectedValue?.value === item.value ? "bg-blue-950 text-blue-100"
                  : "text-zinc-600")} />
                <div className='flex flex-col justify-center'>
                  <p className=''>{item.label}</p>
                  <p className='text-[11px] leading-[11px] text-zinc-600 font-normal'>{item.desc}</p>
                </div>
                <DotIcon
                  className={cn(
                    "ml-auto h-10 w-10",
                    selectedValue?.value === item.value
                      ? "text-blue-500 animate-pulse opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      ))}
    </CommandList>
  )
}


type AuthedContentProps = {
  user: User | null | undefined
  onSelect: (item: Item) => void
  selectedValue: Group | undefined
}

const AuthedContent = ({ onSelect, selectedValue, user }: AuthedContentProps) => {
  return (
    <CommandList>
      <Link href='/account'>
        <CommandItem className='py-3'>
          <UserCircle2Icon className='mr-3 h-[36px] w-[36px] mx-1 rounded p-[6px] text-blue-500' />
          <div className='flex flex-col justify-center'>
            <p className='text-blue-950 font-bold'>{user?.displayName ?? `Add Your Name`}</p>
            <p className='text-[11px] leading-[11px] text-blue-900 font-normal'>{user?.email}</p>
          </div>
        </CommandItem>
      </Link>

      <CommandSeparator className='bg-blue-500/20' />
      <CommandEmpty>Nothing found.</CommandEmpty>
      {groups.map((group) => (
        <CommandGroup
          key={group.label}
        >
          {group.values.map((item) => (
            <Link key={item.value} href={item.href ?? `#`} className='group'>
              <CommandItem
                key={item.value}
                onSelect={() => onSelect(item)}
                className={cn(
                  `py-3 font-bold text-sm items-center`,
                  selectedValue?.value === item.value
                    ? "text-blue-500"
                    : "text-blue-950",
                )}
              >
                <item.icon className={cn(`mr-3 h-[28px] w-[28px] rounded p-[6px] group-hover:bg-blue-950 group-hover:text-blue-100 transition-all duration-300`, selectedValue?.value === item.value ? "bg-blue-950 text-blue-100"
                  : "text-zinc-500")} />
                <div className='flex flex-col justify-center'>
                  <p className=''>{item.label}</p>
                  <p className='text-[11px] leading-[11px] text-zinc-600 font-normal'>{item.desc}</p>
                </div>
                <DotIcon
                  className={cn(
                    "ml-auto h-10 w-10",
                    selectedValue?.value === item.value
                      ? "text-blue-500 animate-pulse opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      ))}
    </CommandList>

  )
}