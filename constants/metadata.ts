import { Metadata } from "next";

export const fallbackMetadata: Metadata = {
  title: "Fenzora",
  description:
    "Launch your online store in 60 seconds. Build customize sell and manage —all in one powerful ecommerce platform in Nepal.",
  openGraph: {
    title: "Fenzora",
    description:
      "Launch your online store in 60 seconds. Build customize sell and manage —all in one powerful ecommerce platform in Nepal.",
    images: [
      "https://itmpwbjutsadjvzubrmf.supabase.co/storage/v1/object/public/fenzora/logos/Icon-two.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fenzora",
    description:
      "Launch your online store in 60 seconds. Build customize sell and manage —all in one powerful ecommerce platform in Nepal.",
    images: [
      "https://itmpwbjutsadjvzubrmf.supabase.co/storage/v1/object/public/fenzora/logos/Icon-two.png",
    ],
    creator: "@fenzora",
  },
  icons: [
    "https://itmpwbjutsadjvzubrmf.supabase.co/storage/v1/object/public/fenzora/logos/Icon-two.png",
  ],
  metadataBase: new URL(`https://fenzora.com`),
};