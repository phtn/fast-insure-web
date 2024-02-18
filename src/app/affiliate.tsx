"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRightIcon,
  ArrowUpRightSquare,
  SatelliteIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./_components/button";
import Link from "next/link";

export const Affiliate = () => {
  return (
    <div className={`overflow-clip bg-blue-400 pt-[100px] md:pt-[200px]`}>
      <motion.div
        initial={{ x: `calc(-50vw)`, y: -50, scale: 0.1 }}
        animate={{ x: `calc(110vw)`, y: 75, scale: 1, rotate: `15deg` }}
        transition={{
          delay: 5,
          duration: 120,
          easings: ["easeIn"],
          repeat: 10,
        }}
        className="flex w-full animate-shimmer"
      >
        <Image
          src={`/svg/sat_v1.svg`}
          width={100}
          height={100}
          alt="satellite"
          className="h-2 w-2 text-orange-50/50 opacity-50 md:h-5 md:w-5"
        />
      </motion.div>
      <motion.div
        initial={{ x: -2000, y: -30, scale: 0.25 }}
        animate={{ x: 2000, y: `calc(100vw/12)`, scale: 1.5 }}
        transition={{ duration: 40, easings: ["easeIn"], repeat: 10 }}
        className="flex w-full"
      >
        <SatelliteIcon className="h-2 w-2 text-orange-50/80 md:h-5 md:w-5" />
      </motion.div>
      <div className="flex h-[100px] flex-col items-center justify-center md:h-[200px]">
        <h4 className="my-2 bg-gradient-to-br from-white to-orange-50 bg-clip-text text-[1.75rem] font-extrabold tracking-tighter text-transparent md:text-[3.5rem]">
          Join our Affiliate Program.
        </h4>
        <div className="flex space-x-4">
          <Link href="/signin">
            <button className="group inline-flex h-[50px] w-[250px] animate-shimmer items-center justify-center rounded-lg border border-blue-300 bg-[linear-gradient(110deg,#000103,45%,#93c5fd,55%,#000103)] bg-[length:200%_100%] px-6 text-[16px] font-bold text-white transition-all duration-4000 hover:scale-[105%] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 md:w-[300px] md:text-lg">
              Sign up today!
              <ArrowUpRightSquare className="isolate ml-6 h-5 w-5 transition-all duration-300 group-hover:text-blue-300" />
            </button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="hidden h-12 min-w-[200px] rounded-lg text-blue-600 transition-all duration-500 hover:scale-[105%] md:flex"
          >
            How it works?
            <ArrowUpRightIcon className="isolate ml-6 h-5 w-5 transition-all duration-300 group-hover:text-blue-300" />
          </Button>
        </div>
      </div>

      <div className="h-[150px] border-0 bg-[url('/bg/city_v2.webp')] bg-contain bg-center bg-no-repeat md:h-[650px] md:bg-cover md:bg-top">
        <div className="h-full bg-gradient-to-b from-blue-400 from-5% to-transparent to-100%"></div>
      </div>
    </div>
  );
};
