import { siteConfig } from "@/lib/config";

type SocialImageProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function SocialImage({
  eyebrow = `${siteConfig.brandName} Documentation`,
  title,
  description,
}: SocialImageProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top left, rgba(201, 177, 153, 0.24), transparent 32%), linear-gradient(135deg, #0f0f0f 0%, #151515 42%, #211b19 100%)",
        color: "#f6f1eb",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 36,
          borderRadius: 36,
          border: "1px solid rgba(255, 255, 255, 0.14)",
          background: "rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 18px",
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            fontSize: 24,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(246, 241, 235, 0.8)",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#d7b38a",
              boxShadow: "0 0 24px rgba(215, 179, 138, 0.7)",
            }}
          />
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.04,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: "rgba(246, 241, 235, 0.74)",
              maxWidth: 840,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "rgba(246, 241, 235, 0.72)",
          }}
        >
          <div>{siteConfig.seo.siteTitle}</div>
          <div>{siteConfig.projectName}</div>
        </div>
      </div>
    </div>
  );
}
