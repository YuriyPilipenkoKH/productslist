import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

 
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)'
])

// export default clerkMiddleware((auth, req) => {
//   if(isProtectedRoute(req)) auth().protect()
// })
const middleware = clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export default middleware;


export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};