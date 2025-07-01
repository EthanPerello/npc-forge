// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { getCurrentUser, getUserPreferences } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Sparkles, Users, MessageCircle, Key, Settings } from 'lucide-react';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/signin');
  }

  // Get user stats
  const [characterCount, chatSessionCount, apiKeyCount, preferences] = await Promise.all([
    prisma.character.count({ where: { userId: user.id } }),
    prisma.chatSession.count({ where: { userId: user.id } }),
    prisma.apiKey.count({ where: { userId: user.id, isActive: true } }),
    getUserPreferences(user.id)
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Sparkles className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted">Welcome back, {user.name || user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-theme rounded-lg p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted">Characters</p>
                <p className="text-2xl font-bold">{characterCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-theme rounded-lg p-6">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted">Chat Sessions</p>
                <p className="text-2xl font-bold">{chatSessionCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-theme rounded-lg p-6">
            <div className="flex items-center">
              <Key className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted">API Keys</p>
                <p className="text-2xl font-bold">{apiKeyCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-theme rounded-lg p-6">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted">Account</p>
                <p className="text-sm font-medium">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border border-theme rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a
                href="/"
                className="block p-4 border border-theme rounded-lg hover:bg-secondary transition-colors"
              >
                <h4 className="font-medium">Create Character</h4>
                <p className="text-sm text-muted">Generate a new AI-powered character</p>
              </a>
              
              <a
                href="/library"
                className="block p-4 border border-theme rounded-lg hover:bg-secondary transition-colors"
              >
                <h4 className="font-medium">View Library</h4>
                <p className="text-sm text-muted">Browse and manage your characters</p>
              </a>
              
              <a
                href="/docs"
                className="block p-4 border border-theme rounded-lg hover:bg-secondary transition-colors"
              >
                <h4 className="font-medium">Documentation</h4>
                <p className="text-sm text-muted">Learn about features and API</p>
              </a>
            </div>
          </div>

          <div className="bg-card border border-theme rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Theme</label>
                <p className="text-sm text-muted">
                  {preferences?.theme || 'System'}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Default Text Model</label>
                <p className="text-sm text-muted">
                  {preferences?.defaultTextModel || 'gpt-4o-mini'}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Default Image Model</label>
                <p className="text-sm text-muted">
                  {preferences?.defaultImageModel || 'dall-e-2'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
          <p className="text-muted mb-4">
            We're working on exciting new features for your dashboard:
          </p>
          <ul className="list-disc list-inside text-sm text-muted space-y-1">
            <li>API key management and generation</li>
            <li>Usage analytics and insights</li>
            <li>Advanced account preferences</li>
            <li>Data export and privacy controls</li>
            <li>Unity integration tools</li>
          </ul>
        </div>
      </div>
    </div>
  );
}