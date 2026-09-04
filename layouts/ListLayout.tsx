'use client'

import { useState, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Calendar, ArrowRight, LayoutGrid, List, Sparkles, RotateCcw, Clock } from 'lucide-react'
import { Badge } from '@/components/components/ui/badge'

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

const POPULAR_BLOG_TOPICS = [
  "All",
  "DevOps",
  "Terraform",
  "Kubernetes",
  "AWS",
  "Docker",
  "CI/CD",
  "Security"
]

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-8 pb-6 flex items-center justify-between">
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/80 px-4 py-2 text-xs font-semibold text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
        >
          &larr; Previous Page
        </Link>
      ) : (
        <span className="opacity-40 text-xs font-medium cursor-not-allowed">
          &larr; Previous Page
        </span>
      )}

      <span className="text-xs text-muted-foreground font-medium">
        Page <strong className="text-foreground">{currentPage}</strong> of <strong className="text-foreground">{totalPages}</strong>
      </span>

      {nextPage ? (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          rel="next"
          className="inline-flex items-center gap-1 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/80 px-4 py-2 text-xs font-semibold text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
        >
          Next Page &rarr;
        </Link>
      ) : (
        <span className="opacity-40 text-xs font-medium cursor-not-allowed">
          Next Page &rarr;
        </span>
      )}
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
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const filteredBlogPosts = useMemo(() => {
    let result = posts

    // 1. Topic filter
    if (selectedTopic !== 'All') {
      result = result.filter((post) =>
        post.tags?.some((t) => t.toLowerCase() === selectedTopic.toLowerCase())
      )
    }

    // 2. Search query filter
    if (searchValue.trim() !== '') {
      const q = searchValue.toLowerCase().trim()
      result = result.filter((post) => {
        const searchContent = (post.title || '') + (post.summary || '') + (post.tags?.join(' ') || '')
        return searchContent.toLowerCase().includes(q)
      })
    }

    return result
  }, [posts, searchValue, selectedTopic])

  const isFiltered = searchValue.trim() !== '' || selectedTopic !== 'All'

  const displayPosts =
    initialDisplayPosts.length > 0 && !isFiltered ? initialDisplayPosts : filteredBlogPosts

  const handleResetFilters = () => {
    setSearchValue('')
    setSelectedTopic('All')
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search & Topic Toolbar */}
      <div className="relative rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/70 p-3 sm:p-4 backdrop-blur-xl shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <input
              aria-label="Search articles"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search guides, tutorials, Terraform, Kubernetes..."
              className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/80 pl-10 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                title="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* View Switcher: List vs Grid */}
          <div className="inline-flex items-center rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-800/70 p-1 gap-1 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              title="List View"
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-foreground'
              }`}
            >
              <List size={14} />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-foreground'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Grid</span>
            </button>
          </div>
        </div>

        {/* Popular Topic Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-semibold text-muted-foreground mr-1 flex items-center gap-1">
            <Sparkles size={11} className="text-blue-500" />
            Topics:
          </span>
          {POPULAR_BLOG_TOPICS.map((topic) => {
            const isSelected = selectedTopic.toLowerCase() === topic.toLowerCase()
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-full px-3 py-0.5 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 scale-105"
                    : "border border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-foreground"
                }`}
              >
                {topic}
              </button>
            )
          })}
        </div>

        {/* Result Counter & Clear */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-neutral-200/50 dark:border-neutral-800/50">
          <span>
            Showing <strong className="text-foreground">{filteredBlogPosts.length}</strong> of{" "}
            <strong className="text-foreground">{posts.length}</strong> articles
          </span>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
            >
              <RotateCcw size={11} />
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Articles Presentation */}
      <AnimatePresence mode="wait">
        {filteredBlogPosts.length === 0 ? (
          /* Empty State */
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-8 sm:p-12 text-center bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm"
          >
            <div className="mx-auto size-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
              <Search size={22} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">No articles found</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4 leading-relaxed">
              We couldn't find any articles matching your current search or topic filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-medium hover:bg-primary/90 transition-all shadow-sm"
            >
              <RotateCcw size={13} />
              Clear all filters
            </button>
          </motion.div>
        ) : viewMode === 'list' ? (
          /* Detailed List View */
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {displayPosts.map((post, index) => {
              const { path, date, title: postTitle, summary, tags, readingTime } = post
              return (
                <motion.article
                  key={path}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                  whileHover={{ x: 3 }}
                  className="group relative rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 p-5 sm:p-7 backdrop-blur-xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2.5 flex-1">
                      {/* Meta: Date & Reading Time */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <time dateTime={date} className="inline-flex items-center gap-1 font-medium">
                          <Calendar size={12} className="text-blue-500" />
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                        {readingTime && (
                          <span className="inline-flex items-center gap-1">
                            <Clock size={12} className="opacity-70" />
                            {readingTime.text}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <Link href={`/${path}`} className="block group/title">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover/title:text-primary transition-colors">
                          {postTitle}
                        </h3>
                      </Link>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {tags?.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 self-start md:self-center">
                      <Link
                        href={`/${path}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-800/60 px-4 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                      >
                        <span>Read article</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        ) : (
          /* Bento Grid View */
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {displayPosts.map((post, index) => {
              const { path, date, title: postTitle, summary, tags, readingTime } = post
              return (
                <motion.article
                  key={path}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/90 dark:bg-neutral-900/90 p-5 sm:p-6 shadow-sm hover:shadow-xl backdrop-blur-xl transition-all duration-300 overflow-hidden h-full"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <time dateTime={date} className="inline-flex items-center gap-1 font-medium">
                        <Calendar size={12} className="text-blue-500" />
                        {formatDate(date, siteMetadata.locale)}
                      </time>
                      {readingTime && (
                        <span className="text-[11px] opacity-70">
                          {readingTime.text}
                        </span>
                      )}
                    </div>

                    <Link href={`/${path}`} className="block group/title mb-2.5">
                      <h3 className="text-lg font-bold text-foreground group-hover/title:text-primary transition-colors line-clamp-2">
                        {postTitle}
                      </h3>
                    </Link>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4 flex-1">
                      {summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tags?.slice(0, 3).map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                      {tags && tags.length > 3 && (
                        <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-[10px]">
                          +{tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                    <Link
                      href={`/${path}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline"
                    >
                      <span>Read article</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination (when not filtered) */}
      {pagination && pagination.totalPages > 1 && !isFiltered && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}