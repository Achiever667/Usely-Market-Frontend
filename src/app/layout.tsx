import type { Metadata } from "next";
import { Barlow, Poppins } from "next/font/google";

import { AppProvider } from "@/providers/app-provider";

import "./globals.css";

/**
 * Barlow — headings (h1–h6).
 * Loaded via next/font for self-hosting: no external network request,
 * no layout shift, automatic preloading.
 */
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/**
 * Poppins — body text, paragraphs, descriptions, UI labels.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Usely Market",
    template: "%s | Usely Market",
  },
  description: "A production-grade marketplace for trusted products, vendors, and customer commerce.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Inject both font CSS variables onto <html> so they're available
      // project-wide via var(--font-barlow) and var(--font-poppins).
      className={`${barlow.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
