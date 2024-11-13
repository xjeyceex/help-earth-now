'use client'
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import FeedbackButton from "../components/FeedBack";
import NavbarThree from "../v4/navbar-v4";
import { FaUsers, FaClipboardList, FaHandsHelping, FaLeaf } from "react-icons/fa";

type AboutUsItem = {
    header: string;
    contents: string;
};

type HeaderType = "Who We Are" | "Our Mission" | "What We Do" | "Our Values" | "Join Us";

const iconMap: Record<HeaderType, JSX.Element> = {
    "Who We Are": <FaUsers className="mr-2 text-blue-500" />,
    "Our Mission": <FaClipboardList className="mr-2 text-green-500" />,
    "What We Do": <FaHandsHelping className="mr-2 text-green-500" />,
    "Our Values": <FaLeaf className="mr-2 text-green-700" />,
    "Join Us": <FaHandsHelping className="mr-2 text-green-500" />
};

export default function AboutUsPage() {
    const [aboutUsData, setAboutUsData] = useState<AboutUsItem[]>([]);
    const [groupedData, setGroupedData] = useState<{ header: string; contents: string[] }[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/aboutUs');
                const data: AboutUsItem[] = await response.json();
                setAboutUsData(data);
            } catch (error) {
                console.error("Error fetching About Us data:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        let currentHeader = "";
        const grouped = aboutUsData.reduce((acc, item) => {
            if (item.header) {
                currentHeader = item.header;
                acc.push({ header: currentHeader, contents: [item.contents] });
            } else if (currentHeader) {
                acc[acc.length - 1].contents.push(item.contents);
            }
            return acc;
        }, [] as { header: string; contents: string[] }[]);
        setGroupedData(grouped);
    }, [aboutUsData]);

    return (
        <>
            <NavbarThree />
            <BackButton />
            <main className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-200 py-8 px-6">
                <section className="max-w-7xl mx-auto space-y-12">
                    <h1 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
                        About Us
                    </h1>

                    {groupedData.map((section, index) => (
                        section.header === "Join Us" ? (
                            <div key={index} className="bg-gradient-to-r from-green-400 to-blue-500 shadow-xl rounded-lg p-10 text-center text-white transition-transform transform hover:scale-105 duration-300">
                                <h2 className="text-3xl font-semibold mb-6">{section.header}</h2>
                                {section.contents.map((content, idx) => (
                                    <p key={idx} className="text-lg leading-8 mb-6">
                                        {content}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <div key={index} className="bg-white shadow-xl rounded-lg p-10 transition-transform transform hover:scale-105 duration-300 dark:bg-gray-700">
                                <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
                                    {iconMap[section.header as HeaderType] || <FaHandsHelping className="mr-2 text-green-500" />}
                                    {section.header}
                                </h2>
                                {section.contents.map((content, idx) => (
                                    <p key={idx} className="text-lg leading-8 text-gray-600 dark:text-gray-300 mb-6">
                                        {content}
                                    </p>
                                ))}
                            </div>
                        )
                    ))}
                </section>
            </main>
            <FeedbackButton />
        </>
    );
}
