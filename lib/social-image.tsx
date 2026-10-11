import { readFileSync } from "node:fs";
import { join } from "node:path";
import { siteConfig } from "@/lib/config";

const brandMark = `data:image/svg+xml;base64,${readFileSync(
  join(process.cwd(), "public", siteConfig.assets.logo.slice(1)),
).toString("base64")}`;

type SocialImageProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function SocialImage({
  eyebrow = "Documentation",
  title,
  description,
}: SocialImageProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 32,
        background: siteConfig.seo.backgroundColor,
        color: "#171916",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid rgba(23, 25, 22, 0.09)",
          borderTop: "6px solid #aec3a3",
          borderRadius: 24,
          background: "#ffffff",
          padding: "36px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#000000",
            }}
          >
            <span>EVER</span>
            {/* biome-ignore lint/performance/noImgElement: Social image renderers require a native image element. */}
            <img src={brandMark} alt="" width={54} height={58} />
            <span>STRAT</span>
          </div>
          <div
            style={{
              display: "flex",
              borderRadius: 999,
              padding: "12px 20px",
              background: "#aaff92",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 52 : title.length > 35 ? 60 : 72,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#696d65",
              maxWidth: 920,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            paddingTop: 20,
            borderTop: "1px solid rgba(23, 25, 22, 0.09)",
            fontSize: 20,
            color: "#696d65",
          }}
        >
          {siteConfig.seo.siteTitle}
        </div>
      </div>
    </div>
  );
}
