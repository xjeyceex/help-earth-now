'use client'
import { useEffect, useState } from 'react';
import BackButton from "../components/BackButton";
import NavbarThree from "../v4/navbar-v4";

interface KeyPerson {
  Name: string;
  Description: string;
  Link: string;
}

export default function Jointeam() {
  const [keyPeople, setKeyPeople] = useState<KeyPerson[]>([]); // State to store fetched key people data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchKeyPeople = async () => {
      try {
        const response = await fetch('/api/keyPeople');
        if (!response.ok) {
          throw new Error('Failed to fetch key people data');
        }
        const data = await response.json();
        setKeyPeople(data); // Set the fetched data
      } catch (err) {
        setError('Something went wrong. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchKeyPeople();
  }, []);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <NavbarThree />
      <BackButton />
      <div className="p-6 mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4">Follow Key People</h1>
        <p className="text-lg text-center mb-6">
          Explore influential voices in climate action and join the movement. Follow these leaders to stay informed, get involved, and make a difference!
        </p>

        <div className="space-y-4">
          {keyPeople.map((person) => (
            <div key={person.Name} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{person.Name}</h2>
              <p className="text-sm text-gray-600">{person.Description}</p>
              <a
                href={person.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Follow on X (Twitter)
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
