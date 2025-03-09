import ProfileSection from "@/components/profile-section";
import React from "react";
import { getActiveUserOrders } from "@/actions/user";

export default async function Page() {
  const response = await getActiveUserOrders();

  return <ProfileSection orders={response.data || []} />;
}
