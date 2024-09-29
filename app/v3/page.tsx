import Header from "./header";
import What from "../what";
import Who from "../who";
import NavbarTwo from "./navbar-v2";
import CookieConsent from "../components/CookieConsent";
import LocationAndEmail from "../email-input";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarTwo/>
      <Header />
      <CookieConsent/>
      <Footer/>
      {/* <LocationAndEmail/> */}
    </main>
  );
}
