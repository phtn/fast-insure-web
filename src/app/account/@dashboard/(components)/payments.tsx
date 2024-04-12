import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/(ui)/sheet";
import { Touch } from "@/app/(ui)/touch";
import { cn } from "@/utils/cn";
import { Disc3Icon } from "lucide-react";
import { useMemo } from "react";

type PaymentOptionsProps = {
  loading: boolean;
  handleICash: () => void;
};

export const PaymentOptions = ({
  loading,
  handleICash,
}: PaymentOptionsProps) => {
  const clicks = useMemo(
    () => [
      handleICash,
      handleICash,
      () => console.log("yo"),
      handleICash,
      handleICash,
    ],
    [handleICash],
  );
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Touch
          // iconClass={}
          size={"sm"}
          className="h-[32px]"
          // onClick={onClick}
          tail={Disc3Icon}
          tailClass={loading ? "animate-spin" : "size-0 hidden"}
        >
          Checkout
        </Touch>
        {/* <DarkTouch
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
        </DarkTouch> */}
      </SheetTrigger>
      <SheetContent side={"right"} className="overflow-y-scroll bg-zap">
        <SheetHeader>
          <SheetTitle className="font-sans font-bold tracking-tighter text-fast">
            Payment Options
          </SheetTitle>
          <SheetDescription className="font-sans text-xs text-clay">
            Choose your payment method.
          </SheetDescription>
        </SheetHeader>

        <div className="h-[24px]"></div>

        <div className="block space-y-2 py-2">
          <p className="rounded-md bg-ash/30 px-3 py-1.5 font-sans text-sm font-semibold tracking-tighter text-fast">
            In-House Wallet
          </p>

          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={clicks[method.id]}
              className={cn(
                method.style,
                "space-x-4 rounded-[8px] border-[0.33px] p-4 font-sans text-sm font-semibold",
              )}
            >
              <div
                className={cn(
                  method.img_url,
                  "h-[36px] w-full bg-contain bg-left bg-no-repeat",
                )}
              ></div>
            </div>
          ))}

          <div className="block space-y-2 py-2">
            <p className="rounded-md bg-ash/30 px-3 py-1.5 font-sans text-sm font-semibold tracking-tighter text-fast">
              E-Wallets
            </p>

            <div className="grid grid-cols-2 gap-4">
              {eWallets.map((method) => (
                <div
                  key={method.id}
                  onClick={clicks[method.id]}
                  className={cn(
                    method.style,
                    "space-x-4 rounded-[8px] border-[0.33px] p-4 font-sans text-sm font-semibold",
                  )}
                >
                  <div
                    className={cn(
                      method.img_url,
                      "h-[42px] w-full bg-contain bg-center bg-no-repeat",
                    )}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          <div className="block space-y-2 py-2">
            <p className="rounded-md bg-ash/30 px-3 py-1.5 font-sans text-sm font-semibold tracking-tighter text-fast">
              Direct Debit
            </p>

            <div className="grid grid-cols-2 gap-4">
              {bankMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={clicks[method.id]}
                  className={cn(
                    method.style,
                    "space-x-4 rounded-[8px] border-[0.33px] p-4 font-sans text-sm font-semibold",
                  )}
                >
                  <div
                    className={cn(
                      method.img_url,
                      "h-[42px] w-full bg-contain bg-center bg-no-repeat",
                    )}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

type PaymentMethodData = {
  id: number;
  name: string;
  img_url: string;
  style: string;
};

const paymentMethods: PaymentMethodData[] = [
  {
    id: 0,
    name: "icash",
    img_url: "bg-[url('/svg/icash.png')]",
    style: " border-yellow-300 bg-yellow-50/20 hover:border-yellow-500",
  },
];
const eWallets: PaymentMethodData[] = [
  {
    id: 1,
    name: "gcash",
    img_url: "bg-[url('/svg/gcash_sm.svg')]",
    style: " border-blue-100 bg-blue-50 hover:border-prime",
  },
  {
    id: 2,
    name: "maya",
    img_url: "bg-[url('/svg/maya.svg')]",
    style: " border-indigo-00 bg-indigo-50/20 hover:border-indigo-500",
  },
  {
    id: 3,
    name: "shopee",
    img_url: "bg-[url('/svg/shopeepay.svg')]",
    style: " border-rose-100 bg-rose-50 hover:border-rose-500",
  },
  {
    id: 4,
    name: "grabpay",
    img_url: "bg-[url('/svg/grabpay.svg')]",
    style: " border-emerald-200 bg-emerald-50/50 hover:border-emerald-500",
  },
];

const bankMethods: PaymentMethodData[] = [
  {
    id: 0,
    name: "bpi",
    img_url: "bg-[url('/svg/bpi.svg')]",
    style: " border-ash bg-zap hover:border-prime",
  },
  {
    id: 1,
    name: "ubp",
    img_url: "bg-[url('/svg/ubp.svg')]",
    style: " border-ash bg-zap hover:border-prime",
  },
  {
    id: 2,
    name: "chinabank",
    img_url: "bg-[url('/svg/chinabank.svg')]",
    style: " border-ash bg-zap hover:border-prime",
  },
  {
    id: 3,
    name: "rcbc",
    img_url: "bg-[url('/svg/rcbc.svg')]",
    style: " border-ash bg-zap hover:border-prime",
  },
  {
    id: 4,
    name: "bdo",
    img_url: "bg-[url('/svg/bdo.svg')]",
    style: " border-ash bg-zap hover:border-prime",
  },
];
