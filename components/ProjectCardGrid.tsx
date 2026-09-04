'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/components/ui/badge';
import { Github, Globe, File, ExternalLink, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Project {
  slug: string;
  name: string;
  description: string;
  technologies: string[];
  paper?: string;
  publishedAt: string;
  code?: string;
  document?: string;
  url?: string;
  gambar?: string;
  type?: string;
}

export default function ProjectCardGrid({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false);

  const handleCopyClone = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!project.code) return;
    const cloneCmd = `git clone ${project.code}.git`;
    navigator.clipboard.writeText(cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/90 dark:bg-neutral-900/90 p-5 sm:p-6 shadow-sm hover:shadow-xl backdrop-blur-xl transition-all duration-300 overflow-hidden h-full"
    >
      {/* Ambient Gradient Glow */}
      <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-blue-600/15 to-purple-600/15 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Decorative Corner Light */}
      <div className="pointer-events-none absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl transform group-hover:translate-x-4 transition-transform duration-700" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Top Header: Title & Date */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {project.name}
          </h3>
          {project.type && (
            <span className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {project.type}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>

        {/* Optional Image */}
        {project.gambar && (
          <div className="relative w-full overflow-hidden rounded-xl aspect-video mb-4 shadow-sm group/img">
            <Image
              src={project.gambar}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-500 group-hover/img:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Technologies Pills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="rounded-full px-2.5 py-0.5 text-[11px] border-neutral-300/70 dark:border-neutral-700/70 bg-neutral-100/50 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge
                variant="secondary"
                className="rounded-full px-2 py-0.5 text-[10px] opacity-70"
              >
                +{project.technologies.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="relative z-10 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-wrap items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1.5 flex-wrap">
          {project.url && (
            <Link href={project.url} target="_blank" rel="noopener noreferrer">
              <Badge variant="default" className="rounded-full flex gap-1 px-2.5 py-1 text-xs transition-all hover:scale-105">
                <Globe size={12} />
                Demo
                <ExternalLink size={10} className="opacity-70" />
              </Badge>
            </Link>
          )}
          {project.code && (
            <Link href={project.code} target="_blank" rel="noopener noreferrer">
              <Badge variant="outline" className="rounded-full flex gap-1 px-2.5 py-1 text-xs transition-all hover:scale-105 hover:bg-accent">
                <Github size={12} />
                Code
                <ExternalLink size={10} className="opacity-70" />
              </Badge>
            </Link>
          )}
          {project.document && (
            <Link href={project.document} target="_blank" rel="noopener noreferrer">
              <Badge variant="secondary" className="rounded-full flex gap-1 px-2.5 py-1 text-xs transition-all hover:scale-105">
                <File size={12} />
                Docs
              </Badge>
            </Link>
          )}
        </div>

        {project.code && (
          <button
            type="button"
            onClick={handleCopyClone}
            title="Copy git clone command"
            className="inline-flex items-center gap-1 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-800/70 px-2.5 py-1 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 transition-all hover:scale-105 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={11} className="text-emerald-500" />
                <span className="text-emerald-500 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={11} className="opacity-70" />
                <span>Clone</span>
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
