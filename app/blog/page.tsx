'use client';

import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import ListLayout from '@/layouts/ListLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/components/ui/button';
import { Badge } from '@/components/components/ui/badge';
import { FaRss } from 'react-icons/fa';
import Link from 'next/link';
import { BookOpen, Sparkles } from 'lucide-react';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs));
  const pageNumber = 1;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber);
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-6 sm:space-y-8"
    >
      {/* Blog Hero Header */}
      <div className="relative pt-4 sm:pt-6 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 inline-flex items-center gap-1.5">
              <Sparkles size={12} />
              Production Tutorials & Cheatsheets
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              DevOps Guides &{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Technical Articles
              </span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Step-by-step guides, Terraform architectures, Kubernetes walkthroughs, and DevOps interview prep.
            </p>
          </div>

          <Button asChild variant="outline" size="sm" className="rounded-full hover:scale-105 transition-transform duration-200 shrink-0">
            <Link href="/feed.xml" className="flex items-center gap-2">
              <FaRss className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs font-semibold">RSS Feed</span>
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Blog List Layout */}
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title=""
      />
    </motion.div>
  );
}
