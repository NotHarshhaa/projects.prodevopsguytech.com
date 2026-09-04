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
        className="group relative rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-900 shadow-xs hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-colors duration-200 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_96px]"
      >
        <div className="relative z-10 p-4 sm:p-5">
          <AccordionTrigger
            hideChevron
            className="flex flex-1 items-start justify-between gap-4 p-0 text-left hover:no-underline cursor-pointer group/trigger"
          >
            <div className="flex flex-col space-y-1.5 pr-2">
              <span className="relative inline-flex text-base sm:text-lg font-bold md:text-xl text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.name}
              </span>
              {project.description && (
                <span className="text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed line-clamp-2">
                  {project.description}
                </span>
              )}
            </div>

            {/* Circular Rotating Plus Button */}
            <div className="relative size-8 shrink-0 mt-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-800/80 flex items-center justify-center transition-colors group-hover/trigger:border-blue-400 group-hover/trigger:bg-blue-50 dark:group-hover/trigger:bg-blue-950/40">
              <Plus
                size={15}
                strokeWidth={2}
                className="text-neutral-600 dark:text-neutral-400 transition-transform duration-300 group-hover/trigger:text-blue-600 dark:group-hover/trigger:text-blue-400 group-aria-expanded/accordion-trigger:rotate-45"
                aria-hidden="true"
              />
            </div>
          </AccordionTrigger>

          {/* Quick Action Badges */}
          <div className="flex flex-row flex-wrap items-center gap-2 pt-3">
            {project.url && (
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <Badge variant="default" className="rounded-full flex gap-1.5 px-3 py-1 text-xs transition-transform hover:scale-105">
                  <Globe aria-hidden="true" size={12} />
                  <span>Demo</span>
                  <ExternalLink size={10} className="opacity-70" />
                </Badge>
              </Link>
            )}
            {project.code && (
              <>
                <Link href={project.code} target="_blank" rel="noopener noreferrer">
                  <Badge variant="outline" className="rounded-full flex gap-1.5 px-3 py-1 text-xs transition-transform hover:scale-105 hover:bg-accent">
                    <Github aria-hidden="true" size={12} />
                    <span>Code</span>
                    <ExternalLink size={10} className="opacity-70" />
                  </Badge>
                </Link>
                <button
                  type="button"
                  onClick={handleCopyClone}
                  title="Copy git clone command"
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-800/70 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300 transition-transform hover:scale-105 hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-500" />
                      <span className="text-emerald-500 font-semibold text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} className="opacity-70" />
                      <span className="text-[11px]">git clone</span>
                    </>
                  )}
                </button>
              </>
            )}
            {project.document && (
              <Link href={project.document} target="_blank" rel="noopener noreferrer">
                <Badge variant="secondary" className="rounded-full flex gap-1.5 px-3 py-1 text-xs transition-transform hover:scale-105">
                  <File aria-hidden="true" size={12} />
                  <span>Docs</span>
                  <ExternalLink size={10} className="opacity-70" />
                </Badge>
              </Link>
            )}
          </div>

          <AccordionContent className="pt-3 pb-0">
            <div className="flex flex-col gap-6 md:flex-row pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
              {project.gambar && (
                <div className="relative w-full overflow-hidden rounded-xl md:w-1/2 aspect-video shadow-sm">
                  <Image
                    src={project.gambar}
                    alt={project.name}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className={`w-full ${project.gambar ? 'md:w-1/2' : 'md:w-full'} flex flex-col justify-between space-y-4`}>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="rounded-full px-2.5 py-0.5 text-xs border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-800/50"
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