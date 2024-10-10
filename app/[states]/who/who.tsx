'use client';

import Footer from "@/app/components/Footer";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation"; 
import { candidates } from "@/app/us-datas";

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

const getCandidatesForState = (state: string, candidates: CandidateGroup[]) => {
  return candidates
    .map(group => {
      // Get state-specific candidates (if any)
      const stateSpecificCandidates = group.items.filter(candidate =>
        candidate.state.toLowerCase() === state.toLowerCase()
      );

      // Get "All" candidates
      const allCandidates = group.items.filter(candidate =>
        candidate.state === 'All'
      );

      // Combine state-specific and "All" candidates, ensuring no duplicates
      const combinedCandidates = [
        ...stateSpecificCandidates,
        ...allCandidates.filter(allCandidate => 
          !stateSpecificCandidates.some(stateCandidate => stateCandidate.name === allCandidate.name)
        )
      ];

      // Sort candidates by party: Democrats first, then Republicans, then Independents
      const sortedCandidates = combinedCandidates.sort((a, b) => {
        if (a.party === 'democratic' && b.party !== 'democratic') return -1; // Democratic first
        if (a.party !== 'democratic' && b.party === 'democratic') return 1;  // Republican/Independent second
        return 0; // No change in order if both have the same party
      });

      return {
        ...group,
        items: sortedCandidates,
      };
    })
    .filter(group => group.items.length > 0); // Remove any groups with no candidates
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
                className={`flex items-center justify-center text-center who-help-${groupIndex + 1} p-4 md:p-8 border border-gray-300`} // Added border to group header
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
                    className={`col-span-2 p-4 md:p-8 border border-gray-300`} // Added border to candidate item
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
