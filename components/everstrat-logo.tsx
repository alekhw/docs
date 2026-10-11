import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function EverstratLogo() {
  return (
    <span className="docs-brand">
      <span className="sr-only">Everstrat Docs home</span>
      <span aria-hidden="true" className="docs-brand-wordmark">
        <span>EVER</span>
        <Image
          src={siteConfig.assets.logo}
          alt=""
          width={27}
          height={29}
          loading="eager"
          sizes="27px"
          className="h-[29px] w-[27px] shrink-0 dark:invert"
        />
        <span>STRAT</span>
      </span>
      <span aria-hidden="true" className="docs-brand-label">
        Docs
      </span>
    </span>
  );
}
