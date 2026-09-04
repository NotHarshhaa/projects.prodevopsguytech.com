'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/components/ui/accordion";
import { File, Github, Globe, Plus, ExternalLink, Copy, Check } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/components/ui/badge";
import Link from "next/link";
import { useState } from "react";

interface Project {
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
}

export default function ProjectAccordion({ project }: { project: Project }) {
  const [copied, setCopied] = useState(false);

  const handleCopyClone = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project.code) return;
    const cloneCmd = `git clone ${project.code}.git`;
    navigator.clipboard.writeText(cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value={project.slug}
        key={project.slug}
        className="group relative transform transition-all duration-500 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/90 dark:bg-neutral-900/90 shadow-sm hover:shadow-xl backdrop-blur-xl overflow-hidden"
      >
        {/* Ambient Gradient Glow */}
        <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500" />

        {/* Decorative Corner Glows */}
        <div className="pointer-events-none absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transform group-hover:translate-x-6 transition-transform duration-700" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-2xl transform group-hover:-translate-x-4 transition-transform duration-700" />

        <div className="relative z-10 p-4 sm:p-6">
          <AccordionTrigger
            hideChevron
            className="flex flex-1 items-start justify-between gap-4 p-0 text-left hover:no-underline cursor-pointer group/trigger"
          >
            <div className="flex flex-col space-y-2 pr-2">
              <span className="relative inline-flex text-lg sm:text-xl font-bold md:text-2xl text-foreground group-hover:text-primary transition-colors">
                {project.name}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
              </span>
              {project.description && (
                <span className="text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed">
                  {project.description}
                </span>
              )}
            </div>

            {/* Glowing Circular Rotating Plus / Close Button */}
            <div className="relative h-8 w-8 shrink-0 mt-0.5">
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 transition-transform duration-300 group-hover/trigger:scale-110 shadow-lg shadow-blue-500/10 backdrop-blur-sm border border-blue-200/20 dark:border-blue-700/20" />
              <Plus
                size={16}
                strokeWidth={2}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-blue-600 dark:text-blue-400 opacity-70 transition-all duration-300 group-hover/trigger:rotate-180 group-hover/trigger:opacity-100 group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:text-blue-500"
                aria-hidden="true"
              />
            </div>
          </AccordionTrigger>

          {/* Quick Action Badges - Outside button trigger to avoid <a> in <button> */}
          <div className="flex flex-row flex-wrap items-center gap-2 pt-3">
            {project.url && (
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <Badge variant="default" className="rounded-full flex gap-1.5 px-3 py-1 text-xs transition-all hover:scale-105 hover:shadow-sm">
                  <Globe aria-hidden="true" size={13} />
                  Website
                  <ExternalLink size={11} className="opacity-70" />
                </Badge>
              </Link>
            )}
            {project.code && (
              <>
                <Link href={project.code} target="_blank" rel="noopener noreferrer">
                  <Badge variant="outline" className="rounded-full flex gap-1.5 px-3 py-1 text-xs transition-all hover:scale-105 hover:bg-accent">
                    <Github aria-hidden="true" size={13} />
                    Code
                    <ExternalLink size={11} className="opacity-70" />
                  </Badge>
                </Link>
                <button
                  type="button"
                  onClick={handleCopyClone}
                  title="Copy git clone command"
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-800/70 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300 transition-all hover:scale-105 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-500" />
                      <span className="text-emerald-500 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} className="opacity-70" />
                      <span>git clone</span>
                    </>
                  )}
                </button>
              </>
            )}
            {project.document && (
              <Link href={project.document} target="_blank" rel="noopener noreferrer">
                <Badge variant="secondary" className="rounded-full flex gap-1.5 px-3 py-1 text-xs transition-all hover:scale-105">
                  <File aria-hidden="true" size={13} />
                  Documentation
                  <ExternalLink size={11} className="opacity-70" />
                </Badge>
              </Link>
            )}
          </div>

          <AccordionContent className="pt-4 pb-0">
            <div className="flex flex-col gap-6 md:flex-row pt-4 border-t border-border/60">
              {project.gambar && (
                <div className="relative w-full overflow-hidden rounded-xl md:w-1/2 group/img aspect-video shadow-md">
                  <Image
                    src={project.gambar}
                    alt={project.name}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              <div className={`w-full ${project.gambar ? 'md:w-1/2' : 'md:w-full'} flex flex-col justify-between space-y-4`}>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="rounded-full px-3 py-1 text-xs border-neutral-300/80 dark:border-neutral-700/80 bg-neutral-100/50 dark:bg-neutral-800/50 transition-colors hover:bg-primary/10 hover:border-primary/40 hover:text-primary"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {project.publishedAt && (
                  <div className="text-xs text-muted-foreground">
                    Published on {new Date(project.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
}