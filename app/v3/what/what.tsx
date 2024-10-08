'use client';
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useContext } from "react";
import { LocationContext } from "@/app/components/location-provider"; // Adjust the path if necessary

export default function What() {
    const { location } = useContext(LocationContext) || {}; // Access location context

    // Mapping of state names to their abbreviations
    const stateAbbreviations: { [key: string]: string } = {
        "Alabama": "AL",
        "Alaska": "AK",
        "Arizona": "AZ",
        "Arkansas": "AR",
        "California": "CA",
        "Colorado": "CO",
        "Connecticut": "CT",
        "Delaware": "DE",
        "Florida": "FL",
        "Georgia": "GA",
        "Hawaii": "HI",
        "Idaho": "ID",
        "Illinois": "IL",
        "Indiana": "IN",
        "Iowa": "IA",
        "Kansas": "KS",
        "Kentucky": "KY",
        "Louisiana": "LA",
        "Maine": "ME",
        "Maryland": "MD",
        "Massachusetts": "MA",
        "Michigan": "MI",
        "Minnesota": "MN",
        "Mississippi": "MS",
        "Missouri": "MO",
        "Montana": "MT",
        "Nebraska": "NE",
        "Nevada": "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        "Ohio": "OH",
        "Oklahoma": "OK",
        "Oregon": "OR",
        "Pennsylvania": "PA",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        "Tennessee": "TN",
        "Texas": "TX",
        "Utah": "UT",
        "Vermont": "VT",
        "Virginia": "VA",
        "Washington": "WA",
        "West Virginia": "WV",
        "Wisconsin": "WI",
        "Wyoming": "WY",
    };

    // Function to generate the dynamic route based on location
    const generateVoteLink = () => {
        const state = location?.state; // Assuming state is stored in location.state
        // Check if state is a defined string and exists in the stateAbbreviations mapping
        if (typeof state === 'string' && state in stateAbbreviations) {
            return `v3/${stateAbbreviations[state].toLowerCase()}`; // Use the abbreviation for the route
        }
        return '/v3/who'; // Default link if state is not available
    };

    return (
        <>
            <div className="grid grid-cols-3 how-help w-full">
                <div className="flex items-center text-center questions-1 p-12">
                    What can I do for free?
                </div>
                <div className="col-span-2 answer-1 p-12">
                    Share this site with others
                    <br />
                    <Link href={generateVoteLink()} className="underline">Vote for people who care</Link>
                    <br />
                    Burn less: fewer fires, drive less
                </div>
                <div className="flex items-center text-center questions-2 p-12">
                    What if I can spend a little?
                </div>
                <div className="col-span-2 answer-2 p-12">
                    Insulate your doors better
                </div>
                <div className="flex items-center text-center questions-3 p-12">
                    What if I can spend more?
                </div>
                <div className="col-span-2 answer-3 p-12">
                    Install solar cells <br />
                    Change appliances from gas to electricity <br />
                    Upgrade to energy efficient windows
                </div>
            </div>
        </>
    );
}
