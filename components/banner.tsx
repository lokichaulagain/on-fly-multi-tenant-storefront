// "use client";
// import { useState } from "react";
// import { X } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

// interface BannerProps {
//   message?: string;
//   dismissible?: boolean;
//   className?: string;
// }

// export function Banner({ message, dismissible = false, className }: BannerProps) {
//   const [isVisible, setIsVisible] = useState(true);

//   if (!isVisible) return null;

//   return (
//     <div className={cn("relative w-full px-4 py-2 text-center text-sm font-medium", className)}>
//       <div className="flex items-center justify-center gap-2 text-xs">{message}</div>
//       {dismissible && (
//         <Button
//           variant="ghost"
//           size="icon"
//           className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full opacity-70 transition-opacity hover:opacity-100"
//           onClick={() => setIsVisible(false)}>
//           <X className="h-3 w-3" />
//           <span className="sr-only">Dismiss</span>
//         </Button>
//       )}
//     </div>
//   );
// }



"use client"
import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BannerProps {
  message?: string
  dismissible?: boolean
  className?: string
}

export function Banner({ message, dismissible = false, className }: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "relative w-full px-4 py-2 text-center text-sm font-medium overflow-hidden",
        "bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]",
        "text-white/80",
        className,
      )}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large blurred circles with primary/secondary colors */}
        <div className="absolute left-1/4 top-1/3 h-[40rem] w-[40rem] rounded-full bg-[var(--primary)]/20 mix-blend-overlay blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-[40rem] w-[40rem] rounded-full bg-[var(--secondary)]/20 mix-blend-overlay blur-3xl" />

        {/* Additional gradient orbs using only primary/secondary */}
        <div className="absolute left-1/3 bottom-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-[var(--primary)]/15 to-[var(--secondary)]/15 mix-blend-overlay blur-3xl" />
        <div className="absolute right-1/3 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-bl from-[var(--secondary)]/15 to-[var(--primary)]/15 mix-blend-overlay blur-3xl" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,white/10_1px,transparent_1px),linear-gradient(to_bottom,white/10_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        {/* Diagonal lines with primary/secondary gradients */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-white/20 via-[var(--primary)]/20 to-transparent opacity-40 transform -skew-y-6" />
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-l from-white/20 via-[var(--secondary)]/20 to-transparent opacity-40 transform skew-y-6" />
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10 flex items-center justify-center gap-2 text-xs">{message}</div>

      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full opacity-70 transition-opacity hover:opacity-100 z-10 text-white"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
    </div>
  )
}

