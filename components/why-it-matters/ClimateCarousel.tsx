'use client';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import ClimateCard from './ClimateCard';
import NavigationButton from './NavigationButton';
import { ClimateItem } from '@/app/types';

interface CarouselProps {
  items: ClimateItem[];
  onCardClick: (item: ClimateItem) => void;
}

const ClimateCarousel: React.FC<CarouselProps> = ({ items, onCardClick }) => {
  const duplicatedItems = [...items, ...items, ...items];
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isResettingRef = useRef(false);

  // Debounced scroll handler to reduce frequency of scroll events
  const handleScroll = useCallback(() => {
    if (isResettingRef.current) return;

    const container = cardContainerRef.current;
    if (!container) return;

    setIsScrolling(true);

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set timeout to detect when scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const sectionWidth = scrollWidth / 3;
      const tolerance = 10; // Add small tolerance to prevent constant resets

      // Only reset if we're close to boundaries
      if (scrollLeft <= tolerance) {
        isResettingRef.current = true;
        container.scrollLeft = sectionWidth;
        setTimeout(() => {
          isResettingRef.current = false;
        }, 50);
      } else if (scrollLeft >= scrollWidth - clientWidth - tolerance) {
        isResettingRef.current = true;
        container.scrollLeft = sectionWidth;
        setTimeout(() => {
          isResettingRef.current = false;
        }, 50);
      }

      setIsScrolling(false);
    }, 150); // Debounce scroll events
  }, []);

  // Optimized scroll functions with better easing
  const scrollLeft = useCallback(() => {
    const container = cardContainerRef.current;
    if (container && !isScrolling) {
      // Calculate card width dynamically
      const cardWidth = container.firstElementChild?.clientWidth || 300;
      const gap = 32; // 8 * 4 (space-x-8)
      const scrollDistance = cardWidth + gap;

      container.scrollBy({
        left: -scrollDistance,
        behavior: 'smooth',
      });
    }
  }, [isScrolling]);

  const scrollRight = useCallback(() => {
    const container = cardContainerRef.current;
    if (container && !isScrolling) {
      // Calculate card width dynamically
      const cardWidth = container.firstElementChild?.clientWidth || 300;
      const gap = 32; // 8 * 4 (space-x-8)
      const scrollDistance = cardWidth + gap;

      container.scrollBy({
        left: scrollDistance,
        behavior: 'smooth',
      });
    }
  }, [isScrolling]);

  useEffect(() => {
    const container = cardContainerRef.current;
    if (!container) return;

    // Use passive listener for better performance
    const scrollHandler = () => handleScroll();
    container.addEventListener('scroll', scrollHandler, { passive: true });

    // Initialize scroll position to center section
    const initializePosition = () => {
      const sectionWidth = container.scrollWidth / 3;
      container.scrollLeft = sectionWidth;
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(initializePosition);

    return () => {
      container.removeEventListener('scroll', scrollHandler);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Handle window resize to recalculate positions
  useEffect(() => {
    const handleResize = () => {
      const container = cardContainerRef.current;
      if (container && !isScrolling) {
        const sectionWidth = container.scrollWidth / 3;
        container.scrollLeft = sectionWidth;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isScrolling]);

  return (
    <div className="mt-6 relative overflow-hidden">
      <div
        ref={cardContainerRef}
        className="flex space-x-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide p-4"
        style={{
          scrollBehavior: isResettingRef.current ? 'auto' : 'smooth',
          WebkitOverflowScrolling: 'touch', // Better mobile scrolling
        }}
      >
        {duplicatedItems.map((item, index) => (
          <ClimateCard
            key={`${item.title}-${index}`}
            item={item}
            onClick={onCardClick}
          />
        ))}
      </div>

      <NavigationButton
        direction="left"
        onClick={scrollLeft}
        disabled={isScrolling}
      />
      <NavigationButton
        direction="right"
        onClick={scrollRight}
        disabled={isScrolling}
      />
    </div>
  );
};

export default ClimateCarousel;
