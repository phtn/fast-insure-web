"use client";

import { Raynor } from "./_components/kerrigan/raynor";
import { motion } from "framer-motion";

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
    >
      <section className="group h-[425px] bg-gradient-to-br from-paper from-40% via-blue-400/10 to-orange-50 to-70% bg-size-200 bg-pos-0 pt-[60px] transition-all duration-500 ease-in-out hover:bg-gradient-to-l hover:bg-pos-100 md:h-[calc(100vh-300px)] md:pt-[56px]">
        <div
          className={`bg-[url('/bg/flash_v4.svg')] bg-no-repeat transition-all duration-700 ease-in-out hover:bg-left md:bg-right`}
        >
          <Raynor
            href={`/products`}
            title="Fast-track your Peace of Mind."
            description="Sign up today to get 10% discount on all brandnew vehicles."
            actionLabel="Browse All Products"
          />
        </div>
      </section>
    </motion.div>
  );
};
