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
        state: ['Florida', 'All']
      },
      {
        name: 'Donald Trump',
        rating: '30% from LCV.',
        description: 'Pulled U.S. out of the Paris Agreement and rolled back efforts to fight climate change',
        link: 'https://www.npr.org/2024/06/25/nx-s1-5006573/trump-election-2024-climate-change-fossil-fuels',
        party: Party.Republican,
        state: ['Florida', 'All']
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
        state: ['Florida'],
      },
      {
        name: 'Rick Scott',
        rating: '40% from LCV.',
        description: 'Generally skeptical of climate change; prioritizes economic interests.',
        party: Party.Republican,
        link: 'https://www.politifact.com/article/2015/mar/11/fact-checking-rick-scott-environment-and-sea-level/',
        state: ['Florida'],
      },
      {
        name: 'Joe Manchin',
        rating: 'Moderate ratings from environmental groups',
        description: 'Advocates for energy independence, recognizes climate issues.',
        party: Party.Democratic,
        link: 'https://www.vox.com/climate/23955967/joe-manchin-climate-change-senate-biden-inflation',
        state: ['WestVirginia'],
      },
      {
        name: 'Catherine Cortez Masto',
        rating: 'High ratings from environmental advocates',
        description: 'Strong advocate for renewable energy and climate action',
        party: Party.Democratic,
        link: 'https://www.cortezmasto.senate.gov/news/press-releases/cortez-masto-introduces-legislation-to-create-a-national-climate-service-corps/',
        state: ['Nevada'],
      },
      {
        name: 'Sherrod Brown',
        rating: 'High ratings from environmental advocates',
        description: 'Advocates for sustainable jobs and clean energy transition',
        party: Party.Democratic,
        link: 'https://www.brown.senate.gov/newsroom/press/release/brown-climate-change-threat-economy',
        state: ['Ohio'],
      },
      {
        name: 'Jon Tester',
        rating: 'Discusses importance of conservation',
        description: 'Supports renewable energy, emphasizes resource extraction',
        party: Party.Democratic,
        link: 'https://www.tester.senate.gov/about/issues/energy/',
        state: ['Montana'],
      },
      {
        name: 'Tammy Baldwin',
        rating: 'High ratings from environmental groups',
        description: 'Strong advocate for climate action and renewable energy',
        party: Party.Democratic,
        link: 'https://www.baldwin.senate.gov/news/press-releases/us-senator-tammy-baldwin-helps-introduce-legislation-to-achieve-net-zero-greenhouse-gas-emissions',
        state: ['Wisconsin'],
      },
      {
        name: 'Matt Gaetz',
        rating: '25% from LCV.',
        description: 'Skeptical of climate change; focuses on economic growth.',
        party: Party.Republican,
        link: 'https://www.newsweek.com/matt-gaetz-voted-against-fema-funding-before-hurricane-helene-hit-1961501',
        state: ['Florida'],
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
        state: ['Florida'],
      },
    ],
  },
  {
    group: 'Governors',
    items: [
      {
        name: 'John Carney',
        rating: 'For Climate Action',
        description: 'Governor Carney has supported clean energy initiatives and Delaware’s participation in the Regional Greenhouse Gas Initiative (RGGI). Delaware has worked toward increasing renewable energy and setting carbon reduction targets.',
        party: Party.Democratic,
        state: ['Delaware'],
        link: 'https://governor.delaware.gov/climate-action/'
      },
      {
        name: 'Eric Holcomb',
        rating: 'Against Climate Action',
        description: 'Governor Holcomb has focused more on economic growth and has downplayed aggressive state-level climate policies. Indiana has not prioritized strong climate action compared to states with Democratic leadership.',
        party: Party.Republican,
        state: ['Indiana'],
        link: 'https://www.indystar.com/story/news/2021/11/17/indiana-governor-holcomb-signs-first-statewide-energy-policy-law/6406210001/'
      },
      {
        name: 'Mike Parson',
        rating: 'Against Climate Action',
        description: 'Governor Parson has expressed skepticism about climate change and has not supported strong climate policies. His administration has focused more on economic development and fossil fuel industries.',
        party: Party.Republican,
        state: ['Missouri'],
        link: 'https://news.stlpublicradio.org/government-politics-issues/2023-06-26/missouri-leaders-warn-climate-change-to-damage-state-economy-environment'
      },
      {
        name: 'Greg Gianforte',
        rating: 'Against Climate Action',
        description: 'Governor Gianforte has aligned with the GOP’s stance on climate skepticism and has focused on economic growth, particularly in fossil fuels. He has resisted stronger climate policies and clean energy transitions.',
        party: Party.Republican,
        state: ['Montana'],
        link: 'https://www.greatfallstribune.com/story/news/2021/07/02/gianforte-signs-montana-law-removes-climate-change-study-energy-policy/7828047002/'
      },
      {
        name: 'Roy Cooper',
        rating: 'For Climate Action',
        description: 'Governor Cooper has been a strong advocate for clean energy, carbon reduction, and climate resilience. Under his leadership, North Carolina has expanded its renewable energy industry and set clean energy goals, particularly focusing on offshore wind and solar.',
        party: Party.Democratic,
        state: ['NorthCarolina'],
        link: 'https://governor.nc.gov/news/press-releases/2022/07/27/governor-cooper-issues-executive-order-246-addressing-climate-change-and-advancing-clean-energy-affordable-and-reliable-energy'
      },
      {
        name: 'Doug Burgum',
        rating: 'Against Climate Action',
        description: 'Governor Burgum has emphasized energy production, especially from fossil fuels. While he has supported clean energy technologies like wind power, his administration has generally opposed stronger regulatory actions on climate change.',
        party: Party.Republican,
        state: ['NorthDakota'],
        link: 'https://www.kxnet.com/news/burgum-touts-energy-dominance-but-says-coal-will-stay-viable/'
      },
      {
        name: 'Spencer Cox',
        rating: 'Against Climate Action',
        description: 'Governor Cox supports natural resource management, including some clean energy initiatives, but has not pushed for aggressive state-level climate action. His stance aligns with supporting industries like oil, gas, and mining.',
        party: Party.Republican,
        state: ['Utah'],
        link: 'https://www.sltrib.com/news/2021/04/23/governor-cox-defends-his/'
      },
      {
        name: 'Phil Scott',
        rating: 'For Climate Action',
        description: 'Governor Scott has supported clean energy initiatives, including expanding renewable energy use and promoting Vermont’s climate goals. Under his leadership, Vermont has taken significant steps toward climate resilience and reducing carbon emissions.',
        party: Party.Republican,
        state: ['Vermont'],
        link: 'https://vtdigger.org/2021/12/13/gov-scott-wants-vermont-to-lead-on-climate-action-will-he-be-a-hindrance-instead/'
      },
      {
        name: 'Jay Inslee',
        rating: 'For Climate Action',
        description: 'Governor Inslee is widely regarded as one of the nation’s strongest climate advocates. He has made climate change his signature issue, pushing for ambitious carbon reduction targets and renewable energy growth.',
        party: Party.Democratic,
        state: ['Washington'],
        link: 'https://www.governor.wa.gov/issues/issues/climate'
      },
      {
        name: 'Jim Justice',
        rating: 'Against Climate Action',
        description: 'Governor Justice has been an advocate for the coal industry and has resisted significant state-level action on climate change. His administration has largely downplayed the urgency of addressing climate change.',
        party: Party.Republican,
        state: ['WestVirginia'],
        link: 'https://www.npr.org/sections/live-updates/2021/11/01/1051262759/jim-justice-coal-governor-west-virginia'
      },
      {
        name: 'Mark Gordon',
        rating: 'Against Climate Action',
        description: 'Governor Gordon has focused on energy policies that support fossil fuel industries, particularly coal, oil, and natural gas. Wyoming has some renewable energy initiatives, but Gordon has largely avoided aggressive climate policies.',
        party: Party.Republican,
        state: ['Wyoming'],
        link: 'https://www.wyomingnews.com/news/gordon-unveils-wyomings-energy-strategy-and-declares-coal-a-top-priority/article_ba1a02b8-8cb1-11eb-819f-077e040cd569.html'
      },
    ],
  }  
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
  let state = params?.state;

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
                const partyColor = candidate.party === Party.Democratic ? '#0033A0' : '#C8102E';

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
