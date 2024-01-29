'use client'

import { Raynor } from "./_components/kerrigan/raynor"
import { motion } from 'framer-motion'

export const Hero = () => {
  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        delay: 3.4,
        easings: ['easeInOut']
      }}>
      <section className="md:pt-[56px] pt-[96px] md:h-[calc(100vh-300px)] h-[450px] group bg-gradient-to-br hover:bg-gradient-to-l from-orange-50 from-40% via-blue-500/40 to-orange-50 to-70% bg-pos-0 hover:bg-pos-100 bg-size-200 transition-all duration-500 ease-in-out">
        <div className={`bg-[url('/bg/flash_v4.svg')] md:bg-right ease-in-out hover:bg-left transition-all bg-no-repeat duration-700`}>
          <Raynor title="Fast-track your Peace of Mind." description="Sign up today to get 10% discount on all brandnew vehicles." actionLabel="Browse All Products" />
        </div>
      </section>
    </motion.div>
  )
}
