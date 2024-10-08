'use client';

import Footer from "@/app/components/Footer";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation"; 

enum Party {
  Democratic = 'democratic',
  Republican = 'republican',
}

interface Candidate {
  name: string;
  rating: string;
  description: string;
  link: string;
  party: Party;
  state: string[]; 
}

interface CandidateGroup {
  group: string;
  items: Candidate[];
}

// Data for mapping
const candidates: CandidateGroup[] = [
  {
    group: 'President',
    items: [
      {
        name: 'Kamala Harris',
        rating: '90% from LCV.',
        description: 'Calls climate crisis an urgent issue and promoted the IRA - spending $20B to fight climate change',
        link: 'https://www.whitehouse.gov/briefing-room/speeches-remarks/2023/07/14/remarks-by-vice-president-harris-on-combatting-climate-change-and-building-a-clean-energy-economy/',
        party: Party.Democratic,
        state: ['All'],
      },
      {
        name: 'Donald Trump',
        rating: '30% from LCV.',
        description: "Trump's delay of a $19.1 billion disaster relief bill for North Carolina hindered vital flood mitigation, worsening the effects of Hurricane Herlene in 2023.",
        link: 'https://news.yahoo.com/news/damning-news-report-revives-questions-104558837.html?fr=sycsrp_catchall',
        party: Party.Republican,
        state: ['All'],
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
        party: Party.Democratic,
        state: ['FL'],
      },
      {
        name: 'Rick Scott',
        rating: '40% from LCV.',
        description: 'Generally skeptical of climate change; prioritizes economic interests.',
        party: Party.Republican,
        link: 'https://www.politifact.com/article/2015/mar/11/fact-checking-rick-scott-environment-and-sea-level/',
        state: ['FL'],
      },
      {
        name: 'Joe Manchin',
        rating: 'Moderate ratings from environmental groups',
        description: 'Advocates for energy independence, recognizes climate issues.',
        party: Party.Democratic,
        link: 'https://www.vox.com/climate/23955967/joe-manchin-climate-change-senate-biden-inflation',
        state: ['WV'],
      },
      {
        name: 'Catherine Cortez Masto',
        rating: 'High ratings from environmental advocates',
        description: 'Strong advocate for renewable energy and climate action',
        party: Party.Democratic,
        link: 'https://www.cortezmasto.senate.gov/news/press-releases/cortez-masto-introduces-legislation-to-create-a-national-climate-service-corps/',
        state: ['NV'],
      },
      {
        name: 'Sherrod Brown',
        rating: 'High ratings from environmental advocates',
        description: 'Advocates for sustainable jobs and clean energy transition',
        party: Party.Democratic,
        link: 'https://www.brown.senate.gov/newsroom/press/release/brown-climate-change-threat-economy',
        state: ['OH'],
      },
      {
        name: 'Jon Tester',
        rating: 'Discusses importance of conservation',
        description: 'Supports renewable energy, emphasizes resource extraction',
        party: Party.Democratic,
        link: 'https://www.tester.senate.gov/about/issues/energy/',
        state: ['MT'],
      },
      {
        name: 'Tammy Baldwin',
        rating: 'High ratings from environmental groups',
        description: 'Strong advocate for climate action and renewable energy',
        party: Party.Democratic,
        link: 'https://www.baldwin.senate.gov/news/press-releases/us-senator-tammy-baldwin-helps-introduce-legislation-to-achieve-net-zero-greenhouse-gas-emissions',
        state: ['WI'],
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
        party: Party.Democratic,
        state: ['FL'],
      },
      {
        name: 'Matt Gaetz',
        rating: '25% from LCV.',
        description: 'Skeptical of climate change; focuses on economic growth.',
        party: Party.Republican,
        link: 'https://www.newsweek.com/matt-gaetz-voted-against-fema-funding-before-hurricane-helene-hit-1961501',
        state: ['FL'],
      },
      {
        name: 'Abigail Spanberger',
        rating: '90% from LCV.',
        description: 'Supports climate action with a focus on clean energy and policies that protect rural communities.',
        link: 'https://spanberger.house.gov/resources/energy-and-environment',
        party: Party.Democratic,
        state: ['VA'],
      },
      {
        name: 'Tony Gonzales',
        rating: '90% from LCV.',
        description: 'Supports climate action with a focus on clean energy and policies that protect rural communities.',
        link: 'https://c3act.org/people/tony-gonzales/',
        party: Party.Republican,
        state: ['TX'],
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
        party: Party.Democratic,
        state: ['DE'],
        link: 'https://news.delaware.gov/2021/11/04/governor-carney-releases-plan-outlining-delawares-path-forward-on-climate-change/',
      },
      {
        name: 'Eric Holcomb',
        rating: 'Against Climate Action',
        description: 'Governor Holcomb has focused more on economic growth and has downplayed aggressive state-level climate policies. Indiana has not prioritized strong climate action compared to states with Democratic leadership.',
        party: Party.Republican,
        state: ['IN'],
        link: 'https://www.politico.com/newsletters/the-long-game/2022/11/15/a-red-state-governor-walks-into-a-cop-00066950/',
      },
      {
        name: 'Mike Parson',
        rating: 'Against Climate Action',
        description: 'Governor Parson has expressed skepticism about climate change and has not supported strong climate policies. His administration has focused more on economic development and fossil fuel industries.',
        party: Party.Republican,
        state: ['MO'],
        link: 'https://www.kansascity.com/opinion/readers-opinion/guest-commentary/article248707085.html',
      },
      {
        name: 'Greg Gianforte',
        rating: 'Against Climate Action',
        description: "Governor Gianforte has aligned with the GOP's stance on climate skepticism and has focused on economic growth, particularly in fossil fuels. He has resisted stronger climate policies and clean energy transitions.",
        party: Party.Republican,
        state: ['MT'],
        link: 'https://montanafreepress.org/2023/05/12/gianforte-signs-climate-change-analysis-ban-into-law/',
      },
      {
        name: 'Roy Cooper',
        rating: 'For Climate Action',
        description: 'Governor Cooper has been a strong advocate for clean energy, carbon reduction, and climate resilience. Under his leadership, North Carolina has expanded its renewable energy industry and set clean energy goals, particularly focusing on offshore wind and solar.',
        party: Party.Democratic,
        state: ['NC'],
        link: 'https://governor.nc.gov/news/press-releases/2022/01/07/governor-cooper-signs-executive-order-detailing-next-steps-path-clean-energy-and-equitable-economy',
      },
      {
        name: 'Doug Burgum',
        rating: 'Against Climate Action',
        description: 'Governor Burgum has emphasized energy production, especially from fossil fuels. While he has supported clean energy technologies like wind power, his administration has generally opposed stronger regulatory actions on climate change.',
        party: Party.Republican,
        state: ['ND'],
        link: 'https://www.washingtonpost.com/politics/interactive/2023/presidential-candidates-2024-policies-issues/doug-burgum-climate-change/',
      },
      {
        name: 'Spencer Cox',
        rating: 'Against Climate Action',
        description: 'Governor Cox supports natural resource management, including some clean energy initiatives, but has not pushed for aggressive state-level climate action. His stance aligns with supporting industries like oil, gas, and mining.',
        party: Party.Republican,
        state: ['UT'],
        link: 'https://www.politico.com/news/2021/09/01/spencer-cox-utah-covid-promises-508111/',
      },
      {
        name: 'Phil Scott',
        rating: 'For Climate Action',
        description: "Governor Scott has supported clean energy initiatives, including expanding renewable energy use and promoting Vermont's climate goals. Under his leadership, Vermont has taken significant steps toward climate resilience and reducing carbon emissions.",
        party: Party.Republican,
        state: ['VT'],
        link: 'https://governor.vermont.gov/press-release/governor-phil-scott-joins-us-climate-alliance-governors-applauding-unites-states',
      },
      {
        name: 'Jay Inslee',
        rating: 'For Climate Action',
        description: "Governor Inslee is widely regarded as one of the nation's strongest climate advocates. He has made climate change his signature issue, championing clean energy, carbon reduction policies, and climate resilience in Washington state.",
        party: Party.Democratic,
        state: ['WA'],
        link: 'https://www.jayinslee.com/issues/global-climate',
      },
      {
        name: 'Jim Justice',
        rating: 'Against Climate Action',
        description: 'Governor Justice has been an advocate for the coal industry and has resisted significant state-level action on climate change. His administration has largely downplayed the urgency of addressing climate change.',
        party: Party.Republican,
        state: ['WV'],
        link: 'https://www.propublica.org/article/jim-justice-coal-empire-sued-by-federal-government-again',
      },
      {
        name: 'Mark Gordon',
        rating: 'Against Climate Action',
        description: 'Governor Gordon has focused on energy policies that support fossil fuel industries, particularly coal, oil, and natural gas. While Wyoming has some initiatives for renewable energy, Gordon has largely avoided aggressive climate policies.',
        party: Party.Republican,
        state: ['WY'],
        link: 'https://www.forbes.com/sites/bobeccles/2023/11/22/climate-change-in-wyoming-the-sanity-of-governor-mark-gordon-and-the-inanity-of-the-wyoming-freedom-caucus/',
      },
    ],
  },
];

const getCandidatesForState = (state: string, candidates: CandidateGroup[]) => {
  return candidates
    .map(group => ({
      ...group,
      items: group.items.filter(candidate =>
        candidate.state.map(s => s.toLowerCase()).includes(state.toLowerCase()) 
        || candidate.state.includes('All')
      ),
    }))
    .filter(group => group.items.length > 0);
};

export default function Who() {
  const params = useParams(); 
  let state = params.states;
  if (Array.isArray(state)) {
    state = state[0]; 
  }

  if (!state) {
    return <div>Error: No state provided.</div>;
  }

  const filteredCandidates = getCandidatesForState(state, candidates);

  return (
    <>
      <div className="grid grid-cols-3 who-help" id="who">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((group, groupIndex) => (
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
          ))
        ) : (
          <div className="col-span-3 p-4 text-center">
            No candidates from your state are running for election or they are not listed.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
