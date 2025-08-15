'use client';

import React, { useState, useEffect } from 'react';
import { MdOutlineEmail, MdCheck, MdClose, MdPhone } from 'react-icons/md';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false); // for replacing form later

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

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          setIsClosing(false);
          setSignupComplete(true); // switch to "What can I do?" after toast
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
      setSignupComplete(true);
    }, 300);
  };

  if (signupComplete) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <a
          href="/what-can-i-do"
          className="text-blue-500 hover:underline font-semibold"
        >
          What can I do?
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4 relative max-w-lg p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <div className="text-left text-lg font-medium">
        Stay in the loop! Sign up for occasional updates — one or both of:
      </div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
          {/* Email Input */}
          <div className="flex-1 relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="p-3 pr-10 rounded-full w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-black placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Email Address"
            />
            <MdOutlineEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          {/* Phone Input */}
          <div className="flex-1 relative">
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              disabled={loading}
              className="p-3 pr-10 rounded-full w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition bg-white text-black placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Phone Number"
              maxLength={14}
            />
            <MdPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white p-3 rounded-full transition w-full flex justify-center items-center ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? 'Signing up…' : 'Sign Me Up'}
        </button>

        {/* Friendly messages */}
        {message && !showSuccessModal && (
          <div className="text-sm text-gray-600 mt-1">{message}</div>
        )}
      </form>

      {/* Success Toast */}
      {showSuccessModal && (
        <div
          className={`fixed bottom-6 right-6 z-50 transition-all transform ${
            isClosing ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 pr-10 relative flex items-start space-x-3 max-w-sm">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex-shrink-0">
              <MdCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Thanks for joining!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                You&apos;re on our list for occasional updates.
              </p>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
            >
              <MdClose className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
