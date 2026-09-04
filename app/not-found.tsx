import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/15 to-purple-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-gradient-to-tl from-purple-500/15 to-blue-500/15 blur-3xl" />

      <div className="relative z-10 max-w-lg space-y-6">
        <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Error 404
        </span>

        <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl md:text-9xl">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
            Page Not Found
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Sorry, we couldn&apos;t find the page you were looking for. It might have been moved or removed.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
          >
            Back to Homepage
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white/80 px-6 py-2.5 text-sm font-medium text-neutral-700 backdrop-blur-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 active:scale-95 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            All Projects
          </Link>
        </div>
      </div>
    </div>
  )
}
