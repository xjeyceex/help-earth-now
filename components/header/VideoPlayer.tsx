'use client';

import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="lg:mt-0 lg:col-span-5 lg:flex lg:ml-8 mt-6">
      <iframe
        className="w-full aspect-video rounded-md shadow-lg"
        src={videoUrl}
        allow="autoplay; encrypted-media"
        allowFullScreen
      >
        Your browser does not support the video tag.
      </iframe>
    </div>
  );
}
