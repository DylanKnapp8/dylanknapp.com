import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dylanknapp.com"),
  title: "Dylan Knapp | Founder of RepQuest | App Developer",
  description:
    "Personal website of Dylan Knapp, a high school student, app developer, and student entrepreneur building digital products and fitness tech.",
  keywords: [
    "Dylan Knapp",
    "Dylan Knapp",
    "RepQuest",
    "Sequoia Apps",
    "App Developer",
    "Student Entrepreneur",
    "React Native",
    "Supabase",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dylan Knapp | Founder of RepQuest | App Developer",
    description:
      "Personal website of Dylan Knapp, featuring app development, entrepreneurship, fitness tech, and software projects.",
    url: "https://dylanknapp.com",
    siteName: "Dylan Knapp",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dylan Knapp - Founder of RepQuest | App Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dylan Knapp | Founder of RepQuest | App Developer",
    description:
      "Personal website of Dylan Knapp, featuring app development, entrepreneurship, fitness tech, and software projects.",
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
  themeColor: "#02040a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${fraunces.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
