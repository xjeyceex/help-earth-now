'use client';

import Footer from "@/app/components/Footer";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation"; 
import { candidates } from "@/app/us-locandcandidates";

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
  state: string; 
}

interface CandidateGroup {
  group: string;
  items: Candidate[];
}

const getCandidatesForState = (state: string, candidates: CandidateGroup[]) => {
  return candidates
    .map(group => ({
      ...group,
      items: group.items.filter(candidate =>
        candidate.state.toLowerCase() === state.toLowerCase()
        || candidate.state === 'All'
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
