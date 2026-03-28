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
