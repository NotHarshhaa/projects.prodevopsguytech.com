'use client';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Link from './Link';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import VaulDrawer from './DrawerNav';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Terminal, Github, Star } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="sticky top-2 sm:top-3 z-50 px-3 sm:px-6 py-1 max-w-6xl mx-auto w-full">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 24,
        }}
        className="flex items-center justify-between w-full py-2.5 px-4 sm:px-6 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        {/* Brand Logo & Title */}
        <Link href="/" aria-label={siteMetadata.headerTitle} className="group flex items-center gap-2.5">
          <div className="relative size-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <Terminal size={17} className="text-white" />
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              ProDevOpsGuy
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden xs:inline sm:inline">
              Tech
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden sm:flex items-center space-x-1">
          {headerNavLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.title}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60'
                }`}
              >
                {link.title}
                {isActive && (
                  <motion.div
                    layoutId="activeHeaderTab"
                    className="absolute inset-0 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/50 -z-10 shadow-xs"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Direct GitHub Star Button */}
          {siteMetadata.github && (
            <Link
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-800/70 px-3 py-1 text-xs font-medium text-foreground hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 transition-all hover:scale-105"
              title="Star on GitHub"
            >
              <Github size={13} />
              <span>Star</span>
              <Star size={11} className="text-amber-500 fill-amber-500" />
            </Link>
          )}

          {/* Search Button */}
          <div className="rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <SearchButton />
          </div>

          {/* Theme Toggle */}
          <div className="rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <ThemeSwitch />
          </div>

          {/* Mobile Drawer Navigation */}
          <div className="sm:hidden rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <VaulDrawer />
          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default Header;
