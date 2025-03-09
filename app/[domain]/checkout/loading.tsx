"use client";

import { ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-2xl mx-auto rounded-md shadow-md border border-accent w-full animate-pulse">
        {/* Header */}
        <div className="p-2 border-b flex items-center">
          <div className="p-2 bg-accent rounded-full">
            <ChevronLeft
              size={20}
              className="text-muted-foreground"
            />
          </div>
          <Skeleton className="ml-4 h-7 w-40 bg-accent" />
        </div>

        <div className="p-4 space-y-6">
          {/* Shopping List */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 bg-accent" />
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 bg-accent p-3 rounded-lg">
                  <Skeleton className="h-24 w-24 rounded-md bg-accent" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4 bg-accent" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded-full bg-accent" />
                      <Skeleton className="h-4 w-8 bg-accent" />
                      <Skeleton className="h-5 w-5 rounded-full bg-accent" />
                      <Skeleton className="h-4 w-16 ml-2 bg-accent" />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-20 bg-accent" />
                      <Skeleton className="h-3 w-24 bg-accent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Section */}
          <div className="space-y-4">
            <div className="bg-accent p-2 rounded-md">
              <div className="font-medium">
                <Skeleton className="h-5 w-36 bg-accent" />
              </div>
            </div>
            <div className="space-y-4 p-2 pb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((field) => (
                <div
                  key={field}
                  className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-accent" />
                  <Skeleton className="h-10 w-full rounded-md bg-accent" />
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="space-y-4">
            <div className="bg-accent p-2 rounded-md">
              <div className="font-medium">
                <Skeleton className="h-5 w-36 bg-accent" />
              </div>
            </div>
            <div className="p-2 pb-8">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((payment) => (
                  <div
                    key={payment}
                    className="flex flex-col items-center justify-between rounded-md border border-accent p-4">
                    <Skeleton className="mb-3 h-6 w-6 rounded bg-accent" />
                    <Skeleton className="h-4 w-12 bg-accent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


