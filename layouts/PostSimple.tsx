import { ReactNode } from 'react';
import { formatDate } from 'pliny/utils/formatDate';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import Comments from '@/components/Comments';
import Link from '@/components/Link';
import SectionContainer from '@/components/SectionContainer';
import siteMetadata from '@/data/siteMetadata';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import { Calendar, Clock, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { Badge } from '@/components/components/ui/badge';

interface LayoutProps {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export default function PostSimple({ content, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, tags, readingTime } = content;

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="mx-auto w-full max-w-4xl xl:max-w-6xl 2xl:max-w-7xl py-4 sm:py-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60 text-xs text-muted-foreground">
          <nav className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight size={13} className="opacity-50" />
            <Link href="/blog" className="hover:text-foreground">DevOps Guides</Link>
            <ChevronRight size={13} className="opacity-50" />
            <span className="text-foreground font-medium line-clamp-1 max-w-[200px]">{title}</span>
          </nav>
          <Button asChild variant="ghost" size="sm" className="h-8 px-2.5 rounded-xl text-xs">
            <Link href="/blog" className="flex items-center gap-1.5">
              <ArrowLeft size={13} />
              <span>All Guides</span>
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="py-8 border-b border-neutral-200/70 dark:border-neutral-800/70 space-y-4">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-semibold">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {title}
          </h1>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-blue-500" />
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </div>
            {readingTime && (
              <div className="flex items-center gap-1.5">
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <Clock size={14} className="text-amber-500" />
                <span>{readingTime.text}</span>
              </div>
            )}
          </div>
        </header>

        {/* Article Body */}
        <div className="py-8">
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-2xl">
            {children}
          </div>
        </div>

        {/* Comments */}
        {siteMetadata.comments && (
          <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300 border-t border-neutral-200/60 dark:border-neutral-800/60" id="comment">
            <Comments slug={slug} />
          </div>
        )}

        {/* Next / Previous Navigation */}
        {(next || prev) && (
          <footer className="mt-8 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev && prev.path ? (
              <Link
                href={`/${prev.path}`}
                className="p-4 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-all"
              >
                <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1 mb-1">
                  <ChevronLeft size={13} />
                  <span>Previous Guide</span>
                </div>
                <span className="text-sm font-bold text-foreground line-clamp-2">{prev.title}</span>
              </Link>
            ) : <div />}

            {next && next.path ? (
              <Link
                href={`/${next.path}`}
                className="p-4 rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-all text-right"
              >
                <div className="text-xs font-semibold text-muted-foreground flex items-center justify-end gap-1 mb-1">
                  <span>Next Guide</span>
                  <ChevronRight size={13} />
                </div>
                <span className="text-sm font-bold text-foreground line-clamp-2">{next.title}</span>
              </Link>
            ) : <div />}
          </footer>
        )}
      </article>
    </SectionContainer>
  );
}
