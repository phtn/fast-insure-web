import tw from "tailwind-styled-components";
import { useRef } from "react";
import { Button } from "../_components/button";
import { decimal } from "@/utils/helpers";
import { type Packages } from "./data";
import { motion, useInView } from 'framer-motion'

export const Item = (props: Packages) => {
  const { id, title, description, price } = props;
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div ref={ref}
      animate={{ transform: isInView ? `translateY(0)` : `translateY(50px)`, scale: isInView ? 1 : 0.5, opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5, delay: id * 0.1 }}>
      <Container
        key={id}
      >
        <div className="flex h-[44px] items-center justify-between">
          <p className="font-bold tracking-tighter text-blue-950 pl-3 text-xl">{title}</p>
          <div className="flex h-[44px] w-[44px] items-center justify-center rounded border-0 border-blue-800">
            <props.icon />
          </div>
        </div>
        <div className="h-[32px] flex items-start">
          <p className="text-[12px] w-fit group-hover:text-slate-600 px-3">{description}</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex h-[48px] w-full items-center justify-center border-0 border-blue-500">
            <p className="text-xl font-bold tracking-tighter text-blue-600 ">
              ₱ {decimal(price, 0)}
            </p>
          </div>
        </div>
        <div className="flex items-center m-2 justify-center">
          <Button variant='default' size='lg' className="w-full rounded-lg">Select</Button>
        </div>
      </Container>
    </motion.div>
  );
};


// f.co fco feature company; custom features; 

const Container = tw.div`
  flex flex-col p-2 group bg-gradient-to-br from-orange-50 to-white md:w-[300px]
  shadow-lg md:h-fit rounded-xl hover:shadow-xl hover:scale-[105%] 
  transition-all duration-300 ease-in-out
`
















