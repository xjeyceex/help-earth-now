import NavbarThree from "../v3/navbar-v3";

export default function AboutUsPage() {
    return (
        <>
        <NavbarThree/>
            <main className="bg-gray-50 text-gray-800 py-12 px-6">
                <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-4xl font-bold mb-6 text-center text-green-600">About Us</h1>

                    {/* Who We Are */}
                    <section className="mb-8 border-b border-gray-300 pb-4">
                        <h2 className="text-3xl font-semibold mb-4 text-green-500">Who We Are</h2>
                        <p className="text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </section>

                    {/* Our Mission */}
                    <section className="mb-8 border-b border-gray-300 pb-4">
                        <h2 className="text-3xl font-semibold mb-4 text-green-500">Our Mission</h2>
                        <p className="text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. 
                            Praesent sed libero a nisl bibendum tempor. Sed quis leo vitae nunc aliquet porttitor non nec odio.
                        </p>
                    </section>

                    {/* What We Do */}
                    <section className="mb-8 border-b border-gray-300 pb-4">
                        <h2 className="text-3xl font-semibold mb-4 text-green-500">What We Do</h2>
                        <ul className="list-disc list-inside text-lg leading-relaxed">
                            <li className="mb-2">
                                <strong>Education</strong>: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </li>
                            <li className="mb-2">
                                <strong>Advocacy</strong>: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </li>
                            <li className="mb-2">
                                <strong>Collaboration</strong>: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </li>
                        </ul>
                    </section>

                    {/* Our Values */}
                    <section className="mb-8 border-b border-gray-300 pb-4">
                        <h2 className="text-3xl font-semibold mb-4 text-green-500">Our Values</h2>
                        <ul className="list-disc list-inside text-lg leading-relaxed">
                            <li className="mb-2">
                                <strong>Sustainability</strong>: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </li>
                            <li className="mb-2">
                                <strong>Inclusivity</strong>: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </li>
                            <li className="mb-2">
                                <strong>Innovation</strong>: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </li>
                        </ul>
                    </section>

                    {/* Join Us */}
                    <section className="mb-8">
                        <h2 className="text-3xl font-semibold mb-4 text-green-500">Join Us</h2>
                        <p className="text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Vivamus lacinia odio vitae vestibulum. Praesent sed libero a nisl bibendum tempor.
                        </p>
                    </section>
                </div>
            </main>
        </>
    );
}
