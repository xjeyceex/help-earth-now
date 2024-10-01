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
        rating: 76,
        description: 'Calls climate crisis an urgent issue and promoted the IRA - spending $20B to fight climate change',
        link: 'https://www.whitehouse.gov/briefing-room/speeches-remarks/2023/07/14/remarks-by-vice-president-harris-on-combatting-climate-change-and-building-a-clean-energy-economy/',
        positive: true,
      },
      {
        name: 'Donald Trump',
        rating: -82,
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
        rating: 52,
        description: 'Strong proponent of addressing climate change; emphasizes its impact on communities.',
        link: 'https://www.npr.org/2024/06/25/nx-s1-5006573/trump-election-2024-climate-change-fossil-fuels',
        positive: true,
      },
      { 
        name: 'Rick Scott', 
        rating: 10, 
        description: 'Generally skeptical of climate change; prioritizes economic interests.', 
        positive: false,
        link: 'https://www.politifact.com/article/2015/mar/11/fact-checking-rick-scott-environment-and-sea-level/'
      },
      { name: 'Joe Manchin', rating: 10, positive: false },
      { name: 'Catherine Cortez Masto', rating: 12, positive: true },
      { name: 'Sherrod Brown', rating: 24, positive: true },
      { name: 'Jon Tester', rating: -12, positive: false },
      { name: 'Tammy Baldwin', rating: 65, positive: true },
      { name: 'Matt Gaetz', rating: -23, positive: false },
    ],
  },
  {
    group: 'House of Representatives',
    items: [
      {
        name: 'Gay Valimont',
        rating: 96,
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
                  {candidate.name} - Rating {candidate.rating}:{" "}
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
