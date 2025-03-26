"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientBlurBackgroundProps {
  children: ReactNode;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  overlay?: boolean;
  grid?: boolean;
  diagonalLines?: boolean;
}

export function GradientBlurBackground({ children, className, primaryColor = "var(--primary)", secondaryColor = "var(--secondary)", overlay = true, grid = true, diagonalLines = true }: GradientBlurBackgroundProps) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center",
        "text-white/80 ", className)}>
      {/* Background overlay */}
      {overlay && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>}

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large blurred circles with primary/secondary colors */}
        <div className={`absolute left-1/4 top-1/3 h-[40rem] w-[40rem] rounded-full bg-[${primaryColor}]/20 mix-blend-overlay blur-3xl`} />
        <div className={`absolute right-1/4 bottom-1/3 h-[40rem] w-[40rem] rounded-full bg-[${secondaryColor}]/20 mix-blend-overlay blur-3xl`} />

        {/* Additional gradient orbs using only primary/secondary */}
        <div className={`absolute left-1/3 bottom-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-[${primaryColor}]/15 to-[${secondaryColor}]/15 mix-blend-overlay blur-3xl`} />
        <div className={`absolute right-1/3 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-bl from-[${secondaryColor}]/15 to-[${primaryColor}]/15 mix-blend-overlay blur-3xl`} />

        {/* Subtle grid pattern */}
        {grid && <div className="absolute inset-0 bg-[linear-gradient(to_right,white/10_1px,transparent_1px),linear-gradient(to_bottom,white/10_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />}

        {/* Diagonal lines with primary/secondary gradients */}
        {diagonalLines && (
          <>
            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-white/20 via-[${primaryColor}]/20 to-transparent opacity-40 transform -skew-y-6`} />
            <div className={`absolute bottom-0 right-0 w-full h-32 bg-gradient-to-l from-white/20 via-[${secondaryColor}]/20 to-transparent opacity-40 transform skew-y-6`} />
          </>
        )}
      </div>

      {/* Content with proper z-index */}
      <div className="relative w-full z-10">{children}</div>
    </div>
  );
}
