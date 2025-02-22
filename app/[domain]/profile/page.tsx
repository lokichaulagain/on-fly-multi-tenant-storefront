import ProfileSection from '@/components/profile-section'
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

export default async function Page() {
  const user = await currentUser();
  // const orders = await getOrdersOfaLoggedInUser();

  return (
    <div>
      <ProfileSection/>
    </div>
  )
}
