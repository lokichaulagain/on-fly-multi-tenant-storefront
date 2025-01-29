// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { readSiteDomain } from "./utils/actions/sites/read-site-domain";

// // Define the routes that require authentication
// const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);

// // Main middleware function
// export default clerkMiddleware(async (auth, req) => {
//   // Check if the route is protected and enforce authentication if it is
//   if (isProtectedRoute(req)) auth().protect();

//   const url = req.nextUrl;
//   const pathname = url.pathname;

//   // Get hostname (e.g., 'mike.com', 'test.mike.com')
//   const hostname = req.headers.get("host");

//   console.log("Hostname:", hostname);

//   let currentHost;
//   if (process.env.NODE_ENV === "production") {
//     // Production logic remains the same
//     const baseDomain = process.env.BASE_DOMAIN;
//     currentHost = hostname?.replace(`.${baseDomain}`, "");
//   } else {
//     // Updated development logic
//     currentHost = hostname?.split(":")[0].replace(".localhost", "");
//   }
//   // If there's no currentHost, likely accessing the root domain, handle accordingly
//   if (!currentHost) {
//     // Continue to the next middleware or serve the root content
//     return NextResponse.next();
//   }

//   // Fetch tenant-specific data based on the hostname
//   const response = await readSiteDomain(currentHost);

//   if (!Array.isArray(response) || response.length === 0) {
//     return NextResponse.next();
//   }

//   // Handle the case where no domain data is found
//   if (!response || !response.length) {
//     // Continue to the next middleware or serve the root content
//     return NextResponse.next();
//   }

//   const site_id = response[0]?.id;
//   const tenantSubdomain = response[0]?.subdomain;
//   //   const mainDomain = response[0]?.site_custom_domain;

//   // Determine which domain to use for rewriting
//   const rewriteDomain = tenantSubdomain; // || mainDomain;

//   console.log("Hostname:", hostname);
//   console.log("Current Host:", currentHost);
//   console.log("Rewrite Domain:", rewriteDomain);

//   if (rewriteDomain) {
//     // Rewrite the URL to the tenant-specific path, using the site_id
//     return NextResponse.rewrite(new URL(`/${site_id}${pathname}`, req.url));
//   }

//   // If no rewrite domain is found, continue to the next middleware
//   return NextResponse.next();
// });

// // Define which paths the middleware should run for
// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers.get("host")!.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  if (hostname.includes("---") && hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)) {
    hostname = `${hostname.split("---")[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    const session = await getToken({ req });
    if (!session && path !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (session && path == "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.rewrite(new URL(`/app${path === "/" ? "" : path}`, req.url));
  }

  // special case for `vercel.pub` domain
  if (hostname === "vercel.pub") {
    return NextResponse.redirect("https://vercel.com/blog/platforms-starter-kit");
  }

  // rewrite root application to `/home` folder
  if (hostname === "localhost:3000" || hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    return NextResponse.rewrite(new URL(`/home${path === "/" ? "" : path}`, req.url));
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
