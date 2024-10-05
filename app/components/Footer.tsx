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
                    We're a team passionate about making a positive impact on both people and the planet.
                    <br />
                    We keep things simple, offering clear solutions to complex problems so everyone can take action. Want to learn more? The deeper you go, the more you'll discover—without the clutter, we promise!
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
