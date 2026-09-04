import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog, Authors } from 'contentlayer/generated';
import Link from '@/components/Link';
import SectionContainer from '@/components/SectionContainer';
import Image from '@/components/Image';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Github,
  Twitter,
  Linkedin,
  BookOpen,
  ArrowLeft,
  Terminal,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/components/ui/badge';
import { Button } from '@/components/components/ui/button';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface LayoutProps {
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { path, date, title, tags, summary, readingTime, toc } = content;
  const basePath = path.split('/')[0];

  return (
    <SectionContainer>
      <ScrollTopAndComment />

      <article className="mx-auto w-full max-w-5xl xl:max-w-7xl 2xl:max-w-[1440px] py-4 sm:py-6">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60 text-xs text-muted-foreground">
          <nav className="flex items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight size={13} className="opacity-50" />
            <Link href="/blog" className="hover:text-foreground transition-colors">
              DevOps Guides
            </Link>
            <ChevronRight size={13} className="opacity-50" />
            <span className="text-foreground font-semibold line-clamp-1 max-w-[200px] sm:max-w-xs">
              {title}
            </span>
          </nav>

          <Button asChild variant="ghost" size="sm" className="h-8 px-2.5 rounded-xl text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground">
            <Link href="/blog" className="flex items-center gap-1.5">
              <ArrowLeft size={13} />
              <span>All Guides</span>
            </Link>
          </Button>
        </div>

        {/* Article Hero Header */}
        <header className="relative pt-8 pb-8 sm:pb-10 border-b border-neutral-200/70 dark:border-neutral-800/70">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-500/10 via-blue-500/10 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="space-y-4 max-w-4xl xl:max-w-5xl">
            {/* Tag Pills */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {tags.slice(0, 4).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-lg text-xs font-semibold px-2.5 py-0.5 bg-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-500/20"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              {title}
            </h1>

            {/* Summary / Subheading */}
            {summary && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {summary}
              </p>
            )}

            {/* Meta Row: Date, Reading Time, Author */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-blue-500" />
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
              </div>

              {readingTime && (
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-300 dark:text-neutral-700">•</span>
                  <Clock size={14} className="text-amber-500" />
                  <span>{readingTime.text}</span>
                </div>
              )}

              {authorDetails && authorDetails.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-300 dark:text-neutral-700">•</span>
                  <span className="font-medium text-foreground">By {authorDetails[0].name}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Layout Grid (Main Article + Sticky Sidebar) */}
        <div className="pt-8 pb-12 grid grid-cols-1 xl:grid-cols-12 xl:gap-12">
          {/* Main Article Prose */}
          <div className="xl:col-span-8 2xl:col-span-9">
            <div className="prose prose-neutral dark:prose-invert max-w-none xl:prose-lg prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-2xl prose-img:rounded-2xl prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
              {children}
            </div>

            {/* Post Tags Footer */}
            {tags && tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                  Categorized Under
                </span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            )}

            {/* Next / Previous Navigation Cards */}
            {(next || prev) && (
              <div className="mt-8 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prev && prev.path ? (
                  <Link
                    href={`/${prev.path}`}
                    className="group flex flex-col justify-between p-4 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                      <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                      <span>Previous Guide</span>
                    </div>
                    <span className="text-sm font-bold text-foreground line-clamp-2">
                      {prev.title}
                    </span>
                  </Link>
                ) : <div />}

                {next && next.path ? (
                  <Link
                    href={`/${next.path}`}
                    className="group flex flex-col justify-between p-4 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all text-right sm:text-right"
                  >
                    <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                      <span>Next Guide</span>
                      <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-sm font-bold text-foreground line-clamp-2">
                      {next.title}
                    </span>
                  </Link>
                ) : <div />}
              </div>
            )}
          </div>

          {/* Sticky Desktop Sidebar */}
          <aside className="hidden xl:block xl:col-span-4 2xl:col-span-3 space-y-6">
            <div className="sticky top-20 space-y-6">
              {/* Author Card */}
              {authorDetails && authorDetails.length > 0 && (
                <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/70 dark:bg-neutral-900/50 backdrop-blur-md p-4 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Written By
                  </span>

                  <div className="flex items-center gap-3">
                    {authorDetails[0].avatar && (
                      <Image
                        src={authorDetails[0].avatar}
                        width={42}
                        height={42}
                        alt={authorDetails[0].name}
                        className="rounded-full ring-2 ring-blue-500/20"
                      />
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        {authorDetails[0].name}
                      </h4>
                      {authorDetails[0].occupation && (
                        <p className="text-[11px] text-muted-foreground">
                          {authorDetails[0].occupation}
                        </p>
                      )}
                    </div>
                  </div>

                  {authorDetails[0].github && (
                    <Link
                      href={authorDetails[0].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full py-1.5 px-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-medium text-foreground transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Github size={13} />
                        <span>GitHub Profile</span>
                      </div>
                      <ChevronRight size={12} className="text-muted-foreground" />
                    </Link>
                  )}
                </div>
              )}

              {/* Table of Contents (if available) */}
              {toc && Array.isArray(toc) && toc.length > 0 && (
                <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <BookOpen size={12} className="text-blue-500" />
                    Table of Contents
                  </span>
                  <nav className="space-y-1 max-h-[300px] overflow-y-auto text-xs pr-1">
                    {toc.map((heading: any) => (
                      <a
                        key={heading.url}
                        href={heading.url}
                        className={`block py-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-muted-foreground line-clamp-1 ${
                          heading.depth === 3 ? 'pl-3 text-[11px]' : 'font-medium'
                        }`}
                      >
                        {heading.value}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Quick Action Button */}
              <Button asChild variant="outline" className="w-full rounded-xl text-xs font-semibold">
                <Link href="/blog" className="flex items-center justify-center gap-2">
                  <ArrowLeft size={13} />
                  <span>Back to All Guides</span>
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </article>
    </SectionContainer>
  );
}
