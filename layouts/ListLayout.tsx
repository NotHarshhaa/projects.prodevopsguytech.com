'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const tagVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.2,
    }
  },
};

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+$/, '') // Remove any trailing /page
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-6 sm:pb-8 pt-4 sm:pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous Page
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous Page
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next Page
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next Page
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-6 sm:pb-8 pt-4 sm:pt-6 md:space-y-3">
          {title && (
            <h1 className="text-2xl sm:text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-[3rem]">
              {title}
            </h1>
          )}
          <div className="relative">
            {/* Search input with creative design */}
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"></div>
              <div className="relative">
                <input
                  aria-label="Search articles"
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search articles"
                  className="block w-full rounded-lg border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl px-3 sm:px-4 py-2.5 sm:py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
                />
                <svg
                  className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8 sm:space-y-12 py-6 sm:py-8">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post, index) => {
            const { path, date, title, summary, tags } = post
            return (
              <motion.div
                key={path}
                custom={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="group relative transform transition-all duration-500"
              >
                {/* Card Container */}
                <div className="relative">
                  {/* Background Effects */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                  
                  {/* Main Card Content */}
                  <div className="relative flex flex-col space-y-3 sm:space-y-4 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-4 sm:p-5 border border-gray-200/20 dark:border-gray-700/20 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transform group-hover:translate-x-10 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-2xl transform group-hover:-translate-x-8 transition-transform duration-700"></div>
                    
                    {/* Content Grid */}
                    <div className="relative grid grid-cols-1 md:grid-cols-[auto,1fr] gap-4 sm:gap-5">
                      {/* Date Column */}
                      <div className="flex items-start">
                        <time 
                          className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-600 dark:text-blue-300 shadow-lg shadow-blue-500/10 backdrop-blur-sm border border-blue-200/20 dark:border-blue-700/20"
                          dateTime={date}
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </div>

                      {/* Content Column */}
                      <div className="flex flex-col space-y-3 sm:space-y-4">
                        {/* Title */}
                        <Link 
                          href={`/${path}`}
                          className="group/title relative inline-block"
                        >
                          <span className="relative z-10 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            <span className="relative inline-block group-hover/title:text-transparent group-hover/title:bg-clip-text group-hover/title:bg-gradient-to-r group-hover/title:from-blue-600 group-hover/title:to-purple-600 dark:group-hover/title:from-blue-400 dark:group-hover/title:to-purple-400 transition-all duration-300">
                              {title}
                              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transform origin-left scale-x-0 group-hover/title:scale-x-100 transition-transform duration-300"></span>
                            </span>
                          </span>
                        </Link>

                        {/* Summary */}
                        <p className="prose max-w-none text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed text-sm md:text-[0.925rem] md:leading-[1.65]">
                          {summary}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                          {tags?.map((tag) => (
                            <motion.div
                              key={tag}
                              variants={tagVariants}
                              initial="initial"
                              whileInView="animate"
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.05 }}
                              className="transform-gpu"
                            >
                              <Tag text={tag} />
                            </motion.div>
                          ))}
                        </div>

                        {/* Read More Link */}
                        <div className="pt-2 sm:pt-3">
                          <Link
                            href={`/${path}`}
                            className="group/link inline-flex items-center space-x-2"
                            aria-label={`Read "${title}"`}
                          >
                            <span className="relative text-sm md:text-[0.925rem] font-medium text-blue-500 dark:text-blue-400">
                              <span className="relative z-10 group-hover/link:text-transparent group-hover/link:bg-clip-text group-hover/link:bg-gradient-to-r group-hover/link:from-blue-600 group-hover/link:to-purple-600 dark:group-hover/link:from-blue-400 dark:group-hover/link:to-purple-400 transition-all duration-300">
                                Read more
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transform origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></span>
                              </span>
                            </span>
                            <motion.svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 md:h-4 md:w-4 text-blue-500 dark:text-blue-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              initial={{ x: 0 }}
                              animate={{ x: 3 }}
                              transition={{
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 1,
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </motion.svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator */}
                {index < displayPosts.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.3,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 100,
                      damping: 20
                    }}
                    className="w-full px-2 sm:px-4 mt-6 sm:mt-8"
                  >
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}