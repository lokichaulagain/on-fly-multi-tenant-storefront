"use client";
import { GradientBlurBackground } from "./gradient-blur-background";

interface BannerProps {
  message?: string;
}

export function Banner({ message }: BannerProps) {
  return (
    <GradientBlurBackground>
      <p className="flex text-xs text-center h-6 items-center justify-center">{message}</p>
    </GradientBlurBackground>
  );
}
