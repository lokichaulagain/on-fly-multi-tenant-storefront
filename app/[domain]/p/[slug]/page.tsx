import { getActiveStorePage } from "@/actions/page";
import { NoPageFound } from "@/components/no-page-found";
import { Metadata } from "next";
import { getActiveStore } from "@/actions/store";
import { fallbackMetadata } from "@/constants/metadata";
import EditorContentParser from "@/components/editor-content-parser";

export async function generateMetadata(): Promise<Metadata> {
  const response = await getActiveStore();
  if (response.error || !response.data) {
    return fallbackMetadata;
  }

  return {
    title: response.data.store_name,
    description: response.data.store_description || `${response.data.store_description} - ${response.data.store_name}`,
    openGraph: {
      title: response.data.store_name,
      description: response.data.store_description || `${response.data.store_description} - ${response.data.store_name}`,
      images: response.data.store_meta_image ? [{ url: response.data.store_meta_image }] : [{ url: response.data.store_logo }],
      type: "website",
      siteName: response.data.store_name,
    },
    twitter: {
      card: "summary_large_image",
      title: response.data.store_name,
      description: response.data.store_description || `${response.data.store_description} - ${response.data.store_name}`,
      images: response.data.store_meta_image ? [response.data.store_meta_image] : [response.data.store_logo],
    },

    icons: response.data.store_meta_image || response.data.store_logo || "",
    metadataBase: new URL(`https://${response.data.store_subdomain}`),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getActiveStorePage(slug);

  if (response.error || !response.data) {
    return <NoPageFound />;
  }

  return (
    <article className="container mx-auto px-4 md:px-24 min-h-screen">
      <EditorContentParser content={response.data.content || ""} />
    </article>
  );
}
