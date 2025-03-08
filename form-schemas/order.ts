import { z } from "zod";

// Define allowed payment methods
const PAYMENT_METHODS = ["cod", "wallet", "bank"] as const;

export const orderFormSchema = z.object({
  // Personal Information
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]*$/, "Full name should only contain letters and spaces"),

  email_address: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email address must not exceed 255 characters"),

  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  // Address Information  
  province: z
    .string()
    .min(2, "Province must be at least 2 characters")
    .max(50, "Province must not exceed 50 characters"),

  district: z
    .string()
    .min(2, "District must be at least 2 characters")
    .max(50, "District must not exceed 50 characters"),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters"),

  landmark: z
    .string()
    .min(2, "Landmark must be at least 2 characters")
    .max(100, "Landmark must not exceed 100 characters"),

 
  postal_code: z
    .string()
    .min(6, "Postal code must be exactly 6 digits")
    .max(6, "Postal code must be exactly 6 digits"),

  // Order Information
  payment_method: z
    .enum(PAYMENT_METHODS, {
      required_error: "Please select a payment method",
      invalid_type_error: "Invalid payment method selected",
    }),

  promo_code: z
    .string()
    .max(20, "Promo code must not exceed 20 characters")
    .optional()
    .nullable()
    .default(""),

  shipping_cost: z
    .number()
    .min(0, "Shipping cost cannot be negative")
    .optional()
    .nullable()
    .default(0),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;

// Export payment methods for use in components
export const VALID_PAYMENT_METHODS = PAYMENT_METHODS;