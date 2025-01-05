import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import NavBar from "@/components/NavBar";
import Container from "@/components/Container/Container";
import { options } from "@/lib/hotToast";
// import { NextThemeProvider } from "@/providers/NextThemeProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Products list",
  description: "CRUD Next.js app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug?: string[] }; // Dynamic route segments
}>) {
  const currentPath = `/${params.slug?.join("/") || ""}`; // Construct the current path from params

  return (
    <html lang="en"  >  
      <body className={inter.className}>
        <SessionProvider>
        <Container>

          <NavBar 
          // searchParams={searchParams}
          />
          {children}
          <Toaster 
            position="top-center" 
            toastOptions={options} 
            gutter={24} />
        </Container>
            </SessionProvider>
       </body>
    </html>
  );
}
