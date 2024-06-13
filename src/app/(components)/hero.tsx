"use client";

import tw from "tailwind-styled-components";
import { Raynor } from "@@ui/kerrigan/raynor";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/libs/db";

export const Hero = () => {
  const [creds] = useAuthState(auth);
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
