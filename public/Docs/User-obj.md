To pass the user object or req.auth (session/user data) from your middleware to your application components 
-------------------------------------------
Approach 1: Use Context in the Middleware Response
You can attach the user data to the req object or set it in custom response headers for retrieval in your application.

Example Middleware
import authConfig from "../auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth({
  ...authConfig,
});

export default auth(async (req) => {
  const url = req.nextUrl.clone();
  
  // Get user data
  const user = req.auth?.user || null; // Assuming `req.auth` contains user

  console.log("Middleware called:", url.pathname);
  console.log("User data:", user);

  // If you need conditional redirects based on user authentication
  if (!user && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return Response.redirect(url);
  }

  // Attach user data to the request headers for use in pages
  const headers = new Headers(req.headers);
  if (user) {
    headers.set("x-user-data", JSON.stringify(user)); // Pass user data via custom headers
  }

  return new Response(null, { headers });
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
Retrieve Data in Your Page
You can access the custom headers in your Next.js API route or server components.
import { headers } from "next/headers";

export default function Dashboard() {
  const header = headers();
  const userData = header.get("x-user-data");
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {user ? <p>Hello, {user.name}</p> : <p>Please log in.</p>}
    </div>
  );
}
-------------------------------------------
Approach 2: Pass Data Using Middleware Cookies
Set the user data in a cookie within your middleware. This method is useful when you need persistence across multiple requests.

Middleware Example

import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user || null;

  console.log("Middleware called:", pathname);
  console.log("User:", user);

  if (!user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Store user in a cookie for the page to read
  const response = NextResponse.next();
  if (user) {
    response.cookies.set("user-data", JSON.stringify(user), {
      httpOnly: true,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/dashboard", "/((?!.+\\.[\\w]+$|_next).*)"],
};
Retrieve Data in the Component

import { cookies } from "next/headers";

export default function Dashboard() {
  const cookieStore = cookies();
  const userData = cookieStore.get("user-data");
  const user = userData ? JSON.parse(userData.value) : null;

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Welcome, {user.name}!</p> : <p>Please log in.</p>}
    </div>
  );
}
-------------------------------------------
Approach 3: Store Data in Session (Recommended for AuthJS)
You can pass the user data to a session in NextAuth and retrieve it in the server components or client-side

async function Dashboard() {
    // Fetch session 
  const session = await auth();
  console.log('session',session);
  if (!session) {
    redirect('/'); 
  }
  
  const {user} = session


}
-------------------------------------------