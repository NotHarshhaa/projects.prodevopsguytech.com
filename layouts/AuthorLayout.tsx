import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { Button } from '@/components/components/ui/button'
import { PulsatingButton } from '@/components/components/ui/pulsating-button'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github, instagram, youtube } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Header Section */}
        <div className="relative space-y-2 pb-8 pt-6 md:space-y-5">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h1>
        </div>

        {/* Main Content Grid */}
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          {/* Author Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center space-x-2 pt-8"
          >
            <div className="relative group flex flex-col items-center">
              {/* Avatar with Effects */}
              {avatar && (
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative rounded-full p-1">
                    <div className="relative rounded-full overflow-hidden">
                      <Image
                        src={avatar}
                        alt="avatar"
                        width={192}
                        height={192}
                        className="h-48 w-48 rounded-full transform transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Name and Details */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {name}
                </h3>
                <div className="relative">
                  <div className="text-gray-500 dark:text-gray-400 font-medium">{occupation}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-center mt-1">{company}</div>
                </div>
              </motion.div>

              {/* Social Icons */}
              <div className="flex space-x-4 pt-5">
                {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />}
                {github && <SocialIcon kind="github" href={github} size={6} />}
                {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={6} />}
                {twitter && <SocialIcon kind="x" href={twitter} size={6} />}
                {youtube && <SocialIcon kind="youtube" href={youtube} size={6} />}
              </div>

              {/* GitHub Button */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center mt-6"
              >
                <div className="relative group/button">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover/button:opacity-50 transition-all duration-500"></div>
                  <Button 
                    variant="outline" 
                    className="relative rounded-full mb-6 dark:border-neutral-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-900/50 border border-gray-200/20 dark:border-gray-700/20"
                  >
                    <Link href={github || "https://github.com/NotHarshhaa"} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="relative">
                        Follow me on GitHub
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 group-hover/button:scale-x-100 transition-transform duration-300"></span>
                      </span>
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl"></div>
              <div className="relative backdrop-blur-sm p-4 rounded-xl">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
