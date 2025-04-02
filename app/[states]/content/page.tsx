import CookieConsent from '@/app/components/CookieConsent';
import Navbar from '@/app/components/Navbar';
import ContentManagement from './content-management';

export default function Content() {
  return (
    <>
      <Navbar />
      <ContentManagement />
      <CookieConsent />
    </>
  );
}
