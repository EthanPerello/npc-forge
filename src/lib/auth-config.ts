// src/lib/auth-config.ts
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from '@/lib/prisma';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  events: {
    async createUser({ user }) {
      console.log(`New user created: ${user.email}`);
      
      try {
        await prisma.userPreferences.create({
          data: {
            userId: user.id,
            theme: 'system',
            defaultTextModel: 'gpt-4o-mini',
            defaultImageModel: 'dall-e-2',
            allowPublicCharacters: false,
            allowDataCollection: true,
            emailNotifications: true,
          },
        });
      } catch (error) {
        console.error('Error creating user preferences:', error);
      }
    },
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email} via ${account?.provider}`);
    },
    async signOut({ token }) {
      console.log(`User signed out: ${token?.email}`);
    },
  },
  debug: process.env.NODE_ENV === 'development',
};