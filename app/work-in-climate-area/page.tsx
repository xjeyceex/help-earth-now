import CookieConsent from "@/app/components/CookieConsent";
import NavbarThree from "@/app/v4/navbar-v4";

export default function WorkInClimateArea() {
  return (
    <main className="flex flex-col items-center justify-between">
      <NavbarThree />
      
      <h1 className="text-3xl font-bold mt-10">Work in the Climate Area</h1>
      
      <div className="mt-8 max-w-4xl px-4">
        <p className="text-lg">
          Climatebase and Terra.do are two companies doing amazing work in the climate space. 
          Below, you can explore more about their efforts and opportunities in the climate sector.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Climatebase</h2>
        <p className="text-lg mt-2">
          Climatebase is the platform for climate action, connecting people to climate-positive job opportunities. {' '}
          <a href="https://climatebase.org/" className="text-blue-500 hover:underline">Visit Climatebase</a>
        </p>

        <h2 className="text-2xl font-semibold mt-8">Terra.do</h2>
        <p className="text-lg mt-2">
          Terra.do offers climate education, green skills, and climate careers, helping individuals learn about climate change 
          and take action towards solutions. {' '}
          <a href="https://terra.do" className="text-blue-500 hover:underline">Visit Terra.do</a>
        </p>
      </div>

      <CookieConsent />
    </main>
  );
}
