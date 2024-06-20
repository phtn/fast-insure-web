"use client";

import { auth } from "@/libs/db";
// import { opts } from "@/utils/helpers";
import { Raynor } from "@@ui/kerrigan/raynor";
import { motion } from "framer-motion";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import tw from "tailwind-styled-components";

export const Hero = () => {
  const [creds] = useAuthState(auth);
  const [showFeature, setShowFeature] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFeature(!showFeature);
    }, 10000);
    return () => clearInterval(interval);
  }, [showFeature]);

  // const HeroOptions = useCallback(() => {
  //   const options = opts(
  //     <div className="flex h-[500px] w-full items-center portrait:flex-col">
  //       <Image
  //         src={"/images/m1_logo.webp"}
  //         alt="m1"
  //         width={0}
  //         height={0}
  //         className="h-[230px] w-auto px-10"
  //         unoptimized
  //         priority
  //       />
  //       <div className="w-full place-items-center">
  //         <div className="w-full font-k2d text-5xl font-semibold portrait:items-center portrait:text-2xl">
  //           M1 Freedom Party
  //         </div>
  //         <div className="font-mono opacity-50">
  //           at The Lighthouse Marina Hotel, Subic Bay
  //         </div>
  //       </div>
  //     </div>,

  //     <Raynor
  //       href={`/account`}
  //       title="Fast-track your"
  //       description="Technology-driven service provider for businesses and individuals."
  //       uid={creds?.uid}
  //       actionLabel={creds?.uid ? "View Dashboard" : "Login to your account"}
  //     />,
  //   );
  //   return <>{options.get(showFeature)}</>;
  // }, [showFeature, creds?.uid]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        delay: 3.4,
        easings: ["easeInOut"],
      }}
      className="h-[calc(100vh-72px)] w-full"
    >
      <HeroContent>
        <div className="flex w-full justify-start md:w-[800px] lg:w-[1080px]">
          <Raynor
            href={`/account`}
            title="Fast-track your"
            description="Technology-driven service provider for businesses and individuals."
            uid={creds?.uid}
            actionLabel={
              creds?.uid ? "View Dashboard" : "Login to your account"
            }
          />
        </div>
      </HeroContent>
    </motion.div>
  );
};

const HeroContent = tw.div`
  h-[calc(100vh-72px)] flex justify-center w-full bg-gradient-to-br from-zap from-40% via-blue-400/30 to-zap to-100%
  `;
