// src/app/auth/signin/page.tsx
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import LoginForm from '@/components/auth/login-form';

export default async function SignInPage() {
  // Check if user is already authenticated
  const user = await getCurrentUser();
  if (user) {
    redirect('/dashboard');
  }

  // Get available providers
  const providers = await getProviders();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-card border border-theme rounded-lg shadow-sm p-8">
          <LoginForm providers={providers} />
        </div>
        
        {/* Additional Info */}
        <div className="text-center">
          <p className="text-xs text-muted">
            By signing in, you agree to our{' '}
            <a 
              href="/docs/license" 
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a 
              href="/docs/security" 
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}