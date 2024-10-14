import Header from "./header";
import NavbarThree from "./navbar-v4";
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import FeedbackButton from "../components/FeedBack";
import FixSocialIcon from "../components/FixSocialIcon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree/>
      <Header />
      <CookieConsent/>
      <FixSocialIcon/>
      <Footer/>
      <FeedbackButton/>
    </main>
  );
}
