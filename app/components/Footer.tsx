import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 px-4 w-full">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">

                {/* About Non-Profit Section */}
                <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">
                        <Link href="/about" className="underline text-blue-400" target="_blank">About Us</Link>
                    </h3>
                    <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>

                {/* Email Registration Section */}
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-2">Subscribe</h3>
                    <p className="text-sm mb-2 text-center">
                        Sign up to receive updates on our efforts and climate events.
                    </p>
                    <form className="flex space-x-2">
                        <input
                            type="email"
                            className="p-2 rounded text-gray-800 w-52"
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
            </div>

            {/* Bottom Section */}
            <div className="mt-6 text-center text-sm border-t border-gray-700 pt-4">
                <p>&copy; 2024 -Placeholder-. All rights reserved.</p>
            </div>
        </footer>
    );
}
