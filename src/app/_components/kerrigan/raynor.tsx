'use client'

import { Button } from "@@components/button";
import { opts } from "@@utils/helpers";
import { motion } from 'framer-motion';
import { ArrowUpRightIcon, LayoutGridIcon } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import tw from "tailwind-styled-components";
import type { KerriganListProps, KerriganProps } from "./types";
import Link from "next/link";

const RaynorList = ({ data, title }: KerriganListProps) => {
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

export const Raynor = ({
  title,
  description,
  data,
  listTitle,
  actionLabel,
  href
}: KerriganProps) => {
  const List = useCallback(() => {
    const withData = typeof data !== "undefined";

    const options = opts(
      <RaynorList data={data} title={listTitle} />,
      <div />,
    );
    return <>{options.get(withData)}</>;
  }, [data, listTitle]);
  return (
    <main>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="px-4 md:px-6">
          <div className="flex flex-col justify-center items-center space-y-8 text-center">
            <div className="space-y-8 md:space-y-6 flex flex-col items-center ">
              <motion.div initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 3.3,
                  easings: ['easeInOut']
                }}>
                <Title>
                  {title}
                </Title>
              </motion.div>
              <motion.div initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: 3.6,
                  easings: ['easeInOut']
                }}>
                <Description>
                  {description}
                </Description>
              </motion.div>
            </div>
            <div className="md:w-full w-[calc(100vw-64px)] flex items-center justify-center space-x-4">
              <motion.div initial={{ y: 10, scale: 0.5, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 3.5,
                  easings: ['easeInOut']
                }}>
                <Link href={href ?? `/`}>
                  <button className="inline-flex h-[50px] text-[14px] md:text-lg md:w-[350px] group hover:scale-[105%] transition-all duration-[5000] font-bold animate-shimmer items-center justify-center rounded-lg border border-blue-300 bg-[linear-gradient(110deg,#000103,45%,#93c5fd,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    {actionLabel}
                    <LayoutGridIcon className="h-5 w-5 ml-6 isolate group-hover:text-blue-300 transition-all duration-300" />
                  </button>
                </Link>
              </motion.div>
              <motion.div initial={{ y: 10, scale: 0.5, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 3.6,
                  easings: ['easeInOut']
                }}>
                <Button size='lg' variant='outline' className="hidden min-w-[200px] space-x-4 md:flex hover:scale-[105%] transition-all duration-500">
                  <span>Sign up</span>
                  <ArrowUpRightIcon className="h-4 w-4" />
                </Button>
              </motion.div>



            </div>
          </div>
        </div>
      </section>
      <List />
    </main>
  );
};

const Title = tw.h2`
  text-[2.5rem] leading-[2.5rem] md:text-[2.75rem] md:leading-[2.75rem] max-w-[10ch] md:max-w-[32ch] font-extrabold tracking-tighter 
  text-transparent bg-clip-text bg-gradient-to-r from-blue-950 from-20% to-blue-400
  sm:text-4xl md:text-5xl lg:text-6xl/none h-fit py-1 
`

const Description = tw.h3`
  mx-auto max-w-[28ch] py-1 md:max-w-[48ch] text-blue-950 text-[14px] font-medium md:text-xl
`
