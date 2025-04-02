import Header from './header';
import CookieConsent from '../components/CookieConsent';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <CookieConsent />
      <Footer />
    </main>
  );
}
