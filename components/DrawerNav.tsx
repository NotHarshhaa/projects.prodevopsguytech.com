'use client';

import { Drawer } from 'vaul';
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
  ExternalLink
} from 'lucide-react';
import { Button } from './components/ui/button';
import MusicPlayer from './music-player';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { usePathname } from 'next/navigation';

const NAV_ICONS: Record<string, any> = {
  Home: Home,
  Projects: Layers,
  Guides: BookOpen,
  About: User,
  Showcase: Layers,
};

export default function DrawerNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden size-8.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/70 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="size-4 text-foreground" />
        </Button>
      </Drawer.Trigger>

      <AnimatePresence>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs" />
          <Drawer.Content
            className="right-2 top-2 bottom-2 fixed z-50 outline-none w-[300px] flex"
            style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
          >
            <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl h-full w-full p-4 flex flex-col rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xl overflow-y-auto">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60 dark:border-neutral-800/60">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-xs">
                    <Terminal size={15} />
                  </div>
                  <span className="font-extrabold text-sm bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    ProDevOpsGuy
                  </span>
                </div>

                <Drawer.Close asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    aria-label="Close Navigation Menu"
                  >
                    <X size={15} className="text-muted-foreground" />
                  </Button>
                </Drawer.Close>
              </div>

              {/* Main Navigation Links */}
              <div className="py-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                  Navigation
                </span>
                <nav className="mt-1.5 space-y-1">
                  {headerNavLinks.map((link) => {
                    const isActive =
                      link.href === '/'
                        ? pathname === '/'
                        : pathname === link.href || pathname.startsWith(`${link.href}/`);
                    const Icon = NAV_ICONS[link.title] || Layers;

                    return (
                      <Drawer.Close key={link.title} asChild>
                        <Link
                          href={link.href}
                          className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                              ? 'bg-blue-50/90 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 font-semibold shadow-2xs'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:text-foreground'
                            }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon size={16} className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground group-hover:text-foreground'} />
                            <span>{link.title}</span>
                          </div>
                          <ChevronRight
                            size={14}
                            className={`transition-transform group-hover:translate-x-0.5 ${isActive ? 'text-blue-500' : 'text-neutral-400 dark:text-neutral-600'
                              }`}
                          />
                        </Link>
                      </Drawer.Close>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Resources Links */}
              <div className="py-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                  Tools & Resources
                </span>
                <div className="mt-1.5 space-y-1 text-xs">
                  <Drawer.Close asChild>
                    <Link
                      href="/chat-me"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:text-foreground transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Bot size={15} className="text-purple-500" />
                        <span>DevOps AI Assistant</span>
                      </div>
                      <ChevronRight size={13} className="text-neutral-400" />
                    </Link>
                  </Drawer.Close>

                  <Drawer.Close asChild>
                    <Link
                      href="/books"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:text-foreground transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Library size={15} className="text-amber-500" />
                        <span>Books & Architecture Notes</span>
                      </div>
                      <ChevronRight size={13} className="text-neutral-400" />
                    </Link>
                  </Drawer.Close>

                  <Drawer.Close asChild>
                    <Link
                      href="/contact"
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:text-foreground transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Mail size={15} className="text-emerald-500" />
                        <span>Contact & Connect</span>
                      </div>
                      <ChevronRight size={13} className="text-neutral-400" />
                    </Link>
                  </Drawer.Close>
                </div>
              </div>

              {/* GitHub Follow Banner */}
              {siteMetadata.github && (
                <div className="pt-2">
                  <Link
                    href={siteMetadata.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-foreground transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Github size={14} />
                      <span>Follow on GitHub</span>
                    </div>
                    <ExternalLink size={12} className="opacity-60" />
                  </Link>
                </div>
              )}

              {/* Music Player at bottom */}
              <div className="mt-auto pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <MusicPlayer compact={true} />
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </AnimatePresence>
    </Drawer.Root>
  );
}