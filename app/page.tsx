import Header from "./v4/header";
import NavbarThree from "./v4/navbar-v4";
import CookieConsent from "./components/CookieConsent";
import Footer from "./components/Footer";
import FeedbackButton from "./components/FeedBack";
import WhyItMatters from "./components/WhyItMatters";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree/>
      <Header />
      <WhyItMatters/>
      <CookieConsent/>
      <Footer/>
      <FeedbackButton/>
    </main>
  );
}
