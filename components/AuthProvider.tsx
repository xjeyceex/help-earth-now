"use client";

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth'; 

interface AuthProviderProps {
  children: React.ReactNode;
  session?: Session; 
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session || undefined}>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
