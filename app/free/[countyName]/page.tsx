'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import BackButton from '@/app/components/BackButton';
import NavbarThree from '@/app/v4/navbar-v4';

interface ActionItem {
  action: string;
  link1Name?: string;
  link1?: string;
  link2Name?: string;
  link2?: string;
  link3Name?: string;
  link3?: string;
}

const CountyPage: React.FC = () => {
  const params = useParams();
  const countyName = Array.isArray(params?.countyName)
    ? decodeURIComponent(params.countyName[0])
    : decodeURIComponent(params?.countyName || 'Unknown County');

  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActionItems = async () => {
      try {
        const response = await fetch('/api/more'); // Adjust the API endpoint as needed
        const data = await response.json();

        const normalizedData = data.map((item: any) => ({
          action: item.Action || '',
          link1Name: item['Link 1 name'] || '',
          link1: item['Link 1'] || '',
          link2Name: item['Link 2 name'] || '',
          link2: item['Link 2'] || '',
          link3Name: item['Link 3 name'] || '',
          link3: item['Link 3'] || '',
        }));

        setActionItems(normalizedData);
      } catch (error) {
        console.error('Error fetching action items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActionItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <NavbarThree />
      <BackButton />
      <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-4">County Page</h1>
          <p className="text-lg mb-8">
            Currently viewing information for county:{' '}
            <span className="font-semibold">{countyName}</span>
          </p>

          <div className="space-y-6">
            {actionItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-4">{item.action}</h2>

                <div className="space-y-2">
                  {item.link1 && item.link1Name && (
                    <Link
                      href={item.link1.replace('{countyName}', countyName)}
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-700 hover:underline"
                    >
                      {item.link1Name}
                    </Link>
                  )}
                  {item.link2 && item.link2Name && (
                    <Link
                      href={item.link2.replace('{countyName}', countyName)}
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-700 hover:underline"
                    >
                      {item.link2Name}
                    </Link>
                  )}
                  {item.link3 && item.link3Name && (
                    <Link
                      href={item.link3.replace('{countyName}', countyName)}
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-700 hover:underline"
                    >
                      {item.link3Name}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CountyPage;
