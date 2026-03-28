import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { getGitHubRepoUrl, siteConfig } from "./config";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="group inline-flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-80">
          <Image
            src={siteConfig.assets.logo}
            alt=""
            aria-hidden="true"
            width={22}
            height={22}
            loading="eager"
            priority
            className="h-auto w-auto shrink-0 transition-transform duration-200 ease-out group-hover:scale-110"
          />
          <span className="text-sm font-semibold tracking-tight">
            {siteConfig.seo.siteTitle}
          </span>
        </span>
      ),
    },
    githubUrl: getGitHubRepoUrl(),
  };
}
