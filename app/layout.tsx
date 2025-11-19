import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@coinbase/onchainkit/styles.css'; 

const inter = Inter({ subsets: ["latin"] });

// !!! PENTING: GANTI DENGAN URL VERCEL ANDA SETELAH DEPLOY !!!
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "https://circle-bridge-web.vercel.app";

export const metadata: Metadata = {
  title: "Circle Bridge on Base",
  description: "Transfer USDC from Base to ETH instantly",

  openGraph: {
    title: "Circle Bridge on Base",
    description: "Transfer USDC from Base to ETH instantly",
    url: NEXT_PUBLIC_URL,
    siteName: "Circle Bridge",
    images: [
      {
        url: `${NEXT_PUBLIC_URL}/opengraph-image.png`, 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // TAGS WAJIB FARCASTER FRAME vNext
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${NEXT_PUBLIC_URL}/opengraph-image.png`,
    "fc:frame:button:1": "Launch Bridge App",
    "fc:frame:button:1:action": "link", 
    "fc:frame:button:1:target": NEXT_PUBLIC_URL, 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
