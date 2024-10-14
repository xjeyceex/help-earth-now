import Header from "./header";
import What from "../v4/what/what";
import NavbarThree from "./navbar-v4";
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import FeedbackButton from "../components/FeedBack";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree/>
      <Header />
      <What/>
      <CookieConsent/>
      <Footer/>
      <FeedbackButton/>
    </main>
  );
}
