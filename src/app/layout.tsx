import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/features/CartSidebar";
import { SITE } from "@/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE.NAME,
  description: SITE.TAGLINE,
  openGraph: {
    title: SITE.NAME,
    description: SITE.TAGLINE,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <CartProvider>
          {children}
          <CartSidebar />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
