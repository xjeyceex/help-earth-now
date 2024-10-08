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
        party: 'democratic',
      },
      {
        name: 'Donald Trump',
        rating: '30% from LCV.',
        description: "Trump's delay of a $19.1 billion disaster relief bill for North Carolina hindered vital flood mitigation, worsening the effects of Hurricane Herlene in 2023.",
        link: 'https://news.yahoo.com/news/damning-news-report-revives-questions-104558837.html?fr=sycsrp_catchall',
        party: 'republican',
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
        party: 'democratic',
      },
      {
        name: 'Rick Scott',
        rating: '40% from LCV.',
        description: 'Generally skeptical of climate change; prioritizes economic interests.',
        party: 'republican',
        link: 'https://www.politifact.com/article/2015/mar/11/fact-checking-rick-scott-environment-and-sea-level/',
      },
      {
        name: 'Joe Manchin',
        rating: 'Moderate ratings from environmental groups',
        description: 'Advocates for energy independence, recognizes climate issues.',
        party: 'democratic',
        link: 'https://www.vox.com/climate/23955967/joe-manchin-climate-change-senate-biden-inflation',
      },
      {
        name: 'Catherine Cortez Masto',
        rating: 'High ratings from environmental advocates',
        description: 'Strong advocate for renewable energy and climate action',
        party: 'democratic',
        link: 'https://www.cortezmasto.senate.gov/news/press-releases/cortez-masto-introduces-legislation-to-create-a-national-climate-service-corps/',
      },
      {
        name: 'Sherrod Brown',
        rating: 'High ratings from environmental advocates',
        description: 'Advocates for sustainable jobs and clean energy transition',
        party: 'democratic',
        link: 'https://www.brown.senate.gov/newsroom/press/release/brown-climate-change-threat-economy',
      },
      {
        name: 'Jon Tester',
        rating: 'Discusses importance of conservation',
        description: 'Supports renewable energy, emphasizes resource extraction',
        party: 'democratic',
        link: 'https://www.tester.senate.gov/about/issues/energy/',
      },
      {
        name: 'Tammy Baldwin',
        rating: 'High ratings from environmental groups',
        description: 'Strong advocate for climate action and renewable energy',
        party: 'democratic',
        link: 'https://www.baldwin.senate.gov/news/press-releases/us-senator-tammy-baldwin-helps-introduce-legislation-to-achieve-net-zero-greenhouse-gas-emissions',
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
        party: 'democratic',
      },
      {
        name: 'Matt Gaetz',
        rating: '25% from LCV.',
        description: 'Skeptical of climate change; focuses on economic growth.',
        party: 'republican',
        link: 'https://www.newsweek.com/matt-gaetz-voted-against-fema-funding-before-hurricane-helene-hit-1961501',
      },
      {
        name: 'Abigail Spanberger',
        rating: '90% from LCV.',
        description: 'Supports climate action with a focus on clean energy and policies that protect rural communities.',
        link: 'https://spanberger.house.gov/resources/energy-and-environment',
        party: 'democratic',
      },
      {
        name: 'Tony Gonzales',
        rating: '90% from LCV.',
        description: 'Supports climate action with a focus on clean energy and policies that protect rural communities.',
        link: 'https://c3act.org/people/tony-gonzales/',
        party: 'republican',
      },
    ],
  },
  {
    group: 'Governors',
    items: [
      {
        name: 'John Carney',
        rating: 'For Climate Action',
        description: "Governor Carney has supported clean energy initiatives and Delaware's participation in the Regional Greenhouse Gas Initiative (RGGI). Delaware has worked toward increasing renewable energy and setting carbon reduction targets.",
        party: 'democratic',
        link: 'https://news.delaware.gov/2021/11/04/governor-carney-releases-plan-outlining-delawares-path-forward-on-climate-change/',
      },
      {
        name: 'Eric Holcomb',
        rating: 'Against Climate Action',
        description: 'Governor Holcomb focuses on economic growth, with limited emphasis on climate policies compared to Democratic-led states.',
        party: 'republican',
        link: 'https://www.politico.com/newsletters/the-long-game/2022/11/15/a-red-state-governor-walks-into-a-cop-00066950/',
      },
      {
        name: 'Mike Parson',
        rating: 'Against Climate Action',
        description: 'Governor Parson has expressed skepticism about climate change and has not supported strong climate policies. His administration has focused more on economic development and fossil fuel industries.',
        party: 'republican',
        link: 'https://www.kansascity.com/opinion/readers-opinion/guest-commentary/article248707085.html',
      },
      {
        name: 'Greg Gianforte',
        rating: 'Against Climate Action',
        description: "Governor Gianforte has aligned with the GOP's stance on climate skepticism and has focused on economic growth, particularly in fossil fuels. He has resisted stronger climate policies and clean energy transitions.",
        party: 'republican',
        link: 'https://montanafreepress.org/2023/05/12/gianforte-signs-climate-change-analysis-ban-into-law/',
      },
      {
        name: 'Roy Cooper',
        rating: 'For Climate Action',
        description: 'Governor Cooper has led North Carolina in advancing clean energy, focusing on offshore wind, solar, and ambitious carbon reduction goals.',
        party: 'democratic',
        link: 'https://governor.nc.gov/news/press-releases/2022/01/07/governor-cooper-signs-executive-order-detailing-next-steps-path-clean-energy-and-equitable-economy',
      },
      {
        name: 'Doug Burgum',
        rating: 'Against Climate Action',
        description: 'Governor Burgum prioritizes energy production, particularly fossil fuels, and while supporting wind power, his administration opposes stronger climate regulations.',
        party: 'republican',
        link: 'https://www.washingtonpost.com/politics/interactive/2023/presidential-candidates-2024-policies-issues/doug-burgum-climate-change/',
      },
      {
        name: 'Spencer Cox',
        rating: 'Against Climate Action',
        description: 'Governor Cox supports natural resource management, including some clean energy initiatives, but has not pushed for aggressive state-level climate action. His stance aligns with supporting industries like oil, gas, and mining.',
        party: 'republican',
        link: 'https://www.politico.com/news/2021/09/01/spencer-cox-utah-covid-promises-508111/',
      },
      {
        name: 'Phil Scott',
        rating: 'For Climate Action',
        description: "Governor Scott has backed clean energy initiatives, expanded renewables, and advanced Vermont’s climate goals, making significant strides in climate resilience and carbon reduction.",
        party: 'republican',
        link: 'https://governor.vermont.gov/press-release/governor-phil-scott-joins-us-climate-alliance-governors-applauding-unites-states',
      },
      {
        name: 'Jay Inslee',
        rating: 'For Climate Action',
        description: "Governor Inslee is a leading climate advocate, focusing on ambitious carbon reduction, renewable energy growth, and reducing fossil fuel reliance.",
        party: 'democratic',
        link: 'https://www.jayinslee.com/issues/global-climate',
      },
      {
        name: 'Jim Justice',
        rating: 'Against Climate Action',
        description: 'Governor Justice has supported the coal industry and resisted strong climate action, prioritizing economic issues tied to fossil fuels over addressing climate change.',
        party: 'republican',
        link: 'https://www.propublica.org/article/jim-justice-coal-empire-sued-by-federal-government-again',
      },
      {
        name: 'Mark Gordon',
        rating: 'Against Climate Action',
        description: 'Governor Gordon supports fossil fuel industries, particularly coal, oil, and gas, and has avoided aggressive climate policies, despite some renewable energy initiatives in Wyoming.',
        party: 'republican',
        link: 'https://www.forbes.com/sites/bobeccles/2023/11/22/climate-change-in-wyoming-the-sanity-of-governor-mark-gordon-and-the-inanity-of-the-wyoming-freedom-caucus/',
      },
    ],
  },
]

export default function Who() {
  return (
    <>
      <div className="grid grid-cols-3 who-help" id="who">
        {candidates.map((group, groupIndex) => (
          <React.Fragment key={group.group}> 
            {/* Group Header */}
            <div
                className={`flex items-center justify-center text-center who-help-${groupIndex + 1} p-4 md:p-8`}
                style={{ gridRow: `span ${group.items.length}` }} 
              >
                {group.group}
              </div>

            {/* Candidate Items */}
            {group.items.map((candidate, itemIndex) => {
              // Determine the color based on party affiliation
              const partyColor = candidate.party === 'democratic' ? '#0033A0' : '#C8102E'; // Blue for Democrats, Red for Republicans

              return (
                <div
                  key={`${group.group}-${candidate.name}-${itemIndex}`}
                  className={`col-span-2 p-4 md:p-8`}
                  style={{ backgroundColor: partyColor, color: 'white' }} 
                >
                  {candidate.name} - {' '}
                  {candidate.description || ""}
                  {candidate.link && (
                    <>
                      {' - '}
                      <Link
                        href={candidate.link}
                        className="inline-flex items-center text-blue-300 hover:text-blue-500 underline transition duration-200"
                        target="_blank"
                      >
                        Learn More 
                        <span className="ml-1">↗</span>
                      </Link>
                    </>
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
