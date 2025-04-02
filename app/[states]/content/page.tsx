import CookieConsent from '@/app/components/CookieConsent';

import ContentManagement from './content-management';

export default function Content() {
  return (
    <>
      <ContentManagement />
      <CookieConsent />
    </>
  );
}
