import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// These routes are protected and require authentication to access
const isProtectedRoute = createRouteMatcher(["/profile(.*)"]);

// Combined middleware that protects routes and rewrites paths based on the hostname
export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Get the URL of the request
  const url = req.nextUrl;

  // Protect the routes that are protected
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Get hostname of request (e.g. demo.fenzora.com, demo.localhost:3000)
  let hostname = req.headers.get("host")!.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  console.log(hostname, "This is the hostname from middleware function");

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
  console.log(path, "This is the path from middleware function");

  const productionHostname = `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  const localHostnames = ["app.localhost:3000", "app.localhost:3001"]; // No protocol or trailing slashes

  // If the subdomain is app then redirect to the dashboard URL
  if (hostname === productionHostname || localHostnames.includes(hostname)) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL!);
  }

  // Special case for `fenzora.com` domain
  if (hostname === "fenzora.com") {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_ROOT_DOMAIN!);
  }

  // If we have static routes or API  these route should not be rewritten
  // const excludedPaths = ["/api", "/_next", "/_static", "/_vercel"];
  // const shouldRewrite = !excludedPaths.some((path) => url.pathname.startsWith(path));

  // if (shouldRewrite) {
  //   return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
  // }

   // Rewrite root application to `/home` folder
   if (hostname === "localhost:3000" || hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    return NextResponse.rewrite(new URL(`/home${path === "/" ? "" : path}`, req.url));
  }


  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});

export const config = {
  matcher: [
    // Match all paths except for:
    // 1. /api routes
    // 2. /_next (Next.js internals)
    // 3. /_static (inside /public)
    // 4. All root files inside /public (e.g. /favicon.ico)
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
