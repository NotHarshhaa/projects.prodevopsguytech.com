'use client'

import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { Button } from '@/components/components/ui/button'
import { Badge } from '@/components/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Sparkles, MapPin, Building, Briefcase } from 'lucide-react'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github, instagram, youtube } = content

  return (
    <div className="max-w-6xl mx-auto space-y-10 sm:space-y-14">
      {/* Header Section */}
      <div className="relative pt-4 sm:pt-6 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          <Badge variant="outline" className="rounded-full px-3 py-1 text-xs border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 inline-flex items-center gap-1.5">
            <Sparkles size={12} />
            Engineer, Creator & Mentor
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {name || "ProDevOpsGuy"}
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Building reliable cloud infrastructure, automating deployments, and empowering the global DevOps community.
          </p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Author Profile Sidebar Card (4 columns) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 sticky top-24"
        >
          <div className="relative group rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/90 dark:bg-neutral-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-center">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Avatar with Glow */}
              {avatar && (
                <div className="relative mb-5">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 blur opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative size-36 sm:size-40 rounded-full p-1 bg-white dark:bg-neutral-950 overflow-hidden shadow-md">
                    <Image
                      src={avatar}
                      alt="avatar"
                      width={160}
                      height={160}
                      className="size-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              )}

              {/* Name & Title */}
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {name}
              </h2>

              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                <Briefcase size={13} />
                <span>{occupation}</span>
              </div>

              {company && (
                <div className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-4">
                  <Building size={12} />
                  <span>{company}</span>
                </div>
              )}

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-6">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for Collaboration</span>
              </div>

              {/* Social Icons Strip */}
              <div className="flex flex-wrap justify-center gap-3 mb-6 p-2 rounded-2xl bg-neutral-50/80 dark:bg-neutral-800/60 border border-neutral-200/50 dark:border-neutral-700/50 w-full">
                {github && <SocialIcon kind="github" href={github} size={5} />}
                {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={5} />}
                {twitter && <SocialIcon kind="x" href={twitter} size={5} />}
                {youtube && <SocialIcon kind="youtube" href={youtube} size={5} />}
                {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />}
              </div>

              {/* GitHub Follow Button */}
              {github && (
                <Button asChild variant="outline" className="w-full rounded-2xl border-neutral-200/80 dark:border-neutral-700/80 bg-white dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-800 shadow-sm">
                  <Link href={github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <Github size={15} />
                    <span>Follow on GitHub</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Content Column (8 columns) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-8 space-y-8"
        >
          {/* Biography Article */}
          <div className="relative rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 p-6 sm:p-10 backdrop-blur-xl shadow-sm">
            <div className="prose max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl">
              {children}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
