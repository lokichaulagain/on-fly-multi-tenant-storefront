import ProfileSection from "@/components/profile-section";
import React from "react";
import { getActiveUserOrders } from "@/actions/user";
import { CustomNotFound } from "@/components/not-found/custom-not-found";
import { CircleX } from "lucide-react";

export default async function Page() {
  const response = await getActiveUserOrders();
  if (response.error) {
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

  return <ProfileSection orders={response.data || []} />;
}
