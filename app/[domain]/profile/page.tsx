import ProfileSection from "@/components/profile-section";
import React from "react";
import { getActiveUserOrders } from "@/actions/user";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { CircleX } from "lucide-react";
import { getActiveStore } from "@/actions/store";
import { IStoreAppearance } from "@/interfaces/store";

export default async function Page() {
  const [userResponse, storeResponse] = await Promise.all([getActiveUserOrders(), getActiveStore()]);
  if (userResponse.error || storeResponse.error) {
    return (
      <CustomNotFound
        icon={<CircleX className="text-red-400" />}
        title="Oops! Something went wrong."
        description="Please try again later."
        buttonText="Go Home"
        buttonLink="/"
        buttonbg="bg-[var(--primary)]"
      />
    );
  }

  return (
    <ProfileSection
      orders={userResponse.data || []}
      store_appearance={storeResponse.data?.store_appearance as IStoreAppearance}
    />
  );
}
