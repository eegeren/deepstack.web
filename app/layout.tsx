import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NIVRA — AI Infrastructure Engineer",
  description: "Evidence-driven, policy-controlled AI for AWS and Linux infrastructure operations.",
  metadataBase: new URL("https://nivra.ai"),
  openGraph: { title: "NIVRA — Your AI Infrastructure Engineer", description: "Understand, secure and safely operate your cloud infrastructure.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "NIVRA — Your AI Infrastructure Engineer" }] },
  twitter: { card: "summary_large_image", title: "NIVRA — AI Infrastructure Engineer", description: "Evidence-driven. Policy-controlled. Verified.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
