import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Libre_Baskerville,
  UnifrakturMaguntia,
} from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const blackletter = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-blackletter",
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
      className={`${mono.variable} ${serif.variable} ${blackletter.variable}`}
    >
      <body className="min-h-screen font-serif">{children}</body>
    </html>
  );
}
