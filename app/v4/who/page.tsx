import CookieConsent from "@/app/components/CookieConsent";
import NavbarThree from "../navbar-v4";
import Who from "./who";
import BackButton from "@/app/components/BackButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <BackButton/>
      <NavbarThree/>
      <Who/>
      <CookieConsent/>
    </main>
  );
}
