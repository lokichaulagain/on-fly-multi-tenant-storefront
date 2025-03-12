"use client"
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { useCurrentStore } from "@/contexts/current-store-provider";
import { SignIn } from "@clerk/nextjs";
import { LoaderCircle, Store } from "lucide-react";

export default function Page() {
  const store = useCurrentStore();
  if (!store) {
    return (
      <CustomNotFound
        title="No store found"
        description="This store is not active or does not exist."
        icon={<Store className="h-6 w-6 text-muted-foreground" />}
        buttonText="Create New Store"
        buttonLink="https://app.fenzora.com"
      />
    );
  }

  const { store_name, store_logo, store_subdomain, store_appearance } = store;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignIn
        fallback={
          <LoaderCircle
            size={16}
            className=" animate-spin"
          />
        }
        appearance={{
          variables: {
            colorPrimary: store_appearance?.primary_color,
            borderRadius: `${(store_appearance?.border_radius ?? 0) / 16}rem`,
            fontFamily: store_appearance?.font_family,
          },

          layout: {
            logoImageUrl: store_logo,
            logoLinkUrl: `https://${store_subdomain}.fenzora.com`,
            helpPageUrl: "/p/help",
            privacyPageUrl: "/p/privacy-policy",
            termsPageUrl: "/p/terms-of-service",
            logoPlacement: "inside",
            unsafe_disableDevelopmentModeWarnings: false,
          },
        }}
      />
    </div>
  );
}
