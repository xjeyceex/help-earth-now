'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import EmailSignup from './EmailSignup';
import { motion, Variants } from 'framer-motion';

interface HeroContentProps {
  location?: { state?: string; county?: string };
  warningText: string;
  questions: string[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const leafVariants: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [0, 15, -15, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

export default function HeroContent({
  location,
  warningText,
  questions,
}: HeroContentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mr-auto lg:col-span-7 space-y-6"
    >
      <motion.h1
        variants={itemVariants}
        className="max-w-3xl font-extrabold tracking-tight leading-none text-5xl md:text-6xl xl:text-7xl dark:text-white"
      >
        Climate change is hurting us all -{' '}
        <motion.span
          className="inline-flex items-center italic text-green-500"
          variants={itemVariants}
        >
          <span className="mr-1">now</span>
          <motion.span
            variants={leafVariants}
            initial="initial"
            animate="animate"
          >
            <FontAwesomeIcon
              icon={faLeaf}
              className="text-2xl text-green-600 mb-4"
            />
          </motion.span>
        </motion.span>
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="max-w-2xl font-light text-gray-700 dark:text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed"
      >
        {/* Location indicator for debugging */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-sm text-gray-500 mb-2">
            Location: {location?.state || 'No State'},{' '}
            {location?.county || 'No County'}
          </div>
        )}

        {/* Warning text with reduced spacing */}
        <motion.div variants={itemVariants} className="pb-2 leading-snug">
          {warningText}
        </motion.div>

        {/* Extra spacing after warning text */}
        <div className="pb-2" />

        {/* Title with reduced spacing before bullets */}
        {questions.length > 0 && (
          <>
            <motion.div
              variants={itemVariants}
              className="text-left font-semibold text-xl sm:text-2xl mb-2"
            >
              Do you care about:
            </motion.div>

            {/* Bullet points with reduced spacing */}
            <motion.ul
              variants={containerVariants}
              className="care-about-list list-disc pl-8 space-y-1"
            >
              {questions.map((question: string, index: number) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="pb-1"
                  whileHover={{ x: 5 }}
                >
                  {question.endsWith('?') ? question : `${question}?`}
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <EmailSignup />
      </motion.div>
    </motion.div>
  );
}
