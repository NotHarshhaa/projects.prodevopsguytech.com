"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";
import { allBlogs } from "contentlayer/generated";
import ListLayoutSimple from "@/layouts/BlogComponent";
import { PulsatingButton } from "@/components/components/ui/pulsating-button";
import Typewriter from "typewriter-effect";
import { Button } from "@/components/components/ui/button";

const MAX_POSTS = 3; // Batasi jumlah postingan yang ditampilkan

export default function Page() {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Mulai animasi segera setelah komponen dimuat
    setStartAnimation(true);
  }, []);

  // Ambil dan urutkan postingan
  const posts = allCoreContent(sortPosts(allBlogs));
  const displayedPosts = posts.slice(0, MAX_POSTS); // Ambil 3 postingan terbaru

  return (
    <div>
      {/* Bagian Hero */}
      <div className="h-[calc(100vh-14rem)] flex flex-col justify-center items-center">
        <Button variant="outline" className="rounded-full mb-6">
          <Link href="/projects">
          Explore More DevOps Resources
          </Link>
        </Button>
        <h1 className="mb-2 text-5xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-center">
          ProDevOpsGuy Tech Community
        </h1>
        {startAnimation && (
          <div className="text-center py-2 mb-4">
            <Typewriter
              options={{
                strings: [
                  "Cloud DevOps Engineer",
                  "Content Creator/Blogger",
                  "Automation Expert"
                ],
                autoStart: true,
                loop: true,
                wrapperClassName: "text-xl sm:text-2xl font-medium",
                cursorClassName: "text-blue-500 dark:text-blue-500",
                delay: 50, // Kecepatan pengetikan
                deleteSpeed: 20, // Kecepatan penghapusan
              }}
            />
          </div>
        )}
        {/* <p className="mx-auto max-w-sm sm:max-w-md mb-4 text-center font-medium sm:text-xl">
          I was a Data Science student at the number 1 best Polytechnic in Southeast Asia.
        </p> */}
        <div className="flex justify-center">
          <PulsatingButton>
            <Link href="/blog">Explore All Projects</Link>
          </PulsatingButton>
        </div>
      </div>

        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tighter text-center sm:text-left mt-8">
          Latest DevOps Projects
        </h2>
        <ListLayoutSimple posts={displayedPosts} title="" />
      </div>
  );
}