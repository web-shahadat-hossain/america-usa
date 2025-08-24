import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LayoutWrapper from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "America to BD - Trusted Shipping from USA to Bangladesh",
  description:
    "America to BD provides reliable, affordable, and fast international courier services from the USA to Bangladesh. Track your shipments easily and enjoy seamless delivery.",
  keywords: [
    "America to BD",
    "USA to Bangladesh shipping",
    "international courier service",
    "package tracking",
    "shipping from America",
    "Bangladesh delivery",
  ],
  openGraph: {
    title: "America to BD - Trusted Shipping from USA to Bangladesh",
    description:
      "Reliable and affordable shipping services from the USA to Bangladesh. Track your orders and get fast delivery with America to BD.",
    url: "https://www.americatobd.com",
    siteName: "America to BD",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "America to BD - Trusted Shipping from USA to Bangladesh",
    description:
      "Fast and reliable international courier services from the USA to Bangladesh with America to BD.",
    site: "@AmericaToBD",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <LayoutWrapper> {children}</LayoutWrapper>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
