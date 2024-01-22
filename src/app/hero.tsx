import { Button } from "@@components/button";
import { Input } from "@@components/input";
import { AppGallery, AppStore, PlayStore } from "@@components/store";
import { MoveRightIcon } from "lucide-react";

export default function Hero() {
  return (
    <div className="h-screen items-center bg-gradient-to-b from-blue-950 from-10% to-blue-700 p-8 pt-[150px] text-white md:flex md:pt-0 ">
      <div className="mx-auto grid-cols-2 md:grid">
        <div className="flex flex-col justify-center space-y-6 md:space-y-10">
          <h1 className="max-w-[8ch] text-5xl font-bold tracking-tighter md:text-6xl">
            Download the app.
          </h1>
          <p className="my-3 max-w-[48ch] text-[16px] text-blue-100 md:text-xl">
            Upgrade your lifestyle with FastInsure! Check your coverage status,
            enjoy great perks, and explore best deals.
          </p>

          <div className="grid grid-cols-2 gap-6 py-4 md:flex md:justify-around md:space-x-4">
            <AppStore />
            <PlayStore />
            <AppGallery />
          </div>
          <div className="hidden items-center justify-start gap-4 md:flex">
            <Input placeholder="Email" className="w-[350px]" />
            <Button size="lg" className="w-[175px]">
              Get in touch <MoveRightIcon className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="hidden w-1/2 justify-end md:flex">
          <div className="relative h-[600px] w-[200px] rotate-3 transform rounded-lg bg-white p-6 shadow-2xl">
            <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
              <div className="text-lg font-semibold text-black">$27,563</div>
              <div className="text-sm text-black">205 bonus</div>
            </div>
            <div className="mt-16 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-black">Walmart</div>
                <div className="text-sm text-black">$205</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-black">JPMorgan Chase</div>
                <div className="text-sm text-black">$145.50</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-black">HSBC Holdings</div>
                <div className="text-sm text-black">$24</div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-black">Currencies</div>
                <div className="text-sm text-black">Transactions</div>
              </div>
              <div className="mt-6">
                <div className="rounded-lg bg-[#3b5998] p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">facebook</div>
                    <div className="text-xs">BANK</div>
                  </div>
                  <div className="mt-4 text-sm">5411 7512 3331 5443</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs">11/23</div>
                    <div className="text-xs">VISA</div>
                  </div>
                </div>
                <div className="mt-2 text-center text-xs text-black">
                  Show all cards
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
