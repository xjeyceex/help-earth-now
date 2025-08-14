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
    <div className="w-full max-w-7xl mx-auto py-12 lg:px-16" id="what">
      <h2 className="text-4xl md:text-5xl text-center dark:text-gray-200 font-bold pb-8 px-4 italic">
        You CAN make a difference!
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {/* Free Actions */}
        {actions.free.length > 0 && (
          <ActionCard
            icon={faDove}
            iconColor="text-green-600"
            bgColor="bg-green-100"
            title="Free Actions"
            actions={actions.free}
            location={location}
          />
        )}

        {/* Low-Cost Actions */}
        {actions.low.length > 0 && (
          <ActionCard
            icon={faDollarSign}
            iconColor="text-yellow-500"
            bgColor="bg-yellow-100"
            title="Low-Cost Actions"
            actions={actions.low}
            location={location}
          />
        )}

        {/* High-Cost Actions */}
        {actions.high.length > 0 && (
          <ActionCard
            icon={faSolarPanel}
            iconColor="text-cyan-600"
            bgColor="bg-cyan-100"
            title="High-Cost Actions"
            actions={actions.high}
            location={location}
          />
        )}
      </div>
    </div>
  );
}
