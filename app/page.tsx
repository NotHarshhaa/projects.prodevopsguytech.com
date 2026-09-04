"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";
import { allBlogs } from "contentlayer/generated";
import { PulsatingButton } from "@/components/components/ui/pulsating-button";
import Typewriter from "typewriter-effect";
import { Button } from "@/components/components/ui/button";
import { Separator } from "@/components/components/ui/separator";
import { motion } from 'framer-motion';
import Tag from '@/components/Tag';
import { formatDate } from '../lib/utils';

const MAX_POSTS = 3; // Batasi jumlah postingan yang ditampilkan

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

export default function Page() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Mulai animasi segera setelah komponen dimuat
    setStartAnimation(true);
  }, []);

  // Ambil dan urutkan postingan
  const posts = allCoreContent(sortPosts(allBlogs));
  const displayedPosts = posts.slice(0, MAX_POSTS); // Ambil 3 postingan terbaru

  return (
    <div>
      {/* Hero Section with Creative Design */}
      <div className="relative h-[calc(100vh-10rem)] sm:h-[calc(100vh-14rem)] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid"></div>
        </div>

        {/* Main Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-2 sm:px-4">
          {/* Floating Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 sm:mb-8"
          >
            <Button 
              variant="outline" 
              className="rounded-full backdrop-blur-sm border-2 border-blue-500/20 dark:border-blue-400/20 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
            >
              <Link href="/projects" className="flex items-center gap-2">
                <span className="animate-pulse w-2 h-2 rounded-full bg-blue-500"></span>
                Explore More DevOps Resources
              </Link>
            </Button>
          </motion.div>

          {/* Title with Gradient */}
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-4 sm:mb-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            ProDevOpsGuy Tech Community
          </motion.h1>

          {/* Animated Typewriter */}
          {startAnimation && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-3 sm:py-4 mb-4 sm:mb-8 backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-xl px-4 sm:px-6"
            >
              <Typewriter
                options={{
                  strings: [
                    "Cloud DevOps Engineer",
                    "Content Creator/Blogger",
                    "Automation Expert"
                  ],
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "text-lg sm:text-2xl lg:text-3xl font-medium bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent",
                  cursorClassName: "text-purple-500 dark:text-purple-400",
                  delay: 50,
                  deleteSpeed: 20,
                }}
              />
            </motion.div>
          )}

          {/* Action Button */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <PulsatingButton className="relative">
              <Link href="/blog" className="px-8 py-3">Explore All Projects</Link>
            </PulsatingButton>
          </motion.div>
        </div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 mb-8 sm:mb-12">
        <div className="relative group">
          {/* Background decorative elements */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-50 group-hover:opacity-60 transition-all duration-500"></div>
          
          {/* Main card */}
          <div className="relative rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-0.5 shadow-2xl shadow-blue-500/10">
            <div className="relative overflow-hidden rounded-[14px] p-4 sm:p-8">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/80 to-purple-50/50 dark:from-blue-950/50 dark:via-gray-900/80 dark:to-purple-950/50 animate-gradient-xy"></div>
              
              {/* Content wrapper */}
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
                
                {/* Heading */}
                <div className="relative">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent pb-2">
                    Latest DevOps Projects
                  </h2>
                  {/* Animated underline */}
                  <div className="relative h-1 w-32">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mix-blend-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-8 sm:space-y-12 py-4 sm:py-8">
          {displayedPosts.map((post, index) => (
            <motion.div
              key={post.title}
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
                <div className="relative flex flex-col space-y-3 sm:space-y-4 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-4 sm:p-6 border border-gray-200/20 dark:border-gray-700/20 overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transform group-hover:translate-x-10 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-2xl transform group-hover:-translate-x-8 transition-transform duration-700"></div>
                  
                  {/* Content Grid */}
                  <div className="relative grid grid-cols-1 md:grid-cols-[auto,1fr] gap-4 sm:gap-6">
                    {/* Date Column */}
                    <div className="flex items-start">
                      <time 
                        className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-600 dark:text-blue-300 shadow-lg shadow-blue-500/10 backdrop-blur-sm border border-blue-200/20 dark:border-blue-700/20"
                        dateTime={post.date}
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(post.date)}
                      </time>
                    </div>

                    {/* Content Column */}
                    <div className="flex flex-col space-y-3 sm:space-y-4">
                      {/* Title */}
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="group/title relative inline-block"
                      >
                        <span className="relative z-10 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                          <span className="relative inline-block group-hover/title:text-transparent group-hover/title:bg-clip-text group-hover/title:bg-gradient-to-r group-hover/title:from-blue-600 group-hover/title:to-purple-600 dark:group-hover/title:from-blue-400 dark:group-hover/title:to-purple-400 transition-all duration-300">
                            {post.title}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transform origin-left scale-x-0 group-hover/title:scale-x-100 transition-transform duration-300"></span>
                          </span>
                        </span>
                      </Link>

                      {/* Summary */}
                      <p className="prose max-w-none text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                        {post.tags?.map((tag) => (
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
                      <div className="pt-3 sm:pt-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group/link inline-flex items-center space-x-2"
                          aria-label={`Read "${post.title}"`}
                        >
                          <span className="relative text-base font-medium text-blue-500 dark:text-blue-400">
                            <span className="relative z-10 group-hover/link:text-transparent group-hover/link:bg-clip-text group-hover/link:bg-gradient-to-r group-hover/link:from-blue-600 group-hover/link:to-purple-600 dark:group-hover/link:from-blue-400 dark:group-hover/link:to-purple-400 transition-all duration-300">
                              Read more
                              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transform origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></span>
                            </span>
                          </span>
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-500 dark:text-blue-400"
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
              {index < displayedPosts.length - 1 && (
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
                  className="w-full px-2 sm:px-4 mt-8 sm:mt-12"
                >
                  <Separator animated gradient className="my-8 sm:my-12" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}