import { genPageMetadata } from 'app/seo'
import ProjectTabs from '@/components/ProjectTabs'

export const metadata = genPageMetadata({ title: 'Projects & Resources' })

export default function ProjectsAndResourcesPage() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Projects & Resources
            </span>
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Explore our curated repository of DevOps workshops, infrastructure automation templates, and hands-on guides. All these projects are live and open-sourced for you to explore and build upon.
          </p>
        </div>
      </div>
      <ProjectTabs />
    </>
  )
}
