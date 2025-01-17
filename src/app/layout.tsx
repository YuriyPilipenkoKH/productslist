import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import NavBar from "@/components/NavBar";
import Container from "@/components/Container/Container";
import { options } from "@/lib/hotToast";
import { NextThemeProvider } from "@/providers/NextThemeProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Products list",
  description: "CRUD Next.js app",
};

export default async function RootLayout({
  children,
 }: Readonly<{
  children: React.ReactNode;
 }>) {
   return (
    <html lang="en"  suppressHydrationWarning >  
      <body className={inter.className}>
        <NextThemeProvider >
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
        </NextThemeProvider>
       </body>
    </html>
  );
}
