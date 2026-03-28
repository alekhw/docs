import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";
import { SocialImage } from "@/lib/social-image";

export const alt = siteConfig.seo.defaultSocialImageAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <SocialImage
      eyebrow={siteConfig.seo.siteTitle}
      title={siteConfig.name}
      description={siteConfig.description}
    />,
    size,
  );
}
