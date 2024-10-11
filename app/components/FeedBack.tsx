'use client'
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function FeedbackButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/* Feedback Button (Fixed at Bottom Right) */}
            <div className="fixed bottom-4 right-4">
                <button
                    onClick={openModal}
                    className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-200 shadow-lg flex items-center justify-center"
                    aria-label="Feedback"
                >
                    <FontAwesomeIcon icon={faCommentDots} size="lg" />
                </button>
            </div>

            {/* Feedback Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">We'd love to hear your feedback!</h2>
                        <form className="flex flex-col space-y-4">
                            <textarea
                                className="p-2 rounded text-gray-900 h-24"
                                placeholder="Your feedback..."
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
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
