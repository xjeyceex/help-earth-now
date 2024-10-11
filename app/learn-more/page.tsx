import CookieConsent from "@/app/components/CookieConsent";
import NavbarThree from "../v3/navbar-v3";
import ActionTable from "../components/AdditionalInformation";
import FeedbackButton from "../components/FeedBack";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree/>
      <ActionTable/>
      <CookieConsent/>
      <FeedbackButton/>
    </main>
  );
}
