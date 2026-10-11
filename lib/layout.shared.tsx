import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { AppWindow, Globe } from "lucide-react";
import { EverstratLogo } from "@/components/everstrat-logo";
import { getGitHubOrganizationUrl, siteConfig } from "./config";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <EverstratLogo />,
    },
    links: [
      {
        type: "icon",
        label: "Everstrat website",
        text: "Everstrat website",
        url: siteConfig.links.website,
        external: true,
        on: "menu",
        icon: (
          <span title="Everstrat website" className="inline-flex">
            <Globe aria-hidden="true" />
          </span>
        ),
      },
      {
        type: "icon",
        label: "Open Everstrat app",
        text: "Open Everstrat app",
        url: siteConfig.links.app,
        external: true,
        on: "menu",
        icon: (
          <span title="Open Everstrat app" className="inline-flex">
            <AppWindow aria-hidden="true" />
          </span>
        ),
      },
    ],
    githubUrl: getGitHubOrganizationUrl(),
  };
}
