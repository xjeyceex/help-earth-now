import CookieConsent from '@/app/components/CookieConsent';
import Navbar from '@/app/v4/navbar-v4';
import ActionTable from '@/app/components/AdditionalInformation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <ActionTable />
      <CookieConsent />
    </main>
  );
}
