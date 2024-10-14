import React from "react";
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import Link from "next/link";

function FixSocialIcon() {
  return (
    <div className="lg:fixed lg:top-1/2 lg:right-6 lg:transform lg:-translate-y-1/2 lg:flex lg:items-center relative bottom-0 right-0 w-full p-4 lg:w-auto lg:p-0">
      <ul className="flex justify-center space-x-6 lg:block lg:space-x-0 lg:space-y-12">
        <li>
          <Link
            href="https://www.linkedin.com" // Add your link
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.instagram.com" // Add your link
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaInstagram />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.facebook.com" // Add your link
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaFacebook />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.twitter.com" // Add your link
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <FaTwitter />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FixSocialIcon;
