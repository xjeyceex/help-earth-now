import CookieConsent from "../components/CookieConsent";
import NavbarTwo from "../components/navbar-two";
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
