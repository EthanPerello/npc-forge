'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { AuthSyncProvider } from './auth-sync-provider';

interface AuthProviderProps {
  children: ReactNode;
  session?: any;
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <SessionProvider session={session}>
      <AuthSyncProvider>
        {children}
      </AuthSyncProvider>
    </SessionProvider>
  );
}