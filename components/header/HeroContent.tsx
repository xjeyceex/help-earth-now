'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import EmailSignup from './EmailSignup';

interface HeroContentProps {
  location?: { state?: string; county?: string };
  warningText: string;
  questions: string[];
}

export default function HeroContent({
  location,
  warningText,
  questions,
}: HeroContentProps) {
  return (
    <div className="mr-auto lg:col-span-7 space-y-6">
      <h1 className="max-w-3xl font-extrabold tracking-tight leading-none text-5xl md:text-6xl xl:text-7xl dark:text-white">
        Climate change is hurting us all -{' '}
        <span className="inline-flex items-center italic text-green-500">
          <span className="mr-1">now</span>
          <FontAwesomeIcon
            icon={faLeaf}
            className="text-2xl text-green-600 mb-4"
          />
        </span>
      </h1>

      <div className="max-w-2xl font-light text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed">
        {/* Location indicator for debugging */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-sm text-gray-500 mb-2">
            Location: {location?.state || 'No State'},{' '}
            {location?.county || 'No County'}
          </div>
        )}

        {/* Warning text with reduced spacing */}
        <div className="pb-2 leading-snug">{warningText}</div>

        {/* Extra spacing after warning text */}
        <div className="pb-2" />

        {/* Title with reduced spacing before bullets */}
        {questions.length > 0 && (
          <>
            <div className="text-left font-semibold text-xl sm:text-2xl mb-2">
              Do you care about:
            </div>

            {/* Bullet points with reduced spacing */}
            <ul className="care-about-list list-disc pl-8 space-y-1">
              {questions.map((question: string, index: number) => (
                <li key={index} className="pb-1">
                  {question.endsWith('?') ? question : `${question}?`}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <EmailSignup />
    </div>
  );
}
