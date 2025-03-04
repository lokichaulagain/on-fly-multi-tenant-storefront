"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ChevronLeft, Wallet, Building2, Plus, Minus, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { ICartItem, useCart } from "@/contexts/cart-provider";
import { SignInButton, useUser } from "@clerk/nextjs";
import { createOrder } from "@/actions/order";
import { toast } from "sonner";
import { orderFormSchema } from "@/form-schemas/order";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CheckoutPageSection({ store_id }: { store_id: string }) {
    const { isLoaded, isSignedIn, user } = useUser();
    console.log(user, "its a user");

  const router = useRouter();
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  const [activeSection, setActiveSection] = useState<string>("");

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      full_name: "",
      email_address: "",
      phone_number: "",
      province: "",
      district: "",
      city: "",
      landmark: "",
      postal_code: "",
      payment_method: "cod",
      promo_code: "",
      shipping_cost: 0,
    },
  });

  const [isPending, startTransition] = useTransition();
  const onSubmit = async (values: z.infer<typeof orderFormSchema>) => {
    console.log(values, "its a values");

    startTransition(async () => {
      if (!user?.id) {
        toast.error("Please sign in to place an order");
        return;
      }

      const orderPayload = {
        user_id: user.id,
        store_id,
        shipping_address: {
          full_name: values.full_name,
          email_address: values.email_address,
          phone_number: values.phone_number,
          province: values.province,
          district: values.district,
          city: values.city,
          landmark: values.landmark,
          postal_code: values.postal_code,
        },
        billing_address: null,
        order_items: cart.map((item: ICartItem) => ({
          product_id: item.id,
          product_name: item.name,
          product_image: item.image || "",
          product_price: item.price || 0,
          product_quantity: item.quantity,
          user_id: user.id,
          store_id: store_id,
        })),
        shipping_cost: values.shipping_cost || 0,
      };
      console.log(orderPayload, "its a order payload");

      const response = await createOrder(orderPayload);
      if (response.error) {
        toast("Order Failed!", {
          description: response.error || "Failed to create order, please try again",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        return;
      }

      if (response.data) {
        toast("Order Placed!", {
          description: "Your order has been placed successfully",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        form.reset();
        clearCart();
        setIsCartOpen(false);
      }
    });
  };

  return (
    <div className="">
      <div className="max-w-2xl mx-auto rounded-md shadow-md border border-gray-50 ">
        {/* Header */}

        <div className="p-2 border-b flex items-center">
          <button
            onClick={() => {
              router.back();
              setIsCartOpen(false);
            }}
            type="button"
            title="Back"
            className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="ml-4 text-xl font-semibold">Checkout ({cart.length})</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 space-y-6">
            {/* Shopping List */}
            <div className="space-y-4">
              <h2 className="font-medium">Shopping List</h2>
              <div className="space-y-4">
                {cart.map((item: ICartItem) => (
                  <div
                    key={item.id}
                    className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      quality={50}
                      loading="eager"
                      className="rounded-md object-cover h-24 w-24 border border-gray-50 overflow-hidden"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          title="Decrease Quantity"
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 rounded-full border hover:bg-gray-50">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          title="Increase Quantity"
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 rounded-full border hover:bg-gray-50">
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          title="Remove Item"
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 hover:text-red-700 ml-2">
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">Variation: Yellow, L</p>

                      <p className=" text-xs md:text-sm font-medium">
                        Rs. Rs. {(item.price || 0).toFixed(2)} x {item.quantity} = Rs. {(item.price || 0) * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Accordion
              type="single"
              collapsible
              value={activeSection}
              onValueChange={setActiveSection}
              className="w-full">
              {/* Delivery Address */}
              <AccordionItem value="address">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-medium">Delivery Address</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 p-2 pb-8">
                  <FormField
                    control={form.control}
                    name="full_name"
                    rules={{ required: "Full name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email_address"
                    rules={{ required: "Email address is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email   address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone_number"
                    rules={{ required: "Phone number is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="province"
                    rules={{ required: "Province is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your province"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="district"
                    rules={{ required: "District is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your district"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    rules={{ required: "City is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your city"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="landmark"
                    rules={{ required: "Landmark is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Landmark</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your landmark"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postal_code"
                    rules={{ required: "Postal code is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your postal code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Voucher */}
              {/* <AccordionItem value="voucher">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-medium">Voucher and Promo</span>
                </AccordionTrigger>
                <AccordionContent className="flex items-center gap-2 justify-between p-2 pb-8">
                  <FormField
                    control={form.control}
                    name="promo_code"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter promo code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button variant="secondary">Apply</Button>
                </AccordionContent>
              </AccordionItem> */}

              {/* Payment Method */}
              <AccordionItem value="payment">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-medium">Payment Method</span>
                </AccordionTrigger>
                <AccordionContent className="p-2 pb-8">
                  <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-3 gap-4">
                            <FormItem>
                              <FormControl>
                                <RadioGroupItem
                                  value="cod"
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                <Truck className="mb-3 h-6 w-6" />
                                COD
                              </FormLabel>
                            </FormItem>
                            <FormItem>
                              <FormControl>
                                <RadioGroupItem
                                  value="wallet"
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                <Wallet className="mb-3 h-6 w-6" />
                                Wallet
                              </FormLabel>
                            </FormItem>
                            <FormItem>
                              <FormControl>
                                <RadioGroupItem
                                  value="bank"
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                <Building2 className="mb-3 h-6 w-6" />
                                Bank
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Order Summary */}
            <div className=" mt-6 space-y-2">
              <div className="flex justify-between text-sm font-medium ">
                <p>Subtotal:</p>
                <p>Rs. {totalPrice.toFixed(2)}</p>
              </div>

              <div className="flex justify-between text-sm font-medium ">
                <p>Shipping:</p>
                <p>Rs. 0</p>
              </div>

              <div className="flex justify-between text-base font-medium border-b border-gray-100 pb-2">
                <p>Total:</p>
                <p>Rs. {totalPrice.toFixed(2)}</p>
              </div>
            </div>

            {isSignedIn ? (
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 text-white">
                {isPending ? "Placing Order..." : "Order Now"}
              </Button>
            ) : (
              <SignInButton
                mode="modal"
                signUpForceRedirectUrl={"/checkout"}
                forceRedirectUrl={"/checkout"}>
                <Button
                  type="button"
                  className="w-full bg-primary hover:bg-primary/80 text-white">
                  Sign In to Continue
                </Button>
              </SignInButton>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
