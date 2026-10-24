import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { Motion } from "@/components/motion";
import "./globals.css";
const sans = localFont({
  src: [
    { path: "../public/fonts/dm-sans-300.ttf", weight: "300" },
    { path: "../public/fonts/dm-sans-400.ttf", weight: "400" },
    { path: "../public/fonts/dm-sans-500.ttf", weight: "500" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const display = localFont({
  src: "../public/fonts/barlow-condensed-800.ttf",
  weight: "800",
  variable: "--font-display",
  display: "swap",
});
const serif = localFont({
  src: "../public/fonts/instrument-serif-italic.ttf",
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});
export const metadata: Metadata = {
  title: "CHAAYRS.CREATES — Cha Yorsua, Creative Strategist & Creator",
  description:
    "Creative strategy, UGC, and AI storytelling by Cha Yorsua. Explore Trish Morikawa, beauty and skincare content, and the thinking behind the creative.",
  openGraph: {
    title: "CHAAYRS.CREATES",
    description:
      "The mind behind the creative. Strategy, UGC, and AI storytelling by Cha Yorsua.",
    type: "website",
    locale: "en_PH",
  },
};
export const viewport: Viewport = { themeColor: "#130F14" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${display.variable} ${serif.variable}`}
      >
        {children}
        <Suspense fallback={null}>
          <Motion />
        </Suspense>
      </body>
    </html>
  );
}
