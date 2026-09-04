'use client';

import { formatDate } from 'pliny/utils/formatDate';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
import Link from '@/components/Link';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import { usePathname } from 'next/navigation';
import { Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/components/ui/button';
import { Badge } from '@/components/components/ui/badge';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[];
  title: string;
  initialDisplayPosts?: CoreContent<Blog>[];
  pagination?: PaginationProps;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+$/, ''); // Remove any trailing /page
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
      {/* Prev Button */}
      {prevPage ? (
        <Button asChild variant="outline" size="sm" className="rounded-xl border-neutral-200/80 dark:border-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="flex items-center gap-1.5"
          >
            <ChevronLeft className="size-4" />
            <span>Previous Page</span>
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled className="rounded-xl opacity-40 cursor-not-allowed">
          <ChevronLeft className="size-4 mr-1" />
          <span>Previous Page</span>
        </Button>
      )}

      {/* Page Badge Counter */}
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          Page <strong className="text-foreground font-bold">{currentPage}</strong> of{' '}
          <strong className="text-foreground font-bold">{totalPages}</strong>
        </span>
      </div>

      {/* Next Button */}
      {nextPage ? (
        <Button asChild variant="outline" size="sm" className="rounded-xl border-neutral-200/80 dark:border-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next" className="flex items-center gap-1.5">
            <span>Next Page</span>
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled className="rounded-xl opacity-40 cursor-not-allowed">
          <span>Next Page</span>
          <ChevronRight className="size-4 ml-1" />
        </Button>
      )}
    </div>
  );
}

export default function BlogComponent({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

  return (
    <div className="space-y-6">
      {title && (
        <div className="pb-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {title}
          </h1>
        </div>
      )}

      {/* Empty State */}
      {!displayPosts.length && (
        <div className="py-12 text-center rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-8">
          <BookOpen className="size-10 mx-auto text-muted-foreground mb-3 opacity-60" />
          <p className="text-base font-semibold text-foreground">No articles found</p>
          <p className="text-xs text-muted-foreground mt-1">Check back later for new guides and tutorials.</p>
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-4">
        {displayPosts.map((post) => {
          const { path, date, title, summary, tags, readingTime } = post;
          return (
            <article
              key={path}
              className="group relative rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md p-5 sm:p-6 hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="size-3.5 text-blue-500" />
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </div>
                  {readingTime && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-neutral-300 dark:text-neutral-700">•</span>
                      <Clock className="size-3.5 text-amber-500" />
                      <span>{readingTime.text}</span>
                    </div>
                  )}
                </div>

                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-muted-foreground border-none"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/${path}`} className="focus:outline-hidden">
                    {title}
                  </Link>
                </h2>

                {summary && (
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {summary}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/50 flex items-center justify-between">
                <Link
                  href={`/${path}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  );
}