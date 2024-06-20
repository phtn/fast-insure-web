"use client";

import { cn } from "@/utils/cn";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { motion, useInView } from "framer-motion";
import { CandyIcon } from "lucide-react";
import { useRef } from "react";
import { type ProductData } from "./data";

type ProductItemProps = {
  data: ProductData[];
};
export const ProductItems = ({ data }: ProductItemProps) => {
  return (
    <div className="mx-auto w-full max-w-full md:px-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

const Item = (props: ProductData) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      key={props.id}
      animate={{
        transform: isInView ? `translateY(${0})` : `translateY(${50}px)`,
        scale: isInView ? 1 : 0.5,
        opacity: isInView ? 1 : 0,
      }}
      transition={{ duration: 0.5, delay: props.id * 0.1 }}
    >
      <div
        key={props.id}
        className={cn(
          "overflow-clip rounded-[14px] border border-void transition-all duration-500 hover:scale-[105%] md:w-[320px]",
        )}
      >
        <div
          className={cn(
            "h-[240px] rounded-[13px] border-t border-blue-50 bg-gradient-to-b from-blue-100 to-orange-50 p-6",
          )}
        >
          <div className="flex h-[135px] items-start justify-between">
            <h2 className="text-xl font-bold text-fast md:text-xl">
              {props.title}
            </h2>
            <CandyIcon className="mb-2 h-8 w-8 text-blue-100" />
          </div>
          <div className="flex h-[80px] items-center justify-between">
            <InfoCircledIcon className="size-5 text-clay/80" strokeWidth={1} />
            <p className="text-xl font-light tracking-wide text-blue-950">
              {/* ₱10,000 */}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
