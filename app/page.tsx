"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";
import { allBlogs } from "contentlayer/generated";
import allProjects from "@/data/project.json";
import { PulsatingButton } from "@/components/components/ui/pulsating-button";
import Typewriter from "typewriter-effect";
import { Button } from "@/components/components/ui/button";
import { Badge } from "@/components/components/ui/badge";
import { motion } from "framer-motion";
import Tag from "@/components/Tag";
import { formatDate } from "../lib/utils";
import siteMetadata from "@/data/siteMetadata";
import {
  ArrowRight,
  Terminal,
  Cloud,
  Cpu,
  ShieldCheck,
  GitBranch,
  Sparkles,
  BookOpen,
  ExternalLink,
  Github,
  Check,
  Copy,
  Calendar,
  Layers,
  Rocket
} from "lucide-react";

const MAX_POSTS = 3;
const FEATURED_PROJECTS = allProjects.slice(0, 3);

const TECH_ECOSYSTEM = [
  { name: "AWS", category: "Cloud" },
  { name: "Terraform", category: "IaC" },
  { name: "Kubernetes", category: "Containers" },
  { name: "Docker", category: "Containers" },
  { name: "GitHub Actions", category: "CI/CD" },
  { name: "ArgoCD", category: "GitOps" },
  { name: "Prometheus", category: "Observability" },
  { name: "Grafana", category: "Observability" },
  { name: "Python", category: "Scripting" },
  { name: "Linux", category: "OS" },
];

const PILLARS = [
  {
    icon: Cloud,
    title: "Cloud Infrastructure & IaC",
    description: "Production-grade Terraform modules, AWS multi-tier architecture, and automated cloud deployments.",
    color: "from-blue-500/20 to-cyan-500/20",
    badge: "Terraform & AWS",
  },
  {
    icon: Cpu,
    title: "Kubernetes & Containers",
    description: "Multi-node EKS cluster setups, Docker containerization, Helm charts, and microservices orchestration.",
    color: "from-purple-500/20 to-indigo-500/20",
    badge: "EKS & Docker",
  },
  {
    icon: GitBranch,
    title: "CI/CD & GitOps Pipelines",
    description: "End-to-end automated pipelines using GitHub Actions, continuous delivery, and zero-downtime releases.",
    color: "from-emerald-500/20 to-teal-500/20",
    badge: "Automation",
  },
  {
    icon: ShieldCheck,
    title: "DevSecOps & Compliance",
    description: "Trivy container scanning, automated security vulnerability assessments, and secure IAM policies.",
    color: "from-rose-500/20 to-orange-500/20",
    badge: "Security",
  },
];

export default function Page() {
  const [startAnimation, setStartAnimation] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  const posts = allCoreContent(sortPosts(allBlogs));
  const displayedPosts = posts.slice(0, MAX_POSTS);

  const handleCopyClone = (e: React.MouseEvent, codeUrl: string, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`git clone ${codeUrl}.git`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 pb-8 sm:pb-12">
        {/* Background Gradients */}
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[450px] w-[600px] rounded-full bg-gradient-to-tr from-blue-500/15 via-purple-500/15 to-pink-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/4 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-2xl" />
        </div>

        <div className="relative flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
          {/* Status Pill */}
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-5 sm:mb-6"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-foreground backdrop-blur-md transition-all hover:border-blue-500/40 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>16+ Real-Time DevOps & Cloud Projects</span>
              <ArrowRight size={13} className="text-blue-500 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-4 sm:mb-6"
          >
            Master Real-World{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Cloud DevOps
            </span>{" "}
            Engineering
          </motion.h1>

          {/* Animated Typewriter Sub-header */}
          {startAnimation && (
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 sm:mb-8 text-lg sm:text-2xl font-medium text-muted-foreground"
            >
              <Typewriter
                options={{
                  strings: [
                    "Production Kubernetes & AWS Architecture",
                    "Automated CI/CD Pipelines with GitHub Actions",
                    "Modular Infrastructure as Code with Terraform",
                    "Hands-on DevSecOps & Security Automation"
                  ],
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-semibold",
                  cursorClassName: "text-purple-500 dark:text-purple-400",
                  delay: 45,
                  deleteSpeed: 25,
                }}
              />
            </motion.div>
          )}

          {/* Hero Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8 sm:mb-10"
          >
            Explore end-to-end production pipelines, hands-on infrastructure as code, and practical Kubernetes tutorials built for modern cloud engineers.
          </motion.p>

          {/* Call-to-Actions */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <PulsatingButton className="rounded-2xl">
              <Link href="/projects" className="px-6 py-2.5 flex items-center gap-2 font-medium">
                <Rocket size={16} />
                Explore Projects
              </Link>
            </PulsatingButton>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-2xl border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <Link href="/blog" className="flex items-center gap-2">
                <BookOpen size={16} className="text-blue-500" />
                Read DevOps Guides
              </Link>
            </Button>
          </motion.div>

          {/* Tech Ecosystem Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 sm:mt-16 w-full pt-8 border-t border-neutral-200/60 dark:border-neutral-800/60"
          >
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
              Powering Modern Cloud Architectures
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {TECH_ECOSYSTEM.map((tech) => (
                <span
                  key={tech.name}
                  className="rounded-full border border-neutral-200/70 dark:border-neutral-800/70 bg-white/60 dark:bg-neutral-900/60 px-3.5 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-sm transition-all hover:scale-105 hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION: DEVOPS PILLARS BENTO GRID */}
      <section className="relative max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <Badge variant="outline" className="rounded-full mb-3 px-3 py-1 text-xs border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5">
            Core Competencies
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
            Architected for Scalability & Reliability
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Every project and guide is created with industry production standards, security best practices, and clean automated design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Ambient Corner Light */}
                <div className={`pointer-events-none absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${pillar.color} rounded-full blur-2xl transform group-hover:scale-125 transition-transform duration-500`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <Badge variant="secondary" className="rounded-full text-[11px] px-2.5 py-0.5 font-medium">
                      {pillar.badge}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section className="relative max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10 pb-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div>
            <Badge variant="outline" className="rounded-full mb-2 px-3 py-1 text-xs border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/5">
              Production Showcase
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Featured DevOps Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View all 16 projects</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {FEATURED_PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/90 dark:bg-neutral-900/90 p-5 sm:p-6 shadow-sm hover:shadow-xl backdrop-blur-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {proj.name}
                  </h3>
                  <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
                    {proj.type || "Personal"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="rounded-full px-2.5 py-0.5 text-[11px]">
                      {tech}
                    </Badge>
                  ))}
                  {proj.technologies.length > 3 && (
                    <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-[10px]">
                      +{proj.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between gap-2">
                <Link
                  href={proj.code || "https://github.com/NotHarshhaa"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <Github size={13} />
                  <span>GitHub</span>
                  <ExternalLink size={10} className="opacity-60" />
                </Link>

                {proj.code && (
                  <button
                    type="button"
                    onClick={(e) => handleCopyClone(e, proj.code!, proj.slug)}
                    title="Copy git clone"
                    className="inline-flex items-center gap-1 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-800/70 px-2.5 py-1 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all cursor-pointer"
                  >
                    {copiedSlug === proj.slug ? (
                      <>
                        <Check size={11} className="text-emerald-500" />
                        <span className="text-emerald-500 font-semibold">Copied!</span>
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
          ))}
        </div>
      </section>

      {/* 4. LATEST ARTICLES & TUTORIALS */}
      <section className="relative max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10 pb-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div>
            <Badge variant="outline" className="rounded-full mb-2 px-3 py-1 text-xs border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">
              Knowledge Base
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Latest Guides & Tutorials
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View all articles</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {displayedPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ x: 4 }}
              className="group relative rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 p-5 sm:p-7 backdrop-blur-xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time dateTime={post.date} className="inline-flex items-center gap-1 font-medium">
                      <Calendar size={12} className="text-blue-500" />
                      {formatDate(post.date)}
                    </time>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block group/title">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover/title:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags?.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>

                <div className="shrink-0 self-start md:self-center">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50 dark:bg-neutral-800/60 px-4 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                  >
                    <span>Read Guide</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 5. COMMUNITY CTA SECTION */}
      <section className="relative max-w-6xl mx-auto px-4 pb-12">
        <div className="relative rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 p-8 sm:p-12 text-center backdrop-blur-2xl overflow-hidden shadow-lg">
          <div className="pointer-events-none absolute -top-24 -left-24 size-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex size-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white items-center justify-center shadow-md mb-2">
              <Sparkles size={26} />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Join the ProDevOpsGuy Community
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Connect with fellow engineers, star our open-source repositories on GitHub, and stay ahead with real-world DevOps practices.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-2xl shadow-md">
                <Link href={siteMetadata.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github size={16} />
                  Star on GitHub
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
                <Link href="/about" className="flex items-center gap-2">
                  <span>About ProDevOpsGuy</span>
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}