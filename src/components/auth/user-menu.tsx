'use client';

import { useState } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Mail, Sparkles, Loader2 } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

interface LoginFormProps {
  providers?: Record<string, Provider>;
}

export default function LoginForm({ providers }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/';

  const handleProviderSignIn = async (providerId: string) => {
    setIsLoading(providerId);
    try {
      await signIn(providerId, { callbackUrl });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading('email');
    try {
      const result = await signIn('email', { 
        email, 
        redirect: false,
        callbackUrl 
      });
      
      if (result?.error) {
        console.error('Email sign in error:', result.error);
      } else {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Email sign in error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'google':
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        );
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  const getProviderLabel = (provider: Provider) => {
    switch (provider.id) {
      case 'github':
        return 'Continue with GitHub';
      case 'google':
        return 'Continue with Google';
      case 'email':
        return 'Continue with Email';
      default:
        return `Continue with ${provider.name}`;
    }
  };

  if (emailSent) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Check your email</h2>
            <p className="text-muted">
              We sent a sign-in link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted mt-2">
              Click the link in the email to sign in to your account.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            onClick={() => {
              setEmailSent(false);
              setEmail('');
            }}
          >
            Try a different email
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/')}
          >
            Continue without signing in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-2" />
          <h1 className="text-2xl font-bold">Welcome to NPC Forge</h1>
        </div>
        <p className="text-muted">
          Sign in to sync your characters across devices and access advanced features
        </p>
      </div>

      {/* OAuth Providers */}
      {providers && (
        <div className="space-y-3">
          {Object.values(providers)
            .filter(provider => provider.id !== 'email')
            .map((provider) => (
              <Button
                key={provider.id}
                variant="outline"
                className="w-full"
                onClick={() => handleProviderSignIn(provider.id)}
                disabled={isLoading !== null}
              >
                {isLoading === provider.id ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <span className="mr-2">{getProviderIcon(provider.id)}</span>
                )}
                {getProviderLabel(provider)}
              </Button>
            ))}
        </div>
      )}

      {/* Divider */}
      {providers && Object.keys(providers).length > 1 && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-theme" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted">Or continue with email</span>
          </div>
        </div>
      )}

      {/* Email Form */}
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading !== null}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={!email || isLoading !== null}
        >
          {isLoading === 'email' ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <Mail className="h-5 w-5 mr-2" />
          )}
          Send sign-in link
        </Button>
      </form>

      {/* Continue without account */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="text-sm"
        >
          Continue without an account
        </Button>
      </div>

      {/* Benefits */}
      <div className="border-t border-theme pt-6">
        <h3 className="text-sm font-medium mb-3">Benefits of signing in:</h3>
        <ul className="text-sm text-muted space-y-2">
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2" />
            Sync characters across all your devices
          </li>
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2" />
            Never lose your character library
          </li>
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2" />
            Access advanced features and API integration
          </li>
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2" />
            Cloud backup of chat conversations
          </li>
        </ul>
      </div>
    </div>
  );
}