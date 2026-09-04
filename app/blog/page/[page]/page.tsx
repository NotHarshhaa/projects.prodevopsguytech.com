import ListLayout from '@/layouts/ListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allBlogs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import siteMetadata from '@/data/siteMetadata';
import { Button } from '@/components/components/ui/button';
import { Badge } from '@/components/components/ui/badge';
import { FaRss } from 'react-icons/fa';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const POSTS_PER_PAGE = 6;

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = parseInt(params.page);

  return {
    title: page === 1 ? 'DevOps Guides & Technical Articles' : `DevOps Guides - Page ${page}`,
    description: siteMetadata.description,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: page === 1 ? 'DevOps Guides & Technical Articles' : `DevOps Guides - Page ${page}`,
      description: siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: page === 1 ? 'DevOps Guides & Technical Articles' : `DevOps Guides - Page ${page}`,
      description: siteMetadata.description,
      card: 'summary_large_image',
    },
  };
}

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));

  return paths;
};

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  const posts = allCoreContent(sortPosts(allBlogs));
  const pageNumber = parseInt(params.page as string);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound();
  }
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  };

  return (
    <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto space-y-6 sm:space-y-8">
      {/* Blog Hero Header */}
      <div className="relative pt-4 sm:pt-6 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 inline-flex items-center gap-1.5"
            >
              <Sparkles size={12} />
              Production Tutorials & Cheatsheets
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              DevOps Guides &{' '}
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
        </div>
      </div>

      {/* Blog List Layout */}
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title=""
      />
    </div>
  );
}
