"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BannerProps {
  message: string;
  dismissible?: boolean;
  className?: string;
}

export function Banner({ message, dismissible = true, className }: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={cn("relative w-full px-4 py-2 text-center text-sm font-medium", className)}>
      <div className="flex items-center justify-center gap-2 text-xs">{message}</div>
      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full opacity-70 transition-opacity hover:opacity-100"
          onClick={() => setIsVisible(false)}>
          <X className="h-3 w-3" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
    </div>
  );
}
