'use client';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import Modal from './Modal'; // Adjust the import path according to your project structure

export default function FeedbackButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // State for success message

    const openModal = () => {
        setIsModalOpen(true);
        setIsSuccess(false); // Reset success state when opening the modal
    };

    const closeModal = () => setIsModalOpen(false);

    const submitFeedback = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Send feedback to the backend API
        const res = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ feedback })
        });

        if (res.ok) {
            setIsSuccess(true); // Set success state on successful submission
            setFeedback('');
        }
        setIsSubmitting(false);
    };

    return (
        <>
            <div className="fixed bottom-4 right-4">
                <button
                    onClick={openModal}
                    className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-200 shadow-lg flex items-center justify-center"
                    aria-label="Feedback"
                >
                    <FontAwesomeIcon icon={faCommentDots} size="lg" />
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="">
                {!isSuccess ? (
                    <form onSubmit={submitFeedback} className="flex flex-col space-y-4">
                        <textarea
                            className="p-2 rounded text-gray-900 h-24"
                            placeholder="Your feedback..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        ></textarea>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <h2 className="text-lg font-semibold mb-4">Thank you for your feedback!</h2>
                        <p className="mb-4 text-gray-600">Your feedback has been submitted successfully.</p>
                        <button
                            onClick={closeModal}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                )}
            </Modal>
        </>
    );
}
