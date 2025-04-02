import CookieConsent from '@/app/components/CookieConsent';
import Navbar from './components/Navbar';
import ActionTable from '../components/AdditionalInformation';
import FeedbackButton from '../components/FeedBack';
import BackButton from '../components/BackButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <BackButton />
      <ActionTable />
      <CookieConsent />
      <FeedbackButton />
    </main>
  );
}
