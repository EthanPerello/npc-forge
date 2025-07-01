'use client';

import { useSession } from 'next-auth/react';
import { Sparkles } from 'lucide-react';
import UserMenu from '@/components/auth/user-menu';
import Button from '@/components/ui/button';
import ThemeToggle from '@/components/ui/theme-toggle';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="bg-card border-b border-theme sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Sparkles className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h1 className="text-xl font-bold">NPC Forge</h1>
              <p className="text-xs text-muted hidden sm:block">AI Character Creator</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => router.push('/')}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Create Character
            </button>
            <button
              onClick={() => router.push('/library')}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Library
            </button>
            <button
              onClick={() => router.push('/docs')}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Docs
            </button>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Auth Section */}
            {status === 'loading' ? (
              <div className="h-8 w-20 bg-secondary animate-pulse rounded" />
            ) : session ? (
              <UserMenu />
            ) : (
              <Button
                variant="outline"
                onClick={() => router.push('/auth/signin')}
                size="sm"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}