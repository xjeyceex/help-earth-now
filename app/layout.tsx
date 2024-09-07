import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocationProvider from "./location-provider";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Climate change is hurting us all",
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
        <Theme>
          <LocationProvider>
            {children}
          </LocationProvider>
        </Theme>
      </body>
    </html>
  );
}
