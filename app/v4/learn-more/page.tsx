import CookieConsent from "@/app/components/CookieConsent";
import NavbarThree from "../navbar-v4";
import ActionTable from "../../components/AdditionalInformation";
import FeedbackButton from "../../components/FeedBack";
import BackButton from "../../components/BackButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree/>
      <BackButton/>
      <ActionTable/>
      <CookieConsent/>
      <FeedbackButton/>
    </main>
  );
}
