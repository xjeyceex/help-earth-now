import CookieConsent from '@/app/components/CookieConsent';
import Who from './who';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Who />
      <CookieConsent />
    </main>
  );
}
