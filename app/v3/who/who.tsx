'use client';

import React, { useContext } from 'react';
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { LocationContext } from '@/app/components/location-provider';
import { routeToStateMap, candidates } from '@/app/us-locandcandidates'; 

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

// Helper function to get candidates for a specific state
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
  const { location } = useContext(LocationContext) || {};

  // Check if the location state is available
  if (!location || !location.state) {
    return <div>Loading location data...</div>; // Display a loading state if location is not available yet
  }

  // Convert the full state name to the abbreviation using routeToStateMap
  const fullStateName = location.state;
  const stateAbbreviation = Object.keys(routeToStateMap).find(
    key => routeToStateMap[key].toLowerCase() === fullStateName.toLowerCase()
  );

  // If no match found for state abbreviation
  if (!stateAbbreviation) {
    return <div>State not found.</div>;
  }

  const filteredCandidates = getCandidatesForState(stateAbbreviation, candidates);

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
