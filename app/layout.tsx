import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocationProvider from "./location-provider";
import AuthProvider from "./components/AuthProvider";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Session } from 'next-auth';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Climate change is hurting us all",
  description: "Be informed of current political agenda relevant to you and your location",
};

interface RootLayoutProps {
  children: React.ReactNode;
  session?: Session; 
}

export default function RootLayout({
  children,
  session,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <AuthProvider session={session}>
            <LocationProvider>
              {children}
            </LocationProvider>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}