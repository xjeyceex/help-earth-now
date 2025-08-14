'use client';

import React, { useState, useEffect } from 'react';
import { MdOutlineEmail, MdCheck, MdClose, MdPhone } from 'react-icons/md';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6)
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) =>
    /^\(\d{3}\)\s\d{3}-\d{4}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!email && !phone) {
      setMessage('Leave it blank or add your email/phone if you like 😊');
      return;
    }

    if (email && !validateEmail(email)) {
      setMessage('Hmm… that email looks a little off.');
      return;
    }

    if (phone && !validatePhone(phone)) {
      setMessage('Please use (XXX) XXX-XXXX format for phone.');
      return;
    }

    try {
      const response = await fetch('/api/recipients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email || undefined,
          phone: phone || undefined,
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Oops! Something went wrong.');
      }
    } catch {
      setMessage('Network issue? Try again in a moment.');
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          setIsClosing(false);
        }, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="space-y-4 relative max-w-lg p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <div className="text-left text-lg font-medium">
        Stay in the loop! Sign up for friendly updates:
      </div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
          {/* Email Input */}
          <div className="flex-1 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 pr-10 rounded-full w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-black placeholder-gray-400"
              placeholder="Your email (optional)"
            />
            <MdOutlineEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Phone Input */}
          <div className="flex-1 relative">
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className="p-3 pr-10 rounded-full w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-black placeholder-gray-400"
              placeholder="Phone (optional)"
              maxLength={14}
            />
            <MdPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Hint */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Both fields are optional - add whichever you like.
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition w-full"
        >
          Sign Me Up
        </button>

        {/* Friendly messages */}
        {message && !showSuccessModal && (
          <div className="text-sm text-gray-600 mt-1">{message}</div>
        )}
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 transition-opacity ${
            isClosing ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full text-center transition-all ${
              isClosing ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
            }`}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
            >
              <MdClose className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <MdCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Thanks for joining!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You&apos;ll get occasional friendly updates about our climate
              efforts.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
