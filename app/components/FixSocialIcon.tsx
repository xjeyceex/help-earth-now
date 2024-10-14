import React from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import Link from "next/link";

function FixSocialIcon() {
  return (
    <div className="lg:fixed lg:top-1/2 lg:left-6 lg:transform lg:-translate-y-1/2 lg:flex lg:items-center relative bottom-0 left-0 w-full p-4 lg:w-auto lg:p-0">
      <ul className="flex justify-center space-x-6 lg:block lg:space-x-0 lg:space-y-8">
        <li>
          <Link
            href=""
            // target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 dark:text-white"
          >
            <FaLinkedin />
          </Link>
        </li>
        <li>
          <Link
            href=""
            // target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 dark:text-white"
          >
            <FaInstagram />
          </Link>
        </li>
        <li>
          <Link
            href=""
            // target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 dark:text-white"
          >
            <FaFacebook />
          </Link>
        </li>
        <li>
          <Link
            href=""
            // target="_blank"
            rel="noopener noreferrer"
            className="text-4xl text-gray-500 hover:text-blue-500 dark:text-white"
          >
            <FaTwitter />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FixSocialIcon;
