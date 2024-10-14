import CookieConsent from "@/app/components/CookieConsent";
import NavbarThree from "../navbar-v4";
import ContentManagement from "./content-management"

export default function Content() {
  return (
    <>
      <NavbarThree/>
      <ContentManagement/>
      <CookieConsent/>
    </>
  );
}
