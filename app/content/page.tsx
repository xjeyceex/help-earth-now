import AdminNavbar from "../components/AdminNavbar";
import CookieConsent from "../components/CookieConsent";
import ContentManagement from "./content-management"

export default function Content() {
  return (
    <>
      <AdminNavbar/>
      <ContentManagement/>
      <CookieConsent/>
    </>
  );
}
