import { cn } from "@/utils/cn";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { CandyIcon } from "lucide-react";

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  url: string;
  image: string;
  bg: string;
}

const data: ProductData[] = [
  {
    id: 0,
    title: "Car Protect",
    description: "Audi SUV",
    price: 37500,
    url: "#",
    bg: "bg-gradient-to-br from-indigo-950 to-indigo-800",
    image: "bg-[url('/peaks/peaks_v6.svg')] bg-cover bg-top",
  },
  {
    id: 1,
    title: "Motorcycle Protect",
    description: "Audi SUV",
    price: 39800,
    url: "#",
    bg: "bg-gradient-to-br from-cyan-600 to-lime-800",
    image: "bg-[url('/peaks/peaks_v7.svg')]",
  },
  {
    id: 2,
    title: "CTPL Cover",
    description: `Compulsory Third Party Liability or CTPL is an insurance coverage required by the Land Transportation Office upon vehicle registration.  Private Cars such as sedans, AUVs, MPV, Wagon, Van, Pick-up, Motorcycles, and Trucks must have CTPL coverage upon registration.
`,
    price: 47100,
    url: "#",
    bg: "bg-gradient-to-br from-emerald-950 to-emerald-800",
    image: "bg-[url('/peaks/peaks_v8.svg')]",
  },
  {
    id: 3,
    title: "Travel Protect",
    description: "Audi SUV",
    price: 54700,
    url: "#",
    bg: "bg-gradient-to-br from-slate-950 to-slate-700",
    image: "bg-[url('/peaks/peaks_v9.svg')]",
  },
  {
    id: 4,
    title: "House Protect",
    description: "Audi SUV",
    price: 237500,
    url: "#",
    bg: "bg-gradient-to-br from-blue-950 to-blue-800",
    image: "bg-[url('/peaks/peaks_v10.svg')]",
  },
  {
    id: 5,
    title: "Cellphone Protect",
    description: "Audi SUV",
    price: 81700,
    url: "#",
    bg: "bg-gradient-to-br from-neutral-500 to-blue-600",
    image: "bg-[url('/peaks/peaks_v6.svg')]",
  },
  {
    id: 6,
    title: "Bayaning Guro",
    description: "Audi SUV",
    price: 77500,
    url: "#",
    bg: "bg-gradient-to-br from-neutral-950 to-neutral-700",
    image: "bg-[url('/peaks/peaks_v7.svg')]",
  },
  {
    id: 7,
    title: "Kasambahay Protect",
    description: "Audi SUV",
    price: 41500,
    url: "#",
    bg: "bg-gradient-to-br from-pink-700 to-pink-500",
    image: "bg-[url('/peaks/peaks_v8.svg')]",
  },
  {
    id: 8,
    title: "Family Protect",
    description: "Audi SUV",
    price: 237500,
    url: "#",
    bg: "bg-gradient-to-br from-slate-950 to-slate-600",
    image: "bg-[url('/peaks/peaks_v9.svg')]",
  },
  {
    id: 9,
    title: "OFW Protect",
    description: "Audi SUV",
    price: 81700,
    url: "#",
    bg: "bg-gradient-to-br from-red-950 to-blue-700",
    image: "bg-[url('/peaks/peaks_v6.svg')]",
  },
  {
    id: 10,
    title: "Personal Accident",
    description: "Audi SUV",
    price: 77500,
    url: "#",
    bg: "bg-gradient-to-br from-stone-950 to-blue-800",
    image: "bg-[url('/peaks/peaks_v7.svg')]",
  },
  {
    id: 11,
    title: "2-in-1 Protect",
    description: "Audi SUV",
    price: 41500,
    url: "#",
    bg: "bg-gradient-to-br from-zinc-950 to-blue-800",
    image: "bg-[url('/peaks/peaks_v10.svg')]",
  },
  {
    id: 12,
    title: "Bicycle Protect",
    description: "Audi SUV",
    price: 77500,
    url: "#",
    bg: "bg-gradient-to-br from-slate-950 to-zinc-800",
    image: "bg-[url('/peaks/peaks_v10.svg')]",
  },
  {
    id: 13,
    title: "Pet Health Protect",
    description: "Audi SUV",
    price: 41500,
    url: "#",
    bg: "bg-gradient-to-br from-indigo-950 to-indigo-800",
    image: "bg-[url('/peaks/peaks_v9.svg')]",
  },
];

export default function Products() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-950 from-10% to-blue-700 py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="flex items-center px-4 md:px-10">
        <div className="grid w-full items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="mb-4 flex w-full flex-col items-start justify-start space-y-2">
              <h1 className="bg-gradient-to-r from-orange-50 to-blue-100 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
                Browse all our products.
              </h1>
              <p className="mx-auto w-full text-left text-zinc-300 md:text-xl">
                You can protect your family and your future, one policy at a
                time.
              </p>
            </div>
            <div className="mx-auto w-full max-w-full space-y-4">
              <div className="grid grid-cols-3 gap-10">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "overflow-clip rounded-[18px] transition-all duration-500 hover:scale-[105%]",
                      item.bg,
                    )}
                  >
                    <div
                      className={cn(
                        "h-[280px] w-[420px] bg-cover bg-top p-6",
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
                        <p className="text-3xl font-normal tracking-tight text-indigo-950">
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
