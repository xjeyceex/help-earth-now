import React from 'react';
import Footer from './Footer';

interface ActionItem {
  action: string;
  description: string;
  link: string;
}

const actionItems: ActionItem[] = [
  {
    action: "Use Less Energy",
    description: "Turn off lights and appliances when not in use—saving the planet and your electric bill feels good!",
    link: "https://www.greenpeace.org/usa/issues/renewable-energy/",
  },
  {
    action: "Reduce, Reuse, Recycle",
    description: "Embrace the three Rs—Reduce, Reuse, Recycle. You'll feel better, and so will the planet.",
    link: "https://www.greenpeace.org/aotearoa/story/never-buy-gift-paper-again-the-ultimate-guide-to-zero-waste-wrapping/",
  },
  {
    action: "Plant a Tree, Hug One Too",
    description: "Trees absorb CO2 and help reduce air pollution. You can plant one, or donate to reforestation efforts.",
    link: "https://www.nature.org/en-us/what-we-do/our-insights/perspectives/funding-trees-for-health/",
  },
  {
    action: "Vote for the Planet",
    description: "Support leaders and policies that prioritize environmental protection and sustainable energy.",
    link: "https://www.greenpeace.org/usa/voteclimate2024p/",
  },
  {
    action: "Support Local, Live Global",
    description: "Buy local produce to cut down on food transportation emissions. Plus, farmers’ markets are a great excuse to get outside.",
    link: "https://www.carbonbrief.org/food-miles-have-larger-climate-impact-than-thought-study-suggests/",
  },
  {
    action: "Power Down, Save Up",
    description: "Use energy-efficient appliances and switch to renewable energy. Your electricity bill will love you.",
    link: "https://www.greenpeace.org/usa/fighting-climate-chaos/renewable-energy-future/",
  },
  {
    action: "Educate Yourself and Others",
    description: "Stay informed about climate issues and share what you learn with friends and family. Knowledge is power!",
    link: "https://science.nasa.gov/climate-change/",
  },
  {
    action: "Stay Hydrated, Save Water",
    description: "Fix leaks, install low-flow fixtures, and be mindful of water use.",
    link: "https://www.epa.gov/watersense/start-saving",
  },
  {
    action: "Keep Your Vehicle Well-Maintained",
    description: "Regularly service your car to ensure it runs efficiently, which can help reduce emissions. Check your tire pressure regularly too!",
    link: "https://www.greenpeace.org/international/story/23992/how-car-companies-are-speeding-us-towards-a-climate-crash-and-what-we-can-do-to-stop-them/",
  }
];

const ActionTable: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full ">
      {/* Main header */}
      <header className="bg-green-600 text-white py-16 text-center">
        <h1 className="text-5xl font-bold">Saving the Planet: No Cape, Just Common Sense</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">Practical steps you can take today to make a real difference in protecting our planet.</p>
      </header>

      {/* Section with additional actions */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Additional Things You Can Do</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actionItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-green-600">{item.action}</h3>
              <p className="text-gray-700 mt-2">{item.description}</p>
              <a
                href={item.link}
                className="text-blue-500 hover:underline mt-4 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>
    <Footer/>
    </div>
  );
};

export default ActionTable;
