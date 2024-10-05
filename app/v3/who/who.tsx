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
        description: 'Pulled U.S. out of the Paris Agreement and rolled back efforts to fight climate change',
        link: 'https://www.npr.org/2024/06/25/nx-s1-5006573/trump-election-2024-climate-change-fossil-fuels',
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
      {
        name: 'Matt Gaetz',
        rating: '25% from LCV.',
        description: 'Skeptical of climate change; focuses on economic growth.',
        party: 'republican',
        link: '',
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
        link: 'https://governor.delaware.gov/climate-action/',
      },
      {
        name: 'Eric Holcomb',
        rating: 'Against Climate Action',
        description: 'Governor Holcomb has focused more on economic growth and has downplayed aggressive state-level climate policies. Indiana has not prioritized strong climate action compared to states with Democratic leadership.',
        party: 'republican',
        link: 'https://www.indystar.com/story/news/2021/11/17/indiana-governor-holcomb-signs-first-statewide-energy-policy-law/6406210001/',
      },
      {
        name: 'Mike Parson',
        rating: 'Against Climate Action',
        description: 'Governor Parson has expressed skepticism about climate change and has not supported strong climate policies. His administration has focused more on economic development and fossil fuel industries.',
        party: 'republican',
        link: 'https://news.stlpublicradio.org/government-politics-issues/2023-06-26/missouri-leaders-warn-climate-change-to-damage-state-economy-environment',
      },
      {
        name: 'Greg Gianforte',
        rating: 'Against Climate Action',
        description: "Governor Gianforte has aligned with the GOP's stance on climate skepticism and has focused on economic growth, particularly in fossil fuels. He has resisted stronger climate policies and clean energy transitions.",
        party: 'republican',
        link: 'https://www.greatfallstribune.com/story/news/2021/07/02/gianforte-signs-montana-law-removes-climate-change-study-energy-policy/7828047002/',
      },
      {
        name: 'Roy Cooper',
        rating: 'For Climate Action',
        description: 'Governor Cooper has been a strong advocate for clean energy, carbon reduction, and climate resilience. Under his leadership, North Carolina has expanded its renewable energy industry and set clean energy goals, particularly focusing on offshore wind and solar.',
        party: 'democratic',
        link: 'https://governor.nc.gov/news/press-releases/2022/07/27/governor-cooper-issues-executive-order-246-addressing-climate-change-and-advancing-clean-energy-affordable-and-reliable-energy',
      },
      {
        name: 'Doug Burgum',
        rating: 'Against Climate Action',
        description: 'Governor Burgum has emphasized energy production, especially from fossil fuels. While he has supported clean energy technologies like wind power, his administration has generally opposed stronger regulatory actions on climate change.',
        party: 'republican',
        link: 'https://www.kxnet.com/news/burgum-touts-energy-dominance-but-says-coal-will-stay-viable/',
      },
      {
        name: 'Spencer Cox',
        rating: 'Against Climate Action',
        description: 'Governor Cox supports natural resource management, including some clean energy initiatives, but has not pushed for aggressive state-level climate action. His stance aligns with supporting industries like oil, gas, and mining.',
        party: 'republican',
        link: 'https://www.sltrib.com/news/2021/04/23/governor-cox-defends-his/',
      },
      {
        name: 'Phil Scott',
        rating: 'For Climate Action',
        description: "Governor Scott has supported clean energy initiatives, including expanding renewable energy use and promoting Vermont's climate goals. Under his leadership, Vermont has taken significant steps toward climate resilience and reducing carbon emissions.",
        party: 'republican',
        link: 'https://vtdigger.org/2021/12/13/gov-scott-wants-vermont-to-lead-on-climate-action-will-he-be-a-hindrance-instead/',
      },
      {
        name: 'Jay Inslee',
        rating: 'For Climate Action',
        description: "Governor Inslee is widely regarded as one of the nation's strongest climate advocates. He has made climate change his signature issue, pushing for ambitious carbon reduction targets and renewable energy growth.",
        party: 'democratic',
        link: 'https://www.governor.wa.gov/issues/issues/climate',
      },
      {
        name: 'Jim Justice',
        rating: 'Against Climate Action',
        description: 'Governor Justice has been an advocate for the coal industry and has resisted significant state-level action on climate change. His administration has largely downplayed the urgency of addressing climate change.',
        party: 'republican',
        link: 'https://www.npr.org/sections/live-updates/2021/11/01/1051262759/jim-justice-coal-governor-west-virginia',
      },
      {
        name: 'Gavin Newsom',
        rating: 'For Climate Action',
        description: 'Governor Newsom has been a staunch advocate for aggressive climate policies in California, including clean energy initiatives, carbon reduction goals, and ambitious state regulations to address climate change.',
        party: 'democratic',
        link: 'https://www.gov.ca.gov/2020/09/23/governor-newsom-announces-california-will-phase-out-gasoline-powered-cars-drive-demand-for-zero-emission-vehicles-and-boldly-move-to-reduce-greenhouse-gas-emissions-by-2045/',
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
