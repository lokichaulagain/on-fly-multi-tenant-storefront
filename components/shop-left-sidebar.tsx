import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";


export default async function ShopLeftSideBar() {

    const collections=[
        {
            id:1,
            name:"Category 1",
        },
        {
            id:2,
            name:"Category 2",
        },
        {
            id:3,
            name:"Category 3",
        },
        {
            id:4,
            name:"Category 4",
        },
        {
            id:5,
            name:"Category 5",
        },
        {
            id:6,
            name:"Category 6",
        },
        {
            id:7,
            name:"Category 7",
        },


    ]
 

  return (
    <>
      <Accordion
        type="multiple"
        className="w-full">


          <div>
          <p className=" text-lg font-medium flex items-center justify-between w-full ">Collections </p>
          <Separator/>

          </div>
     
        <AccordionItem value="item-2">
          <AccordionTrigger className=" text-lg font-medium flex items-center justify-between w-full ">Collections </AccordionTrigger>
          <AccordionContent>
            {collections &&
              collections.map((collection) => (
                <Link
                  href={`/shop?collection=${collection.id}`}
                  key={collection.id}
                //   className={`${selectedCollectionId == collection.id ? " text-primary font-medium" : " "} flex items-center mb-1 cursor-pointer hover:text-orange-500 transition-all ease-in-out duration-300`}>
                  className={`${2 == collection.id ? " text-primary font-medium" : " "} flex items-center mb-1 cursor-pointer hover:text-orange-500 transition-all ease-in-out duration-300`}>
                  {" "}
                  <ChevronRight size={16} /> {collection.name} 
                </Link>
              ))}
          </AccordionContent>
        </AccordionItem>
        {/* 
        <AccordionItem value="item-3">
          <AccordionTrigger className=" text-lg font-medium ">Collections</AccordionTrigger>
          <AccordionContent>
            {collections &&
              collections.map((collection) => (
                <p
                  key={collection.id}
                  className="flex items-center mb-1 cursor-pointer hover:text-orange-500 transition-all ease-in-out duration-300">
                  {" "}
                  <ChevronRight size={16} /> {collection.name}
                </p>
              ))}
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </>
  );
}