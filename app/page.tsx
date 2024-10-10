'use client'

import { useEffect } from "react";
import Header from "./v3/header";
import What from "./v3/what/what";
import NavbarThree from "./v3/navbar-v3";
import CookieConsent from "./components/CookieConsent";
import Footer from "./components/Footer";

export default function Home() {
  useEffect(() => {
    const fetchSenators = async () => {
      try {
        const res = await fetch("/api/senators", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.log(`Failed to fetch senators, status: ${res.status}`);
        } else {
          const data = await res.json();
          console.log("Senators Data:", data); // Logs the data from the API
        }
      } catch (error) {
        console.error("Error fetching senators:", error);
      }
    };

    fetchSenators();
  }, []); // Empty array means it runs once when the component mounts

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree />
      <Header />
      <What />
      <CookieConsent />
      <Footer />
    </main>
  );
}
