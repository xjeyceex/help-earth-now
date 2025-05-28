'use client';

import { useState } from 'react';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { FaBluesky } from 'react-icons/fa6';
import Link from 'next/link';
import { MdEmail, MdOutlineEmail } from 'react-icons/md';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setMessage(''); // Reset the message

    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch('/api/recipients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Thank you for signing up!');
        setEmail(''); // Clear the input
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.error || 'Something went wrong. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setMessage('Failed to submit. Please check your connection.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-6 px-4 w-full">
      {/* Social Media Links Section */}
      <div className="mt-6 flex justify-center space-x-6">
        <Link
          href="https://www.linkedin.com/company/help-you-help-you/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
        >
          <FaLinkedin />
        </Link>
        <Link
          href="https://www.facebook.com/people/HelpYouHelpYOU/61567816064597/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
        >
          <FaFacebook />
        </Link>
        <Link
          href="https://x.com/HelpYou_HelpYou"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
        >
          <FaTwitter />
        </Link>
        <Link
          href="https://www.instagram.com/helpyouhelpyou_/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
        >
          <FaInstagram />
        </Link>
        <Link
          href="https://bsky.app/profile/helpyouhelpyou.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
        >
          <FaBluesky />
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center text-sm border-t border-gray-700 pt-4">
        <p>&copy; 2024 Help You Help You. All rights reserved.</p>
      </div>
    </footer>
  );
}
