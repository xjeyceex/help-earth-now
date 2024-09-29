import Header from "./header";
import What from "./what/what";
import Who from "./who/who";
import Navbar from "./navbar";
import NavbarTwo from "./navbar-two";
import CookieConsent from "./components/CookieConsent";
import LocationAndEmail from "./email-input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarTwo/>
      <Header />
      <What />
      <Who />
      <CookieConsent/>
      <LocationAndEmail/>
    </main>
  );
}
