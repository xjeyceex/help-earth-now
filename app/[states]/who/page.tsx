import CookieConsent from '@/app/components/CookieConsent';
import Navbar from '@/app/components/Navbar';
import Who from './who';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <Who />
      <CookieConsent />
    </main>
  );
}
