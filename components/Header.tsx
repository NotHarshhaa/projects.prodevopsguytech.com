'use client';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Link from './Link';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';
import VaulDrawer from './DrawerNav';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  
  const headerClass = `
    flex items-center justify-between w-full py-2 sm:py-4 px-3 sm:px-6 mx-auto
    max-w-3xl xl:max-w-[1400px] 2xl:max-w-[1600px]
    rounded-xl border border-gray-200/30 bg-white/70 backdrop-blur-xl shadow-lg
    dark:border-gray-700/30 dark:bg-gray-900/70 dark:shadow-2xl dark:shadow-gray-950/10
    transition-all duration-300 hover:shadow-xl hover:border-gray-300/50 dark:hover:border-gray-600/50
    ${siteMetadata.stickyNav ? 'sticky top-4 z-50' : ''}
  `;

  return (
    <div className="px-2 sm:px-4 py-2 sm:py-4">
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className={headerClass.trim()}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative"
        >
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center space-x-3">
              {/* Uncomment the line below to use the logo */}
              {/* <Logo /> */}
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 dark:from-blue-400 dark:via-blue-300 dark:to-purple-400 text-transparent bg-clip-text">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
        </motion.div>

        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          <nav className="hidden sm:flex space-x-1">
            <motion.div 
              className="flex space-x-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {headerNavLinks
                .filter((link) => link.href !== '/')
                .map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.title}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        show: { opacity: 1, y: 0 }
                      }}
                    >
                      <Link
                        href={link.href}
                        className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200
                          ${isActive 
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 shadow-sm' 
                            : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50/80 dark:hover:bg-gray-800/50'
                          }
                        `}
                      >
                        {link.title}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 rounded-lg ring-2 ring-blue-500/30 dark:ring-blue-400/30 shadow-sm shadow-blue-500/20 dark:shadow-blue-400/20"
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
            </motion.div>
          </nav>

          <div className="flex items-center space-x-1 sm:space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
            >
              <SearchButton />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
            >
              <ThemeSwitch />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="sm:hidden p-1.5 rounded-lg hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
            >
              <VaulDrawer/>
            </motion.div>
          </div>
        </div>
      </motion.header>
    </div>
  );
};

export default Header;
