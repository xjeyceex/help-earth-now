import Header from "./v3/header";
import What from "./v3/what/what";
import NavbarThree from "./v3/navbar-v3";
import CookieConsent from "./components/CookieConsent";
import Footer from "./components/Footer";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree/>
      <Header />
      <What />
      <CookieConsent/>
      <Footer/>
    </main>
  );
}
