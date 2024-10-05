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
];

const getCandidatesForState = (state: string, candidates: CandidateGroup[]) => {
  return candidates
    .map(group => ({
      ...group,
      items: group.items.filter(candidate =>
        candidate.state.map(s => s.toLowerCase()).includes(state.toLowerCase()) 
        || candidate.state.includes('All') // Include candidates for 'All' states
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
