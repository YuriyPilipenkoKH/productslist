import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentia nls";
import type { NextAuthConfig } from "next-auth"
 
export default {
    providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allow redirecting only to allowed paths
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
} satisfies NextAuthConfig;