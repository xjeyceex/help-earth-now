'use client';
import { useParams } from 'next/navigation';

const CountyPage: React.FC = () => {
  const params = useParams();
  const countyName = params?.countyName; // Matches the `[countyName]` in the route

  return (
    <div>
      <h1>County Page</h1>
      <p>Currently viewing information for county: {countyName}</p>
    </div>
  );
};

export default CountyPage;
