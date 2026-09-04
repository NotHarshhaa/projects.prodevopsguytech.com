'use client';

import Link from './Link';
import siteMetadata from '@/data/siteMetadata';
import SocialIcon from '@/components/social-icons';
import { motion } from 'framer-motion';
import { Terminal, Heart, ExternalLink, Sparkles, Rss, ArrowUpRight } from 'lucide-react';

type SocialIconKind = 'mail' | 'github' | 'youtube' | 'linkedin' | 'instagram' | 'threads' | 'medium' | 'x' | 'facebook' | 'twitter' | 'mastodon' | 'bluesky';

const FOOTER_NAV_LINKS = [
  { href: '/', title: 'Home' },
  { href: '/projects', title: 'Projects Showcase' },
  { href: '/blog', title: 'Guides & Articles' },
  { href: '/about', title: 'About the Author' },
  { href: '/books', title: 'DevOps Books & Notes' },
];

const FEATURED_RESOURCES = [
  { href: 'https://github.com/NotHarshhaa/AWS-Terraform-Workshop', title: 'AWS Terraform Workshop' },
  { href: 'https://github.com/NotHarshhaa/eks-cluster-terraform', title: 'EKS Cluster Terraform' },
  { href: 'https://github.com/NotHarshhaa/CI-CD_EKS-GitHub_Actions', title: 'CI/CD EKS GitHub Actions' },
  { href: 'https://github.com/NotHarshhaa/DevOps-Interview-Questions', title: 'DevOps Interview 550+ Q&A' },
  { href: 'https://github.com/NotHarshhaa/kubernetes-dashboard', title: 'Kubernetes Dashboard' },
];

const COMMUNITY_LINKS = [
  { href: siteMetadata.github || 'https://github.com/NotHarshhaa', title: 'GitHub Organization', isExternal: true },
  { href: siteMetadata.linkedin || 'https://www.linkedin.com', title: 'LinkedIn Profile', isExternal: true },
  { href: '/feed.xml', title: 'RSS Articles Feed', isExternal: false },
  { href: '/chat-me', title: 'DevOps AI Assistant', isExternal: false },
  { href: '/contact', title: 'Get in Touch', isExternal: false },
];

export default function Footer() {
  const socialIconsConfig = [
    { kind: 'github' as SocialIconKind, href: siteMetadata.github || '' },
    { kind: 'linkedin' as SocialIconKind, href: siteMetadata.linkedin || '' },
    { kind: 'youtube' as SocialIconKind, href: siteMetadata.youtube || '' },
    { kind: 'x' as SocialIconKind, href: siteMetadata.twitter || '' },
    { kind: 'mail' as SocialIconKind, href: siteMetadata.email ? `mailto:${siteMetadata.email}` : '' },
  ];

  const socialIcons = socialIconsConfig.filter((icon) => icon.href !== '');

  return (
    <footer className="mt-16 sm:mt-24 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-white/40 dark:bg-neutral-950/40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="size-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Terminal size={17} />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                ProDevOpsGuy Tech
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              An open-source developer hub dedicated to real-world cloud infrastructure, production Kubernetes, automated CI/CD pipelines, and DevOps mastery.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {socialIcons.map((social) => (
                <motion.div
                  key={social.kind}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-900/70 p-2 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-2xs"
                >
                  <SocialIcon kind={social.kind} href={social.href} size={4} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {FOOTER_NAV_LINKS.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Resources (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Top DevOps Projects
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {FEATURED_RESOURCES.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    <span className="line-clamp-1">{item.title}</span>
                    <ArrowUpRight size={11} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Community & Connect (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Community & Connect
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {COMMUNITY_LINKS.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    <span>{item.title}</span>
                    {item.isExternal && <ArrowUpRight size={11} className="opacity-60 group-hover:opacity-100 transition-opacity" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          {/* Copyright */}
          <div>
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="font-semibold text-foreground hover:underline">
              {siteMetadata.author || 'ProDevOpsGuy'}
            </Link>
            . All rights reserved.
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems Operational & Production Ready</span>
          </div>

          {/* Crafted By */}
          <div className="inline-flex items-center gap-1">
            <span>Crafted with</span>
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse" }}
              className="text-rose-500 inline-block"
            >
              ❤
            </motion.span>
            <span>by</span>
            <Link
              href="https://github.com/NotHarshhaa"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground hover:text-primary transition-colors hover:underline"
            >
              NotHarshhaa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
