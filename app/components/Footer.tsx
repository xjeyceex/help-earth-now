export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 px-4 w-full">
                {/* Email Registration Section */}
                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm mb-2 text-center">
                        Sign up to receive occasional updates on our efforts and events
                    </p>
                    <form className="flex space-x-2">
                        <input
                            type="email"
                            className="p-2 rounded text-gray-900 w-52"
                            placeholder="Enter your email"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-24"
                        >
                            Save
                        </button>
                    </form>
                </div>
            {/* Bottom Section */}
            <div className="mt-6 text-center text-sm border-t border-gray-700 pt-4">
                <p>&copy; 2024 Our Name Here. All rights reserved.</p>
            </div>
        </footer>
    );
}
