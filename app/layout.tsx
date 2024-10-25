import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocationProvider from "./components/location-provider";
import AuthProvider from "./components/AuthProvider";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { getSession } from 'next-auth/react';
import { Session } from "next-auth";
import Script from "next/script"; // Import Script

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Climate change is hurting us all",
  description: "Stay informed about climate change initiatives.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: RootLayoutProps) {
  const session: Session | null = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          {/* Google Analytics Script */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-JSGJDD1V6M"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JSGJDD1V6M');
            `}
          </Script>
          <AuthProvider session={session || undefined}>  
            <LocationProvider>
              {children}
            </LocationProvider>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
