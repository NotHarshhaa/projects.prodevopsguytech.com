// app/providers.js
'use client'
import { PostHogProvider } from 'posthog-js/react'

// import posthog from 'posthog-js'

// if (typeof window !== 'undefined') {
//   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
//     api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
//     person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
//   })
// }
// export function CSPostHogProvider({ children }) {
//   return <PostHogProvider client={posthog}>{children}</PostHogProvider>
// }

export function CSPostHogProvider({ children }) {
  return <>{children}</>
}