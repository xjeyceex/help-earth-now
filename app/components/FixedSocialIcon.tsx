import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { FaBluesky } from 'react-icons/fa6';

function FixedSocialIcon() {
  return (
    <div className="hidden lg:fixed lg:top-1/2 lg:right-6 lg:transform lg:-translate-y-1/2 lg:flex lg:items-center relative bottom-0 right-0 w-full p-4 lg:w-auto lg:p-0">
      <ul className="hidden justify-center space-x-6 lg:block lg:space-x-0 lg:space-y-12">
        <li>
          <Link
            href="https://www.linkedin.com/company/help-you-help-you/" // Add your link
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.facebook.com/profile.php?id=61567410655540" // Add your link
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaFacebook />
          </Link>
        </li>
        <li>
          <Link
            href="https://x.com/HelpYou_HelpYou" // Add your link
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaTwitter />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.instagram.com/helpyouhelpyou_/" // Add your link
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaInstagram />
          </Link>
        </li>
        <li>
          <Link
            href="https://bsky.app/profile/helpyouhelpyou.bsky.social" // Add your link
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaBluesky />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FixedSocialIcon;
