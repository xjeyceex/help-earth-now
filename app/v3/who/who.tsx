import Footer from "@/app/components/Footer";
import Link from "next/link";
import React from "react";

// Data for mapping
const candidates = [
  {
    group: 'President',
    items: [
      {
        name: 'Kamala Harris',
        rating: '90% from LCV.',
        description: 'Calls climate crisis an urgent issue and promoted the IRA - spending $20B to fight climate change',
        link: 'https://www.whitehouse.gov/briefing-room/speeches-remarks/2023/07/14/remarks-by-vice-president-harris-on-combatting-climate-change-and-building-a-clean-energy-economy/',
        positive: true,
      },
      {
        name: 'Donald Trump',
        rating: '30% from LCV.',
        description: 'Pulled U.S. out of the Paris Agreement and rolled back efforts to fight climate change',
        link: 'https://www.npr.org/2024/06/25/nx-s1-5006573/trump-election-2024-climate-change-fossil-fuels',
        positive: false,
      },
    ],
  },
  {
    group: 'Senate',
    items: [
      {
        name: 'Debbie Mucarsel-Powell',
        rating: '85% from LCV.',
        description: 'Strong proponent of addressing climate change; emphasizes its impact on communities.',
        link: 'https://www.npr.org/2024/06/25/nx-s1-5006573/trump-election-2024-climate-change-fossil-fuels',
        positive: true,
      },
      { 
        name: 'Rick Scott', 
        rating: '40% from LCV.', 
        description: 'Generally skeptical of climate change; prioritizes economic interests.', 
        positive: false,
        link: 'https://www.politifact.com/article/2015/mar/11/fact-checking-rick-scott-environment-and-sea-level/'
      },
      { name: 'Joe Manchin', 
        rating: 'Moderate ratings from environmental groups ', 
        description: 'Advocates for energy independence, recognizes climate issues.', 
        positive: true,
        link: 'https://www.vox.com/climate/23955967/joe-manchin-climate-change-senate-biden-inflation'
      },
      { name: 'Catherine Cortez Masto', 
        rating: 'High ratings from environmental advocates ',
        description: 'Strong advocate for renewable energy and climate action ',  
        positive: true,
        link: 'https://www.cortezmasto.senate.gov/news/press-releases/cortez-masto-introduces-legislation-to-create-a-national-climate-service-corps/'
      },
      { name: 'Sherrod Brown', 
        rating: 'High ratings from environmental advocates ', 
        description: 'Advocates for sustainable jobs and clean energy transition',
        positive: true,
        link: 'https://www.brown.senate.gov/newsroom/press/release/brown-climate-change-threat-economy'
      },
      { name: 'Jon Tester', 
        rating: 'Discusses importance of conservation', 
        description: 'Supports renewable energy, emphasizes resource extraction',
        positive: true,
        link: 'https://www.tester.senate.gov/about/issues/energy/'
      },
      { name: 'Tammy Baldwin', 
        rating: 'High ratings from environmental groups', 
        description: 'Strong advocate for climate action and renewable energy',
        positive: true,
        link: 'https://www.baldwin.senate.gov/news/press-releases/us-senator-tammy-baldwin-helps-introduce-legislation-to-achieve-net-zero-greenhouse-gas-emissions'
      },
      { name: 'Matt Gaetz', 
        rating: '25% from LCV.', 
        description: 'Skeptical of climate change; focuses on economic growth.',
        positive: false,
        link: ''
      },
    ],
  },
  {
    group: 'House of Representatives',
    items: [
      {
        name: 'Gay Valimont',
        rating: '90% from LCV.',
        description: 'Strong advocate for climate action; emphasizes urgency in addressing climate change.',
        link: 'https://www.npr.org/2024/06/25/nx-s1-5006573/trump-election-2024-climate-change-fossil-fuels',
        positive: true,
      },
    ],
  },
];

export default function Who() {
  return (
    <>
      <div className="grid grid-cols-3 who-help" id="who">
        {candidates.map((group, groupIndex) => (
          <React.Fragment key={group.group}> 
            {/* Group Header */}
            <div
              className={`flex items-center justify-center text-center who-help-${groupIndex + 1} p-4 md:p-8 row-span-${group.items.length}`}
            >
              {group.group}
            </div>

            {/* Candidate Items */}
            {group.items.map((candidate, itemIndex) => {
              // Determine the class based on positive or negative rating
              const ratingClass = candidate.positive ? "who-1" : "who-2";
              // Generate dynamic class name based on group and item index
              const dynamicClass = `who-${groupIndex + 1}-${candidate.positive ? "1" : "2"}`;

              return (
                <div
                  key={`${group.group}-${candidate.name}-${itemIndex}`} // Ensure this key is unique
                  className={`col-span-2 ${ratingClass} ${dynamicClass} p-4 md:p-8`}
                >
                  {candidate.name} - Rating: {candidate.rating} {"- "}
                  {candidate.link ? (
                    <Link
                      href={candidate.link}
                      className="underline"
                      target="_blank"
                    >
                      {candidate.description}
                    </Link>
                  ) : (
                    candidate.description || ""
                  )}
                </div>
              );
            })}
          </React.Fragment> 
        ))}
      </div>
      <Footer />
    </>
  );
}
