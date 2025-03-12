import { SignedOut, SignUpButton } from "@clerk/nextjs";
import React from "react";

interface SignInModalProps {
  primary_color?: string;
  border_radius?: string;
  font_family?: string;
  store_logo?: string;
  store_subdomain?: string;
  button?: React.ReactNode;
}

export default function SignUpModal({ primary_color = "", border_radius = "", font_family = "", store_logo = "", store_subdomain = "", button = null }: SignInModalProps) {
  return (
    <SignedOut>
      <SignUpButton
        mode="modal"
        forceRedirectUrl={"/checkout"}
        appearance={{
          variables: {
            colorPrimary: primary_color,
            borderRadius: border_radius,
            fontFamily: font_family,
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
        }}>
        {button}
      </SignUpButton>
    </SignedOut>
  );
}
