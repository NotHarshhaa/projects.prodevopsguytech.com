import { Button } from "@/components/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/components/ui/dialog";
import siteMetadata from "@/data/siteMetadata";
import { Youtube, Linkedin, Github, Twitter, Mail } from "lucide-react";

export function SocialMediaDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">Connect With Me</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Social & Community</DialogTitle>
          <DialogDescription>
            Connect with me across platforms, explore open-source projects, and stay updated.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {siteMetadata.github && (
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => window.open(siteMetadata.github, "_blank", "noopener,noreferrer")}
            >
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          )}

          {siteMetadata.linkedin && (
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => window.open(siteMetadata.linkedin, "_blank", "noopener,noreferrer")}
            >
              <Linkedin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              LinkedIn
            </Button>
          )}

          {siteMetadata.youtube && (
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => window.open(siteMetadata.youtube, "_blank", "noopener,noreferrer")}
            >
              <Youtube className="h-4 w-4 text-red-600 dark:text-red-400" />
              YouTube
            </Button>
          )}

          {siteMetadata.x && (
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => window.open(siteMetadata.x, "_blank", "noopener,noreferrer")}
            >
              <Twitter className="h-4 w-4 text-sky-500" />
              X (Twitter)
            </Button>
          )}

          {siteMetadata.email && (
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => window.location.href = `mailto:${siteMetadata.email}`}
            >
              <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Email
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}