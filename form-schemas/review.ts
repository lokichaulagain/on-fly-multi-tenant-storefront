import { z } from "zod";

export const reviewFormSchema = z.object({
  review: z.string().optional().nullable().default(""),
  rating: z.coerce.number().min(1, "Rating must be at least 1").max(5, "Rating must not exceed 5"),
  product_id: z.string().uuid("Product ID must be a valid UUID"),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
