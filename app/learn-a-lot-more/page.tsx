import Link from 'next/link';
import CookieConsent from '@/app/components/CookieConsent';

export default function LearnALotMore() {
  return (
    <main className="flex flex-col items-center justify-between">
      <h1 className="text-3xl font-bold mt-10">Learn a Lot More</h1>

      <div className="mt-8 max-w-4xl px-4">
        <p className="text-lg">
          Both Climatebase and Terra.do provide resources and information that
          can help you dive deeper into the world of climate action and
          sustainability. Explore the platforms for more educational resources
          and opportunities.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Climatebase</h2>
        <p className="text-lg mt-2">
          Climatebase is a great resource for finding organizations and jobs
          that are shaping a climate-positive future.{' '}
          <Link
            href="https://climatebase.org/"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Climatebase
          </Link>
        </p>

        <h2 className="text-2xl font-semibold mt-8">Terra.do</h2>
        <p className="text-lg mt-2">
          Terra.do offers an excellent platform for learning about climate
          change and taking action towards climate solutions.{' '}
          <Link
            href="https://terra.do"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Terra.do
          </Link>
        </p>

        <h2 className="text-2xl font-semibold mt-8">Insightful Resources</h2>
        <p className="text-lg mt-2">
          Discover more about climate communication and solutions through
          insights shared by climate scientists like{' '}
          <Link
            href="https://bsky.app/profile/katharinehayhoe.com/post/3lcg2zsx72226"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Katharine Hayhoe
          </Link>
          . This post provides a thought-provoking perspective on climate
          action.
        </p>
      </div>

      <CookieConsent />
    </main>
  );
}
