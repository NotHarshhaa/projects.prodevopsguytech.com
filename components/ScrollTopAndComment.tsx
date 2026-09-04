'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const handleWindowScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const totalScroll = docHeight - windowHeight

      if (scrollTop > 100) {
        setShow(true)
      } else {
        setShow(false)
      }

      if (totalScroll > 0) {
        const percentage = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100))
        setScrollPercentage(percentage)
      }
    }

    window.addEventListener('scroll', handleWindowScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40"
        >
          <button
            type="button"
            aria-label="Scroll to top"
            onClick={handleScrollTop}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200/80 bg-white/90 shadow-md backdrop-blur-md transition-all hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 dark:border-neutral-800/80 dark:bg-neutral-900/90 dark:shadow-neutral-950/40"
          >
            {/* SVG Progress Ring */}
            <svg className="absolute inset-0 h-full w-full -rotate-90 p-0.5" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                className="stroke-neutral-200/60 dark:stroke-neutral-800/80"
                strokeWidth="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                className="stroke-blue-500 transition-all duration-150 dark:stroke-blue-400"
                strokeWidth="2.5"
                strokeDasharray="97.4"
                strokeDashoffset={97.4 - (scrollPercentage / 100) * 97.4}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Icon & Hover Indicator */}
            <ArrowUp
              className="h-4 w-4 text-neutral-600 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-blue-400"
              strokeWidth={2.5}
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollTopAndComment