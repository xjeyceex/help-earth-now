import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocationProvider from "./location-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Climante change is hurting us all",
  description: "Be informed of current political agenda relevant to you and your location",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocationProvider>
          {children}
        </LocationProvider>
      </body>
    </html>
  );
}
