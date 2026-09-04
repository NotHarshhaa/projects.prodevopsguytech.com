'use client';

import Link from './Link';
import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';
import {
  Menu,
  X,
  ChevronRight,
  Home,
  Layers,
  BookOpen,
  User,
  Github,
  Bot,
  Mail,
  Library,
  Terminal,
  Sparkles,
  Star,
  Radio,
  Linkedin
} from 'lucide-react';
import { Button } from './components/ui/button';
import MusicPlayer from './music-player';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { usePathname } from 'next/navigation';

interface NavItemMeta {
  icon: any;
  desc: string;
  badge?: string;
  gradient: string;
}

const NAV_DETAILS: Record<string, NavItemMeta> = {
  Home: {
    icon: Home,
    desc: 'Main portal & stack overview',
    gradient: 'from-blue-500/20 to-cyan-500/20 text-blue-500',
  },
  Projects: {
    icon: Layers,
    desc: '70+ Production DevOps repos',
    badge: '70+',
    gradient: 'from-purple-500/20 to-pink-500/20 text-purple-500',
  },
  Guides: {
    icon: BookOpen,
    desc: 'Technical tutorials & articles',
    badge: 'New',
    gradient: 'from-amber-500/20 to-orange-500/20 text-amber-500',
  },
  About: {
    icon: User,
    desc: 'Experience, skills & career timeline',
    gradient: 'from-emerald-500/20 to-teal-500/20 text-emerald-500',
  },
};

export default function MobileDropdownNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close dropdown upon route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Handle Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Body scroll locking when dropdown is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="relative">
      {/* Mobile Menu Toggle Trigger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((prev) => !prev)}
        className={`sm:hidden size-9 rounded-xl border transition-all duration-300 ${open
            ? 'bg-neutral-200/80 dark:bg-neutral-800/80 border-blue-500/50 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground'
          }`}
        aria-label={open ? 'Close Mobile Menu' : 'Open Mobile Menu'}
        aria-expanded={open}
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </motion.div>
      </Button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Dropdown Menu Panel Floating Directly Under Sticky Navbar */}
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{
                duration: 0.24,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed inset-x-3 top-[58px] z-50 max-w-lg mx-auto rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl shadow-2xl p-4 sm:p-5 max-h-[calc(100vh-76px)] overflow-y-auto flex flex-col gap-4.5"
            >
              {/* Dropdown Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/70 dark:border-neutral-800/70">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xs">
                    <Terminal size={14} />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      ProDevOpsGuy
                    </span>
                    <span className="ml-1 text-[10px] font-semibold text-muted-foreground uppercase">
                      Menu
                    </span>
                  </div>
                </div>

                {/* Live System Status Pill */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/60">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live</span>
                  </span>

                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Main Navigation 2x2 Interactive Grid */}
              <div>
                <div className="flex items-center justify-between px-1 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Navigation
                  </span>
                  <span className="text-[10px] text-muted-foreground">Tap to explore</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {headerNavLinks.map((link) => {
                    const isActive =
                      link.href === '/'
                        ? pathname === '/'
                        : pathname === link.href || pathname.startsWith(`${link.href}/`);
                    const details = NAV_DETAILS[link.title] || {
                      icon: Layers,
                      desc: 'Explore section',
                      gradient: 'from-blue-500/20 to-indigo-500/20 text-blue-500',
                    };
                    const Icon = details.icon;

                    return (
                      <Link
                        key={link.title}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`group relative flex flex-col p-3 rounded-2xl border transition-all duration-200 ${isActive
                            ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-sm'
                            : 'bg-neutral-50/70 dark:bg-neutral-800/40 border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700'
                          }`}
                      >
                        <div className="flex items-start justify-between w-full mb-2">
                          <div
                            className={`size-8 rounded-xl bg-gradient-to-br ${details.gradient} flex items-center justify-center transition-transform group-hover:scale-110`}
                          >
                            <Icon size={16} />
                          </div>
                          {details.badge && (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                              {details.badge}
                            </span>
                          )}
                          {isActive && (
                            <span className="size-2 rounded-full bg-blue-500 shadow-xs shadow-blue-500/50" />
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-bold ${isActive
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                              }`}
                          >
                            {link.title}
                          </span>
                          <ChevronRight
                            size={14}
                            className={`transition-transform group-hover:translate-x-0.5 ${isActive
                                ? 'text-blue-500'
                                : 'text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'
                              }`}
                          />
                        </div>

                        <span className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                          {details.desc}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick Tools & Knowledge Hub */}
              <div className="pt-1">
                <div className="flex items-center justify-between px-1 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <Sparkles size={11} className="text-purple-500" />
                    Tools & Resources
                  </span>
                  <span className="text-[10px] text-muted-foreground">Interactive</span>
                </div>

                <div className="space-y-1.5">
                  <Link
                    href="/chat-me"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-800/30 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                        <Bot size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center gap-1.5">
                          DevOps AI Assistant
                          <span className="px-1.5 py-0.2 rounded-md text-[9px] font-medium bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                            Groq AI
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Ask cloud architecture & troubleshooting questions
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-neutral-400 group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>

                  <Link
                    href="/books"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-800/30 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                        <Library size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400">
                          Architecture Notes & Books
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          System blueprints, Kubernetes, & cloud guides
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-neutral-400 group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-800/30 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <Mail size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          Hire & Collaborate
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Get in touch with Harshhaa directly
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-neutral-400 group-hover:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              {/* Social & GitHub Star Bar */}
              <div className="pt-1 flex items-center gap-2">
                {siteMetadata.siteRepo && (
                  <Link
                    href={siteMetadata.siteRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/80 dark:bg-neutral-800/60 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 text-xs font-semibold text-foreground transition-all"
                  >
                    <Github size={14} />
                    <span>Star on GitHub</span>
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                  </Link>
                )}

                {siteMetadata.linkedin && (
                  <Link
                    href={siteMetadata.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center size-9 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/80 dark:bg-neutral-800/60 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 text-blue-600 dark:text-blue-400 transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin size={15} />
                  </Link>
                )}
              </div>

              {/* Embedded Focus Music Player Widget */}
              <div className="pt-2 border-t border-neutral-200/70 dark:border-neutral-800/70">
                <div className="flex items-center gap-1.5 px-1 mb-2">
                  <Radio size={12} className="text-pink-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Focus Lo-Fi Player
                  </span>
                </div>
                <div className="rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-800/40 p-2">
                  <MusicPlayer compact={true} />
                </div>
              </div>

              {/* Dropdown Menu Footer Note */}
              <div className="text-center pt-1">
                <span className="text-[10px] text-muted-foreground">
                  ProDevOpsGuy Tech • Built with Next.js & Tailwind
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}