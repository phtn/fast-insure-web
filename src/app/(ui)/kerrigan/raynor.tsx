"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon, LayoutGridIcon } from "lucide-react";
import tw from "tailwind-styled-components";
import type { KerriganProps } from "./types";
import Link from "next/link";

export const Raynor = ({
  title,
  description,
  actionLabel,
  href,
  uid,
}: KerriganProps) => {
  return (
    <section className="h-[calc(100vh-250px)] w-full px-10 md:h-[calc(100vh-200px)] lg:h-[calc(100vh-72px)] lg:px-10 xl:h-[calc(100vh-150px)]">
      <div className="flex h-full w-full flex-col items-start justify-center">
        <div className="flex flex-col items-start justify-start space-y-4 md:space-y-8 lg:space-y-10 ">
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

          <div className="flex w-fit items-center justify-start space-x-4">
            <motion.div
              initial={{ y: 10, scale: 0.5, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 3.5,
                easings: ["easeInOut"],
              }}
            >
              <Link href={href ?? `/account/overview`}>
                <button className="group inline-flex h-[50px] animate-shimmer items-center justify-center rounded-lg border border-fast bg-[linear-gradient(110deg,#000103,45%,#93c5fd,55%,#000103)] bg-[length:200%_100%] px-6 text-[14px] font-bold text-white transition-all duration-4000 hover:text-zap focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 md:w-[250px]">
                  <span>{actionLabel}</span>
                  {uid ? (
                    <LayoutGridIcon className={iconStyle} />
                  ) : (
                    <ArrowUpRightIcon className={iconStyle} />
                  )}
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const iconStyle = `isolate ml-6 h-5 w-5 transition-all duration-300 group-hover:text-blue-300 md:visible`;

const Title = tw.h2`
  font-k2d font-semibold tracking-tight
  leading-[2.25rem] md:leading-[2.75rem] max-w-[15ch] md:max-w-[15ch]
  text-transparent bg-clip-text bg-gradient-to-r from-fast from-20% to-fast
  text-4xl md:text-6xl h-fit py-1
`;

const TitleFeature = tw.h2`
  font-k2d font-semibold tracking-wide
  leading-[2.25rem] md:leading-[2.75rem] max-w-[15ch] md:max-w-[15ch]
  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 from-[5%] via-blue-400 to-blue-300
  text-4xl md:text-6xl h-fit py-1 portrait:leading-[2.75rem]
`;

const Description = tw.h3`
  max-w-[32ch] py-1 md:max-w-[32ch] text-coal text-[14px] md:text-lg
`;
