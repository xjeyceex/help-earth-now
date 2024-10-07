import Header from "./header";
import What from "./what/what";
import Who from "../who";
import NavbarThree from "./navbar-v3";
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree/>
      <Header />
      <What/>
      <CookieConsent/>
      <Footer/>
    </main>
  );
}
