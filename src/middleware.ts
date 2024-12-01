
// import { clerkMiddleware } from '@clerk/nextjs/server'

// export default clerkMiddleware()

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }








// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher([
//   '/dashboard(.*)'
// ]);

// const middleware = clerkMiddleware(async (auth, req) => {
//   const { userId } = await auth(); // Await the `auth` to retrieve the user ID

//   if (isProtectedRoute(req) && !userId) {
//     // Redirect to sign-in if the user is not authenticated
//     return NextResponse.redirect("/auth/signin");
//   }

//   // Continue to the requested page if the user is authenticated or route is not protected
//   return NextResponse.next();
// });

// export default middleware;

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };
