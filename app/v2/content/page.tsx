import CookieConsent from "@/app/components/CookieConsent";
import NavbarTwo from "../navbar-v2";
import ContentManagement from "./content-management"

export default function Content() {
  return (
    <>
      <NavbarTwo/>
      <ContentManagement/>
      <CookieConsent/>
    </>
  );
}
