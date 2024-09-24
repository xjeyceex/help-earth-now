"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminPanel from './admin-panel';
import ContentManagement from '../content/content-management';
import CookieConsent from '../components/CookieConsent';
import NavbarTwo from '../navbar-two';

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    ); 
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-600">You need to be authenticated to view this page.</p>
      </div>
    ); 
  }

  return (
    <>
      <CookieConsent/>
      <NavbarTwo/>
      <AdminPanel/>
    </>
  );
}
