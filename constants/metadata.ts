import { Metadata } from "next";

// Common repeated values
const COMPANY_NAME = "Fenzora";
const DESCRIPTION = "Launch your online store in 60 seconds. Build customize sell and manage —all in one powerful ecommerce platform in Nepal.";
const LOGO_URL = "https://itmpwbjutsadjvzubrmf.supabase.co/storage/v1/object/public/fenzora/logos/Icon-two.png";
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "fenzora.com";
const BASE_URL = `https://${ROOT_DOMAIN}`;

export const fallbackMetadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} | Nepal's #1 E-commerce Platform`,
    template: "%s | " + COMPANY_NAME, // Template for dynamic titles
  },
  description: DESCRIPTION,
  keywords: ["Fenzora", "Ecommerce Nepal", "Online Store Builder", "Nepal E-commerce", "Digital Storefront", "Sell Online Nepal", "E-commerce Platform Nepal", "Online Shop Creator"],
  authors: [{ name: COMPANY_NAME, url: BASE_URL }],
  category: "ecommerce platform",
  creator: "Fenzora Team",
  applicationName: COMPANY_NAME,
  viewport: "width=device-width, initial-scale=1",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  publisher: COMPANY_NAME,
  openGraph: {
    title: `${COMPANY_NAME} - Launch Your Online Store in 60 Seconds`,
    locale: "en_US",
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 630,
        alt: "Fenzora - Nepal's Leading E-commerce Platform",
      },
      {
        url: LOGO_URL,
        width: 800,
        height: 600,
        alt: "Build and launch your online store with Fenzora",
      },
    ],
    url: BASE_URL,
    siteName: COMPANY_NAME,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} - E-commerce Made Easy in Nepal`,
    description: DESCRIPTION,
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 630,
        alt: "Fenzora - Nepal's Leading E-commerce Platform",
      },
    ],
    creator: "@fenzora",
    site: "@fenzora",
  },
  icons: {
    icon: [{ url: LOGO_URL, sizes: "any" }, { url: LOGO_URL }],
    shortcut: LOGO_URL,
    apple: [{ url: LOGO_URL, sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: LOGO_URL }],
  },

  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
    },
  },
};

