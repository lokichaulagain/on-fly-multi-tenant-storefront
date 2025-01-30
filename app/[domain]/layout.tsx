import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
// import CTA from "@/components/cta";
// import ReportAbuse from "@/components/report-abuse";
import { notFound, redirect } from "next/navigation";
// import { getSiteData } from "@/lib/fetchers";
// import { fontMapper } from "@/styles/fonts";
import { Metadata } from "next";
import { getStoreBySubdomain } from "@/actions/store";

// export default async function SiteLayout({ params, children }: { params: { domain: string }; children: ReactNode }) {
export default async function SiteLayout({ children, params }: { children: ReactNode; params: Promise<{ domain: string }> }) {

  const { domain } = await params;
//   const domain = "https://sss.fenzora.com";
  console.log(domain, "This is domain");
  //   //   const decodedDomain = decodeURIComponent(domain);
    const subdomain = domain.replace(/^https?:\/\//, "").split(".")[0];
    console.log(subdomain, "This is subdomain");

  //   console.log(subdomain, "This is domain");
  const response = await getStoreBySubdomain(subdomain);
  console.log(response, "This is response");

  if (!response) {
    notFound();
  }

  //   // Optional: Redirect to custom domain if it exists
  //   if (domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) && data.customDomain && process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true") {
  //     return redirect(`https://${data.customDomain}`);
  //   }

  return (
    // <div className={fontMapper[data.font]}>
    //   <div className="ease left-0 right-0 top-0 z-30 flex h-16 bg-white transition-all duration-150 dark:bg-black dark:text-white">
    //     <div className="mx-auto flex h-full max-w-screen-xl items-center justify-center space-x-5 px-10 sm:px-20">
    //       <Link
    //         href="/"
    //         className="flex items-center justify-center">
    //         <div className="inline-block h-8 w-8 overflow-hidden rounded-full align-middle">
    //           <Image
    //             alt={data.name || ""}
    //             height={40}
    //             src={data.logo || ""}
    //             width={40}
    //           />
    //         </div>
    //         <span className="ml-3 inline-block truncate font-title font-medium">{data.name}</span>
    //       </Link>
    //     </div>
    //   </div>

    //   <div className="mt-20">{children}</div>

    //   {domain == `demo.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` || domain == `platformize.co` ? <CTA /> : <ReportAbuse />}
    // </div>

    <div>
      <div className="mt-20">


       {response && <div>
      
            <p>{response.data?.id}</p>
            <p>{response.data?.store_name}</p>
            <p>{response.data?.store_phone_number}</p>
            <p>{response.data?.store_subdomain}</p>
            <p>{response.data?.user_id}</p>
            <p>{response.data?.store_status}</p>
            
        </div>}
        
        
        
        
        
        
        {children}</div>
    </div>
  );
}
