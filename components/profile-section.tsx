"use client";
import React, { useState } from "react";
import { SignOutButton, UserProfile } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CreditCard, LoaderCircle, MapPin, Package, LogOut } from "lucide-react";
import { Orders } from "@/lib/db/schema";
import Image from "next/image";
import moment from "moment";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "./custom-badge";
import { ENUM_PAYMENT_STATUS, ENUM_SHIPPING_STATUS } from "@/enums";
import { formatCurrency } from "@/lib/format-currency";
import { CustomNotFound } from "./not-found/custom-not-found";
import { calculateOrderTotal } from "@/utils/calculate-order-total";
import { IOrderItem } from "@/interfaces/order";
import { useCurrentStore } from "@/contexts/current-store-provider";
interface ProfileSectionProps {
  orders: Orders[];
}

export default function ProfileSection({ orders }: ProfileSectionProps) {
  const store = useCurrentStore();
  const store_appearance = store.store_appearance;
  
  return (
    <div className="px-4 w-full md:max-w-4xl mx-auto mt-4  min-h-screen">
      <Tabs defaultValue="orders">
        <div className=" flex items-center justify-between">
          <TabsList className="flex justify-between">
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>

          <div className="flex">
            <SignOutButton>
              <Button
                size={"sm"}
                variant={"destructive"}
                className="w-full">
                Logout <LogOut size={16} />
              </Button>
            </SignOutButton>
          </div>
        </div>

        <TabsContent
          value="orders"
          className={`w-full  border border-accent rounded-t-[var(--radius)] p-4 shadow-lg`}>
          <h1 className="pb-2 font-semibold">My Orders ({orders.length})</h1>

          {orders.length > 0 && <OrderComponent orders={orders} />}

          {orders.length === 0 && (
            <CustomNotFound
              icon={<Package className="h-6 w-6 text-muted-foreground" />}
              title="You haven't placed any orders yet."
              description="Shop now and start your journey with us."
              buttonText="Shop Now"
              buttonLink="/shop"
              buttonbg="bg-[var(--primary)]"
              className="h-[50vh]"
            />
          )}
        </TabsContent>

        <TabsContent value="profile">
          <UserProfile
            routing="hash"
            fallback={
              <div className=" w-full md:max-w-4xl mx-auto flex justify-center items-center min-h-screen border border-accent rounded-md shadow-lg">
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                />
              </div>
            }
            appearance={{
              variables: {
                colorPrimary: store_appearance?.primary_color,
                borderRadius: `${(store_appearance?.border_radius ?? 0) / 32}rem`,
                fontFamily: store_appearance?.font_family,
              },
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ExpandedOrdersState {
  [key: string]: boolean;
}

function OrderComponent({ orders }: { orders: Orders[] }) {
  const [expandedOrders, setExpandedOrders] = useState<ExpandedOrdersState>({});

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className=" space-y-4">
      {orders?.map((order: Orders) => (
        <div
          key={order.id}
          className="border">
          <div
            className="bg-muted/30 hover:bg-muted/60 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
            onClick={() => toggleOrderExpand(order.id)}>
            <div className="space-y-1">
              <div className="flex items-center">
                <h3 className="font-medium">{order.order_number}</h3>

                <div className="ml-2 space-x-2">
                  <StatusBadge
                    status={order.shipping_status as ENUM_SHIPPING_STATUS}
                    type="shipping"
                  />
                  <StatusBadge
                    status={order.payment_status as ENUM_PAYMENT_STATUS}
                    type="payment"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{moment(order.created_at).format("MMMM d, yyyy")}</p>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <span className="font-medium mr-2">{formatCurrency(calculateOrderTotal(order))}</span>
              {expandedOrders[order.id] ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
            </div>
          </div>

          {/* Order details (expanded) */}
          {expandedOrders[order.id] && (
            <div className="p-4 bg-background">
              {/* Order items */}
              <h4 className="text-sm font-medium mb-3">Items</h4>
              <div className="space-y-3 mb-6">
                {order.order_items?.map((item: IOrderItem) => (
                  <div
                    key={item.product_id}
                    className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.product_image || "/placeholder.svg"}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm truncate">{item.product_name}</h5>
                      <p className="text-sm text-muted-foreground">Qty: {item.product_quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.product_price * item.product_quantity)}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(item.product_price)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shipping info */}
                {order.shipping_address && (
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> Shipping Address
                    </h4>
                    <div className="text-sm">
                      <p className="font-medium">{order.shipping_address.full_name}</p>
                      <p>{order.shipping_address.landmark}</p>
                      <p>
                        {order.shipping_address.city}, {order.shipping_address.district}
                      </p>
                      <p>
                        {order.shipping_address.province}, {order.shipping_address.postal_code}
                      </p>
                      <p className="mt-1">{order.shipping_address.phone_number}</p>
                    </div>
                  </div>
                )}

                {/* Payment info */}
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <CreditCard className="h-4 w-4 mr-1" /> Payment Details
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(order.order_items?.reduce((sum: number, item: IOrderItem) => sum + item.product_price * item.product_quantity, 0) || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{formatCurrency(order.shipping_cost || 0)}</span>
                    </div>
                 
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(calculateOrderTotal(order))}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm">
                  Track Order
                </Button>

                <Button
                  variant="outline"
                  size="sm">
                  Download Invoice
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
