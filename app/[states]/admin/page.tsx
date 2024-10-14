import AdminPanel from './admin-panel';
import CookieConsent from '@/app/components/CookieConsent';
import NavbarThree from '../navbar-v3';

export default function Admin() {

  return (
    <>
      <CookieConsent/>
      <NavbarThree/>
      <AdminPanel/>
    </>
  );
}
