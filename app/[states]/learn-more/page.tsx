import CookieConsent from "@/app/components/CookieConsent";
import NavbarThree from "../navbar-v3";
import ActionTable from "@/app/components/AdditionalInformation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavbarThree/>
      <ActionTable/>
      <CookieConsent/>
    </main>
  );
}
