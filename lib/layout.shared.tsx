import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BotIcon } from "lucide-react";
import Image from "next/image";
import { gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    links: [
      {
        icon: <BotIcon className="size-4" />,
        text: "LLMs Full",
        url: "/llms-full.txt",
        active: "none",
        secondary: false,
      },
    ],
    nav: {
      title: (
        <span className="group inline-flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-80">
          <Image
            src="/eve-logo-only.svg"
            alt=""
            aria-hidden="true"
            width={22}
            height={22}
            loading="eager"
            priority
            className="h-auto w-auto shrink-0 transition-transform duration-200 ease-out group-hover:scale-110"
          />
          <span className="text-sm font-semibold tracking-tight">
            Everstrat.xyz | Docs
          </span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
