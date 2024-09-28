import CookieConsent from "../components/CookieConsent";
import LocationAndEmail from "../email-input";
import NavbarTwo from "../navbar-two";
import Who from "./who";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarTwo/>
      <Who/>
      <CookieConsent/>
      <LocationAndEmail/>
    </main>
  );
}
