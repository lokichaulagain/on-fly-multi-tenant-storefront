"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoaderCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { reviewFormSchema } from "@/form-schemas/review";
import type { ReviewFormValues } from "@/form-schemas/review";
import { createReview } from "@/actions/review";
import { toast } from "sonner";

export function CreateReviewDialog({ product_id }: { product_id: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      product_id: product_id,
      review: "",
      rating: undefined,
    },
  });

  const [isPending, startTransition] = useTransition();
  async function onSubmit(values: ReviewFormValues) {
    startTransition(async () => {
      const response = await createReview(values);
      if (response.error || !response.data) {
        toast("Error!", {
          description: response.error,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        return;
      }

      toast("Success!", {
        description: "Your review has been submitted successfully",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });

      form.reset();
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" bg-[var(--secondary)] hover:bg-[var(--secondary)]">Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Share Your Experience</DialogTitle>
          <DialogDescription>Tell others what you think about this product. Your feedback helps other customers make better decisions.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <StarRating
                      rating={field.value || 0}
                      setRating={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you like or dislike? How was your experience with this product?"
                      className="min-h-[120px] resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                className=" bg-[var(--secondary)] hover:bg-[var(--secondary)]"
                type="submit"
                disabled={isPending}>
                {isPending && (
                  <LoaderCircle
                    size={16}
                    className=" animate-spin"
                  />
                )}
                Submit Review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  count?: number;
  readOnly?: boolean;
}

function StarRating({ rating, setRating, count = 5, readOnly = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, i) => {
        const starValue = i + 1;
        return (
          <button
            title="rating-button"
            type="button"
            key={i}
            className={cn("rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 p-1 -m-1 transition-opacity", readOnly && "cursor-default opacity-100", !readOnly && "hover:opacity-100")}
            disabled={readOnly}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}>
            <Star className={cn("h-6 w-6", "transition-all", (hoverRating || rating) >= starValue ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600")} />
          </button>
        );
      })}
    </div>
  );
}
