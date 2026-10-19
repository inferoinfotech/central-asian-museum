import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

import { BackToTop } from "@/components/common/BackToTop";
import { CursorRing } from "@/components/common/CursorRing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://centralasianmuseum.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Central Asian Museum | Leh, Ladakh",
    template: "%s | Central Asian Museum",
  },
  description:
    "Explore centuries of art, culture, craftsmanship and stories shaped by the Silk Road at the Central Asian Museum, Leh, Ladakh.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
        <BackToTop />
        <CursorRing />
      </body>
    </html>
  );
}
