import { getActiveStorePage } from "@/actions/page";
import React from "react";
import parse from "html-react-parser";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const response = await getActiveStorePage(slug);
  const page = response.data;

  if (response.error || !page) {
    return <div>Error fetching page</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-24 min-h-screen">
      <h1>Page</h1>
      <p>{slug}</p>
      <div>{parse(page.content || "")}</div>
    </div>
  );
}
