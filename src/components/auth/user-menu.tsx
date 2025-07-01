'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import { User, Settings, LogOut, Loader2, ChevronDown } from 'lucide-react';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleDashboard = () => {
    router.push('/dashboard');
    setIsOpen(false);
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push('/auth/signin')}
        className="text-sm"
      >
        Sign In
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-400 flex items-center justify-center">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="h-4 w-4 text-white" />
          )}
        </div>
        <span className="hidden sm:inline">{session.user.name || session.user.email}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-theme rounded-md shadow-lg z-20">
            <div className="py-1">
              <div className="px-4 py-2 border-b border-theme">
                <p className="text-sm font-medium">{session.user.name}</p>
                <p className="text-xs text-muted">{session.user.email}</p>
              </div>
              
              <button
                onClick={handleDashboard}
                className="w-full px-4 py-2 text-sm text-left hover:bg-secondary flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
              
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full px-4 py-2 text-sm text-left hover:bg-secondary flex items-center space-x-2 text-red-600 dark:text-red-400"
              >
                {isSigningOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                <span>{isSigningOut ? 'Signing out...' : 'Sign out'}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}