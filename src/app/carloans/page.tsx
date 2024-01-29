import { decimal } from "@/utils/helpers";
import { Tabs } from "@@components/tabs";
import Image from "next/image";
import { cars } from "./data";
import { Button } from "../_components/button";



export default function CarLoan() {
  return (
    <div className="bg-gradient-to-b from-slate-950 to-blue-700 px-4 pt-24 sm:px-6 lg:px-24">
      <div className="mb-4 flex w-full flex-col items-start justify-start space-y-2">
        <h1 className="bg-gradient-to-r from-orange-100 to-sky-200 bg-clip-text text-5xl font-bold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none">
          Auto Loans.
        </h1>
        <p className="mx-auto w-full text-left text-zinc-300 md:text-xl">
          Your dream car, now within your reach.
        </p>
      </div>
      <Tabs>
        <div className="flex md:justify-center border-b">
          <div className="flex space-x-8 overflow-scroll text-blue-50">
            <div className="py-4">EVs</div>
            <div className="border-b-2 border-blue-500 py-4 text-blue-500">
              SUVs
            </div>
            <div className="py-4">Sedans</div>
            <div className="py-4">Coupes</div>
            <div className="py-4">Roadsters</div>
            <div className="py-4">Concept</div>
          </div>
        </div>
        <Autos />
      </Tabs>
    </div>
  );
}

const Autos = () => (
  <section className="mt-6 pb-10 ">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars?.map((item) => (
        <div
          key={item?.id}
          className="border rounded-lg overflow-hidden bg-blue-100 dark:bg-indigo-100"
        >
          <Image
            alt={item.title ?? ""}
            className="w-full h-64 object-cover"
            src={item?.image ?? "/logo/fi_logo_v1.svg"}
            width={300}
            height={300}
          />
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-500">{`P ${decimal(item.price, 0)}`}</p>
            </div>
            <p className="text-gray-500">{item.description}</p>
            <div className="flex items-center justify-center space-x-4">
              <Button className="mt-2 w-[250px] rounded-lg" size='lg' >
                View Models
              </Button>
              <Button className="mt-2 rounded-lg" variant='outline' size='lg' >
                Apply
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)
