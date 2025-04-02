'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/app/v4/navbar-v4';
import BackButton from '@/app/components/BackButton';
import Footer from '../components/Footer';

interface VideoItem {
  label: string;
  url: string;
  columns: number;
}

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]); // State to store video data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos'); // Adjust the API endpoint if needed
        const data: any[] = await response.json(); // Explicitly type the response data as an array
        const formattedVideos = data.map((item) => ({
          label: item['Label'],
          url: item['URL'],
          columns: parseInt(item['Number of videos in this row'], 10), // Parse the columns to an integer
        }));
        setVideos(formattedVideos); // Set the formatted data
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">
          Loading...
        </h1>
      </div>
    );
  }

  // Group videos based on the number of columns
  const rows = videos.reduce((acc: VideoItem[][], video: VideoItem) => {
    const lastRow = acc[acc.length - 1];
    if (!lastRow || lastRow.length >= video.columns) {
      acc.push([video]);
    } else {
      lastRow.push(video);
    }
    return acc;
  }, []);

  return (
    <>
      <Navbar />
      <BackButton />
      <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Increased max-width and padding */}
          <h1 className="text-4xl font-extrabold mb-6 text-center">
            Video Gallery
          </h1>

          {/* Dynamically render rows based on the number of videos per row */}
          {rows.map((row, rowIndex) => {
            // Get the number of columns for the current row
            const columns = row[0]?.columns || 1;

            return (
              <div
                key={rowIndex}
                className={`grid grid-cols-${columns} gap-10`} // Use the dynamic column number
              >
                {row.map((video, videoIndex) => (
                  <div
                    key={videoIndex}
                    className="flex flex-col items-center space-y-6"
                  >
                    <div className="text-center">
                      <h2 className="text-xl font-semibold mb-4">
                        {video.label}
                      </h2>{' '}
                      {/* Consistent font size */}
                      <div
                        className="relative w-full"
                        style={{ paddingBottom: '56.25%' }}
                      >
                        {' '}
                        {/* 16:9 aspect ratio */}
                        <iframe
                          src={`https://www.youtube.com/embed/${new URL(
                            video.url
                          ).searchParams.get('v')}`}
                          className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VideosPage;
