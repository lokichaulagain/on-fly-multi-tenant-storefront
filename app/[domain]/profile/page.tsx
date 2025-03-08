import ProfileSection from "@/components/profile-section";
import React from "react";
import { getActiveUserOrders } from "@/actions/user";

export default async function Page() {
  const response = await getActiveUserOrders();

  if (response.error || !response.data) {
    return <div>Error: {response.error}</div>;
  }

  console.log(response.data,"This is orders");



  return <ProfileSection orders={response.data} />;
}
