import CookieConsent from "@/app/components/CookieConsent";
import LocationAndEmail from "@/app/email-input";
import NavbarTwo from "../navbar-v2";
import Who from "./who";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarTwo/>
      <Who/>
      <CookieConsent/>
      {/* <LocationAndEmail/> */}
    </main>
  );
}
