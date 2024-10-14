import CookieConsent from "@/app/components/CookieConsent";
import LocationAndEmail from "@/app/email-input";
import NavbarThree from "../navbar-v4";
import Who from "./who";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree/>
      <Who/>
      <CookieConsent/>
      {/* <LocationAndEmail/> */}
    </main>
  );
}
