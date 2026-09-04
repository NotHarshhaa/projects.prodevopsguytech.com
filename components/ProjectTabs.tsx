"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/components/ui/tabs";
import ProjectAccordion from "./ProjectAccordion";
import ProjectCardGrid from "./ProjectCardGrid";
import allProjects from "@/data/project.json";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, LayoutGrid, List, SlidersHorizontal, Sparkles, RotateCcw } from "lucide-react";
import { Badge } from "@/components/components/ui/badge";

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05 }
};

const POPULAR_TECHS = [
  "All",
  "Terraform",
  "Kubernetes",
  "AWS",
  "Docker",
  "CI/CD",
  "GitHub Actions",
  "Security"
];

export default function ProjectTabs() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [viewMode, setViewMode] = useState<'accordion' | 'grid'>('accordion');
  const [sortBy, setSortBy] = useState<'newest' | 'alphabetical'>('newest');

  // Group projects and tab categories
  const tabTypes = useMemo(() => {
    const types = new Set(allProjects.map((p) => p.type).filter(Boolean));
    return ["All", ...Array.from(types)];
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...allProjects];

    // 1. Tab category filter
    if (activeTab !== "All") {
      result = result.filter(
        (p) => p.type?.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // 2. Tech stack filter
    if (selectedTech !== "All") {
      result = result.filter((p) =>
        p.technologies?.some(
          (t) => t.toLowerCase() === selectedTech.toLowerCase()
        )
      );
    }

    // 3. Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 4. Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeTab, selectedTech, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setActiveTab("All");
    setSelectedTech("All");
    setSearchQuery("");
  };

  const isFiltered = activeTab !== "All" || selectedTech !== "All" || searchQuery.trim() !== "";

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Category Tabs */}
      <div className="flex justify-center w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="relative flex flex-wrap justify-center gap-2 sm:gap-4 bg-transparent border-0 p-0 h-auto w-auto">
            {tabTypes.map((type, index) => (
              <motion.div
                key={type}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
              >
                <TabsTrigger
                  value={type}
                  className="relative rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 px-6 sm:px-8 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-neutral-600 dark:text-neutral-400 backdrop-blur-md transition-all duration-300 hover:bg-white dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 shadow-sm hover:shadow data-[state=active]:border-blue-500/50 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-600 dark:data-[state=active]:border-blue-500/50 dark:data-[state=active]:bg-blue-500/10 dark:data-[state=active]:text-blue-400 data-active:border-blue-500/50 data-active:bg-blue-500/10 data-active:text-blue-600 dark:data-active:border-blue-500/50 dark:data-active:bg-blue-500/10 dark:data-active:text-blue-400 min-w-[80px] sm:min-w-[100px]"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Search & Toolbar Bar */}
      <div className="relative rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/70 p-3 sm:p-4 backdrop-blur-xl shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search DevOps projects, IaC, Kubernetes, tools..."
              className="w-full rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/80 pl-10 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                title="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Controls: Sort & View Mode */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <SlidersHorizontal size={14} className="opacity-70" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'alphabetical')}
                className="rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/80 px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="alphabetical">Name (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle: Accordion vs Grid */}
            <div className="inline-flex items-center rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/70 dark:bg-neutral-800/70 p-1 gap-1">
              <button
                type="button"
                onClick={() => setViewMode('accordion')}
                title="Accordion View"
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  viewMode === 'accordion'
                    ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-foreground'
                }`}
              >
                <List size={14} />
                <span className="hidden xs:inline sm:inline">Details</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title="Bento Grid View"
                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-foreground'
                }`}
              >
                <LayoutGrid size={14} />
                <span className="hidden xs:inline sm:inline">Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Popular Tech Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-semibold text-muted-foreground mr-1 flex items-center gap-1">
            <Sparkles size={11} className="text-blue-500" />
            Filter by Tech:
          </span>
          {POPULAR_TECHS.map((tech) => {
            const isSelected = selectedTech.toLowerCase() === tech.toLowerCase();
            return (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`rounded-full px-3 py-0.5 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 scale-105"
                    : "border border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-foreground"
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-neutral-200/50 dark:border-neutral-800/50">
          <span>
            Showing <strong className="text-foreground">{filteredProjects.length}</strong> of{" "}
            <strong className="text-foreground">{allProjects.length}</strong> projects
          </span>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
            >
              <RotateCcw size={11} />
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Projects Presentation */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          /* Empty State */
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-8 sm:p-12 text-center bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm"
          >
            <div className="mx-auto size-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
              <Search size={22} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">No matching projects found</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4 leading-relaxed">
              We couldn't find any projects matching your current search or technology filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs font-medium hover:bg-primary/90 transition-all shadow-sm"
            >
              <RotateCcw size={13} />
              Clear all filters
            </button>
          </motion.div>
        ) : viewMode === 'accordion' ? (
          /* Accordion View */
          <motion.div
            key="accordion-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 sm:space-y-4"
          >
            {filteredProjects.map((project) => (
              <div key={project.slug}>
                <ProjectAccordion project={project} />
              </div>
            ))}
          </motion.div>
        ) : (
          /* Bento Grid View */
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredProjects.map((project) => (
              <div key={project.slug}>
                <ProjectCardGrid project={project} />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
