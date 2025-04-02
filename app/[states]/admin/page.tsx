import AdminPanel from './admin-panel';
import CookieConsent from '@/app/components/CookieConsent';
import Navbar from '@/app/components/Navbar';

export default function Admin() {
  return (
    <>
      <CookieConsent />
      <Navbar />
      <AdminPanel />
    </>
  );
}
