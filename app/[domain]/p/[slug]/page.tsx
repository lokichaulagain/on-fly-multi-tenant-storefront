import { getActiveStorePage } from "@/actions/page";
import { NoPageFound } from "@/components/no-page-found";
import { Metadata } from "next";
import { getActiveStore } from "@/actions/store";
import { fallbackMetadata } from "@/constants/metadata";
import EditorContentParser from "@/components/editor-content-parser";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const response = await getActiveStorePage(slug);
  const storeResponse = await getActiveStore(); 



  if (response.error || !response.data) {
    return fallbackMetadata;
  }

  return {
    title: response.data.title,
    description: response.data.content,
    openGraph: {
      title: response.data.title,
      description: response.data.content || "",
      images: [storeResponse.data?.store_meta_image || storeResponse.data?.store_logo || ""],
    },
    twitter: {
      card: "summary_large_image",
      title: response.data.title,
      description: response.data.content || "",
      images: [storeResponse.data?.store_meta_image || storeResponse.data?.store_logo || ""], 
      creator: "@fenzora",
    },
    icons: [storeResponse.data?.store_meta_image || storeResponse.data?.store_logo || ""],
    metadataBase: new URL(`https://${storeResponse.data?.store_subdomain}`),
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
