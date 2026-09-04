'use client';

import { Accordion, AccordionContent, AccordionItem } from "@/components/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { File, Github, Globe, Plus } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

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
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={project.slug} key={project.slug} className="group relative transform transition-all duration-500">
        {/* Background Effects */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
        {/* Header container */}
        <div className="relative flex flex-col sm:flex-row items-start justify-between rounded-xl border border-gray-200/20 dark:border-gray-700/20 bg-white/90 dark:bg-gray-900/90 p-4 sm:p-6 text-left backdrop-blur-xl transition-all hover:bg-white/95 dark:hover:bg-gray-900/95 shadow-sm hover:shadow-md overflow-hidden">
          {/* Decorative Elements */}
          <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transform group-hover:translate-x-10 transition-transform duration-700" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-2xl transform group-hover:-translate-x-8 transition-transform duration-700" />
          
          <div className="relative z-10 flex flex-1 flex-col space-y-3 pr-4">
            <AccordionPrimitive.Header className="w-full">
              <AccordionPrimitive.Trigger className="w-full text-left flex items-start justify-between group/trigger">
                <motion.span 
                  className="relative inline-flex text-lg sm:text-xl font-semibold md:text-2xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {project.name}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover/trigger:w-full" />
                </motion.span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            
            {project.description && (
              <motion.p 
                className="text-xs sm:text-sm font-normal text-neutral-600 dark:text-neutral-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {project.description}
              </motion.p>
            )}
            
            <motion.div 
              className="flex flex-row flex-wrap items-start gap-1.5 sm:gap-2 z-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {project.url && (
                <Link href={project.url} target="_blank" rel="noopener noreferrer">
                  <Badge variant="default" className="rounded-full flex gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] transition-transform hover:scale-105">
                    <Globe aria-hidden="true" size={14} />
                    Website
                  </Badge>
                </Link>
              )}
              {project.code && (
                <Link href={project.code} target="_blank" rel="noopener noreferrer">
                  <Badge variant="outline" className="rounded-full flex gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] transition-transform hover:scale-105">
                    <Github aria-hidden="true" size={14} />
                    Code
                  </Badge>
                </Link>
              )}
              {project.document && (
                <Link href={project.document} target="_blank" rel="noopener noreferrer">
                  <Badge variant="secondary" className="rounded-full flex gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] transition-transform hover:scale-105">
                    <File aria-hidden="true" size={14} />
                    Documentation
                  </Badge>
                </Link>
              )}
            </motion.div>
          </div>
          
          <div className="relative z-10 self-start sm:self-center mt-2 sm:mt-0">
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="relative h-8 w-8 rounded-full focus:outline-none" aria-label="Toggle details">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-blue-500/10 backdrop-blur-sm border border-blue-200/20 dark:border-blue-700/20" />
                <Plus
                  size={16}
                  strokeWidth={2}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-blue-600 dark:text-blue-300 opacity-60 transition-all duration-300 group-hover:rotate-180 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
          </div>
        </div>
        
        <AccordionContent className="overflow-hidden">
          <motion.div 
            className="relative rounded-xl border border-gray-200/20 dark:border-gray-700/20 bg-white/90 dark:bg-gray-900/90 p-4 sm:p-6 backdrop-blur-xl shadow-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4 sm:gap-6 md:flex-row">
              {project.gambar && (
                <motion.div 
                  className="relative w-full overflow-hidden rounded-lg md:w-1/2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Image
                    src={project.gambar}
                    alt={project.name}
                    width={500}
                    height={300}
                    className="transform object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              )}

              <motion.div 
                className={`w-full ${project.gambar ? 'md:w-1/2' : 'md:w-full'}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h4 className="mb-4 font-semibold text-neutral-900 dark:text-neutral-100">Tech stack:</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                    >
                      <Badge variant="outline" className="rounded-full px-2 sm:px-3 py-1 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}