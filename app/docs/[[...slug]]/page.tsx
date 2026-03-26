import { redirect } from "next/navigation";

type RedirectPageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function LegacyDocsRedirect(props: RedirectPageProps) {
  const { slug } = await props.params;
  const pathname = slug && slug.length > 0 ? `/${slug.join("/")}` : "/";

  redirect(pathname);
}
