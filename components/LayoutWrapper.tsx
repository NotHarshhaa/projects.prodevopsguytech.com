'use client'

import { Inter } from 'next/font/google'
import { motion } from 'framer-motion'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'
import { Separator } from '@/components/components/ui/separator'

interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-white to-neutral-50/50 dark:from-neutral-950 dark:to-neutral-900/50"
    >
      <SectionContainer>
        <div className={`${inter.className} relative flex min-h-screen flex-col justify-between font-sans`}>
          <motion.div variants={childVariants}>
            <Header />
            <Separator className="my-8" />
          </motion.div>
          
          <motion.main 
            variants={childVariants}
            className="mb-auto flex-grow py-12"
          >
            {children}
          </motion.main>

          <motion.div 
            variants={childVariants}
            className="relative z-10"
          >
            <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-transparent to-white/80 dark:to-neutral-950/80 backdrop-blur-[1px]" />
            <Separator className="mb-8" />
            <Footer />
          </motion.div>
        </div>
      </SectionContainer>
    </motion.div>
  )
}

export default LayoutWrapper
