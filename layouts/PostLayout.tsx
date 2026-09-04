import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { path, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="mx-auto w-full overflow-hidden">
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="relative pt-6 xl:pb-6">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 sm:w-96 h-96 sm:h-96 from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transform translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-96 sm:w-96 h-96 sm:h-96 from-purple-500/10 to-blue-500/10 rounded-full blur-3xl transform -translate-x-1/3"></div>
            </div>

            <div className="relative space-y-4 text-center px-4 sm:px-6">
              <dl className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20"></div>
                  <dd className="relative px-3 sm:px-6 py-2 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                    <time dateTime={date} className="flex items-center text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="whitespace-nowrap">{new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}</span>
                    </time>
                  </dd>
                </div>
              </dl>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl"></div>
                <PageTitle>
                  <span className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent px-4">
                    {title}
                  </span>
                </PageTitle>
              </div>
            </div>
          </header>

          <div className="relative grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <dl className="relative py-6 px-4 sm:px-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="group relative" key={author.name}>
                      <div className="relative flex items-center space-x-2 rounded-xl p-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                        {author.avatar && (
                          <div className="relative flex-shrink-0">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            <Image
                              src={author.avatar}
                              width={34}
                              height={34}
                              alt=""
                              className="relative h-10 w-10 rounded-full ring-2 ring-white dark:ring-gray-900"
                            />
                          </div>
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Social Link</dt>
                          <dd>
                            {author.github ? (
                              <Link
                                href={author.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link relative text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200"
                              >
                                <span className="relative">
                                  @{author.github.replace('https://github.com/', '')}
                                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transform origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></span>
                                </span>
                              </Link>
                            ) : author.twitter ? (
                              <Link
                                href={author.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link relative text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200"
                              >
                                <span className="relative">
                                  @{author.twitter.replace('https://twitter.com/', '').replace('https://x.com/', '')}
                                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transform origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></span>
                                </span>
                              </Link>
                            ) : null}
                          </dd>
                        </dl>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose prose-lg max-w-none px-4 sm:px-6 pb-8 pt-10 dark:prose-invert xl:prose-xl xl:px-8">{children}</div>
            </div>
            <footer className="relative px-4 sm:px-6">
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-4 space-y-2">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex flex-col sm:flex-row justify-between py-4 gap-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div className="group relative w-full sm:w-auto">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                        <div className="relative p-2 rounded-lg transition-colors duration-300 group-hover:bg-white/50 dark:group-hover:bg-gray-800/50">
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Previous Project
                          </h2>
                          <div className="text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 break-words">
                            <Link href={`/${prev.path}`}>{prev.title}</Link>
                          </div>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div className="group relative w-full sm:w-auto">
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                        <div className="relative p-2 rounded-lg transition-colors duration-300 group-hover:bg-white/50 dark:group-hover:bg-gray-800/50">
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Next Project
                          </h2>
                          <div className="text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 break-words">
                            <Link href={`/${next.path}`}>{next.title}</Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="group inline-flex items-center space-x-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                  aria-label="Back to the blog"
                >
                  <svg className="h-5 w-5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="relative">
                    Back to the Project
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </span>
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
