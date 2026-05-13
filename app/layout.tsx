import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/app/lib/cart";

export const metadata: Metadata = {
  title: "DRVN — Clothing & Gadgets",
  description: "Premium clothing and gadgets store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-[#0c0c0c] text-white antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
