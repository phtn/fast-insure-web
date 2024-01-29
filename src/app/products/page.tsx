import { cn } from "@/utils/cn";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { CandyIcon } from "lucide-react";
import { products } from "./data";

export default function Products() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-950 from-10% to-blue-600 py-24 lg:py-32 xl:py-48">
      <div className="flex items-center px-4 md:px-10">
        <div className="grid w-full items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="mb-4 flex w-full flex-col items-start justify-start space-y-2">
              <h1 className="bg-gradient-to-r from-orange-100 to-sky-200 bg-clip-text text-5xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                All Products.
              </h1>
              <p className="mx-auto w-full text-left text-zinc-300 md:text-xl">
                You can protect your family and your future, one policy at a
                time.
              </p>
            </div>
            <div className="mx-auto w-full max-w-full space-y-4">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "overflow-clip rounded-[18px] transition-all duration-500 hover:scale-[105%]",
                      item.bg,
                    )}
                  >
                    <div
                      className={cn(
                        "h-[280px] md:w-[420px] bg-cover bg-top p-6",
                        item.image,
                      )}
                    >
                      <div className="flex h-[175px] items-start justify-between">
                        <h2 className="text-3xl font-bold text-blue-100">
                          {item.title}
                        </h2>
                        <CandyIcon className="mb-2 h-8 w-8 text-blue-100" />
                      </div>
                      <div className="flex h-[80px] items-center justify-between">
                        <InfoCircledIcon className="h-8 w-8 text-zinc-950" />
                        <p className="text-2xl font-normal tracking-tight text-indigo-950">
                          ₱10,000
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
