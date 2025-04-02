import Header from './components/Header';
import CookieConsent from './components/CookieConsent';
import Footer from './components/Footer';
import FeedbackButton from './components/FeedBack';
import WhyItMatters from './components/WhyItMatters';
import FixedSocialIcon from './components/FixedSocialIcon';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <WhyItMatters />
      <CookieConsent />
      <FixedSocialIcon />
      <Footer />
      <FeedbackButton />
    </main>
  );
}
