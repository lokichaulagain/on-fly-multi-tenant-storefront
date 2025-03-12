import { z } from "zod";

export const reviewFormSchema = z.object({
  review: z.string().optional().nullable().default(""),
  rating: z.number().min(1, { message: "Rating must be at least 1 star." }).max(5, { message: "Rating must be at most 5 stars." }),
  product_id: z.string().uuid("Product ID must be a valid UUID"),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
