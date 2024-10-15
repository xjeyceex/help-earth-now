'use client';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';

interface ActionItem {
  action: string;
  description: string;
  link: string;
}

const ActionTable: React.FC = () => {
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the action items from your API
  useEffect(() => {
    const fetchActionItems = async () => {
      try {
        const response = await fetch('/api/learnMore',{
          next: {
            revalidate: 5,
          },
        });
        const data = await response.json();
        setActionItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching action items:', error);
        setLoading(false);
      }
    };

    fetchActionItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full text-gray-900 dark:text-gray-200">
      {/* Main header */}
      <header className="bg-green-600 dark:bg-green-700 text-white py-16 text-center">
        <h1 className="text-5xl font-bold">Saving the Planet: No Cape, Just Common Sense</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Practical steps you can take today to make a real difference in protecting our planet.
        </p>
      </header>

      {/* Section with additional actions */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-8">
          Additional Things You Can Do
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actionItems.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400">{item.action}</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{item.description}</p>
              <a
                href={item.link}
                className="text-blue-500 hover:underline mt-4 inline-block dark:text-blue-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ActionTable;
