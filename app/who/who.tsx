'use client';

import React, { useContext, useEffect, useState } from 'react';
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { LocationContext } from '@/app/components/location-provider';
import { routeToStateMap } from '@/app/us-datas'; 

enum Party {
  Democratic = 'democratic',
  Republican = 'republican',
  Independent = 'independent',
}

interface Candidate {
  name: string;
  rating: string;
  description: string;
  link: string;
  party: Party;
  state: string;
  position: string; // Added position property
}

interface CandidateGroup {
  group: string;
  items: Candidate[];
}

// Helper function to map API data to Candidate interface and fix party values
const mapToCandidate = (data: any): Candidate => {
  return {
    ...data,
    party: data.party.includes('Republican') ? Party.Republican :
           data.party.includes('Democratic') ? Party.Democratic :
           Party.Independent,  // Defaulting to Independent if neither matches
  };
};

// Helper function to fetch data from a single API
const fetchCandidateData = async (state: string) => {
  try {
    const response = await fetch(`/api/candidates?state=${state}`);

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();

    // Ensure the data is valid before proceeding
    if (!Array.isArray(data)) {
      throw new Error('API response is not an array');
    }

    return data.map(mapToCandidate);
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];  // Return empty data to handle the error gracefully
  }
};

const getCandidatesForState = (state: string, candidates: Candidate[]) => {
  const governors = candidates.filter(candidate => candidate.position === 'gov');
  const senators = candidates.filter(candidate => candidate.position === 'sen');
  const hor = candidates.filter(candidate => candidate.position === 'rep');

  // Sort candidates with Democratic candidates at the top
  const sortByParty = (a: Candidate, b: Candidate) => {
    if (a.party === Party.Democratic && b.party !== Party.Democratic) {
      return -1; // Move Democrats to the top
    } else if (a.party !== Party.Democratic && b.party === Party.Democratic) {
      return 1;  // Move others down
    }
    return 0; // Keep the order otherwise
  };

  // Function to handle the logic of removing duplicates and sorting by party
  const stateSpecificCandidates = (groupItems: Candidate[]) => {
    const stateSpecific = groupItems.filter(candidate => candidate.state.toLowerCase() === state.toLowerCase());
    const allCandidates = groupItems.filter(candidate => candidate.state === 'All');

    // Remove 'All' candidates if a state-specific candidate exists with the same name and position
    const filteredCandidates = allCandidates.filter(allCandidate =>
      !stateSpecific.some(
        stateCandidate =>
          stateCandidate.name === allCandidate.name && stateCandidate.position === allCandidate.position
      )
    );

    // Combine state-specific and non-duplicate 'All' candidates, then sort by party
    return [...stateSpecific, ...filteredCandidates].sort(sortByParty);
  };

  return [
    {
      group: 'President',
      items: stateSpecificCandidates([
        {
          name: 'Kamala Harris',
          rating: '90% from LCV.',
          description: 'Calls climate crisis an urgent issue and promoted the IRA - spending $20B to fight climate change',
          link: 'https://www.whitehouse.gov/briefing-room/speeches-remarks/2023/07/14/remarks-by-vice-president-harris-on-combatting-climate-change-and-building-a-clean-energy-economy/',
          party: Party.Democratic,
          state: 'All',  // Vice President is relevant for all states
          position: 'vp',
        },
        {
          name: 'Donald Trump',
          rating: '30% from LCV.',
          description: 'Pulled U.S. out of the Paris Agreement and rolled back efforts to fight climate change',
          link: 'https://www.npr.org/2024/06/25/nx-s1-5006573/trump-election-2024-climate-change-fossil-fuels',
          party: Party.Republican,
          state: 'All',  // President is relevant for all states
          position: 'pres',
        },
        {
          name: 'Donald Trump',
          rating: '30% from LCV.',
          description: "In 2019, Trump's delay of a crucial $19.1 billion disaster relief bill for North Carolina postponed vital flood mitigation projects, leading to significant impacts from subsequent storms, including the flooding caused by Hurricane Helene in 2023.",
          link: 'https://news.yahoo.com/news/damning-news-report-revives-questions-104558837.html?fr=sycsrp_catchall',
          party: Party.Republican,
          state: 'NC',
          position: 'pres',
        },
      ]),
    },
    { group: 'Governors', items: stateSpecificCandidates(governors) },
    { group: 'Senators', items: stateSpecificCandidates(senators) },
    { group: 'House of Representatives', items: stateSpecificCandidates(hor) },
  ].filter(group => group.items.length > 0); // Filter out empty groups
};

export default function Who() {
  const { location } = useContext(LocationContext) || {};
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (location && location.state) {
        const fullStateName = location.state;
        const stateAbbreviation = Object.keys(routeToStateMap).find(
          key => routeToStateMap[key].toLowerCase() === fullStateName.toLowerCase()
        );

        if (stateAbbreviation) {
          const candidates = await fetchCandidateData(stateAbbreviation);
          const stateCandidates = getCandidatesForState(stateAbbreviation, candidates);
          setFilteredCandidates(stateCandidates);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 who-help" id="who">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((group, groupIndex) => (
            <React.Fragment key={group.group}>
              <div
                className={`flex items-center justify-center text-center who-help-${groupIndex + 1} p-4 md:p-8 border border-gray-300`} 
                style={{ gridRow: `span ${group.items.length}` }} 
              >
                {group.group}
              </div>

              {group.items.map((candidate, itemIndex) => {
                return (
                  <div
                    key={`${group.group}-${candidate.name}-${itemIndex}`}
                    className={`col-span-2 p-4 md:p-8 border border-gray-300 ${
                      candidate.party === Party.Democratic ? 'bg-blue-600 text-white' :
                      candidate.party === Party.Republican ? 'bg-red-600 text-white' :
                      'bg-gray-400 text-gray-900'  // For Independent party
                    }`}
                  >
                    <span className="italic">{candidate.name}</span>: {' '}
                    {candidate.description || ""}
                    {candidate.link && (
                      <>
                        {' - '}
                        <Link
                          href={candidate.link}
                          className={`inline-flex items-center ${
                            candidate.party === Party.Independent 
                              ? 'text-blue-900 hover:text-blue-700' 
                              : 'text-blue-300 hover:text-blue-500'  
                          } underline transition duration-200`}
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
            No candidates available for this state.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
