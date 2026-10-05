import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, Syne, UnifrakturMaguntia } from "next/font/google";
import { site } from "@/content/site";
import { AmbientAudio } from "@/components/AmbientAudio";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const display = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const gothic = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.title}`,
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.title}`,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable} ${gothic.variable}`}
    >
      <body className="min-h-screen font-sans">
        <AmbientAudio />
        {children}
      </body>
    </html>
  );
}
