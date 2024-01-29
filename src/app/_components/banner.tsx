'use client'

import { useInView } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { type RefObject, useRef } from "react";
import { motion } from 'framer-motion'

export interface BannerItem {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

type BannerProps = {
  data: BannerItem[]
}

type ItemProps = {
  props: BannerItem
  viewRef: RefObject<HTMLDivElement>
  isInView: boolean
}

export const Tet = ({ data }: BannerProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div className="md:px-24 h-fit md:h-[300px] md:gap-x-12 w-full grid grid-cols-1 md:grid-cols-3">
      {data.map(item => (
        <Item isInView={isInView} viewRef={ref} key={item.id} props={item} />
      ))}
    </div>
  )
}

const Item = ({ isInView, viewRef, props }: ItemProps) => (
  <motion.div ref={viewRef} animate={{ transform: isInView ? "none" : "translateX(-100px)", opacity: isInView ? 1 : 0 }} transition={{ duration: 0.5, delay: props.id * 0, easings: ['easeInOut'] }} className="h-full flex items-center justify-center z-40">
    <div className="md:h-full h-[100px] flex items-center md:justify-center justify-end md:w-[200px] w-[150px]">
      <motion.div initial={{ scale: 0 }} animate={{ scale: isInView ? 1 : 0 }} transition={{ duration: 0.3, delay: props.id * 0.3 }} className="flex items-center justify-center bg-gradient-to-br from-blue-500 from-65% to-blue-300/50 rounded-full h-[75px] w-[75px] md:h-[125px] md:w-[125px]">
        <props.icon className="md:h-16 md:w-16 h-10 w-10 text-orange-50" />
      </motion.div>
    </div>

    <div className="h-[175px] w-full flex flex-col justify-center">
      <div className="flex items-end md:h-[95px] h-[85px] px-4 w-full">
        <h4 className="md:text-[1.85rem] text-[1.5rem] text-orange-50 font-bold tracking-tight">{props.title}</h4>
      </div>
      <div className="w-full h-[80px] px-4 text-[14px] md:text-[16px] text-blue-300">{props.description}</div>
    </div>
  </motion.div>
)
