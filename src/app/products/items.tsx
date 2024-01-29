'use client'

import { cn } from "@/utils/cn";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { motion, useInView } from 'framer-motion';
import { CandyIcon } from "lucide-react";
import { useRef } from 'react';
import { ProductData } from "./data";

type ProductItemProps = {
  data: ProductData[]
}
export const ProductItems = ({ data }: ProductItemProps) => {

  return (
    <div className="mx-auto w-full max-w-full space-y-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item) => (
          <Item {...item} />
        ))}
      </div>
    </div>
  )
}

const Item = (props: ProductData) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      key={props.id}
      animate={{ transform: isInView ? `translateY(0)` : `translateY(50px)`, scale: isInView ? 1 : 0.5, opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5, delay: props.id * 0.1 }}>
      <div
        key={props.id}
        className={cn(
          "overflow-clip rounded-[18px] transition-all duration-500 hover:scale-[105%]",
          props.bg,
        )}
      >
        <div
          className={cn(
            "h-[280px] md:w-[420px] bg-cover bg-top p-6",
            props.image,
          )}
        >
          <div className="flex h-[175px] items-start justify-between">
            <h2 className="text-xl md:text-3xl font-bold text-blue-100">
              {props.title}
            </h2>
            <CandyIcon className="mb-2 h-8 w-8 text-blue-100" />
          </div>
          <div className="flex h-[80px] items-center justify-between">
            <InfoCircledIcon className="h-8 w-8 text-zinc-950" />
            <p className="text-2xl font-normal text-blue-950">
              ₱10,000
            </p>
          </div>
        </div>
      </div>

    </motion.div>
  )
}
