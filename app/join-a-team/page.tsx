'use client'
import BackButton from "../components/BackButton";
import NavbarThree from "../v4/navbar-v4";

export default function Jointeam() {
    return (
        <>
            <NavbarThree/>
            <BackButton />
            <div className="p-6 mx-auto max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-4">Follow Key People</h1>
                <p className="text-lg text-center mb-6">
                    Explore influential voices in climate action and join the movement. Follow these leaders to stay informed, get involved, and make a difference!
                </p>

                <div className="space-y-4">
                    <div className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Climate Reality</h2>
                        <p className="text-sm text-gray-600">Led by Al Gore, Climate Reality is a global organization dedicated to climate education and advocacy.</p>
                        <a
                            href="https://x.com/climatereality?s=11"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Follow on X (Twitter)
                        </a>
                    </div>

                    <div className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Greta Thunberg</h2>
                        <p className="text-sm text-gray-600">Swedish environmental activist known for her School Strike for Climate movement.</p>
                        <a
                            href="https://x.com/GretaThunberg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Follow on X (Twitter)
                        </a>
                    </div>

                    <div className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Dr. Ayana Elizabeth Johnson</h2>
                        <p className="text-sm text-gray-600">Marine biologist and policy expert focused on climate solutions rooted in equity and justice.</p>
                        <a
                            href="https://x.com/ayanaeliza"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Follow on X (Twitter)
                        </a>
                    </div>

                    <div className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Leah Thomas</h2>
                        <p className="text-sm text-gray-600">Founder of Intersectional Environmentalist, a platform for climate justice advocacy.</p>
                        <a
                            href="https://x.com/Leahtommi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Follow on X (Twitter)
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
