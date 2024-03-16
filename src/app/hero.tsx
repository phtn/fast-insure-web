"use client";

import tw from "tailwind-styled-components";
import { Raynor } from "./_components/kerrigan/raynor";
import { motion } from "framer-motion";
import { NotificationBar } from "./notification-bar";

export const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        delay: 3.4,
        easings: ["easeInOut"],
      }}
      className="h-[calc(100vh-72px)]"
    >
      <HeroContent>
        <NotificationContainer>
          <NotificationBar />
        </NotificationContainer>
        <div className="flex w-full justify-center">
          <Raynor
            href={`/products`}
            title="Fast-track your"
            description="Tech-focused insurance platform for businesses and individuals."
            actionLabel="Browse All Products"
          />
        </div>
      </HeroContent>
    </motion.div>
  );
};

const HeroContent = tw.section`
  h-[calc(100vh-72px)] bg-gradient-to-br from-zap from-40% via-blue-400/30 to-zap to-100%
  `;

const NotificationContainer = tw.div`
  flex h-[56px] w-full items-center justify-center
  `;
