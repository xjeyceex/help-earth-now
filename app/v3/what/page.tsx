import CookieConsent from "@/app/components/CookieConsent";
import What from "./what";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <What/>
      <CookieConsent/>
      {/* <LocationAndEmail/> */}
    </main>
  );
}
