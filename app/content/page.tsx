import CookieConsent from "../components/CookieConsent";
import NavbarTwo from "../navbar-two";
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
