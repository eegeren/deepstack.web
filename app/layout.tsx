import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeepStack — Your AI Infrastructure Engineer",
  description: "DeepStack connects to Linux, Windows Server, and AWS infrastructure to discover systems, detect security risks, investigate incidents, and build safe remediation plans.",
  metadataBase: new URL("https://nivra.ai"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", apple: "/icon.png" },
  openGraph: { title: "DeepStack — Your AI Infrastructure Engineer", description: "Bounded infrastructure discovery, security analysis, investigation, and safe remediation planning for Linux, Windows Server, and AWS.", type: "website", url: "/", images: [{ url: "/og.png", width: 1200, height: 630, alt: "DeepStack — Your AI Infrastructure Engineer" }] },
  twitter: { card: "summary_large_image", title: "DeepStack — Your AI Infrastructure Engineer", description: "Understand your infrastructure before you touch it.", images: ["/og.png"] },
  other: { "theme-color": "#090b09" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
