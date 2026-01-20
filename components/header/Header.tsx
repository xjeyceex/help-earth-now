'use client';

import React, { useContext } from 'react';
import { LocationContext } from '@/context/location-provider';
import HeroContent from './HeroContent';
import VideoPlayer from './VideoPlayer';
import ActionCards from './ActionCards';
import LoadingSkeleton from './LoadingSkeleton';
import { useHeaderData } from '../../hooks/useHeaderData';

export default function Header() {
  const { location } = useContext(LocationContext) || {};
  const { videoUrl, warningText, questions, actions, loading } =
    useHeaderData(location);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="w-full" id="home">
      <section className="bg-gray-50 dark:bg-gray-900 lg:px-16">
        <div className="grid max-w-screen-2xl px-6 pb-6 pt-3 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:pb-10 lg:grid-cols-12">
          <HeroContent
            location={location}
            warningText={warningText}
            questions={questions}
          />
          <VideoPlayer videoUrl={videoUrl} />
        </div>
      </section>

      <ActionCards actions={actions} location={location} />
    </div>
  );
}
