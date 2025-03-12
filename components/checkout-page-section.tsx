"use client";

import { useTransition } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ChevronLeft, Wallet, Building2, Plus, Minus, Truck, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { ICartItem, useCart } from "@/contexts/cart-provider";
import { createOrder } from "@/actions/order";
import { toast } from "sonner";
import { orderFormSchema, OrderFormValues } from "@/form-schemas/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentStore } from "@/contexts/current-store-provider";
import { formatCurrency } from "@/lib/format-currency";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { SignedIn } from "@clerk/nextjs";
import SignInModal from "@/components/auth/sign-in-modal";
export default function CheckoutPageSection() {
  const router = useRouter();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  const store = useCurrentStore();

  const store_logo = store.store_logo;
  const store_subdomain = store.store_subdomain;
  const primary_color = store.store_appearance?.primary_color;
  const border_radius = `${(store.store_appearance?.border_radius ?? 0) / 16}rem`;
  const font_family = store.store_appearance?.font_family;

  const form = useForm<OrderFormValues>({
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
  const onSubmit = async (values: OrderFormValues) => {

    startTransition(async () => {
      const orderPayload = {
        shipping_address: {
          full_name: values.full_name,
          email_address: values.email_address,
          phone_number: parseInt(values.phone_number),
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
        })),
        shipping_cost: values.shipping_cost || 0,
      };
      console.log(orderPayload, "its a order payload");

      const response = await createOrder(orderPayload);
      if (response.error) {
        toast("Failed!", {
          description: response.error,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        return;
      }

      if (response.data) {
        toast("Success!", {
          description: response.msg,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        form.reset();
        clearCart();
      }
    });
  };

  if (cart.length === 0) {
    return (
      <CustomNotFound
        icon={<ShoppingCart className="h-6 w-6 text-muted-foreground" />}
        title="Your cart is empty"
        description="Add some products to your cart to checkout."
        buttonText="Shop Now"
        buttonLink="/shop"
        buttonbg="bg-[var(--primary)]"
      />
    );
  }


  return (
    <div className=" min-h-screen w-full flex items-center justify-center">
      <div className="max-w-2xl mx-auto rounded-md shadow-md border border-accent/50 w-full ">
        {/* Header */}

        <div className="p-2 border-b flex items-center">
          <button
            onClick={() => {
              router.back();
            }}
            type="button"
            title="Back"
            className="p-2 bg-accent/50 hover:bg-accent rounded-full">
            <ChevronLeft size={20} />
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
                    className="flex gap-3 bg-accent/50 p-3 rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      quality={50}
                      loading="eager"
                      className="rounded-md object-cover h-24 w-24 border border-accent/50 overflow-hidden"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          title="Decrease Quantity"
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 rounded-full border hover:bg-accent">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          title="Increase Quantity"
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 rounded-full border hover:bg-accent">
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

                      <p className=" flex flex-col ">
                        <span className=" text-sm font-medium">{formatCurrency((item.price || 0) * item.quantity)}</span>
                        <span className=" text-muted-foreground text-xs font-medium">{formatCurrency(item.price || 0)} for each</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Accordion
              type="multiple"
              defaultValue={["address", "payment"]}
              className="w-full">
              {/* Delivery Address */}
              <AccordionItem value="address">
                <AccordionTrigger className="hover:no-underline bg-accent/50 p-2">
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
                            type="number"
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

              {/* Payment Method */}
              <AccordionItem value="payment">
                <AccordionTrigger className="hover:no-underline bg-accent/50 p-2">
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
                            {[
                              { value: "cod", label: "COD", icon: Truck },
                              { value: "wallet", label: "Wallet", icon: Wallet },
                              { value: "bank", label: "Bank", icon: Building2 },
                            ].map((payment) => (
                              <FormItem key={payment.value}>
                                <FormControl>
                                  <RadioGroupItem
                                    value={payment.value}
                                    className="peer sr-only"
                                  />
                                </FormControl>
                                <FormLabel className="flex flex-col items-center justify-between rounded-md border border-accent p-4 hover:bg-accent  peer-data-[state=checked]:border-[var(--secondary)] [&:has([data-state=checked])]:border-[var(--secondary)]">
                                  <payment.icon className="mb-3 h-6 w-6" />
                                  {payment.label}
                                </FormLabel>
                              </FormItem>
                            ))}
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
              <div className="flex justify-between text-sm font-medium text-muted-foreground ">
                <p>Subtotal:</p>
                <p>{formatCurrency(totalPrice)}</p>
              </div>

              <div className="flex justify-between text-sm font-medium text-muted-foreground ">
                <p>Shipping:</p>
                <p>{formatCurrency(0)}</p>
              </div>

              <div className="flex justify-between text-base font-medium border-b border-accent/50 pb-2">
                <p>Total:</p>
                <p>{formatCurrency(totalPrice)}</p>
              </div>
            </div>

            <SignedIn>
              <Button
                type="submit"
                className="w-full bg-[var(--secondary)] hover:bg-[var(--secondary)] text-white">
                {isPending ? "Placing Order..." : "Order Now"}
              </Button>
            </SignedIn>

          
              

              <SignInModal
                primary_color={primary_color}
                border_radius={border_radius || ""}
                font_family={font_family || ""}
                store_logo={store_logo || ""}
                store_subdomain={store_subdomain || ""}
                button={<Button className="w-full bg-[var(--secondary)] hover:bg-[var(--secondary)] text-white">Sign In</Button>}
              />
         
          </form>
        </Form>
      </div>
    </div>
  );
}
