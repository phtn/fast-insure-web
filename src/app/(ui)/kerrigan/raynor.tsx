"use client";

import { Button } from "@@ui/button";
import { opts } from "@@utils/helpers";
import { motion } from "framer-motion";
import { ArrowUpRightIcon, LayoutGridIcon } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import tw from "tailwind-styled-components";
import type { KerriganListProps, KerriganProps } from "./types";
import Link from "next/link";

const RaynorList = ({ data, title }: KerriganListProps) => {
  return (
    <section className="px-6 pb-10 md:px-16 ">
      <h2 className="mb-4 text-3xl font-extrabold">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="bg-background overflow-hidden rounded-lg dark:bg-indigo-100"
          >
            <Image
              alt={item.src ?? ""}
              className="h-64 w-full object-cover"
              src={item?.src ?? "/logo/fi_logo_v1.svg"}
              width={300}
              height={300}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{item.title}</h3>
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
  href,
}: KerriganProps) => {
  const List = useCallback(() => {
    const withData = typeof data !== "undefined";
    const options = opts(<RaynorList data={data} title={listTitle} />, <div />);
    return <>{options.get(withData)}</>;
  }, [data, listTitle]);
  return (
    <main>
      <section className="flex h-[calc(100vh-312px)] w-full md:h-[calc(100vh-128px)] lg:w-[1080px]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-start justify-center pb-[128px]">
            <div className="flex flex-col items-start justify-start space-y-8 md:space-y-10 ">
              <div>
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 3.3,
                    easings: ["easeInOut"],
                  }}
                  className="flex flex-col items-start justify-start"
                >
                  <Title>{title}</Title>
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 3.4,
                    easings: ["easeInOut"],
                  }}
                  className="flex flex-col items-start justify-start"
                >
                  <TitleFeature>Peace of Mind</TitleFeature>
                </motion.div>
              </div>

              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: 3.6,
                  easings: ["easeInOut"],
                }}
                className="px-[4px]"
              >
                <Description>{description}</Description>
              </motion.div>

              <div className="flex w-[calc(100vw-64px)] items-center justify-start space-x-4 md:w-full md:justify-center">
                <motion.div
                  initial={{ y: 10, scale: 0.5, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 3.5,
                    easings: ["easeInOut"],
                  }}
                >
                  <Link href={href ?? `/`}>
                    <button className="group inline-flex h-[50px] animate-shimmer items-center justify-center rounded-lg border border-fast bg-[linear-gradient(110deg,#000103,45%,#93c5fd,55%,#000103)] bg-[length:200%_100%] px-6 text-[14px] font-bold text-white transition-all duration-4000 hover:text-zap focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 md:w-[250px]">
                      {actionLabel}
                      <LayoutGridIcon className="isolate ml-6 hidden h-5 w-5 transition-all duration-300 group-hover:text-blue-300 md:visible" />
                    </button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ y: 10, scale: 0.5, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 3.6,
                    easings: ["easeInOut"],
                  }}
                >
                  <Link href={"/account"}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="hidden min-w-[200px] space-x-4 transition-all duration-500 md:flex"
                    >
                      <span>Sign up</span>
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <List />
    </main>
  );
};

const Title = tw.h2`
  font-k2d font-semibold tracking-tight
  text-[2.25rem] leading-[2.25rem] md:leading-[2.75rem] max-w-[15ch] md:max-w-[15ch]
  text-transparent bg-clip-text bg-gradient-to-r from-fast from-20% to-fast
  sm:text-3xl md:text-6xl h-fit py-1
`;

const TitleFeature = tw.h2`
  font-k2d font-semibold tracking-wide
  text-[2.25rem] leading-[2.25rem] md:leading-[2.75rem] max-w-[15ch] md:max-w-[15ch]
  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 from-[5%] via-blue-400 to-blue-300
  sm:text-3xl md:text-6xl h-fit py-1
`;

const Description = tw.h3`
  max-w-[28ch] py-1 md:max-w-[32ch] text-coal text-[14px] md:text-lg
`;
