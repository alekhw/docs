import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { type NextRequest, NextResponse } from "next/server";
import { siteConfig } from "./lib/config";

const { rewrite: rewriteDocs } = rewritePath(
  `${siteConfig.routes.docs}{/*path}`,
  `${siteConfig.routes.docsContent}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${siteConfig.routes.docs}{/*path}.mdx`,
  `${siteConfig.routes.docsContent}{/*path}/content.md`,
);

export default function proxy(request: NextRequest) {
  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/search|llms\\.mdx|llms\\.txt|llms-full\\.txt|og/docs|opengraph-image|twitter-image|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|favicon\\.ico|apple-touch-icon(?:-precomposed)?\\.png|favicon-(?:16x16|32x32)\\.png|icon-(?:192|512)\\.png|_next).*)",
  ],
};
