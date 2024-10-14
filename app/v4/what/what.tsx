import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faDollarSign, faSolarPanel } from '@fortawesome/free-solid-svg-icons'; // Importing Font Awesome icons

export default function What() {
    return (
        <>
            <div className="w-full max-w-7xl mx-auto py-12 lg:px-16" id='what'>
                <h2 className="text-5xl text-center dark:text-gray-200 mb-12 font-bold p-4"> {/* Increased title font size */}
                    What Can I Do?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6"> {/* Increased gap for better spacing */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-yellow-100 opacity-30"></div> {/* Background effect */}
                        <div className="relative z-10"> {/* Ensure text is on top */}
                            <FontAwesomeIcon icon={faLeaf} className="text-5xl text-green-600 mb-4" /> {/* Increased icon size */}
                            <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100"> {/* Increased font size */}
                                What can I do for free?
                            </h3>
                            <p className="text-2xl text-gray-700 dark:text-gray-300 mt-4"> {/* Increased paragraph font size */}
                                Share this site with others
                                <br />
                                <Link href='/v4/who'>
                                    <span className="text-blue-500 underline hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 cursor-pointer text-xl font-bold"> {/* Increased font size for link */}
                                        Vote for people who care &rarr;
                                    </span>
                                </Link>
                                <br />
                                Burn less: fewer fires, drive less
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-purple-100 opacity-30"></div>
                        <div className="relative z-10">
                            <FontAwesomeIcon icon={faDollarSign} className="text-5xl text-yellow-600 mb-4" /> {/* Increased icon size */}
                            <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100"> {/* Increased font size */}
                                What if I can spend a little?
                            </h3>
                            <p className="text-2xl text-gray-700 dark:text-gray-300 mt-4"> {/* Increased paragraph font size */}
                                Insulate your doors & windows better
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-purple-100 opacity-30"></div>
                        <div className="relative z-10">
                            <FontAwesomeIcon icon={faSolarPanel} className="text-5xl text-cyan-600 mb-4" /> {/* Increased icon size */}
                            <h3 className="text-4xl font-semibold text-gray-900 dark:text-gray-100"> {/* Increased font size */}
                                What if I can spend more?
                            </h3>
                            <p className="text-2xl text-gray-700 dark:text-gray-300 mt-4"> {/* Increased paragraph font size */}
                                Install solar cells
                                <br />
                                Change appliances from gas to electricity
                                <br />
                                Upgrade to energy-efficient windows
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
