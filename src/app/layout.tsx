import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from 'next-auth/next';
import Sidebar from '@/components/sidebar';
import ClientLayout from '@/components/client-layout';
import { Analytics } from '@vercel/analytics/react';
import { authOptions } from '@/lib/auth-config';
import { AuthProvider } from '@/components/auth-provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Determine base URL based on environment
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://npc-forge-ethan-perellos-projects.vercel.app';

// Fixed metadata configuration that works for both development and production
export const metadata: Metadata = {
  title: "NPC Forge | AI Character Generator for Games",
  description: "Create detailed NPCs with backstories, quests, dialogue, and portraits using AI. Perfect for game developers, RPG players, and storytellers.",
  keywords: ["character generator", "NPC creator", "game development", "RPG tools", "AI generator"],
  authors: [{ name: "Ethan Perello" }],
  creator: "Ethan Perello",
  publisher: "Ethan Perello",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "NPC Forge | AI Character Generator for Games",
    description: "Create detailed NPCs with backstories, quests, dialogue, and portraits using AI.",
    url: baseUrl,
    siteName: "NPC Forge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NPC Forge Preview"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NPC Forge | AI Character Generator for Games",
    description: "Create detailed NPCs with backstories, quests, dialogue, and portraits using AI.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

// Root layout with server components
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        {/* Updated to use CSS variables */}
        <meta name="theme-color" content="var(--background)" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider session={session}>
          <Sidebar />
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}