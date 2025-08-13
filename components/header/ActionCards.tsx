'use client';

import React from 'react';
import {
  faDove,
  faDollarSign,
  faSolarPanel,
} from '@fortawesome/free-solid-svg-icons';
import ActionCard from './ActionCard';

interface ActionCardsProps {
  actions: {
    free: string[];
    low: string[];
    high: string[];
  };
  location?: { county?: string };
}

export default function ActionCards({ actions, location }: ActionCardsProps) {
  return (
    <div className="w-full max-w-7xl mx-auto pt-6 pb-12 lg:px-16" id="what">
      <h2 className="text-5xl text-center dark:text-gray-200 font-bold pb-6 px-4 italic">
        You CAN make a difference!
      </h2>
      <div className="flex flex-wrap gap-6 justify-center px-6">
        {/* Free actions */}
        {actions.free.length > 0 && (
          <ActionCard
            icon={faDove}
            iconColor="text-green-500"
            bgColor="bg-yellow-100"
            title="What can I do for free?"
            actions={actions.free}
            location={location}
          />
        )}

        {/* Low-cost actions */}
        {actions.low.length > 0 && (
          <ActionCard
            icon={faDollarSign}
            iconColor="text-yellow-500"
            bgColor="bg-purple-100"
            title="What if I can spend a little?"
            actions={actions.low}
            location={location}
          />
        )}

        {/* High-cost actions */}
        {actions.high.length > 0 && (
          <ActionCard
            icon={faSolarPanel}
            iconColor="text-cyan-600"
            bgColor="bg-purple-100"
            title="What if I can spend more?"
            actions={actions.high}
            location={location}
          />
        )}
      </div>
    </div>
  );
}
