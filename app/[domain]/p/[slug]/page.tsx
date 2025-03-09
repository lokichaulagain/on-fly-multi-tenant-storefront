import { getActiveStorePage } from "@/actions/page";
import React from "react";
import parse from "html-react-parser";
import { NoPageFound } from "@/components/no-page-found";


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await getActiveStorePage(slug);

  if (response.error || !response.data) {
    return <NoPageFound/>;
  }

  return (
    <div className="container mx-auto px-4 md:px-24 min-h-screen">
      <div>{parse(response.data.content || "")}</div>
    </div>
  );
}
