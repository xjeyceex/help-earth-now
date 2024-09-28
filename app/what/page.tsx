import CookieConsent from "../components/CookieConsent";
import LocationAndEmail from "../email-input";
import NavbarTwo from "../navbar-two";
import What from "./what";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarTwo/>
      <What/>
      <CookieConsent/>
      <LocationAndEmail/>
    </main>
  );
}
