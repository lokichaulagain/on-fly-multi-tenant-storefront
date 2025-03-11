"use client";
import React from "react";
import { FacebookIcon, LinkedinIcon, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton, LinkedinShareButton } from "react-share";
import { FacebookShareButton } from "react-share";
interface ProductShareButtonsProps {
  shareUrl: string;
  title: string;
}

export default function ProductShareButtons({ shareUrl, title }: ProductShareButtonsProps) {
  return (
    <div className="flex space-x-2">
      <FacebookShareButton
        url={shareUrl}
        title={title}>
        <FacebookIcon
          size={20}
          round
        />
      </FacebookShareButton>
      <TwitterShareButton
        url={shareUrl}
        title={title}>
        <TwitterIcon
          size={20}
          round
        />
      </TwitterShareButton>
      <WhatsappShareButton
        url={shareUrl}
        title={title}>
        <WhatsappIcon
          size={20}
          round
        />
      </WhatsappShareButton>
      <LinkedinShareButton
        url={shareUrl}
        title={title}>
        <LinkedinIcon
          size={20}
          round
        />
      </LinkedinShareButton>
    </div>
  );
}
