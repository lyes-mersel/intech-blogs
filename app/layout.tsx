import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

const workSans = localFont({
  src: [
    { path: "./fonts/WorkSans-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/WorkSans-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/WorkSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/WorkSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/WorkSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/WorkSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/WorkSans-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/WorkSans-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/WorkSans-Thin.ttf", weight: "100", style: "normal" },
  ],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "inTech Blogs",
  description:
    "A platform for tech enthusiasts to share insights and stay up-to-date with the latest in AI, cybersecurity, and software development.",
  openGraph: {
    title: "inTech Blogs",
    description:
      "Join the tech community to share and discover the latest in AI, cybersecurity, software development, and more.",
    images: [{ url: "https://yourwebsite.com/og-image.jpg" }],
    url: "https://yourwebsite.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "inTech Blogs",
    description:
      "Join the tech community to share and discover the latest in AI, cybersecurity, software development, and more.",
    images: [{ url: "https://yourwebsite.com/og-image.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className={workSans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
