import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { NextThemeProvider } from "@/providers/NextThemeProvider";
import NavBar from "@/components/NavBar";
import Container from "@/components/Container/Container";
import { options } from "@/lib/hotToast";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Products list",
  description: "Generated by Yurik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      suppressHydrationWarning>
      <body className={inter.className}>
        <NextThemeProvider>
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
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}
