"use state";
import React from "react";
import { SignOutButton, UserProfile } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function ProfileSection() {
  return (
    <div className="px-4 w-full md:max-w-4xl mx-auto mt-4 ">
      <Tabs
        defaultValue="orders"
        className="">
        <div className=" flex items-center justify-between">
          <TabsList className="flex justify-between">
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>

          <div className=" flex">
            <SignOutButton>
              <Button
                variant={"destructive"}
                className="w-full">
                Logout
              </Button>
            </SignOutButton>
          </div>
        </div>

        <TabsContent
          value="orders"
          className="w-full  border border-gray-200 rounded-md p-4 shadow-lg ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde similique laboriosam ipsa dolor sapiente molestiae possimus nulla est minima. Deleniti fugit ipsum ab tempore architecto iste nesciunt enim ratione, tenetur fugiat magni esse quae consequuntur perspiciatis tempora perferendis sequi hic debitis rem commodi consequatur! Porro illo hic impedit pariatur corporis esse, nihil voluptates repellat excepturi nemo doloribus veritatis sunt expedita earum necessitatibus voluptas, ipsa
          sapiente illum, error dicta voluptatem quisquam! Harum magnam velit quasi sunt saepe obcaecati odio adipisci non debitis, voluptate earum ea voluptates quia rem reprehenderit dolorem dicta excepturi optio praesentium officiis tenetur. Molestias omnis magni saepe! Esse magni ratione mollitia quasi. Vero quos ipsum ducimus at laborum ipsam, dolores laudantium fugiat tempora sequi facilis est incidunt laboriosam nemo aliquid officiis deserunt earum voluptas pariatur? Architecto fuga
          numquam quisquam, dignissimos suscipit quasi eius quod ad explicabo! Reprehenderit accusamus ad culpa vero. Nobis, veritatis recusandae sit libero, culpa nostrum sapiente iusto ab architecto hic officiis ea quae? Repudiandae aliquid necessitatibus corrupti nisi, harum, magnam asperiores illo vel dolores amet laborum nobis consequuntur ratione quis quaerat natus nam adipisci consectetur iusto deleniti, sint officia quia! Incidunt consequuntur dolorem esse itaque architecto laborum illo
          exercitationem minima dolor modi eaque perferendis sit vitae temporibus veniam odit eum error voluptatibus quis quam, asperiores tempora! Commodi quod ad nemo quibusdam, perferendis nisi corrupti! Similique expedita sequi qui amet laborum vel quisquam nulla rem laudantium explicabo voluptatem iste rerum harum ut eligendi, delectus, dolores quae quam id quo ex facilis impedit nihil? Dolore, nulla quae vitae recusandae deleniti atque nostrum iure magni eius quia natus consequatur
          repellat enim provident obcaecati rem aliquam non sequi accusantium exercitationem facere. Quidem ab temporibus numquam earum eius rerum, consequuntur debitis, aliquam nemo itaque perspiciatis placeat? Illo totam suscipit cupiditate ullam, vitae recusandae eos mollitia pariatur nemo nulla in deleniti.
        </TabsContent>
        <TabsContent value="profile">
          <UserProfile
            routing="hash"
            fallback={
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            }
            appearance={{
              variables: {
                colorPrimary: "#2563eb",
                borderRadius: "0.2rem",
              },
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
