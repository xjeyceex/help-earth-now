import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/Footer';
import FeedbackButton from '@/components/FeedBack';
import WhyItMatters from '@/components/why-it-matters/WhyItMatters';
import Header from '@/components/header/Header';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <WhyItMatters />
      <CookieConsent />
      <Footer />
      <FeedbackButton />
    </main>
  );
}
