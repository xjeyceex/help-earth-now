import CookieConsent from "@/app/components/CookieConsent";
import LocationAndEmail from "@/app/email-input";
import NavbarTwo from "../navbar-v3";
import What from "./what";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarTwo/>
      <What/>
      <CookieConsent/>
      {/* <LocationAndEmail/> */}
    </main>
  );
}
