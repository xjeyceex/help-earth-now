import CookieConsent from '@/components/CookieConsent';
import Who from './who';
import BackButton from '@/components/BackButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <BackButton />

      <Who />
      <CookieConsent />
    </main>
  );
}
