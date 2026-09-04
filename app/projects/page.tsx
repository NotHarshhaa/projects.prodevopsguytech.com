"use client";

import ProjectTabs from '@/components/ProjectTabs'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/components/ui/button'

export default function Projects() {
  return (
    <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="relative space-y-6 sm:space-y-8 pb-6 sm:pb-8 pt-4 sm:pt-6">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6'
          >
            <div className="relative space-y-4">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative text-2xl sm:text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  More DevOps Resources
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base sm:text-lg leading-7 text-gray-600 dark:text-gray-300 max-w-2xl"
              >
                Explore our comprehensive collection of DevOps resources, tutorials, and best practices to enhance your skills and streamline your development workflow.
              </motion.p>
            </div>
            
            {/* GitHub Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition-all duration-500"></div>
              <Button 
                asChild
                variant="outline" 
                className="relative rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-900/50 border border-gray-200/20 dark:border-gray-700/20 transition-all duration-300"
              >
                <Link href={siteMetadata.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <FaGithub className="w-5 h-5" />
                  <span className="relative">
                    View on GitHub
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Live Metrics Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2"
          >
            {[
              { label: 'Production Projects', value: '16+', icon: '🚀' },
              { label: 'Open Source', value: '100%', icon: '⭐' },
              { label: 'Cloud & IaC Tools', value: '15+', icon: '☁️' },
              { label: 'DevOps Guides & Q&A', value: '550+', icon: '📚' },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 p-3 sm:p-4 text-center backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:border-blue-500/30"
              >
                <div className="text-xl sm:text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-muted-foreground mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Category Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6"
          >
            {['DevOps', 'Cloud Native', 'Automation'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                <div className="relative p-4 sm:p-6 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200/20 dark:border-gray-700/20 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl transform group-hover:translate-x-6 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-xl transform group-hover:-translate-x-4 transition-transform duration-700"></div>
                  
                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      {category}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {index === 0 && 'Master the latest DevOps practices and tools'}
                      {index === 1 && 'Learn cloud-native architecture and deployment'}
                      {index === 2 && 'Explore automation and CI/CD pipelines'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project Tabs Section */}
      <div className="relative pt-6">
        <ProjectTabs />
      </div>
    </div>
  )
}
