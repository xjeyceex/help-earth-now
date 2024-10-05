import NavbarThree from "../v3/navbar-v3";

export default function AboutUsPage() {
    return (
        <>
            <NavbarThree />
            <main className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 py-16 px-6">
                <section className="max-w-7xl mx-auto space-y-12">
                    <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">
                        About Us
                    </h1>

                    {/* Who We Are Section */}
                    <div className="bg-white shadow-xl rounded-lg p-10 transition-transform transform hover:scale-105 duration-300">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Who We Are</h2>
                        <p className="text-lg leading-8 text-gray-600 mb-6">
                            We’re a team passionate about making a positive impact on people and the planet.
                            We keep it simple, offering clear solutions to complex problems—so everyone can take action.
                            Want more? The deeper you go, the more you’ll find (but no clutter, we promise!).
                        </p>
                    </div>

                    {/* Our Mission Section */}
                    <div className="bg-white shadow-xl rounded-lg p-10 transition-transform transform hover:scale-105 duration-300">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Mission</h2>
                        <p className="text-lg leading-8 text-gray-600 mb-6">
                            We’re on a mission to save the planet, one small step (and maybe a few big ones) at a time.
                            Climate change? Yeah, we’re not fans. We’re here to help you take action and make sustainable
                            living easier, because Earth only comes in one model—so let’s take care of it.
                        </p>
                    </div>

                    {/* What We Do Section */}
                    <div className="bg-white shadow-xl rounded-lg p-10 transition-transform transform hover:scale-105 duration-300">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">What We Do</h2>
                        <p className="text-lg leading-8 text-gray-600 mb-6">
                            We help you navigate the climate maze! From tips to connecting with others who care—we’ve got your back.
                            Think of us as your climate-sidekick, armed with facts, tools, and a bit of humor to make it all less overwhelming.
                        </p>
                    </div>

                    {/* Our Values Section */}
                    <div className="bg-white shadow-xl rounded-lg p-10 transition-transform transform hover:scale-105 duration-300">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Values</h2>
                        <ul className="list-disc list-inside text-lg leading-8 text-gray-600 space-y-4">
                            <li>
                                <strong>Keep It Clear:</strong> Climate change is complicated enough—we make it simple so you can act without the confusion.
                            </li>
                            <li>
                                <strong>Every Little Bit Counts:</strong> Whether you're starting small or going big, every action matters. Let's make progress, not perfection!
                            </li>
                            <li>
                                <strong>No Guilt, Just Action:</strong> We won’t overwhelm you with doom and gloom—just the good stuff and easy wins for a better planet.
                            </li>
                        </ul>
                    </div>

                    {/* Join Us Section */}
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 shadow-xl rounded-lg p-10 text-center text-white transition-transform transform hover:scale-105 duration-300">
                        <h2 className="text-3xl font-semibold mb-6">Join Us</h2>
                        <p className="text-lg leading-8 mb-6">
                            Ready to make a difference? 🌱 It’s as easy as downloading this app! Whether you’re a seasoned climate warrior
                            or just getting started, we need you. Let’s build a greener future, one action at a time!
                            And hey, we promise—no guilt trips, just actionable steps and good vibes.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
