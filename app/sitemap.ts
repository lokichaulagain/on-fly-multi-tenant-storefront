import { headers } from "next/headers";
import { getProductsForSitemap } from "@/actions/product";
import { getPagesForSitemap } from "@/actions/page";

export default async function Sitemap() {
  const headersList = await headers();
  const domain = headersList.get("host")?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) ?? "fenzora.com";

  // Fetch parallel
  const [productResponse, pageResponse] = await Promise.all([getProductsForSitemap(), getPagesForSitemap()]);
  if (productResponse.error || !productResponse.data || !pageResponse.data || pageResponse.error) {
    return [];
  }

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...productResponse.data.map(({ slug, updated_at }: { slug: string; updated_at: Date }) => ({
      url: `https://${domain}/shop/${slug}`,
      lastModified: updated_at || new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    })),

    ...pageResponse.data.map(({ slug, updated_at }: { slug: string; updated_at: Date }) => ({
      url: `https://${domain}/p/${slug}`,
      lastModified: updated_at || new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    })),

    // Standard pages
    {
      url: `https://${domain}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `https://${domain}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },

    {
      url: `https://${domain}/help`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
