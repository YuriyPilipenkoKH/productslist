import authConfig from "../auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth({
  ...authConfig,
});

export default auth(async (req) => {
// custom middleware logic
// console.log('Middleware called' , req.nextUrl.pathname);
// console.log(req.auth);

})

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ]
};