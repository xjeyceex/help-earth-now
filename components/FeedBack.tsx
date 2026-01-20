'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faPaperPlane,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

export default function FeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setFeedback('');
      setIsSuccess(false);
      setError(null);
    }, 300);
  };

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setError('Please enter your feedback before submitting');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: feedback.trim() }),
      });

      if (!res.ok) throw new Error('Failed to submit feedback');

      setIsSuccess(true);
      setFeedback('');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={openModal}
          className="bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 shadow-lg flex items-center justify-center relative group ring-2 ring-white/10 dark:ring-gray-800/50"
          aria-label="Provide feedback"
        >
          <FontAwesomeIcon icon={faCommentDots} size="lg" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            !
          </span>
          <span className="absolute right-full mr-2 px-2 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
            Got feedback?
          </span>
        </button>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isSuccess ? '' : 'Share Your Feedback'}
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col space-y-4"
            >
              <p className="text-gray-700 dark:text-gray-300">
                We&apos;d love to hear your thoughts, suggestions, or issues.
              </p>

              <textarea
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                placeholder="What's on your mind?..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={isSubmitting}
              ></textarea>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 dark:text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={submitFeedback}
                  className="px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center min-w-24 disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="text-center py-6"
            >
              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="h-7 w-7 text-green-600 dark:text-green-400"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Thank You!
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Your feedback has been received. We appreciate your input!
              </p>
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}
