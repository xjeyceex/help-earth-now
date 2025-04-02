import AdminPanel from './admin-panel';
import CookieConsent from '@/app/components/CookieConsent';

export default function Admin() {
  return (
    <>
      <CookieConsent />
      <AdminPanel />
    </>
  );
}
