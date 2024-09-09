"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Admin() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/login'); 
    }

  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; 
  }

  if (status === 'unauthenticated') {
    return <p>You need to be authenticated to view this page.</p>; 
  }

  return (
    <div>
      <h1>Admin Only Page</h1>
      <p>Welcome! This page is only accessible by authenticated users.</p>
    </div>
  );
}