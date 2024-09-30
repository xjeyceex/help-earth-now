'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load
    if (status === 'unauthenticated') {
      router.push('/'); // Redirect if not authenticated or not admin
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className='justify-center items-center w-screen bg-cyan-300'>
      <h1>Admin Panel</h1>
      {/* Admin panel content here */}
    </div>
  );
}
