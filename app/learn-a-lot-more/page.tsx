import CookieConsent from "@/app/components/CookieConsent";
import NavbarThree from "@/app/v4/navbar-v4";

export default function LearnALotMore() {
  return (
    <main className="flex flex-col items-center justify-between">
      <NavbarThree />
      
      <h1 className="text-3xl font-bold mt-10">Learn a Lot More</h1>
      
      <div className="mt-8 max-w-4xl px-4">
        <p className="text-lg">
          Both Climatebase and Terra.do provide resources and information that can help you dive deeper into the world of 
          climate action and sustainability. Explore the platforms for more educational resources and opportunities.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Climatebase</h2>
        <p className="text-lg mt-2">
          Climatebase is a great resource for finding organizations and jobs that are shaping a climate-positive future.
          <a href="https://climatebase.org/" className="text-blue-500 hover:underline">Explore Climatebase</a>
        </p>

        <h2 className="text-2xl font-semibold mt-8">Terra.do</h2>
        <p className="text-lg mt-2">
          Terra.do offers an excellent platform for learning about climate change and taking action towards climate solutions.
          <a href="https://terra.do" className="text-blue-500 hover:underline">Explore Terra.do</a>
        </p>
      </div>

      <CookieConsent />
    </main>
  );
}
