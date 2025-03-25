import { getActiveStorePage } from "@/actions/page";
import { Metadata } from "next";
import { getActiveStore } from "@/actions/store";
import EditorContentParser from "@/components/editor-content-parser";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { Pen } from "lucide-react";
import PageBanner from "@/components/page-banner";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [pageResponse, storeResponse] = await Promise.all([getActiveStorePage(slug), getActiveStore()]);

  if (pageResponse.error || !pageResponse.data) {
    return {
      title: "Untitled Page",
      description: "We couldn't find any page that matches the br provided slug.",
    };
  }

  const TITLE = pageResponse.data.title;
  const DESCRIPTION = storeResponse.data?.store_meta_description || storeResponse.data?.store_name;
  const IMAGE = storeResponse.data?.store_meta_image || storeResponse.data?.store_logo || "";
  const BASE_URL = storeResponse.data?.custom_domain ? `https://${storeResponse.data?.custom_domain}` : `https://${storeResponse.data?.store_subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      images: [{ url: IMAGE }],
      url: `${BASE_URL}/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [{ url: IMAGE }],
      creator: "@fenzora",
    },
    icons: [{ rel: "icon", url: IMAGE }],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getActiveStorePage(slug);

  if (response.error || !response.data) {
    return (
      <CustomNotFound
        icon={<Pen className="h-6 w-6 text-muted-foreground" />}
        title="No page found"
        description="We couldn't find any page that matches the br provided slug."
        buttonText="Go Home"
        buttonLink="/"
      />
    );
  }

  return (
    <div>
      <PageBanner title={response.data.title} />
      <article className="container mx-auto px-4 md:px-24 min-h-screen mt-12  ">
        <EditorContentParser content={response.data.content || ""} />
      </article>
    </div>
  );
}
