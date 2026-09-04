"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/components/ui/tabs";
import ProjectAccordion from "./ProjectAccordion";
import allProjects from "@/data/project.json";
import { useMemo } from "react";
import { motion } from "framer-motion";

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05 }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

export default function ProjectTabs() {
  // Kelompokkan proyek berdasarkan type dan buat daftar tab, termasuk "All"
  const { groupedProjects, tabTypes } = useMemo(() => {
    const grouped = allProjects.reduce((acc, project) => {
      const { type } = project;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(project);
      return acc;
    }, {});

    // Tambahkan kategori "All" dengan semua proyek
    return {
      groupedProjects: {
        All: allProjects,
        ...grouped,
      },
      tabTypes: ["All", ...Object.keys(grouped)], // "All" diurutkan pertama
    };
  }, []);

  return (
    <Tabs defaultValue="All" className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative mb-4 sm:mb-6"
      >
        <div className="flex justify-center w-full">
          <TabsList className="relative flex flex-wrap justify-center gap-2 sm:gap-4 bg-transparent border-0 p-0 h-auto w-auto">
            {tabTypes.map((type, index) => (
              <motion.div
                key={type}
                variants={tabVariants}
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
        </div>
      </motion.div>

      {tabTypes.map((type) => (
        <TabsContent key={type} value={type} className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 sm:space-y-4"
          >
            {groupedProjects[type].map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
              >
                <ProjectAccordion project={project} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
