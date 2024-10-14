import AdminPanel from '@/app/v4/admin/admin-panel';
import CookieConsent from '@/app/components/CookieConsent';
import NavbarThree from '../navbar-v4';

export default function Admin() {

  return (
    <>
      <CookieConsent/>
      <NavbarThree/>
      <AdminPanel/>
    </>
  );
}
