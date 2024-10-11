'use client';

import React, { useContext, useEffect, useState } from 'react';
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { LocationContext } from '@/app/components/location-provider';
import { routeToStateMap } from '@/app/us-datas'; 
import { Spinner } from '@radix-ui/themes';

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

// Helper function to fetch data from APIs
const fetchCandidateData = async (state: string) => {
  try {
    const endpoints = ['/api/governors', '/api/senators', '/api/hor'];
    const responses = await Promise.all(endpoints.map(endpoint => fetch(`${endpoint}?state=${state}`)));

    if (responses.some(response => !response.ok)) {
      throw new Error('One or more API requests failed');
    }

    const data = await Promise.all(responses.map(response => response.json()));

    // Ensure the data is valid before proceeding
    if (!Array.isArray(data)) {
      throw new Error('API response is not an array');
    }

    return data.map(group => group.map(mapToCandidate));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];  // Return empty data to handle the error gracefully
  }
};

const getCandidatesForState = (state: string, candidates: CandidateGroup[]) => {
  return candidates
    .map(group => {
      const stateSpecificCandidates = group.items.filter(candidate =>
        candidate.state.toLowerCase() === state.toLowerCase()
      );

      const allCandidates = group.items.filter(candidate =>
        candidate.state === 'All'
      );

      const combinedCandidates = [
        ...stateSpecificCandidates,
        ...allCandidates.filter(allCandidate => 
          !stateSpecificCandidates.some(stateCandidate => stateCandidate.name === allCandidate.name)
        )
      ];

      const sortedCandidates = combinedCandidates.sort((a, b) => {
        if (a.party === 'democratic' && b.party !== 'democratic') return -1;
        if (a.party !== 'democratic' && b.party === 'democratic') return 1;
        return 0;
      });

      return {
        ...group,
        items: sortedCandidates,
      };
    })
    .filter(group => group.items.length > 0);
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
          const [governors, senators, hor] = await fetchCandidateData(stateAbbreviation);

          const combinedData: CandidateGroup[] = [
            {
              group: 'President',
              items: [
                {
                  name: 'Kamala Harris',
                  rating: '90% from LCV.',
                  description: 'Calls climate crisis an urgent issue and promoted the IRA - spending $20B to fight climate change',
                  link: 'https://www.whitehouse.gov/briefing-room/speeches-remarks/2023/07/14/remarks-by-vice-president-harris-on-combatting-climate-change-and-building-a-clean-energy-economy/',
                  party: Party.Democratic,
                  state: 'All',
                },
                {
                  name: 'Donald Trump',
                  rating: '30% from LCV.',
                  description: 'Pulled U.S. out of the Paris Agreement and rolled back efforts to fight climate change',
                  link: 'https://www.npr.org/2024/06/25/nx-s1-5006573/trump-election-2024-climate-change-fossil-fuels',
                  party: Party.Republican,
                  state: 'All',
                },
              ],
            },
            { group: 'Governors', items: governors },
            { group: 'Senators', items: senators },
            { group: 'House of Representatives', items: hor },
          ];

          const stateCandidates = getCandidatesForState(stateAbbreviation, combinedData);
          setFilteredCandidates(stateCandidates);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [location]);

  if (loading) {
    return <Spinner />;
  }

  if (!location || !location.state) {
    return <div>Loading location data...</div>;
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
                const partyColor = candidate.party === 'democratic' ? '#0033A0' : '#C8102E';

                return (
                  <div
                    key={`${group.group}-${candidate.name}-${itemIndex}`}
                    className={`col-span-2 p-4 md:p-8 border border-gray-300`} 
                    style={{ backgroundColor: partyColor, color: 'white' }} 
                  >
                    <span className="italic">{candidate.name}</span>: {' '}
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
            No candidates available for this state.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
