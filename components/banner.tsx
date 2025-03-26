"use client";
import { GradientBlurBackground } from "./gradient-blur-background";

interface BannerProps {
  message?: string;
}

export function Banner({ message }: BannerProps) {
  return (
    <GradientBlurBackground>
      <p className="flex text-xs text-center  py-1.5 items-center justify-center">{message}</p>
    </GradientBlurBackground>
  );
}
