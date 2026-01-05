import type { Metadata } from "next";
import { Poppins, Playfair_Display, Open_Sans, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-poppins',
});

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-playfair',
});

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-opensans',
});

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-space',
});

export const metadata: Metadata = {
  title: "RetailSync AI | AI-Powered Retail Ad Creation",
  description: "Create stunning, compliant retail media ads in minutes with AI-powered design assistance. Built for Tesco Retail Media Hackathon 2025.",
  keywords: ["retail media", "ad creation", "AI", "Tesco", "marketing", "compliance"],
  authors: [{ name: "RetailSync Team" }],
  openGraph: {
    title: "RetailSync AI",
    description: "AI-Powered Retail Ad Creation Platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable} ${openSans.variable} ${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
