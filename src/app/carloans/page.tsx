import { decimal } from "@/utils/helpers";
import { Tabs } from "@@components/tabs";
import Image from "next/image";

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  url: string;
  image: string;
}

const data: ProductData[] = [
  {
    id: 0,
    title: "EQB SUV",
    description: "Audi SUV",
    price: 37500,
    url: "#",
    image: "/logo/fi_logo_v1.svg",
  },
  {
    id: 1,
    title: "EQE Sedan",
    description: "Audi SUV",
    price: 39800,
    url: "#",
    image: "/logo/fi_logo_v1.svg",
  },
  {
    id: 2,
    title: "EQE SUV",
    description: "Audi SUV",
    price: 47100,
    url: "#",
    image: "/logo/fi_logo_v1.svg",
  },
  {
    id: 3,
    title: "EQS Sedan",
    description: "Audi SUV",
    price: 54700,
    url: "#",
    image: "/logo/fi_logo_v1.svg",
  },
  {
    id: 4,
    title: "R8 Spyder",
    description: "Audi SUV",
    price: 237500,
    url: "#",
    image: "/logo/fi_logo_v1.svg",
  },
  {
    id: 5,
    title: "S8 Sedan",
    description: "Audi SUV",
    price: 81700,
    url: "#",
    image: "/logo/fi_logo_v1.svg",
  },
  {
    id: 6,
    title: "S7 Sedan",
    description: "Audi SUV",
    price: 77500,
    url: "#",
    image: "/logo/fi_logo_v1.svg",
  },
  {
    id: 7,
    title: "TT Roadster",
    description: "Audi SUV",
    price: 41500,
    url: "#",
    image: "/logo/fi_logo_v1.svg",
  },
];

export default function CarLoan() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
      <Tabs>
        <div className="flex justify-center border-b">
          <div className="flex space-x-8">
            <div className="py-4">EVs</div>
            <div className="border-b-2 border-blue-600 py-4 text-blue-600">
              SUVs
            </div>
            <div className="py-4">Sedans & Wagons</div>
            <div className="py-4">Coupes</div>
            <div className="py-4">Convertibles & Roadsters</div>
            <div className="py-4">Future & Concept</div>
          </div>
        </div>
        <div className="pt-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {data.map((item) => (
              <div
                key={item.id}
                className=" space-y-0 overflow-clip rounded-lg border border-blue-950 drop-shadow-lg"
              >
                <Image
                  alt="Car Image"
                  className="h-auto w-full bg-orange-100"
                  height={200}
                  src={"/images/spyder.webp"}
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "scale-down",
                  }}
                  width={300}
                />
                <div className="border-b border-t bg-[url('/bg/dark_v1.svg')] bg-cover p-3">
                  <h3 className="text-xl font-bold text-blue-50">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-blue-300">
                    Starting at ${decimal(item.price, 2)} *
                  </p>
                </div>
                <div className="flex items-center justify-center bg-neutral-50 py-3 ">
                  <a className="text-blue-600 hover:text-blue-800" href="#">
                    Models ↓
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
