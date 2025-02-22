"use client";

import { ArrowRight, CalendarDays, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Banner from "@/public/banner-girl-3.jpg";
import { useClerk, UserProfile } from "@clerk/nextjs";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfilePageSection() {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
    toast.success("You have been logged out.");
    
  };

  return (
    <div className="">
     
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="destructive"
            onClick={handleLogout}>
            <LogOut size={16} />
            Log out
          </Button>
        </div>

        <Tabs
          defaultValue="orders"
          className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            {/* <OrdersView orders={orders} /> */}
          </TabsContent>
          <TabsContent value="settings">
            <UserProfile routing="hash" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrdersView({ orders }: any) {
  return (
    <div className="space-y-6">
      {orders?.length > 0 ? (
        orders?.map((order: any) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground"> No orders found</p>

          <Link href="/shop">
            <Button
              size="sm"
              variant={"outline"}
              className=" text-primary">
              Continue Shopping <ArrowRight size={16} />{" "}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function OrderCard({ order }: any) {
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Order {order.order_number}</CardTitle>
        {/* <Badge className={statusColor[order.order_status as keyof typeof statusColor]}>{order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}</Badge> */}
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground mb-4 flex items-center">
          <CalendarDays className="w-3 h-3 mr-1" />
          {new Date(order.created_at).toLocaleDateString()}
        </div>
        <div className="space-y-2">
          {order.order_items.map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between text-sm">
              <span>
                {item.name} x{item.quantity}
              </span>

              <span>Rs. {Number.parseFloat(item.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-medium pt-2 border-t">
            <span>Total</span>
            <span>Rs. {Number.parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}