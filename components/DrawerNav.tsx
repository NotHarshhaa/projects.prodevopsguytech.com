'use client';

import { Drawer } from 'vaul';
import Link from './Link';
import headerNavLinks from '@/data/headerNavLinks';
import { AlignJustify, X, ChevronRight } from 'lucide-react';
import { Button } from './components/ui/button';
import MusicPlayer from './music-player';
import { Separator } from './components/ui/separator';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { usePathname } from 'next/navigation';

export default function DrawerNav() {
  const pathname = usePathname();

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden w-8 h-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <AlignJustify className="w-4 h-4" />
          </motion.div>
        </Button>
      </Drawer.Trigger>
      <AnimatePresence>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <Drawer.Content
            className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[280px] flex"
            style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
          >
            <motion.div
              initial={{ x: 280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 280, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="bg-white dark:bg-zinc-900 h-full w-full pt-3 px-3 flex flex-col rounded-[12px] border border-gray-200 dark:border-gray-800 shadow-xl"
            >
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-2">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-medium"
                >
                  Navigation
                </motion.span>
                <Drawer.Close>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </Drawer.Close>
              </div>

              <nav className="mt-3 flex flex-col space-y-1">
                {headerNavLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <Drawer.Close key={link.title} asChild>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <Link
                          href={link.href}
                          onClick={(e) => {
                            e.stopPropagation();
                            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                          }}
                        >
                          <div
                            className={`group relative flex items-center justify-between py-2 px-3 rounded-lg transition-all duration-200
                              ${isActive 
                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-500 dark:text-primary-400' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100'
                              }`}
                          >
                            <LettersPullUp
                              text={link.title}
                              className="text-base font-medium"
                              delay={index * 0.05}
                            />
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.5 }}
                            >
                              <ChevronRight className={`w-4 h-4 transition-transform duration-200
                                ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-400 dark:text-gray-600'}
                                group-hover:translate-x-1`}
                              />
                            </motion.div>
                            {isActive && (
                              <motion.div
                                layoutId="activeNavItem"
                                className="absolute inset-0 rounded-lg ring-1 ring-primary-500 dark:ring-primary-400"
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    </Drawer.Close>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-auto mb-16"
              >
                <Separator className="my-3" />
                <MusicPlayer compact={true} />
              </motion.div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </AnimatePresence>
    </Drawer.Root>
  );
}

function LettersPullUp({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const splittedText = text.split('');

  const pullupVariant = {
    initial: { y: 8, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.03 + delay,
        duration: 0.3,
        type: "spring",
        damping: 10,
      },
    }),
    exit: { y: 8, opacity: 0 },
  };

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`flex ${className}`}>
      {splittedText.map((current, i) => (
        <motion.div
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? 'animate' : ''}
          exit="exit"
          custom={i}
        >
          {current === ' ' ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
    </div>
  );
}