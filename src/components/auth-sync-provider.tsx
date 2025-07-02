// src/components/auth-sync-provider.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { hybridCharacterStorage } from '@/lib/hybrid-storage';

interface AuthSyncProviderProps {
  children: React.ReactNode;
}

export function AuthSyncProvider({ children }: AuthSyncProviderProps) {
  const { data: session, status } = useSession();
  const previousAuthState = useRef<boolean>(false);
  const syncTriggered = useRef<boolean>(false);

  useEffect(() => {
    const isCurrentlyAuthenticated = !!session?.user?.id;
    const wasAuthenticated = previousAuthState.current;

    // Only trigger sync once when user goes from unauthenticated to authenticated
    if (!wasAuthenticated && isCurrentlyAuthenticated && !syncTriggered.current) {
      console.log('User just signed in, triggering character sync...');
      
      syncTriggered.current = true;
      
      // Trigger the hybrid storage to refresh authentication and sync
      hybridCharacterStorage.refreshAuth().then(() => {
        console.log('Authentication refreshed and sync triggered');
      }).catch((error) => {
        console.error('Failed to refresh authentication:', error);
      });
    }

    // Reset sync trigger if user signs out
    if (wasAuthenticated && !isCurrentlyAuthenticated) {
      syncTriggered.current = false;
    }

    // Update the previous auth state
    previousAuthState.current = isCurrentlyAuthenticated;
  }, [session?.user?.id, status]);

  // Listen for custom sync events and potentially show notifications
  useEffect(() => {
    const handleCharactersSynced = (event: CustomEvent) => {
      const { synced, failed, total } = event.detail;
      console.log(`Character sync completed: ${synced}/${total} synced, ${failed} failed`);
      
      // You could show a toast notification here
      if (synced > 0) {
        console.log(`✅ ${synced} characters synced to your account`);
      }
      if (failed > 0) {
        console.warn(`⚠️ ${failed} characters failed to sync`);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('characters-synced', handleCharactersSynced as EventListener);
      
      return () => {
        window.removeEventListener('characters-synced', handleCharactersSynced as EventListener);
      };
    }
  }, []);

  return <>{children}</>;
}