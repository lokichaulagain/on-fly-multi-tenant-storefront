import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import PageBanner from "@/components/page-banner";

const banner1 = "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg";


export default function Page() {
  return (
    <div>
      <PageBanner
        image={banner1}
        title="ABOUT US"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
      />
      <section className="w-full md:w-9/12 mx-auto px-4 pt-8  space-y-20 relative">
        <div className="">
          <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h6 className="text-primary-400 font-semibold">About Us</h6>
                  <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                    <h2 className="text-secondary-900 text-3xl font-semibold sm:text-4xl">
                      The Tale of Our <span className=" text-primary-400">Achievement</span> Story
                    </h2>
                    <p className="text-secondary-600 tracking-wide leading-relaxed">Our story at Delia Nepal Cosmetics embodies resilience and collaboration. Through challenges and triumphs, we have forged a path of continuous growth and achievement.</p>
                  </div>
                </div>

                <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="w-full h-full p-3.5 rounded-xl border border-primary-100 hover:border-primary-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex min-h-36">
                    <h4 className="text-secondary-900/95 text-2xl font-bold font-manrope leading-9">3+ Years</h4>
                    <p className="text-secondary-500 tracking-wide leading-relaxed">Shaping Beauty Standards Together</p>
                  </div>

                  <div className="w-full p-3.5 rounded-xl border border-primary-100 hover:border-primary-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-secondary-900/95 text-2xl font-bold font-manrope leading-9">26+ Awards</h4>
                    <p className="text-secondary-500 tracking-wide leading-relaxed">Recognizing Our Dedication to Excellence</p>
                  </div>

                  <div className="w-full h-full p-3.5 rounded-xl border border-primary-100 hover:border-primary-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex min-h-36">
                    <h4 className="text-secondary-900/95 text-2xl font-bold font-manrope leading-9">99% Satisfaction</h4>
                    <p className="text-secondary-500 tracking-wide leading-relaxed">Reflecting Our Commitment to Customer Happiness</p>
                  </div>

                  <div className="w-full h-full p-3.5 rounded-xl border border-primary-100 hover:border-primary-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex min-h-36">
                    <h4 className="text-secondary-900/95 text-2xl font-bold font-manrope leading-9">125+ Products</h4>
                    <p className="text-secondary-500 tracking-wide leading-relaxed">Crafted with Precision and Care</p>
                  </div>
                </div>
              </div>
              <Link href={"/slugs"}>
                <Button className=" flex items-center gap-1 bg-primary-300 text-primary-600">
                  Explore Products{" "}
                  <ChevronRight
                    size={16}
                    className=" "
                  />{" "}
                </Button>
              </Link>
            </div>
            <div className="w-full lg:justify-start justify-center items-start flex">
              <div className="w-full h-full sm:bg-primary-100 md:pr-5 rounded-3xl sm:border border-primary-100 relative">
                <img
                  className="sm:mt-5 sm:ml-5 w-full h-full"
                  src="https://pagedone.io/asset/uploads/1717742431.png"
                  alt="about Us image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}