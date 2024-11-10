import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { Toaster } from "@/components/ui/toaster";

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
    images: [
      { url: "https://yourwebsite.com/og-image.jpg" }, // Replace with the actual URL to your Open Graph image
    ],
    url: "https://yourwebsite.com", // Replace with the actual URL of your site
  },
  twitter: {
    card: "summary_large_image", // The type of Twitter card to display (can be "summary", "summary_large_image", etc.)
    title: "inTech Blogs",
    description:
      "Join the tech community to share and discover the latest in AI, cybersecurity, software development, and more.",
    images: [
      { url: "https://yourwebsite.com/og-image.jpg" }, // Twitter card image
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
