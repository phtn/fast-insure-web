'use client'
import { motion } from 'framer-motion'
import { ArrowUpRightIcon, ArrowUpRightSquare, SatelliteIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from './_components/button'

export const Affiliate = () => {
  return (
    <div className={`bg-blue-400 pt-[100px] md:pt-[200px] overflow-clip`}>
      <motion.div initial={{ x: `calc(-50vw)`, y: -50, scale: 0.1 }} animate={{ x: `calc(110vw)`, y: 75, scale: 1, rotate: `15deg` }} transition={{ delay: 5, duration: 120, easings: ['easeIn'], repeat: 10 }} className="flex w-full animate-shimmer">
        <Image src={`/svg/sat_v1.svg`} width={100} height={100} alt="satellite" className="h-2 w-2 md:h-5 md:w-5 opacity-50 text-orange-50/50" />
      </motion.div>
      <motion.div initial={{ x: -2000, y: -30, scale: 0.25 }} animate={{ x: 2000, y: `calc(100vw/12)`, scale: 1.5 }} transition={{ duration: 40, easings: ['easeIn'], repeat: 10 }} className="flex w-full">
        <SatelliteIcon className="h-2 w-2 md:h-5 md:w-5 text-orange-50/80" />
      </motion.div>
      <div className='h-[100px] md:h-[200px] flex flex-col items-center justify-center'>
        <h4 className='text-[1.75rem] md:text-[3.5rem] my-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-orange-50 font-extrabold tracking-tighter'>
          Join our Affiliate Program.
        </h4>
        <div className='flex space-x-4'>
          <button className="inline-flex h-[50px] text-[16px] md:text-lg w-[250px] md:w-[300px] group hover:scale-[105%] transition-all duration-[4000] font-bold animate-shimmer items-center justify-center rounded-lg border border-blue-300 bg-[linear-gradient(110deg,#000103,45%,#93c5fd,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Sign up today!
            <ArrowUpRightSquare className="h-5 w-5 ml-6 isolate group-hover:text-blue-300 transition-all duration-300" />
          </button>
          <Button size='lg' variant='outline' className="hidden min-w-[200px] rounded-lg md:flex h-12 hover:scale-[105%] transition-all duration-500">
            How it works?
            <ArrowUpRightIcon className="h-5 w-5 ml-6 isolate group-hover:text-blue-300 transition-all duration-300" />
          </Button>
        </div>
      </div>

      <div className="md:h-[650px] h-[150px] bg-[url('/bg/city_v2.webp')] border-0 bg-contain bg-center md:bg-cover bg-no-repeat md:bg-top">
        <div className="h-full bg-gradient-to-b from-blue-400 from-5% to-transparent to-100%">

        </div>
      </div>
    </div>
  )
}
