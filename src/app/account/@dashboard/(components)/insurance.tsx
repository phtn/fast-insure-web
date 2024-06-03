import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/(ui)/sheet";
import { DarkTouch } from "@/app/(ui)/touch";
import { cn } from "@/utils/cn";
import { ChevronRightIcon, Disc3Icon } from "lucide-react";
import Link from "next/link";

type PaymentOptionsProps = {
  loading: boolean;
  handleICash: () => void;
  item: Record<string, string>;
};

export const InsuranceOptions = ({ loading, item }: PaymentOptionsProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <DarkTouch
          size="md"
          tail={loading ? Disc3Icon : ChevronRightIcon}
          className="group transition-all duration-300 ease-out"
          tailClass={cn(
            loading
              ? `animate-spin`
              : `h-0 w-0 group-hover:size-5 text-blue-400 transition-all duration-300 ease-out`,
          )}
        >
          Get Insurance
        </DarkTouch>
      </SheetTrigger>
      <SheetContent side={"right"} className="overflow-y-scroll bg-zap">
        <SheetHeader>
          <SheetTitle className="font-sans font-bold tracking-tighter text-fast">
            Insurance Options
          </SheetTitle>
          <SheetDescription className="font-sans text-xs text-clay">
            Choose a policy coverage.
          </SheetDescription>
        </SheetHeader>

        <div className="h-[24px]"></div>

        <div className="block space-y-2 py-2">
          <p className="w-fit rounded-md bg-ash/30 px-3 py-1.5 font-sans text-sm font-semibold tracking-wide text-fast">
            CTPL
          </p>

          {ctplOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => console.log(item)}
              className={cn(option.style)}
            >
              <Link
                href={`/account/${item.id}`}
                className={cn(
                  "h-[36px] w-full bg-contain bg-left bg-no-repeat",
                )}
              >
                {option.name}
              </Link>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

type PaymentMethodData = {
  id: number;
  name: string;
  link: string;
  style: string;
};

const ctplOptions: PaymentMethodData[] = [
  {
    id: 0,
    name: "Brand New",
    link: "/account/brandnew",
    style: " border-yellow-300 bg-yellow-50/20 hover:border-yellow-500",
  },
  {
    id: 1,
    name: "Renewal",
    link: "/account/renewal",
    style: " border-yellow-300 bg-yellow-50/20 hover:border-yellow-500",
  },
];
export const eWallets: PaymentMethodData[] = [
  {
    id: 1,
    name: "gcash",
    link: "bg-[url('/svg/gcash_sm.svg')]",
    style: " border-blue-100 bg-blue-50 hover:border-prime",
  },
  {
    id: 2,
    name: "maya",
    link: "bg-[url('/svg/maya.svg')]",
    style: " border-indigo-00 bg-indigo-50/20 hover:border-indigo-500",
  },
  {
    id: 3,
    name: "shopee",
    link: "bg-[url('/svg/shopeepay.svg')]",
    style: " border-rose-100 bg-rose-50 hover:border-rose-500",
  },
  {
    id: 4,
    name: "grabpay",
    link: "bg-[url('/svg/grabpay.svg')]",
    style: " border-emerald-200 bg-emerald-50/50 hover:border-emerald-500",
  },
];

// const bankMethods: PaymentMethodData[] = [
//   {
//     id: 0,
//     name: "bpi",
//     link: "bg-[url('/svg/bpi.svg')]",
//     style: " border-ash bg-zap hover:border-prime",
//   },
//   {
//     id: 1,
//     name: "ubp",
//     link: "bg-[url('/svg/ubp.svg')]",
//     style: " border-ash bg-zap hover:border-prime",
//   },
//   {
//     id: 2,
//     name: "chinabank",
//     link: "bg-[url('/svg/chinabank.svg')]",
//     style: " border-ash bg-zap hover:border-prime",
//   },
//   {
//     id: 3,
//     name: "rcbc",
//     link: "bg-[url('/svg/rcbc.svg')]",
//     style: " border-ash bg-zap hover:border-prime",
//   },
//   {
//     id: 4,
//     name: "bdo",
//     link: "bg-[url('/svg/bdo.svg')]",
//     style: " border-ash bg-zap hover:border-prime",
//   },
// ];
