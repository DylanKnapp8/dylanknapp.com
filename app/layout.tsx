import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dylanknapp.com"),
  title: "Dylan Knapp | Developer & Founder",
  description:
    "Dylan Knapp builds apps and digital products. Explore RepQuest and selected projects through Quoia.",
  keywords: [
    "Dylan Knapp",
    "RepQuest",
    "Quoia",
    "App Developer",
    "Student Entrepreneur",
    "React Native",
    "Supabase",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dylan Knapp | Developer & Founder",
    description:
      "Dylan Knapp builds apps and digital products. Explore RepQuest, Quoia, and his approach to building.",
    url: "https://dylanknapp.com",
    siteName: "Dylan Knapp",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dylan Knapp — developer and founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dylan Knapp | Developer & Founder",
    description:
      "Dylan Knapp builds apps and digital products. Explore RepQuest and Quoia.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf9f6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
