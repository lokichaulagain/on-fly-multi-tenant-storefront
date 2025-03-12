import { Metadata } from "next";

// Common repeated values
const COMPANY_NAME = "Fenzora";
const DESCRIPTION = "Launch your online store in 60 seconds. Build customize sell and manage —all in one powerful ecommerce platform in Nepal.";
const LOGO_URL = "https://itmpwbjutsadjvzubrmf.supabase.co/storage/v1/object/public/fenzora/logos/Icon-two.png";
const BASE_URL = "https://fenzora.com";

export const fallbackMetadata: Metadata = {
  title: {
    default: COMPANY_NAME,
    template: "%s | " + COMPANY_NAME, // Template for dynamic titles
  },
  description: DESCRIPTION,
  keywords: ["Fenzora", "Ecommerce", "Online Store", "Nepal", "Shop", "Sell", "digital storefront"],
  authors: [{ name: COMPANY_NAME, url: BASE_URL }],
  category: "ecommerce builder",
  creator: "@fenzora",

  robots: {
    index: true,
    follow: true,
  },
  publisher: COMPANY_NAME,
  openGraph: {
    title: COMPANY_NAME,
    locale: "en_US",
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 630,
        alt: "Fenzora - Ecommerce platform in Nepal",
      },
    ],
    url: BASE_URL,
    siteName: COMPANY_NAME,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY_NAME,
    description: DESCRIPTION,
    images: [LOGO_URL],
    creator: "@fenzora",
    site: "@fenzora",
  },
  icons: {
    icon: LOGO_URL,
    shortcut: LOGO_URL,
    apple: LOGO_URL,
    other: {
      rel: "icon",
      url: LOGO_URL,
    },
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
    },
  },
};
