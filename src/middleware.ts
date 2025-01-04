import authConfig from "../auth.config";
import NextAuth from "next-auth";

const {auth} = NextAuth(authConfig)
export const config = {
  matcher: [

    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ]
};