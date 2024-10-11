import CookieConsent from "@/app/components/CookieConsent";
import NavbarTwo from "../navbar-v3";
import Who from "./who";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarTwo/>
      <Who/>
      <CookieConsent/>
    </main>
  );
}
