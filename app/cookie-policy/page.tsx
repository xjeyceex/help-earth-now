'use client';

import Link from 'next/link';
import CookieConsent from '@/components/CookieConsent';
import { motion, Variants, Transition } from 'framer-motion';
import { FiSettings, FiShield, FiInfo } from 'react-icons/fi';
import { FaCookie } from 'react-icons/fa';

export default function CookiePolicy() {
  // Define transition types
  const springTransition: Transition = {
    type: 'spring',
    damping: 12,
    stiffness: 100,
  };

  const headerTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 10,
  };

  // Variants with proper typing
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: springTransition,
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: headerTransition,
    },
  };

  return (
    <>
      <CookieConsent />
      <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-4 sm:p-8">
        <motion.div
          className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {/* Header */}
          <motion.div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 relative overflow-hidden"
            variants={headerVariants}
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <FaCookie className="text-3xl" />
                <h1 className="text-3xl sm:text-4xl font-bold">
                  Cookie Policy
                </h1>
              </div>
              <p className="text-lg text-white/90 leading-relaxed max-w-2xl">
                This policy explains how we use cookies to enhance your
                experience while respecting your privacy.
              </p>
            </div>
          </motion.div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* What Are Cookies */}
            <motion.section
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600"
              variants={item}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-300">
                  <FiInfo className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    What Are Cookies?
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Cookies are small text files placed on your device when you
                    visit websites. They serve as memory for websites, allowing
                    them to recognize your device and remember your preferences,
                    settings, or actions over time.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* How We Use Cookies */}
            <motion.section
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600"
              variants={item}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-300">
                  <FiSettings className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    How We Use Cookies
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    We use cookies for essential functions and to improve your
                    experience:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="inline-block mt-1 w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Ensure proper website functionality and security
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block mt-1 w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Remember your preferences and settings
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block mt-1 w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Analyze site usage to improve our services
                      </span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded border-l-4 border-indigo-400 dark:border-indigo-600">
                    <p className="text-gray-600 dark:text-gray-400 font-medium italic">
                      We do not and will never use cookies to collect or store
                      personally identifiable information without your explicit
                      consent.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Managing Cookies */}
            <motion.section
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600"
              variants={item}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
                  <FiSettings className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Managing Cookies
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You have full control over cookies through your browser
                    settings. Most browsers allow you to:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                        View Cookies
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        See all cookies stored on your device
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                        Delete Cookies
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Remove existing cookies at any time
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                        Block Cookies
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Prevent future cookies from being set
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                        Exceptions
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Allow cookies for specific sites
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    For detailed instructions, visit{' '}
                    <Link
                      href="https://www.aboutcookies.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      www.aboutcookies.org
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Your Choices */}
            <motion.section
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600"
              variants={item}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full text-green-600 dark:text-green-300">
                  <FiShield className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Your Privacy Choices
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We respect your right to privacy. You can:
                  </p>
                  <ul className="space-y-3 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="inline-block mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Accept or reject non-essential cookies via our consent
                        banner
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Change your preferences at any time through your browser
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Contact us with any questions about your data
                      </span>
                    </li>
                  </ul>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30">
                    <p className="text-green-800 dark:text-green-200">
                      <strong>Note:</strong> Some website features may not work
                      properly if you disable essential cookies.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <motion.div
            className="bg-gray-100 dark:bg-gray-900 p-6 text-center text-gray-600 dark:text-gray-400 text-sm"
            variants={item}
          >
            <p>
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="mt-1">
              For questions about this policy, please contact us.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
