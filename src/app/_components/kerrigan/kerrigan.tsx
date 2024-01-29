'use client'

import { Button } from "@@components/button";
import { Input } from "@@components/input";
import { opts } from "@@utils/helpers";
import Image from "next/image";
import { useCallback } from "react";
import tw from "tailwind-styled-components";
import { type KerriganListProps, type KerriganProps } from "./types";

const KerriganList = ({ data, title }: KerriganListProps) => {
  return (
    <section className="px-6 md:px-16 pb-10 ">
      <h2 className="text-3xl font-extrabold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="border rounded-lg overflow-hidden bg-background dark:bg-indigo-100"
          >
            <Image
              alt={item.src ?? ""}
              className="w-full h-64 object-cover"
              src={item?.src ?? "/logo/fi_logo_v1.svg"}
              width={300}
              height={300}
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
              <Button className="mt-2">
                {item.subtext ?? item.description}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Kerrigan = ({
  title,
  description,
  data,
  listTitle,
  actionLabel
}: KerriganProps) => {
  const List = useCallback(() => {
    const withData = typeof data !== "undefined";

    const options = opts(
      <KerriganList data={data} title={listTitle} />,
      <div />,
    );
    return <>{options.get(withData)}</>;
  }, [data, listTitle]);
  return (
    <main className="">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center items-center space-y-4 text-center">
            <div className="space-y-2 flex flex-col items-center ">
              <Title>
                {title}
              </Title>
              <Description>
                {description}
              </Description>
            </div>
            <div className="md:w-full w-[calc(100vw-64px)] max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">{actionLabel}</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <List />
    </main>
  );
};

const Title = tw.h2`
  text-[2.5rem] leading-[2.5rem] max-w-[10ch] md:max-w-[32ch] font-extrabold tracking-tighter 
  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400
  sm:text-4xl md:text-5xl lg:text-6xl/none h-fit py-1
`

const Description = tw.h3`
  mx-auto max-w-[28ch] py-1 md:max-w-[48ch] text-blue-950 text-[14px] font-medium md:text-xl
`
