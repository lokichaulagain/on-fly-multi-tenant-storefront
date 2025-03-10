"use client"
import React from 'react'
import { FacebookIcon, LinkedinIcon, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton, LinkedinShareButton } from 'react-share';
import { FacebookShareButton } from 'react-share';

export default function ProductShareButton({ shareUrl, title }: { shareUrl: string; title: string }) {
  return (
    <div className="flex space-x-2">
    <FacebookShareButton url={shareUrl} title={title}>
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <TwitterShareButton url={shareUrl} title={title}>
      <TwitterIcon size={32} round />
    </TwitterShareButton>
    <WhatsappShareButton url={shareUrl} title={title}>
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>
    <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>  
  );
}
