'use client';

import { Authors, allAuthors } from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import AuthorLayout from '@/layouts/AuthorLayout';
import { coreContent } from 'pliny/utils/contentlayer';
import NumberTicker from '@/components/components/ui/number-ticker';
import { Badge } from '@/components/components/ui/badge';
import siteMetadata from '@/data/siteMetadata';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/components/ui/button';
import {
  Cloud,
  Layers,
  Cpu,
  GitBranch,
  Activity,
  ShieldCheck,
  Terminal,
  Award,
  Sparkles,
  ArrowRight,
  Download,
  Calendar,
  Rocket
} from 'lucide-react';

const ACHIEVEMENTS = [
  { label: "Production Projects", value: 50, suffix: "+", icon: Rocket },
  { label: "Certifications", value: 15, suffix: "+", icon: Award },
  { label: "Articles & Guides", value: 100, suffix: "+", icon: Terminal },
  { label: "Open Source Repos", value: 35, suffix: "+", icon: Sparkles },
];

const TECH_CATEGORIES = [
  {
    title: "Cloud Infrastructure",
    icon: Cloud,
    color: "text-blue-500 bg-blue-500/10",
    skills: ["AWS", "Azure", "GCP", "VPC", "EC2", "IAM", "S3"],
  },
  {
    title: "Infrastructure as Code",
    icon: Layers,
    color: "text-purple-500 bg-purple-500/10",
    skills: ["Terraform", "Terragrunt", "Ansible", "CloudFormation"],
  },
  {
    title: "Containers & Kubernetes",
    icon: Cpu,
    color: "text-cyan-500 bg-cyan-500/10",
    skills: ["Kubernetes", "EKS", "Docker", "Helm", "Kustomize"],
  },
  {
    title: "CI/CD & GitOps",
    icon: GitBranch,
    color: "text-emerald-500 bg-emerald-500/10",
    skills: ["GitHub Actions", "Jenkins", "ArgoCD", "GitLab CI"],
  },
  {
    title: "Observability & Metrics",
    icon: Activity,
    color: "text-amber-500 bg-amber-500/10",
    skills: ["Prometheus", "Grafana", "ELK Stack", "CloudWatch"],
  },
  {
    title: "DevSecOps & Security",
    icon: ShieldCheck,
    color: "text-rose-500 bg-rose-500/10",
    skills: ["Trivy", "SonarQube", "OWASP", "Secret Mgmt"],
  },
];

const MILESTONES = [
  {
    year: "2024 - Present",
    title: "Founder & Lead DevOps Engineer",
    description: "Creating open-source production projects, writing in-depth architecture guides, and mentoring engineers globally.",
  },
  {
    year: "2023 - 2024",
    title: "Senior Cloud & Automation Engineer",
    description: "Designed resilient AWS infrastructure, automated multi-region deployments with Terraform, and scaled EKS clusters.",
  },
  {
    year: "2022 - 2023",
    title: "DevOps & Kubernetes Specialist",
    description: "Implemented GitOps with ArgoCD, streamlined container builds, and standardized CI/CD across microservices.",
  },
];

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'prodevopsguy') as Authors;
  const mainContent = coreContent(author);

  return (
    <AuthorLayout content={mainContent}>
      <div className="space-y-12 sm:space-y-16">
        {/* MDX Biography */}
        <section className="prose dark:prose-invert max-w-none">
          <MDXLayoutRenderer code={author.body.code} />
        </section>

        {/* Achievements Counter Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Award className="text-blue-500 size-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Key Achievements & Impact
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {ACHIEVEMENTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/70 p-4 sm:p-5 text-center backdrop-blur-md shadow-sm hover:shadow transition-shadow"
                >
                  <div className="inline-flex size-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 items-center justify-center mb-2">
                    <Icon size={18} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-foreground flex items-center justify-center">
                    <NumberTicker value={item.value} />
                    <span>{item.suffix}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-medium">
                    {item.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Technical Expertise Bento Grid */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Cpu className="text-purple-500 size-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Technical Ecosystem & Tooling
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  className="rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 p-5 backdrop-blur-md shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className={`size-9 rounded-xl flex items-center justify-center ${cat.color}`}>
                      <Icon size={18} />
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-foreground">
                      {cat.title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="rounded-full px-2.5 py-0.5 text-xs border-neutral-300/80 dark:border-neutral-700/80 bg-neutral-100/60 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Career & Journey Timeline */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Calendar className="text-emerald-500 size-5" />
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Experience & Milestones
            </h3>
          </div>

          <div className="space-y-4">
            {MILESTONES.map((m, idx) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="relative pl-6 border-l-2 border-blue-500/40 dark:border-blue-500/30 py-1"
              >
                <div className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-blue-500 border-2 border-background" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {m.year}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-foreground mt-0.5">
                  {m.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                  {m.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-6 sm:p-8 text-center backdrop-blur-xl">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
            Ready to collaborate or discuss a cloud project?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-5 leading-relaxed">
            Feel free to connect via LinkedIn, check out our GitHub repositories, or send an email directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {siteMetadata.CVUrl && (
              <Button asChild className="rounded-2xl shadow-sm">
                <Link href={siteMetadata.CVUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Download size={14} />
                  <span>Download Resume</span>
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" className="rounded-2xl bg-white/80 dark:bg-neutral-950/80">
              <Link href="/projects" className="flex items-center gap-2">
                <span>View Projects</span>
                <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </AuthorLayout>
  );
}