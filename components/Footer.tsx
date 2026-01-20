'use client';

import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { FaBluesky } from 'react-icons/fa6';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-6 px-4 w-full">
      {/* Social Media Links Section */}
      <div className="mt-6 flex justify-center space-x-6">
        {[
          {
            href: 'https://www.linkedin.com/company/help-you-help-you/',
            icon: <FaLinkedin />,
          },
          {
            href: 'https://www.facebook.com/people/HelpYouHelpYOU/61567816064597/',
            icon: <FaFacebook />,
          },
          {
            href: 'https://x.com/HelpYou_HelpYou',
            icon: <FaTwitter />,
          },
          {
            href: 'https://www.instagram.com/helpyouhelpyou_/',
            icon: <FaInstagram />,
          },
          {
            href: 'https://bsky.app/profile/helpyouhelpyou.org',
            icon: <FaBluesky />,
          },
        ].map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-transform transform hover:scale-110"
          >
            {item.icon}
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center text-sm border-t border-gray-300 dark:border-gray-700 pt-4">
        <p>&copy; 2024 Help You Help You. All rights reserved.</p>
      </div>
    </footer>
  );
}
